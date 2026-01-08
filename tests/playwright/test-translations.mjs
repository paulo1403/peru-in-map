import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4321/');
  await page.waitForTimeout(2500);
  
  console.log('\n📍 ESPAÑOL');
  console.log('─'.repeat(50));
  const heroES = await page.textContent('h1');
  console.log('Hero:', heroES?.trim());
  
  const navES = await page.$$eval('nav a', links => links.map(l => l.textContent?.trim()));
  console.log('Nav:', navES.join(' | '));
  
  const ctaES = await page.$$eval('a[class*="bg-primary"]', btns => btns.map(b => b.textContent?.trim()));
  console.log('CTAs:', ctaES.join(' | '));
  
  // Cambiar a inglés
  console.log('\n🔄 Cambiando a inglés...');
  const langBtn = await page.locator('button').filter({ hasText: /^ES$/i }).first();
  await langBtn.click();
  await page.waitForTimeout(300);
  
  const enBtn = await page.locator('button').filter({ hasText: 'English' }).first();
  await enBtn.click();
  await page.waitForTimeout(2000);
  
  console.log('\n📍 ENGLISH');
  console.log('─'.repeat(50));
  const heroEN = await page.textContent('h1');
  console.log('Hero:', heroEN?.trim());
  
  const navEN = await page.$$eval('nav a', links => links.map(l => l.textContent?.trim()));
  console.log('Nav:', navEN.join(' | '));
  
  const ctaEN = await page.$$eval('a[class*="bg-primary"]', btns => btns.map(b => b.textContent?.trim()));
  console.log('CTAs:', ctaEN.join(' | '));
  
  // Ir a lugares
  await page.goto('http://localhost:4321/lugares');
  await page.waitForTimeout(2000);
  
  const placesTitle = await page.textContent('h1');
  console.log('\nPlaces page title:', placesTitle?.trim());
  
  console.log('\n✅ Prueba completada!');
  
  await browser.close();
})();
