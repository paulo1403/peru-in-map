import { chromium } from 'playwright';

async function checkDesign() {
  console.log('🚀 Iniciando Playwright...');
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  const consoleErrors = [];
  const networkErrors = [];

  // Capturar errores de consola
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  
  // Capturar errores de red
  page.on('requestfailed', request => {
    networkErrors.push(request.url());
  });

  try {
    // Homepage
    console.log('\n📍 HOMEPAGE (/)');
    console.log('─'.repeat(50));
    await page.goto('http://localhost:4321/', { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(1000);
    
    const homeTitle = await page.title();
    console.log('✅ Título:', homeTitle);
    
    const homeSnapshot = await page.textContent('body');
    console.log('✅ Contenido cargado:', homeSnapshot.length, 'caracteres');
    
    await page.screenshot({ path: 'screenshots/homepage.png', fullPage: true });
    console.log('📸 Screenshot guardado: screenshots/homepage.png');
    
    // Lugares
    console.log('\n📍 LUGARES (/lugares)');
    console.log('─'.repeat(50));
    await page.goto('http://localhost:4321/lugares', { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(1000);
    
    const lugaresTitle = await page.title();
    console.log('✅ Título:', lugaresTitle);
    
    await page.screenshot({ path: 'screenshots/lugares.png', fullPage: true });
    console.log('📸 Screenshot guardado: screenshots/lugares.png');
    
    // Resumen de errores
    console.log('\n📊 RESUMEN');
    console.log('─'.repeat(50));
    if (consoleErrors.length > 0) {
      console.log('❌ Errores de consola:', consoleErrors.length);
      consoleErrors.forEach(err => console.log('  -', err));
    } else {
      console.log('✅ Sin errores de consola');
    }
    
    if (networkErrors.length > 0) {
      console.log('❌ Errores de red:', networkErrors.length);
      networkErrors.forEach(err => console.log('  -', err));
    } else {
      console.log('✅ Sin errores de red');
    }
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
  } finally {
    await browser.close();
    console.log('\n✨ Proceso completado');
  }
}

checkDesign().catch(console.error);
