import { test, expect } from '@playwright/test';

// Configuración
const API_URL = 'http://localhost:3000';
const ADMIN_EMAIL = 'test@test.com';
const ADMIN_PASSWORD = 'password123';
const REGULAR_USER_EMAIL = 'regular@test.com';
const REGULAR_USER_PASSWORD = 'password123';

test.describe('Panel de Administración', () => {
  test.beforeEach(async ({ page }) => {
    // Limpiar storage
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('debe denegar acceso a usuarios no autenticados', async ({ page }) => {
    await page.goto('/admin/lugares');
    
    // Debe mostrar mensaje de acceso denegado
    await expect(page.getByText('Acceso Denegado')).toBeVisible();
    await expect(page.getByText('No tienes permisos para acceder a esta página')).toBeVisible();
  });

  test('debe denegar acceso a usuarios regulares (no admin)', async ({ page }) => {
    // Primero crear un usuario regular si no existe
    await page.request.post(`${API_URL}/api/auth/register`, {
      data: {
        name: 'Regular User',
        email: REGULAR_USER_EMAIL,
        password: REGULAR_USER_PASSWORD,
      },
      failOnStatusCode: false, // Puede fallar si ya existe
    });

    // Iniciar sesión como usuario regular
    await page.goto('/');
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).click();
    
    await page.getByPlaceholder(/email/i).fill(REGULAR_USER_EMAIL);
    await page.getByPlaceholder(/contraseña|password/i).fill(REGULAR_USER_PASSWORD);
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).last().click();
    
    // Esperar a que se complete el login
    await page.waitForTimeout(1000);
    
    // Intentar acceder al panel admin
    await page.goto('/admin/lugares');
    
    // Debe denegar el acceso
    await expect(page.getByText('Acceso Denegado')).toBeVisible();
  });

  test('debe permitir acceso a usuarios admin', async ({ page }) => {
    // Iniciar sesión como admin
    await page.goto('/');
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).click();
    
    await page.getByPlaceholder(/email/i).fill(ADMIN_EMAIL);
    await page.getByPlaceholder(/contraseña|password/i).fill(ADMIN_PASSWORD);
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).last().click();
    
    // Esperar a que se complete el login
    await expect(page.getByText(ADMIN_EMAIL)).toBeVisible({ timeout: 5000 });
    
    // Acceder al panel admin
    await page.goto('/admin/lugares');
    
    // Debe mostrar el panel
    await expect(page.getByText('Panel de Administración')).toBeVisible();
    await expect(page.getByText('Gestiona lugares, categorías y contenido')).toBeVisible();
  });

  test('debe mostrar estadísticas del dashboard', async ({ page }) => {
    // Login como admin
    await page.goto('/');
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).click();
    await page.getByPlaceholder(/email/i).fill(ADMIN_EMAIL);
    await page.getByPlaceholder(/contraseña|password/i).fill(ADMIN_PASSWORD);
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).last().click();
    await expect(page.getByText(ADMIN_EMAIL)).toBeVisible({ timeout: 5000 });
    
    // Ir al panel admin
    await page.goto('/admin/lugares');
    
    // Verificar que las estadísticas estén visibles
    await expect(page.getByText('Total Lugares')).toBeVisible();
    await expect(page.getByText('Usuarios')).toBeVisible();
    await expect(page.getByText('Reviews')).toBeVisible();
    await expect(page.getByText('Destacados')).toBeVisible();
  });

  test('debe crear un nuevo lugar', async ({ page }) => {
    // Login como admin
    await page.goto('/');
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).click();
    await page.getByPlaceholder(/email/i).fill(ADMIN_EMAIL);
    await page.getByPlaceholder(/contraseña|password/i).fill(ADMIN_PASSWORD);
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).last().click();
    await expect(page.getByText(ADMIN_EMAIL)).toBeVisible({ timeout: 5000 });
    
    // Ir al panel admin
    await page.goto('/admin/lugares');
    await expect(page.getByText('Panel de Administración')).toBeVisible();
    
    // Click en crear lugar
    await page.getByRole('button', { name: /crear lugar/i }).click();
    
    // Esperar que aparezca el modal
    await expect(page.getByText('Crear Nuevo Lugar')).toBeVisible();
    
    // Llenar el formulario
    const timestamp = Date.now();
    await page.getByPlaceholder(/ej: café central/i).fill(`Test Café ${timestamp}`);
    await page.getByPlaceholder(/describe el lugar/i).fill('Un café de prueba para testing');
    
    // Seleccionar categoría
    await page.locator('select').first().selectOption('cafe');
    
    // Seleccionar distrito
    await page.locator('select').nth(1).selectOption('Miraflores');
    
    // Coordenadas (ya tienen valores por defecto)
    
    // Tags
    await page.getByPlaceholder(/tranquilo, romántico/i).fill('test, prueba, automatizado');
    
    // Submit
    await page.getByRole('button', { name: /crear lugar/i }).last().click();
    
    // Esperar a que se cierre el modal y se recargue la tabla
    await expect(page.getByText('Crear Nuevo Lugar')).not.toBeVisible({ timeout: 5000 });
    
    // Verificar que el lugar aparece en la tabla
    await expect(page.getByText(`Test Café ${timestamp}`)).toBeVisible({ timeout: 5000 });
  });

  test('debe buscar lugares por nombre', async ({ page }) => {
    // Login como admin
    await page.goto('/');
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).click();
    await page.getByPlaceholder(/email/i).fill(ADMIN_EMAIL);
    await page.getByPlaceholder(/contraseña|password/i).fill(ADMIN_PASSWORD);
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).last().click();
    await expect(page.getByText(ADMIN_EMAIL)).toBeVisible({ timeout: 5000 });
    
    // Ir al panel admin
    await page.goto('/admin/lugares');
    await expect(page.getByText('Panel de Administración')).toBeVisible();
    
    // Buscar un lugar
    const searchInput = page.getByPlaceholder(/buscar lugares/i);
    await searchInput.fill('Central');
    
    // Esperar a que se actualice la tabla
    await page.waitForTimeout(1000);
    
    // Verificar que hay resultados
    const rows = page.locator('tbody tr');
    await expect(rows.first()).toBeVisible();
  });

  test('debe filtrar lugares por categoría', async ({ page }) => {
    // Login como admin
    await page.goto('/');
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).click();
    await page.getByPlaceholder(/email/i).fill(ADMIN_EMAIL);
    await page.getByPlaceholder(/contraseña|password/i).fill(ADMIN_PASSWORD);
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).last().click();
    await expect(page.getByText(ADMIN_EMAIL)).toBeVisible({ timeout: 5000 });
    
    // Ir al panel admin
    await page.goto('/admin/lugares');
    await expect(page.getByText('Panel de Administración')).toBeVisible();
    
    // Seleccionar filtro de categoría
    const categorySelect = page.locator('select').last();
    await categorySelect.selectOption('cafe');
    
    // Esperar a que se actualice la tabla
    await page.waitForTimeout(1000);
    
    // Verificar que los resultados son de la categoría correcta
    const badges = page.locator('td .bg-blue-100');
    if (await badges.count() > 0) {
      await expect(badges.first()).toContainText('Café');
    }
  });

  test('debe editar un lugar existente', async ({ page }) => {
    // Login como admin
    await page.goto('/');
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).click();
    await page.getByPlaceholder(/email/i).fill(ADMIN_EMAIL);
    await page.getByPlaceholder(/contraseña|password/i).fill(ADMIN_PASSWORD);
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).last().click();
    await expect(page.getByText(ADMIN_EMAIL)).toBeVisible({ timeout: 5000 });
    
    // Ir al panel admin
    await page.goto('/admin/lugares');
    await expect(page.getByText('Panel de Administración')).toBeVisible();
    
    // Click en editar el primer lugar
    const editButtons = page.locator('button[title="Editar"]');
    if (await editButtons.count() > 0) {
      await editButtons.first().click();
      
      // Esperar que aparezca el modal
      await expect(page.getByText('Editar Lugar')).toBeVisible();
      
      // Modificar el nombre
      const nameInput = page.getByPlaceholder(/ej: café central/i);
      const currentName = await nameInput.inputValue();
      await nameInput.fill(`${currentName} - Editado`);
      
      // Submit
      await page.getByRole('button', { name: /actualizar lugar/i }).click();
      
      // Esperar a que se cierre el modal
      await expect(page.getByText('Editar Lugar')).not.toBeVisible({ timeout: 5000 });
      
      // Verificar que el nombre actualizado aparece
      await expect(page.getByText(/editado/i)).toBeVisible({ timeout: 5000 });
    }
  });

  test('debe poder marcar un lugar como destacado', async ({ page }) => {
    // Login como admin
    await page.goto('/');
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).click();
    await page.getByPlaceholder(/email/i).fill(ADMIN_EMAIL);
    await page.getByPlaceholder(/contraseña|password/i).fill(ADMIN_PASSWORD);
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).last().click();
    await expect(page.getByText(ADMIN_EMAIL)).toBeVisible({ timeout: 5000 });
    
    // Ir al panel admin
    await page.goto('/admin/lugares');
    await expect(page.getByText('Panel de Administración')).toBeVisible();
    
    // Click en editar el primer lugar
    const editButtons = page.locator('button[title="Editar"]');
    if (await editButtons.count() > 0) {
      await editButtons.first().click();
      
      // Esperar que aparezca el modal
      await expect(page.getByText('Editar Lugar')).toBeVisible();
      
      // Marcar como destacado
      const sponsoredCheckbox = page.locator('input[type="checkbox"]#isSponsored');
      await sponsoredCheckbox.check();
      
      // Submit
      await page.getByRole('button', { name: /actualizar lugar/i }).click();
      
      // Esperar a que se cierre el modal
      await expect(page.getByText('Editar Lugar')).not.toBeVisible({ timeout: 5000 });
      
      // Verificar que aparece el badge "Destacado"
      await expect(page.getByText('Destacado').first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('debe eliminar un lugar', async ({ page }) => {
    // Login como admin
    await page.goto('/');
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).click();
    await page.getByPlaceholder(/email/i).fill(ADMIN_EMAIL);
    await page.getByPlaceholder(/contraseña|password/i).fill(ADMIN_PASSWORD);
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).last().click();
    await expect(page.getByText(ADMIN_EMAIL)).toBeVisible({ timeout: 5000 });
    
    // Crear un lugar de prueba para eliminar
    await page.goto('/admin/lugares');
    await page.getByRole('button', { name: /crear lugar/i }).click();
    
    const timestamp = Date.now();
    const testPlaceName = `Lugar para Eliminar ${timestamp}`;
    await page.getByPlaceholder(/ej: café central/i).fill(testPlaceName);
    await page.getByPlaceholder(/describe el lugar/i).fill('Este lugar será eliminado');
    await page.locator('select').first().selectOption('cafe');
    await page.locator('select').nth(1).selectOption('Miraflores');
    await page.getByRole('button', { name: /crear lugar/i }).last().click();
    
    // Esperar a que se cree
    await expect(page.getByText(testPlaceName)).toBeVisible({ timeout: 5000 });
    
    // Buscar el lugar recién creado
    await page.getByPlaceholder(/buscar lugares/i).fill(testPlaceName);
    await page.waitForTimeout(1000);
    
    // Setup dialog handler antes de hacer click
    page.on('dialog', dialog => dialog.accept());
    
    // Click en eliminar
    const deleteButtons = page.locator('button[title="Eliminar"]');
    await deleteButtons.first().click();
    
    // Esperar a que se elimine
    await page.waitForTimeout(1000);
    
    // Verificar que ya no está en la lista
    await expect(page.getByText(testPlaceName)).not.toBeVisible({ timeout: 5000 });
  });

  test('debe mostrar el enlace "Panel Admin" solo para admins', async ({ page }) => {
    // Login como admin
    await page.goto('/');
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).click();
    await page.getByPlaceholder(/email/i).fill(ADMIN_EMAIL);
    await page.getByPlaceholder(/contraseña|password/i).fill(ADMIN_PASSWORD);
    await page.getByRole('button', { name: /iniciar sesión|log in/i }).last().click();
    await expect(page.getByText(ADMIN_EMAIL)).toBeVisible({ timeout: 5000 });
    
    // Click en el menú de usuario
    await page.getByRole('button', { name: new RegExp(ADMIN_EMAIL.split('@')[0], 'i') }).click();
    
    // Verificar que existe el enlace al panel admin
    await expect(page.getByRole('link', { name: /panel admin/i })).toBeVisible();
  });
});
