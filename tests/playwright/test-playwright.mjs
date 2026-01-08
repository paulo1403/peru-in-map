import { chromium } from 'playwright';

(async () => {
  console.log('Starting...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4321/');
  console.log('Title:', await page.title());
  
  await page.screenshot({ path: 'test.png' });
  console.log('Screenshot saved!');
  
  await browser.close();
})();
