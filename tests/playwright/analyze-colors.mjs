import { chromium } from 'playwright';

async function analyzeColors() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  console.log('🎨 ANÁLISIS DETALLADO DE COLORES\n');
  console.log('═'.repeat(70));

  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

  // Analizar colores del hero title
  const heroTitle = await page.$('h1');
  if (heroTitle) {
    const color = await heroTitle.evaluate(el => window.getComputedStyle(el).color);
    const bgColor = await heroTitle.evaluate(el => window.getComputedStyle(el).backgroundColor);
    console.log('\n📍 HERO TITLE (h1)');
    console.log('   Color:', color);
    console.log('   Background:', bgColor);
  }

  // Analizar span con clase primary
  const primarySpan = await page.$('h1 span.text-primary, h1 span[class*="text-primary"]');
  if (primarySpan) {
    const color = await primarySpan.evaluate(el => window.getComputedStyle(el).color);
    console.log('\n📍 SPAN PRIMARY (h1 span)');
    console.log('   Color:', color);
  }

  // Analizar botón CTA
  const ctaButton = await page.$('a.bg-primary, a[class*="bg-primary"]');
  if (ctaButton) {
    const color = await ctaButton.evaluate(el => window.getComputedStyle(el).color);
    const bgColor = await ctaButton.evaluate(el => window.getComputedStyle(el).backgroundColor);
    const text = await ctaButton.textContent();
    console.log('\n📍 BOTÓN CTA PRIMARY');
    console.log('   Texto:', text?.trim());
    console.log('   Color texto:', color);
    console.log('   Background:', bgColor);
  }

  // Analizar texto secundario
  const secondaryText = await page.$('p.text-secondary, p[class*="text-secondary"]');
  if (secondaryText) {
    const color = await secondaryText.evaluate(el => window.getComputedStyle(el).color);
    console.log('\n📍 TEXTO SECONDARY');
    console.log('   Color:', color);
  }

  // Analizar badges
  const badge = await page.$('[class*="bg-primary/10"]');
  if (badge) {
    const color = await badge.evaluate(el => window.getComputedStyle(el).color);
    const bgColor = await badge.evaluate(el => window.getComputedStyle(el).backgroundColor);
    console.log('\n📍 BADGE');
    console.log('   Color texto:', color);
    console.log('   Background:', bgColor);
  }

  // Ir a lugares
  await page.goto('http://localhost:4321/lugares', { waitUntil: 'networkidle' });

  // Analizar cards
  const card = await page.$('a[class*="group"][class*="bg-white"]');
  if (card) {
    const bgColor = await card.evaluate(el => window.getComputedStyle(el).backgroundColor);
    const borderColor = await card.evaluate(el => window.getComputedStyle(el).borderColor);
    console.log('\n📍 CARD DE LUGAR');
    console.log('   Background:', bgColor);
    console.log('   Border:', borderColor);
  }

  // Analizar título de card
  const cardTitle = await card?.$('h3');
  if (cardTitle) {
    const color = await cardTitle.evaluate(el => window.getComputedStyle(el).color);
    console.log('\n📍 TÍTULO DE CARD (h3)');
    console.log('   Color:', color);
  }

  // Analizar rating star
  const star = await page.$('svg.text-accent, svg[class*="text-accent"]');
  if (star) {
    const color = await star.evaluate(el => window.getComputedStyle(el).color);
    const fill = await star.evaluate(el => window.getComputedStyle(el).fill);
    console.log('\n📍 ESTRELLA DE RATING');
    console.log('   Color:', color);
    console.log('   Fill:', fill);
  }

  // Analizar variables CSS
  console.log('\n═'.repeat(70));
  console.log('🎨 VARIABLES CSS DEFINIDAS\n');
  
  const cssVars = await page.evaluate(() => {
    const root = document.documentElement;
    const styles = window.getComputedStyle(root);
    return {
      primary: styles.getPropertyValue('--color-primary'),
      secondary: styles.getPropertyValue('--color-secondary'),
      accent: styles.getPropertyValue('--color-accent'),
      text: styles.getPropertyValue('--color-text-primary'),
      textSecondary: styles.getPropertyValue('--color-text-secondary'),
      background: styles.getPropertyValue('--color-background'),
      border: styles.getPropertyValue('--color-border'),
    };
  });

  console.log('   --color-primary:', cssVars.primary || 'NO DEFINIDA');
  console.log('   --color-secondary:', cssVars.secondary || 'NO DEFINIDA');
  console.log('   --color-accent:', cssVars.accent || 'NO DEFINIDA');
  console.log('   --color-text-primary:', cssVars.text || 'NO DEFINIDA');
  console.log('   --color-text-secondary:', cssVars.textSecondary || 'NO DEFINIDA');
  console.log('   --color-background:', cssVars.background || 'NO DEFINIDA');
  console.log('   --color-border:', cssVars.border || 'NO DEFINIDA');

  // Verificar si Tailwind está cargando las clases correctamente
  console.log('\n═'.repeat(70));
  console.log('🔍 VERIFICACIÓN DE CLASES TAILWIND\n');

  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

  const testElement = await page.$('[class*="text-primary"]');
  if (testElement) {
    const classes = await testElement.evaluate(el => el.className);
    const computedColor = await testElement.evaluate(el => window.getComputedStyle(el).color);
    console.log('   Elemento con text-primary encontrado');
    console.log('   Clases:', classes);
    console.log('   Color computado:', computedColor);
  }

  console.log('\n✨ Análisis completado\n');

  await browser.close();
}

analyzeColors().catch(console.error);
