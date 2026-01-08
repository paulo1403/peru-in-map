import { chromium } from 'playwright';

const FRONTEND_URL = 'http://localhost:4321';
const ADMIN_EMAIL = 'maria@ejemplo.com';
const ADMIN_PASSWORD = 'password123';

async function simpleAdminTest() {
  console.log('🧪 Test simplificado del Panel Admin\n');
  
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 1. Login
    console.log('1️⃣  Haciendo login...');
    await page.goto(`${FRONTEND_URL}/login`);
    await page.locator('input[type="email"]').fill(ADMIN_EMAIL);
    await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    await page.waitForURL(FRONTEND_URL, { timeout: 5000 });
    console.log('   ✓ Login exitoso\n');

    // 2. Ir al panel admin
    console.log('2️⃣  Navegando al panel admin...');
    await page.goto(`${FRONTEND_URL}/admin/lugares`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Tomar screenshot
    await page.screenshot({ path: 'tests/playwright/screenshots/admin-estado.png', fullPage: true });
    console.log('   📸 Screenshot guardado\n');

    // 3. Verificar título
    console.log('3️⃣  Verificando contenido...');
    const title = await page.locator('h1').first().textContent();
    console.log(`   Título encontrado: "${title}"`);
    
    // 4. Verificar que el componente React se cargó
    const hasStats = await page.locator('text=Total Lugares').isVisible().catch(() => false);
    console.log(`   Estadísticas visibles: ${hasStats}`);
    
    const hasTable = await page.locator('table').isVisible().catch(() => false);
    console.log(`   Tabla visible: ${hasTable}`);
    
    const hasCreateButton = await page.locator('button:has-text("Crear")').isVisible().catch(() => false);
    console.log(`   Botón crear visible: ${hasCreateButton}\n`);

    // 5. Si todo funciona, probar crear un lugar
    if (hasCreateButton) {
      console.log('4️⃣  Probando crear lugar...');
      await page.locator('button:has-text("Crear")').click();
      await page.waitForTimeout(1000);
      
      const modalTitle = await page.locator('h2').filter({ hasText: /crear/i }).textContent();
      console.log(`   Modal abierto: "${modalTitle}"`);
      
      await page.screenshot({ path: 'tests/playwright/screenshots/admin-modal.png' });
      console.log('   📸 Screenshot del modal guardado\n');
    }

    console.log('✅ Test completado!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    await page.screenshot({ path: 'tests/playwright/screenshots/admin-error.png', fullPage: true });
  } finally {
    await browser.close();
  }
}

simpleAdminTest().catch(console.error);
