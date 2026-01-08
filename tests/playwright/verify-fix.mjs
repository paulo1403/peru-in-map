import('playwright').then(async ({chromium}) => { 
  const b = await chromium.launch({headless: true}); 
  const p = await b.newPage(); 
  await p.goto('http://localhost:4321/'); 
  await p.waitForTimeout(2000);
  
  const secondary = await p.$('p.text-secondary');
  const color = await secondary?.evaluate(el => window.getComputedStyle(el).color);
  
  console.log('✅ Color text-secondary:', color);
  console.log('   Esperado: rgb(107, 114, 128) = #6B7280');
  
  await p.screenshot({path: 'homepage-fixed.png', fullPage: true});
  await p.goto('http://localhost:4321/lugares');
  await p.screenshot({path: 'lugares-fixed.png', fullPage: true});
  
  await b.close(); 
  console.log('\n📸 Screenshots actualizados guardados!');
});