import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  // Obtener el primer lugar
  await page.goto('http://localhost:4321/lugares');
  await page.waitForTimeout(2000);
  
  console.log('📍 Verificando lugares...');
  const placeCards = await page.$$('a[href^="/lugares/"]');
  console.log(`✅ ${placeCards.length} lugares encontrados`);
  
  // Hacer clic en el primer lugar
  if (placeCards.length > 0) {
    await placeCards[0].click();
    await page.waitForTimeout(2000);
    
    const title = await page.textContent('h1');
    console.log(`\n📍 Lugar: ${title?.trim()}`);
    
    // Verificar elementos de la página
    const hasDescription = await page.$('text=Descripción');
    const hasLocation = await page.$('text=Ubicación');
    const hasReviews = await page.$('text=Reseñas');
    
    console.log('✅ Sección Descripción:', hasDescription !== null);
    console.log('✅ Sección Ubicación:', hasLocation !== null);
    console.log('✅ Sección Reseñas:', hasReviews !== null);
    
    // Screenshot
    await page.screenshot({ path: 'screenshots/place-detail.png', fullPage: true });
    console.log('\n📸 Screenshot guardado: screenshots/place-detail.png');
  }
  
  // Verificar lugares de San Isidro
  await page.goto('http://localhost:4321/lugares');
  await page.waitForTimeout(2000);
  
  const sanIsidroPlaces = await page.$$eval('a[href^="/lugares/"]', (cards) => {
    return cards
      .map(card => card.textContent)
      .filter(text => text?.includes('San Isidro'))
      .length;
  });
  
  console.log(`\n✅ Lugares en San Isidro visibles: ${sanIsidroPlaces}`);
  
  await browser.close();
  console.log('\n✨ Verificación completada!');
})();
