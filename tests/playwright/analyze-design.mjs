import { chromium } from 'playwright';

async function analyzeDesign() {
  console.log('🚀 Iniciando análisis de diseño...\n');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox']
  });
  
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  // ==================== HOMEPAGE ====================
  console.log('📍 HOMEPAGE (/)');
  console.log('═'.repeat(60));
  
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Verificar elementos clave
  const heroTitle = await page.textContent('h1');
  console.log('✅ Hero Title:', heroTitle?.trim());

  const heroSubtitle = await page.textContent('p.text-xl, p.text-2xl');
  console.log('✅ Hero Subtitle:', heroSubtitle?.trim().substring(0, 80) + '...');

  // Verificar CTAs
  const ctaButtons = await page.$$('a[class*="bg-primary"]');
  console.log('✅ Botones CTA encontrados:', ctaButtons.length);

  // Verificar featured places
  const featuredPlaces = await page.$$('[href^="/lugares/"]');
  console.log('✅ Lugares destacados:', featuredPlaces.length);

  // Verificar categorías
  const categories = await page.$$('a[href*="category="]');
  console.log('✅ Categorías:', categories.length);

  // Screenshot
  await page.screenshot({ 
    path: 'screenshots/homepage-full.png', 
    fullPage: true 
  });
  console.log('📸 Screenshot completo: screenshots/homepage-full.png');

  await page.screenshot({ 
    path: 'screenshots/homepage-hero.png', 
    clip: { x: 0, y: 0, width: 1920, height: 800 }
  });
  console.log('📸 Screenshot hero: screenshots/homepage-hero.png\n');

  // ==================== LUGARES ====================
  console.log('📍 LUGARES (/lugares)');
  console.log('═'.repeat(60));
  
  await page.goto('http://localhost:4321/lugares', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Verificar header
  const pageTitle = await page.textContent('h1');
  console.log('✅ Page Title:', pageTitle?.trim());

  // Verificar filtros
  const filterButtons = await page.$$('button[class*="px-"]');
  console.log('✅ Botones de filtro:', filterButtons.length);

  // Verificar cards de lugares
  const placeCards = await page.$$('a[href^="/lugares/"][class*="group"]');
  console.log('✅ Cards de lugares:', placeCards.length);

  // Verificar ratings
  const ratings = await page.$$('svg.text-accent, svg[class*="text-accent"]');
  console.log('✅ Elementos de rating:', ratings.length);

  // Screenshot
  await page.screenshot({ 
    path: 'screenshots/lugares-full.png', 
    fullPage: true 
  });
  console.log('📸 Screenshot completo: screenshots/lugares-full.png');

  await page.screenshot({ 
    path: 'screenshots/lugares-header.png', 
    clip: { x: 0, y: 0, width: 1920, height: 400 }
  });
  console.log('📸 Screenshot header: screenshots/lugares-header.png\n');

  // ==================== ANÁLISIS DE COLORES ====================
  console.log('🎨 ANÁLISIS DE COLORES');
  console.log('═'.repeat(60));

  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  
  const primaryElements = await page.$$('[class*="bg-primary"], [class*="text-primary"]');
  console.log('✅ Elementos con color primary:', primaryElements.length);

  const accentElements = await page.$$('[class*="text-accent"]');
  console.log('✅ Elementos con color accent:', accentElements.length);

  const secondaryElements = await page.$$('[class*="text-secondary"]');
  console.log('✅ Elementos con color secondary:', secondaryElements.length);

  // ==================== RESPONSIVE ====================
  console.log('\n📱 ANÁLISIS RESPONSIVE');
  console.log('═'.repeat(60));

  // Mobile
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.screenshot({ 
    path: 'screenshots/homepage-mobile.png', 
    fullPage: true 
  });
  console.log('📸 Mobile homepage: screenshots/homepage-mobile.png');

  await page.goto('http://localhost:4321/lugares', { waitUntil: 'networkidle' });
  await page.screenshot({ 
    path: 'screenshots/lugares-mobile.png', 
    fullPage: true 
  });
  console.log('📸 Mobile lugares: screenshots/lugares-mobile.png');

  // Tablet
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.screenshot({ 
    path: 'screenshots/homepage-tablet.png', 
    fullPage: true 
  });
  console.log('📸 Tablet homepage: screenshots/homepage-tablet.png');

  await page.goto('http://localhost:4321/lugares', { waitUntil: 'networkidle' });
  await page.screenshot({ 
    path: 'screenshots/lugares-tablet.png', 
    fullPage: true 
  });
  console.log('📸 Tablet lugares: screenshots/lugares-tablet.png');

  console.log('\n✨ Análisis completado. Revisa la carpeta screenshots/');
  
  await browser.close();
}

analyzeDesign().catch(console.error);
