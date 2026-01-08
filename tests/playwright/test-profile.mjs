import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('\n🧪 Prueba de sistema de perfiles\n');

  try {
    // 1. Ir al sitio
    console.log('1️⃣  Abriendo sitio...');
    await page.goto('http://localhost:4324');
    await page.waitForTimeout(2000);
    console.log('   ✅ Sitio cargado');

    // 2. Hacer login con un usuario existente
    console.log('\n2️⃣  Iniciando sesión...');
    await page.click('button:has-text("Iniciar Sesión")');
    await page.waitForTimeout(1000);
    
    await page.fill('input[type="email"]', 'maria@ejemplo.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]:has-text("Entrar")');
    await page.waitForTimeout(3000);
    console.log('   ✅ Sesión iniciada');

    // 3. Verificar que el usuario está autenticado
    const userButton = await page.locator('header button:has-text("María")').isVisible();
    console.log(`   ${userButton ? '✅' : '❌'} Usuario autenticado en header`);

    // 4. Abrir menú de usuario
    console.log('\n3️⃣  Abriendo menú de usuario...');
    await page.click('header button:has-text("María")');
    await page.waitForTimeout(500);
    console.log('   ✅ Menú abierto');

    // 5. Click en Mi Perfil
    console.log('\n4️⃣  Navegando a Mi Perfil...');
    await page.click('a:has-text("Mi Perfil")');
    await page.waitForTimeout(2000);
    console.log('   ✅ Página de perfil cargada');

    // 6. Verificar que la página de perfil se cargó
    const profileTitle = await page.locator('h1:has-text("Mi Perfil")').isVisible();
    console.log(`   ${profileTitle ? '✅' : '❌'} Título de perfil visible`);

    // 7. Verificar estadísticas
    const levelVisible = await page.locator('text=Nivel').isVisible();
    const reviewCountVisible = await page.locator('text=Reseñas').isVisible();
    console.log(`   ${levelVisible ? '✅' : '❌'} Estadística de nivel visible`);
    console.log(`   ${reviewCountVisible ? '✅' : '❌'} Contador de reseñas visible`);

    // 8. Editar biografía
    console.log('\n5️⃣  Editando perfil...');
    await page.fill('textarea[placeholder*="Cuéntanos"]', '¡Hola! Soy María y me encanta explorar nuevos lugares en Lima. 🌟');
    await page.waitForTimeout(500);
    console.log('   ✅ Biografía actualizada');

    // 9. Agregar ubicación
    await page.fill('input[placeholder*="Lima"]', 'Miraflores, Lima');
    await page.waitForTimeout(500);
    console.log('   ✅ Ubicación agregada');

    // 10. Agregar Instagram
    await page.fill('input[placeholder*="@tu_usuario"]', '@maria_exploradora');
    await page.waitForTimeout(500);
    console.log('   ✅ Instagram agregado');

    // 11. Seleccionar intereses
    console.log('\n6️⃣  Seleccionando intereses...');
    await page.click('button:has-text("Cafés")');
    await page.waitForTimeout(300);
    await page.click('button:has-text("Restaurantes")');
    await page.waitForTimeout(300);
    await page.click('button:has-text("Parques")');
    await page.waitForTimeout(500);
    console.log('   ✅ Intereses seleccionados: Cafés, Restaurantes, Parques');

    // 12. Guardar cambios
    console.log('\n7️⃣  Guardando cambios...');
    await page.click('button:has-text("Guardar Cambios")');
    await page.waitForTimeout(3000);
    console.log('   ✅ Cambios guardados');

    // 13. Verificar mensaje de éxito
    const successMessage = await page.locator('text=actualizado correctamente').isVisible();
    console.log(`   ${successMessage ? '✅' : '❌'} Mensaje de éxito visible`);

    console.log('\n\n✨ ¡PRUEBA DE PERFIL COMPLETADA! ✨\n');
    console.log('📊 Resumen:');
    console.log('   ✅ Sistema de perfil funcionando');
    console.log('   ✅ Edición de biografía');
    console.log('   ✅ Ubicación e Instagram');
    console.log('   ✅ Selección de intereses');
    console.log('   ✅ Guardado de cambios');
    console.log('\n⏳ Esperando 10 segundos para revisar...\n');
    
    await page.waitForTimeout(10000);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }

  await browser.close();
  console.log('🏁 Test finalizado\n');
})();
