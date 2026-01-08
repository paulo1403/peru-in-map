# Perú In Map 🌎

Repositorio principal del proyecto de mapas y exploración en Perú.

## 📁 Estructura del Proyecto

Este es un **monorepo** que utiliza **pnpm workspaces** para gestionar las dependencias:

```
peru-in-map/
├── explora/          # 🖥️ Aplicación principal (Astro + React)
├── docs/            # 📚 Documentación
├── BRANDING.md      # 🎨 Guía de branding
├── MVP.md          # 🎯 Definición del MVP
├── PRODUCT_MANIFESTO.md  # 📋 Manifiesto del producto
└── README.md       # 📖 Este archivo
```

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Instalación

```bash
# Instalar dependencias de todos los workspaces
pnpm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
pnpm run dev

# Construir para producción
pnpm run build

# Ejecutar tests
pnpm run test

# Lint y formato
pnpm run lint
pnpm run format
```

### Comandos por Workspace

```bash
# Solo en explora/
pnpm --filter explora dev
pnpm --filter explora build
pnpm --filter explora test
```

## 🛠️ Tecnologías

- **Framework**: Astro + React
- **UI**: Tailwind CSS v4
- **Mapas**: Leaflet + React Leaflet
- **Estado**: Zustand
- **Lenguaje**: TypeScript
- **Linting/Formatting**: Biome
- **Testing**: Vitest
## 📦 Workspaces

### explora

La aplicación principal construida con Astro y React.

- **Ubicación**: `explora/`
- **Tecnologías**: Astro, React, TypeScript, Tailwind CSS, Zustand
- **Comandos**: `pnpm --filter explora <command>`

## 🤝 Contribución

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

## 📊 Estado del Proyecto

- [x] Inicialización del proyecto (`explora`)
- [x] Configuración de Tailwind CSS v4 y React
- [x] Definición final de nombre de marca (QueHacer.pe)
- [x] Implementación de mapa base con Leaflet
- [x] Sistema de internacionalización (ES/EN) con Zustand
- [x] Componentes reutilizables y theming
- [x] Optimización para móviles
- [x] Configuración de pnpm workspaces
- [ ] Despliegue y CI/CD
- [ ] Más lugares y contenido
- [ ] Funcionalidades avanzadas (PWA, etc.)
