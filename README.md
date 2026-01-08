# QueHacer.pe 🌎

Plataforma para descubrir lugares locales en Perú a través de mapas interactivos.

## 📁 Estructura del Proyecto

Este es un **monorepo** que utiliza **pnpm workspaces** para gestionar las dependencias:

```
quehacer-pe/
├── apps/
│   ├── frontend/          # 🖥️ Aplicación web (Astro + React)
│   └── backend/           # 🚀 API (Hono + Node.js)
├── packages/
│   └── shared/            # 📦 Utilidades y tipos compartidos
├── docs/                  # 📚 Documentación
├── BRANDING.md           # 🎨 Guía de branding
├── MVP.md               # 🎯 Definición del MVP
├── PRODUCT_MANIFESTO.md # 📋 Manifiesto del producto
└── README.md            # 📖 Este archivo
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
# Iniciar solo frontend
pnpm run dev

# Iniciar solo backend
pnpm run dev:backend

# Iniciar ambos en paralelo
pnpm run dev:full

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
# Frontend
pnpm --filter frontend dev
pnpm --filter frontend build
pnpm --filter frontend test

# Backend
pnpm --filter backend dev
pnpm --filter backend db:generate
pnpm --filter backend db:push
```

## 🛠️ Tecnologías

### Frontend (`apps/frontend`)
- **Framework**: Astro + React
- **UI**: Tailwind CSS v4
- **Mapas**: Leaflet + React Leaflet
- **Estado**: Zustand
- **Lenguaje**: TypeScript

### Backend (`apps/backend`)
- **Framework**: Hono (Node.js)
- **Base de datos**: PostgreSQL + Prisma
- **Validación**: Zod
- **Lenguaje**: TypeScript

### Shared (`packages/shared`)
- **Tipos**: TypeScript interfaces
- **Utilidades**: Funciones compartidas

## 📦 Workspaces

### apps/frontend

Aplicación web principal construida con Astro.

- **Ubicación**: `apps/frontend/`
- **Tecnologías**: Astro, React, TypeScript, Tailwind CSS, Zustand
- **Comandos**: `pnpm --filter frontend <command>`

### apps/backend

API REST construida con Hono.

- **Ubicación**: `apps/backend/`
- **Tecnologías**: Hono, Node.js, TypeScript, Prisma, PostgreSQL
- **Comandos**: `pnpm --filter backend <command>`

### packages/shared

Utilidades y tipos compartidos.

- **Ubicación**: `packages/shared/`
- **Tecnologías**: TypeScript
- **Comandos**: `pnpm --filter shared <command>`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

QueHacer.pe - [contacto@quehacer.pe](mailto:contacto@quehacer.pe)
