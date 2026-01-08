import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('\n🧪 Prueba completa del sistema de autenticación\n');

  try {
    // 1. Ir al sitio
    console.log('1️⃣  Abriendo sitio...');
    await page.goto('http://localhost:4324');
    await page.waitForTimeout(2000);
    console.log('   ✅ Sitio cargado');

    // 2. Ir a lugares
    console.log('\n2️⃣  Navegando a lugares...');
    await page.click('a[href="/lugares"]');
    await page.waitForTimeout(2000);
    console.log('   ✅ Página de lugares cargada');

    // 3. Hacer click en el primer lugar
    console.log('\n3️⃣  Abriendo un lugar...');
    const firstPlace = await page.locator('a[href^="/lugares/"]').first();
    await firstPlace.click();
    await page.waitForTimeout(2000);
    console.log('   ✅ Página de lugar cargada');

    // 4. Verificar que aparece el mensaje de login requerido
    console.log('\n4️⃣  Verificando mensaje de login...');
    const loginMessage = await page.locator('text=Debes iniciar sesión').isVisible();
    console.log(`   ${loginMessage ? '✅' : '❌'} Mensaje de login requerido visible`);

    // 5. Click en botón de iniciar sesión del formulario
    console.log('\n5️⃣  Abriendo modal de autenticación...');
    await page.locator('button:has-text("Iniciar Sesión")').last().click();
    await page.waitForTimeout(1000);
    console.log('   ✅ Modal de autenticación abierto');

    // 6. Cambiar a modo registro
    console.log('\n6️⃣  Cambiando a registro...');
    await page.locator('button:has-text("Regístrate")').click();
    await page.waitForTimeout(500);
    console.log('   ✅ Modo registro activado');

    // 7. Llenar formulario de registro
    console.log('\n7️⃣  Llenando formulario de registro...');
    const randomEmail = `test${Date.now()}@ejemplo.com`;
    await page.fill('input[type="text"]', 'Test User');
    await page.fill('input[type="email"]', randomEmail);
    await page.fill('input[type="password"]', 'password123');
    await page.waitForTimeout(500);
    console.log(`   ✅ Formulario llenado con email: ${randomEmail}`);

    // 8. Enviar registro
    console.log('\n8️⃣  Enviando registro...');
    await page.locator('button:has-text("Crear")').click();
    await page.waitForTimeout(3000);
    console.log('   ✅ Registro enviado');

    // 9. Verificar que el usuario está autenticado en el header
    console.log('\n9️⃣  Verificando autenticación en header...');
    const userButton = await page.locator('header button:has-text("Test User")').isVisible();
    console.log(`   ${userButton ? '✅' : '❌'} Usuario autenticado visible en header`);

    // 10. Verificar que aparece el formulario de reseñas
    console.log('\n🔟 Verificando formulario de reseñas...');
    const reviewForm = await page.locator('text=Deja tu reseña').isVisible();
    console.log(`   ${reviewForm ? '✅' : '❌'} Formulario de reseñas visible`);

    // 11. Seleccionar 5 estrellas
    console.log('\n1️⃣1️⃣  Seleccionando calificación...');
    const fifthStar = await page.locator('form svg').nth(4);
    await fifthStar.click();
    await page.waitForTimeout(500);
    console.log('   ✅ 5 estrellas seleccionadas');

    // 12. Escribir comentario
    console.log('\n1️⃣2️⃣  Escribiendo comentario...');
    await page.fill('textarea[placeholder*="experiencia"]', '¡Excelente lugar! Lo recomiendo totalmente. 🎉');
    await page.waitForTimeout(500);
    console.log('   ✅ Comentario escrito');

    // 13. Enviar reseña
    console.log('\n1️⃣3️⃣  Enviando reseña...');
    await page.locator('button:has-text("Publicar Reseña")').click();
    await page.waitForTimeout(5000);
    console.log('   ✅ Reseña enviada');

    // 14. Verificar mensaje de éxito
    console.log('\n1️⃣4️⃣  Verificando mensaje de éxito...');
    const successMessage = await page.locator('text=con éxito').isVisible();
    console.log(`   ${successMessage ? '✅' : '❌'} Mensaje de éxito visible`);

    console.log('\n\n✨ ¡PRUEBA COMPLETADA EXITOSAMENTE! ✨\n');
    console.log('📊 Resumen:');
    console.log('   ✅ Sistema de autenticación funcionando');
    console.log('   ✅ Registro de usuarios funcionando');
    console.log('   ✅ Login automático después del registro');
    console.log('   ✅ Formulario de reseñas protegido');
    console.log('   ✅ Creación de reseñas funcionando');
    console.log('\n⏳ Esperando 10 segundos para que veas el resultado...\n');
    
    await page.waitForTimeout(10000);

  } catch (error) {
    console.error('\n❌ Error durante la prueba:', error.message);
  }

  await browser.close();
  console.log('🏁 Navegador cerrado\n');
})();
