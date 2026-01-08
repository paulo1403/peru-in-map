import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('🔍 Verificando sistema de autenticación...\n');

  // 1. Ir a homepage
  await page.goto('http://localhost:4321');
  await page.waitForTimeout(1000);
  console.log('✅ Homepage cargada');

  // 2. Verificar botón de login en header
  const loginButton = await page.locator('header button:has-text("Iniciar Sesión")').first();
  const loginButtonVisible = await loginButton.isVisible();
  console.log(`${loginButtonVisible ? '✅' : '❌'} Botón de login visible en header`);

  // 3. Ir a una página de lugar
  await page.goto('http://localhost:4321/lugares');
  await page.waitForTimeout(1000);
  
  const firstPlace = await page.locator('a[href^="/lugares/"]').first();
  await firstPlace.click();
  await page.waitForTimeout(1000);
  console.log('✅ Página de lugar cargada');

  // 4. Verificar sección de reseñas
  const reviewSection = await page.locator('text=Reseñas').first();
  const reviewSectionVisible = await reviewSection.isVisible();
  console.log(`${reviewSectionVisible ? '✅' : '❌'} Sección de reseñas visible`);

  // 5. Verificar mensaje de login requerido
  const loginRequiredMsg = await page.locator('text=Debes iniciar sesión para dejar una reseña').first();
  const loginRequiredVisible = await loginRequiredMsg.isVisible();
  console.log(`${loginRequiredVisible ? '✅' : '❌'} Mensaje de login requerido visible`);

  // 6. Click en botón de iniciar sesión del formulario
  const reviewLoginButton = await page.locator('button:has-text("Iniciar Sesión")').last();
  await reviewLoginButton.click();
  await page.waitForTimeout(1000);
  console.log('✅ Click en botón de login del formulario de reseñas');

  // 7. Verificar que el modal de autenticación se abre
  const authModal = await page.locator('text=¿Ya tienes una cuenta?').first();
  const authModalVisible = await authModal.isVisible();
  console.log(`${authModalVisible ? '✅' : '❌'} Modal de autenticación abierto`);

  // 8. Cambiar a modo de registro
  const registerLink = await page.locator('button:has-text("Regístrate aquí")').first();
  await registerLink.click();
  await page.waitForTimeout(500);
  console.log('✅ Cambiado a modo de registro');

  // 9. Verificar campos de registro
  const nameField = await page.locator('input[placeholder="Juan Pérez"]').first();
  const nameFieldVisible = await nameField.isVisible();
  console.log(`${nameFieldVisible ? '✅' : '❌'} Campo de nombre visible en registro`);

  // 10. Registrar usuario de prueba
  await page.fill('input[placeholder="Juan Pérez"]', 'Usuario Test');
  await page.fill('input[type="email"]', 'test@ejemplo.com');
  await page.fill('input[type="password"]', 'password123');
  await page.waitForTimeout(500);
  
  const registerButton = await page.locator('button:has-text("Crear Cuenta")').first();
  await registerButton.click();
  await page.waitForTimeout(1500);
  console.log('✅ Formulario de registro enviado');

  // 11. Verificar que el usuario está autenticado
  const userButton = await page.locator('header button:has-text("Usuario Test")').first();
  const userButtonVisible = await userButton.isVisible();
  console.log(`${userButtonVisible ? '✅' : '❌'} Usuario autenticado visible en header`);

  // 12. Verificar que el formulario de reseñas ahora está disponible
  const reviewForm = await page.locator('text=Deja tu reseña').first();
  const reviewFormVisible = await reviewForm.isVisible();
  console.log(`${reviewFormVisible ? '✅' : '❌'} Formulario de reseñas visible después del login`);

  // 13. Verificar estrellas de rating
  const stars = await page.locator('button svg[class*="text-"]').count();
  console.log(`${stars >= 5 ? '✅' : '❌'} Sistema de rating con estrellas (${stars} estrellas encontradas)`);

  // 14. Seleccionar rating de 5 estrellas
  const fifthStar = await page.locator('form svg').nth(4);
  await fifthStar.click();
  await page.waitForTimeout(500);
  console.log('✅ Rating de 5 estrellas seleccionado');

  // 15. Escribir comentario
  await page.fill('textarea[placeholder*="experiencia"]', 'Excelente lugar, muy recomendado!');
  await page.waitForTimeout(500);
  console.log('✅ Comentario escrito');

  // 16. Enviar reseña
  const submitButton = await page.locator('button:has-text("Publicar Reseña")').first();
  await submitButton.click();
  await page.waitForTimeout(3000);
  console.log('✅ Reseña enviada');

  // 17. Verificar mensaje de éxito
  const successMsg = await page.locator('text=publicada con éxito').first();
  const successMsgVisible = await successMsg.isVisible();
  console.log(`${successMsgVisible ? '✅' : '❌'} Mensaje de éxito visible`);

  // 18. Verificar menú de usuario
  await page.locator('header button:has-text("Usuario Test")').first().click();
  await page.waitForTimeout(500);
  const logoutButton = await page.locator('button:has-text("Cerrar Sesión")').first();
  const logoutButtonVisible = await logoutButton.isVisible();
  console.log(`${logoutButtonVisible ? '✅' : '❌'} Menú de usuario con opción de logout`);

  console.log('\n✨ Verificación completada!\n');
  console.log('Esperando 10 segundos para que puedas ver el resultado...');
  await page.waitForTimeout(10000);

  await browser.close();
})();
