# QueHacer.pe Backend

Backend API para la plataforma QueHacer.pe - Descubre lugares locales en Perú.

## 🚀 Inicio Rápido

1. **Instalar dependencias:**
```bash
pnpm install
```

2. **Configurar entorno:**
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

3. **Configurar base de datos (opcional para desarrollo):**
```sql
CREATE DATABASE quehacer_pe;
CREATE EXTENSION postgis;
```

4. **Generar cliente Prisma:**
```bash
pnpm db:generate
```

5. **Iniciar servidor:**
```bash
pnpm dev
```

## 📋 Requisitos

- Node.js 18+
- PostgreSQL 13+ con PostGIS (para producción)
- pnpm

## 🏗️ Stack Tecnológico

- **Runtime**: Node.js + TypeScript
- **Framework**: Hono (HTTP)
- **Base de datos**: PostgreSQL + Prisma ORM + PostGIS
- **Validación**: Zod
- **Logging**: Pino

## API Endpoints

### Lugares

- `GET /api/places` - Listar lugares con filtros y paginación
- `GET /api/places/:id` - Obtener lugar por ID
- `GET /api/places/nearby?lat=...&lng=...&radius=...` - Lugares cercanos
- `POST /api/places/:id/reviews` - Crear reseña
- `GET /api/places/:id/reviews` - Obtener reseñas de un lugar

### Admin

- `POST /api/admin/places` - Crear lugar
- `PUT /api/admin/places/:id` - Actualizar lugar
- `DELETE /api/admin/places/:id` - Eliminar lugar
- `POST /api/admin/places/:id/feature` - Marcar como destacado

## Testing

```bash
pnpm test
```

## Estructura del Proyecto

```
src/
├── app.ts              # Configuración principal de Hono
├── server.ts           # Servidor HTTP
├── routes/             # Definición de rutas API
│   ├── places.ts
│   └── admin.ts
├── services/           # Lógica de negocio
│   ├── place.service.ts
│   └── review.service.ts
├── lib/                # Utilidades
│   ├── db.ts
│   └── logger.ts
├── schemas/            # Validación con Zod
│   ├── place.schema.ts
│   └── review.schema.ts
└── config/
    └── env.ts          # Validación de variables de entorno
```

## Base de Datos

El esquema incluye:

- **Places**: Lugares con información geográfica (PostGIS)
- **Reviews**: Reseñas y calificaciones
- **Categorías**: Tipos de lugares (cafés, restaurantes, etc.)

## Monorepo

Este backend forma parte de un monorepo que incluye:

- `packages/shared`: Tipos e interfaces compartidas
- `apps/frontend`: Aplicación frontend (Astro + React)
- `apps/backend`: API backend (este proyecto)