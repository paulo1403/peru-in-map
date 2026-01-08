import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4321/');
  await page.waitForTimeout(2000);
  
  console.log('🔍 Buscando el botón de idioma...');
  const langButton = await page.$('button:has(svg + span)');
  
  if (langButton) {
    console.log('✅ Botón encontrado, haciendo clic...');
    await langButton.click();
    await page.waitForTimeout(500);
    
    const dropdown = await page.$('button:has-text("Español")');
    console.log('✅ Dropdown visible:', dropdown !== null);
    
    if (dropdown) {
      await page.screenshot({ path: 'dropdown-open.png', clip: { x: 0, y: 0, width: 1920, height: 200 } });
      console.log('📸 Screenshot guardado: dropdown-open.png');
    }
  } else {
    console.log('❌ Botón no encontrado');
  }
  
  await browser.close();
})();
