import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('🔍 Probando navegación...\n');
  
  await page.goto('http://localhost:4321/lugares');
  await page.waitForTimeout(2500);
  
  const placesCount = await page.$$eval('a[href^="/lugares/"]', cards => cards.length);
  console.log(`✅ ${placesCount} lugares en la lista`);
  
  // Obtener el primer ID
  const firstPlaceHref = await page.$eval('a[href^="/lugares/"]', card => card.getAttribute('href'));
  console.log(`📍 Navegando a: ${firstPlaceHref}`);
  
  await page.goto(`http://localhost:4321${firstPlaceHref}`);
  await page.waitForTimeout(2500);
  
  const title = await page.textContent('h1');
  const hasDescription = await page.locator('text=Descripción').count() > 0;
  const hasLocation = await page.locator('text=Ubicación').count() > 0;
  
  console.log(`\n✅ Título: ${title?.trim()}`);
  console.log(`✅ Tiene descripción: ${hasDescription}`);
  console.log(`✅ Tiene ubicación: ${hasLocation}`);
  
  await page.screenshot({ path: 'screenshots/place-detail-modern.png', fullPage: true });
  console.log('\n📸 Screenshot guardado!');
  
  await browser.close();
})();
