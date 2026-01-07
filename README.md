# Perú In Map

Repositorio principal del proyecto de mapas y exploración en Perú.

## Estructura
- **[explora](./explora)**: Aplicación web principal (Astro + React + Tailwind).
- **[BRANDING.md](./BRANDING.md)**: Propuestas de naming y branding.

## Stack Tecnológico
- **Framework**: Astro (`explora`)
- **UI Library**: React
- **Estilos**: Tailwind CSS 4 (via Vite integration)
- **Iconos**: Tabler Icons (`@tabler/icons-react`)
- **Package Manager**: pnpm

## Convenciones de Desarrollo

### General
- **Gestor de paquetes**: Uso exclusivo de `pnpm` (`install`, `add`, `dlx`, `dev`, `build`).
- **TypeScript**: Obligatorio y en modo estricto. Evitar `any` y `unknown`.
- **Estilos**: Tailwind CSS es la única solución. Priorizar legibilidad.
- **Iconos**: `tabler-icons` con importación explícita (no barrels).
- **Sintaxis**: Preferir ESM y sintaxis moderna.

### Organización de Código
- Componentes pequeños con una sola responsabilidad.
- Preferir composición frente a configuración.
- Código compartido en `components`, `layouts`, `lib`, `utils`.
- Evitar abstracciones prematuras.

### Calidad y Testing
- **CI/CD**: Revisar `.github/workflows`.
- **Linting & Formatting**: [Biome](https://biomejs.dev/).
  - Lint: `pnpm lint`
  - Format: `pnpm format`
  - Check (ambos): `pnpm check`
- **Tests**: `pnpm test` (Vitest).
- **Requisito**: No se acepta código con errores de tipos, lint o tests fallidos.

### Commits y PRs
- Título: `[explora] Descripción clara`
- PRs pequeños y enfocados.
- Verificar con lint y test antes de subir.

## Estado del Proyecto
- [x] Inicialización del proyecto (`explora`).
- [x] Configuración de Tailwind y React.
- [ ] Definición final de nombre de marca.
- [ ] Implementación de mapa base.
