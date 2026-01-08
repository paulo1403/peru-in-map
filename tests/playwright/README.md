# Playwright Tests

Scripts de prueba y análisis usando Playwright para verificar el diseño y funcionalidad de la aplicación.

## Scripts disponibles

- **analyze-colors.mjs** - Analiza los colores computados en las páginas
- **analyze-design.mjs** - Análisis completo del diseño con screenshots en diferentes resoluciones
- **check-design.mjs** - Verifica que no haya errores en el diseño
- **test-dropdown.mjs** - Prueba el funcionamiento del dropdown de idiomas
- **test-playwright.mjs** - Test simple de Playwright
- **test-translations.mjs** - Verifica que las traducciones funcionen correctamente
- **verify-fix.mjs** - Verifica correcciones de colores

## Uso

```bash
# Asegúrate de que el frontend esté corriendo
pnpm dev

# Ejecuta cualquier script
node tests/playwright/nombre-del-script.mjs
```

## Requisitos

- Playwright instalado: `pnpm add -D -w playwright`
- Navegadores instalados: `npx playwright install chromium`
- Frontend corriendo en http://localhost:4321
