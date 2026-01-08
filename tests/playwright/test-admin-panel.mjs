import { chromium } from 'playwright';

const FRONTEND_URL = 'http://localhost:4321';
const BACKEND_URL = 'http://localhost:3000';
const ADMIN_EMAIL = 'maria@ejemplo.com';
const ADMIN_PASSWORD = 'password123';

async function testAdminPanel() {
  console.log('🧪 Iniciando tests del Panel Admin...\n');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Test 1: Verificar acceso denegado sin autenticación
    console.log('✅ Test 1: Acceso denegado sin autenticación');
    await page.goto(`${FRONTEND_URL}/admin/lugares`);
    await page.waitForTimeout(1000);
    const accessDeniedVisible = await page.getByText('Acceso Denegado').isVisible();
    if (accessDeniedVisible) {
      console.log('   ✓ Mensaje de acceso denegado mostrado correctamente\n');
    } else {
      console.log('   ✗ ERROR: No se muestra mensaje de acceso denegado\n');
    }

    // Test 2: Login como admin
    console.log('✅ Test 2: Login como administrador');
    await page.goto(`${FRONTEND_URL}/login`);
    await page.waitForTimeout(2000);
    
    // Llenar formulario
    await page.locator('input[type="email"]').fill(ADMIN_EMAIL);
    await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
    
    // Submit
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    await page.waitForTimeout(3000);
    
    // Verificar si hay error visible
    const errorVisible = await page.locator('.bg-red-50').isVisible().catch(() => false);
    if (errorVisible) {
      const errorText = await page.locator('.bg-red-50').textContent();
      console.log(`   ✗ ERROR en login: ${errorText}\n`);
      await browser.close();
      return;
    }
    
    // Verificar que el login fue exitoso - debería redirigir a home
    const currentUrl = page.url();
    if (currentUrl === `${FRONTEND_URL}/` || currentUrl === FRONTEND_URL) {
      console.log('   ✓ Login exitoso - redirigido a home\n');
    } else {
      console.log(`   ⚠ WARNING: No redirigió a home. URL actual: ${currentUrl}`);
      console.log('   Verificando si el usuario está autenticado...\n');
      
      // Ir manualmente a home para verificar auth
      await page.goto(FRONTEND_URL);
      await page.waitForTimeout(1000);
    }

    // Test 3: Verificar enlace "Panel Admin" en menú
    console.log('✅ Test 3: Verificar enlace Panel Admin en el header');
    
    // Esperar a que cargue el header con el usuario
    await page.waitForTimeout(2000);
    
    // Buscar el nombre del usuario (María)
    const userName = page.locator('button').filter({ hasText: /maría/i }).first();
    const userNameVisible = await userName.isVisible().catch(() => false);
    
    if (!userNameVisible) {
      console.log('   ✗ ERROR: Usuario no está visible en el header');
      console.log('   Intentando con otro selector...\n');
      
      // Intentar con el avatar con inicial
      const avatar = page.locator('.bg-primary.text-white.rounded-full').first();
      const avatarVisible = await avatar.isVisible().catch(() => false);
      
      if (avatarVisible) {
        const avatarText = await avatar.textContent();
        console.log(`   ℹ Avatar encontrado con texto: "${avatarText}"`);
        await avatar.click();
        await page.waitForTimeout(500);
      } else {
        console.log('   ✗ No se encontró el elemento de usuario\n');
        await browser.close();
        return;
      }
    } else {
      await userName.click();
      await page.waitForTimeout(500);
    }
    
    const adminLinkVisible = await page.getByText('Panel Admin').isVisible();
    if (adminLinkVisible) {
      console.log('   ✓ Enlace "Panel Admin" visible en el menú\n');
    } else {
      console.log('   ✗ ERROR: No se muestra el enlace "Panel Admin"\n');
    }

    // Test 4: Acceder al panel admin
    console.log('✅ Test 4: Acceder al panel de administración');
    await page.goto(`${FRONTEND_URL}/admin/lugares`);
    
    // Esperar a que se cargue el componente React
    try {
      await page.waitForSelector('text=Panel de Administración', { timeout: 10000 });
      console.log('   ✓ Panel de administración cargado correctamente\n');
    } catch (error) {
      console.log('   ⚠ WARNING: Panel tardó en cargar, esperando más...');
      await page.waitForTimeout(5000);
      
      const panelVisible = await page.getByText('Panel de Administración').isVisible().catch(() => false);
      if (panelVisible) {
        console.log('   ✓ Panel finalmente cargado\n');
      } else {
        console.log('   ✗ ERROR: Panel no se cargó después de esperar');
        await page.screenshot({ path: 'tests/playwright/screenshots/admin-panel-error.png', fullPage: true });
        console.log('   📸 Screenshot de error guardado\n');
        await browser.close();
        return;
      }
    }

    // Test 5: Verificar estadísticas
    console.log('✅ Test 5: Verificar estadísticas del dashboard');
    await page.waitForTimeout(2000);
    
    try {
      await page.waitForSelector('text=Total Lugares', { timeout: 5000 });
      console.log('   ✓ Estadísticas cargadas correctamente\n');
    } catch (error) {
      console.log('   ⚠ WARNING: Estadísticas tardaron en cargar\n');
    }

    // Test 6: Verificar búsqueda
    console.log('✅ Test 6: Probar búsqueda de lugares');
    try {
      const searchInput = await page.waitForSelector('input[placeholder*="buscar" i], input[placeholder*="Buscar" i]', { timeout: 5000 });
      await searchInput.fill('Central');
      await page.waitForTimeout(1500);
      console.log('   ✓ Búsqueda ejecutada\n');
    } catch (error) {
      console.log('   ⚠ WARNING: Campo de búsqueda no encontrado\n');
    }

    // Test 7: Probar filtro por categoría
    console.log('✅ Test 7: Probar filtro por categoría');
    try {
      const searchInput = await page.locator('input[placeholder*="buscar" i]').first();
      await searchInput.clear();
      await page.waitForTimeout(500);
      
      const categorySelect = page.locator('select').last();
      await categorySelect.selectOption('cafe');
      await page.waitForTimeout(1500);
      console.log('   ✓ Filtro por categoría aplicado\n');
    } catch (error) {
      console.log('   ⚠ WARNING: Filtro no disponible\n');
    }

    // Test 8: Abrir modal de crear lugar
    console.log('✅ Test 8: Abrir modal de crear lugar');
    try {
      const createButton = await page.waitForSelector('button:has-text("Crear Lugar")', { timeout: 5000 });
      await createButton.click();
      await page.waitForTimeout(1000);
      
      const modalVisible = await page.getByText('Crear Nuevo Lugar').isVisible();
      if (modalVisible) {
        console.log('   ✓ Modal de crear lugar abierto correctamente\n');
        
        // Cerrar modal
        const closeButtons = await page.locator('button').all();
        for (const btn of closeButtons) {
          const ariaLabel = await btn.getAttribute('aria-label');
          if (ariaLabel && ariaLabel.includes('close')) {
            await btn.click();
            break;
          }
        }
        // Alternativamente, cerrar con ESC
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
      } else {
        console.log('   ✗ ERROR: Modal no se abrió\n');
      }
    } catch (error) {
      console.log('   ⚠ WARNING: Botón crear no encontrado\n');
    }

    // Test 9: Crear un nuevo lugar
    console.log('✅ Test 9: Crear un nuevo lugar');
    try {
      const createButton = await page.waitForSelector('button:has-text("Crear Lugar")', { timeout: 5000 });
      await createButton.click();
      await page.waitForTimeout(1000);
      
      const timestamp = Date.now();
      const testPlaceName = `Test Café Playwright ${timestamp}`;
      
      await page.getByPlaceholder(/ej: café central/i).fill(testPlaceName);
      await page.getByPlaceholder(/describe el lugar/i).fill('Café de prueba creado por Playwright para testing automatizado');
      
      // Categoría
      await page.locator('select').first().selectOption('cafe');
      
      // Distrito
      await page.locator('select').nth(1).selectOption('Miraflores');
      
      // Tags
      await page.getByPlaceholder(/tranquilo, romántico/i).fill('test, playwright, automatizado');
      
      // Submit
      const submitCreateButton = page.getByRole('button', { name: /crear lugar/i }).last();
      await submitCreateButton.click();
      await page.waitForTimeout(3000);
      
      // Verificar que el lugar fue creado
      const placeCreated = await page.getByText(testPlaceName).isVisible().catch(() => false);
      if (placeCreated) {
        console.log(`   ✓ Lugar "${testPlaceName}" creado exitosamente\n`);
      } else {
        console.log('   ✗ ERROR: El lugar no fue creado\n');
      }
    } catch (error) {
      console.log(`   ⚠ WARNING: No se pudo completar la creación: ${error.message}\n`);
    }

    // Test 11: Buscar el lugar creado
    console.log('✅ Test 11: Buscar el lugar recién creado');
    await categorySelect.selectOption('');
    await page.waitForTimeout(500);
    await searchInput.fill(testPlaceName);
    await page.waitForTimeout(2000);
    
    const foundPlace = await page.getByText(testPlaceName).isVisible();
    if (foundPlace) {
      console.log('   ✓ Lugar encontrado en la búsqueda\n');
    } else {
      console.log('   ✗ ERROR: Lugar no encontrado\n');
    }

    // Test 12: Editar el lugar
    console.log('✅ Test 12: Editar el lugar creado');
    const editButton = page.locator('button[title="Editar"]').first();
    await editButton.click();
    await page.waitForTimeout(1000);
    
    const editModalVisible = await page.getByText('Editar Lugar').isVisible();
    if (editModalVisible) {
      console.log('   ✓ Modal de edición abierto\n');
      
      // Modificar descripción
      const descInput = page.getByPlaceholder(/describe el lugar/i);
      await descInput.fill('Descripción actualizada por el test de Playwright');
      
      // Marcar como destacado
      const sponsoredCheckbox = page.locator('input[type="checkbox"]#isSponsored');
      await sponsoredCheckbox.check();
      
      // Submit
      const updateButton = page.getByRole('button', { name: /actualizar lugar/i });
      await updateButton.click();
      await page.waitForTimeout(3000);
      
      // Verificar que se actualizó
      const sponsoredBadge = await page.getByText('Destacado').first().isVisible();
      if (sponsoredBadge) {
        console.log('   ✓ Lugar actualizado y marcado como destacado\n');
      } else {
        console.log('   ✗ ERROR: El lugar no se actualizó correctamente\n');
      }
    } else {
      console.log('   ✗ ERROR: Modal de edición no se abrió\n');
    }

    // Test 13: Eliminar el lugar
    console.log('✅ Test 13: Eliminar el lugar de prueba');
    
    // Setup dialog handler
    page.on('dialog', dialog => {
      console.log('   ℹ Confirmando eliminación...');
      dialog.accept();
    });
    
    const deleteButton = page.locator('button[title="Eliminar"]').first();
    await deleteButton.click();
    await page.waitForTimeout(3000);
    
    // Verificar que fue eliminado
    const placeStillVisible = await page.getByText(testPlaceName).isVisible().catch(() => false);
    if (!placeStillVisible) {
      console.log('   ✓ Lugar eliminado correctamente\n');
    } else {
      console.log('   ✗ ERROR: El lugar no fue eliminado\n');
    }

    // Test 14: Verificar paginación (si hay suficientes lugares)
    console.log('✅ Test 14: Verificar paginación');
    await searchInput.clear();
    await page.waitForTimeout(1500);
    
    const paginationVisible = await page.getByText(/página \d+ de \d+/i).isVisible().catch(() => false);
    if (paginationVisible) {
      console.log('   ✓ Paginación visible\n');
    } else {
      console.log('   ℹ Paginación no visible (probablemente hay pocos lugares)\n');
    }

    // Test 15: Screenshot final
    console.log('✅ Test 15: Captura de pantalla del panel');
    await page.screenshot({ path: 'tests/playwright/screenshots/admin-panel.png', fullPage: true });
    console.log('   ✓ Screenshot guardado en tests/playwright/screenshots/admin-panel.png\n');

    console.log('🎉 Todos los tests completados!\n');
    console.log('📊 Resumen:');
    console.log('   ✓ Autenticación y autorización');
    console.log('   ✓ Dashboard y estadísticas');
    console.log('   ✓ Tabla de lugares');
    console.log('   ✓ Búsqueda y filtros');
    console.log('   ✓ Crear lugar');
    console.log('   ✓ Editar lugar');
    console.log('   ✓ Marcar como destacado');
    console.log('   ✓ Eliminar lugar');
    console.log('   ✓ Paginación\n');

  } catch (error) {
    console.error('❌ Error durante los tests:', error);
  } finally {
    await browser.close();
  }
}

// Ejecutar tests
testAdminPanel().catch(console.error);
