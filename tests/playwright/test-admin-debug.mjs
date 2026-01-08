import { chromium } from 'playwright';

const FRONTEND_URL = 'http://localhost:4321';
const ADMIN_EMAIL = 'maria@ejemplo.com';
const ADMIN_PASSWORD = 'password123';

async function debugAdmin() {
  console.log('🔍 Debugging Panel Admin\n');
  
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Capturar errores de consola
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('❌ Console Error:', msg.text());
    }
  });

  // Capturar errores de red
  page.on('pageerror', error => {
    console.log('❌ Page Error:', error.message);
  });

  try {
    // Login
    console.log('1️⃣  Login...');
    await page.goto(`${FRONTEND_URL}/login`);
    await page.locator('input[type="email"]').fill(ADMIN_EMAIL);
    await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    await page.waitForURL(FRONTEND_URL);
    console.log('   ✓ Login OK\n');

    // Navegar al admin
    console.log('2️⃣  Ir al panel admin...');
    await page.goto(`${FRONTEND_URL}/admin/lugares`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);

    // Capturar HTML
    const html = await page.content();
    console.log('\n📄 HTML de la página:');
    console.log(html.substring(0, 2000));
    console.log('...\n');

    // Verificar scripts cargados
    const scripts = await page.locator('script[src]').evaluateAll(
      scripts => scripts.map(s => s.getAttribute('src'))
    );
    console.log('📜 Scripts cargados:');
    scripts.forEach(src => console.log(`   - ${src}`));
    console.log('');

    // Esperar más tiempo
    console.log('⏳ Esperando 10 segundos...');
    await page.waitForTimeout(10000);

    // Verificar de nuevo
    const title = await page.locator('h1').first().textContent();
    console.log(`\n📍 Título final: "${title}"`);

    await page.screenshot({ path: 'tests/playwright/screenshots/admin-final.png', fullPage: true });
    console.log('📸 Screenshot guardado\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

debugAdmin().catch(console.error);
