Perfecto, vamos a bajarlo a **backlog accionable** y luego te doy una **recomendación técnica realista**, pensando en MVP, escalabilidad y que no te estorbe en 3–6 meses.

---

# 📋 Backlog de Features (priorizado para MVP)

Voy a usar **épicas → features → criterios de “listo”**, para que puedas avanzar incrementalmente.

---

## 🧱 ÉPICA 1 – Base del producto (indispensable)

### 1.1 Lugares (core absoluto)

**Feature**

* Crear y listar lugares (comerciales y no comerciales)

**Incluye**

* Nombre
* Tipo (restaurante, parque, calle, etc.)
* Categoría
* Distrito / ciudad
* Descripción corta
* Ubicación (lat/lng)
* Tags simples (tranquilo, barato, romántico)

**Listo cuando**

* Un lugar se puede crear desde admin
* Aparece en un listado público
* Se puede filtrar por tipo y distrito

---

### 1.2 Descubrimiento sin mapa

**Feature**

* Listado principal de lugares

**Incluye**

* Búsqueda por texto
* Filtros básicos
* Orden por relevancia

**Listo cuando**

* El mapa no es necesario para descubrir lugares
* El usuario puede decidir solo con el listado

---

## ⭐ ÉPICA 2 – Confianza y comunidad

### 2.1 Ratings

**Feature**

* Puntuación por estrellas (1–5)

**Reglas**

* Un rating por usuario
* Promedio visible
* No editable infinitamente

**Listo cuando**

* Se muestra rating confiable
* No se puede manipular fácilmente

---

### 2.2 Comentarios

**Feature**

* Comentarios por lugar

**Incluye**

* Texto corto
* Fecha
* Moderación desde admin

**Listo cuando**

* Los comentarios aportan contexto real
* El admin puede ocultarlos

---

## 🗺️ ÉPICA 3 – Contexto visual (complemento)

### 3.1 Mapa

**Feature**

* Visualización de lugares en mapa

**Incluye**

* Pin por lugar
* Filtro sincronizado con listado
* Vista opcional

**Listo cuando**

* El mapa suma, no estorba
* No es obligatorio usarlo

---

### 3.2 Cercanía

**Feature**

* Ver lugares cerca del usuario

**Incluye**

* Permiso de ubicación
* Radio configurable

**Listo cuando**

* El usuario puede decir “qué hay cerca”

---

## ❤️ ÉPICA 4 – Retención

### 4.1 Guardar lugares

**Feature**

* Favoritos

**Listo cuando**

* El usuario vuelve por sus guardados

---

### 4.2 Planes (v1)

**Feature**

* Colecciones curadas de lugares

**Ejemplos**

* Plan tranquilo
* Plan romántico
* Plan gratis

**Listo cuando**

* Un plan ayuda a decidir rápido

---

## 🛠️ ÉPICA 5 – Panel Admin (clave)

### 5.1 Gestión de lugares

* Crear / editar / desactivar lugares

### 5.2 Moderación

* Aprobar comentarios
* Editar categorías

### 5.3 Destacados manuales

* Marcar lugares como “destacado”

**Listo cuando**

* El negocio puede operar sin devs

---

## 💰 ÉPICA 6 – Monetización inicial

### 6.1 Lugares destacados

**Feature**

* Destacar lugares por distrito o categoría

**Reglas**

* Cupos limitados
* Visualmente claro

---

### 6.2 Planes patrocinados

**Feature**

* Lugares pagos dentro de planes

**Regla**

* El plan no se vende, se curan lugares

---

## 👤 ÉPICA 7 – Usuario Plus (post-MVP)

### 7.1 Recomendaciones

* Basadas en guardados y uso

### 7.2 Alertas

* Lugares cercanos o poco concurridos

---

# 🧠 Recomendación Tecnológica (opinión honesta)

### Frontend

**Astro (SSG + islands)**

* SEO excelente
* Rápido
* Ideal para contenido y discovery
* Perfecto para ciudades y lugares

👉 Mejor que Vite puro para este caso.

---

### Backend

Aquí va lo importante 👇

#### ❌ Vite + Bun (ahora no)

Bun es interesante, pero:

* Ecosistema aún verde
* Riesgo innecesario para MVP
* Hosting más limitado

Para experimentar: sí
Para negocio: todavía no

---

### ✅ Stack recomendado (pragmático)

#### Backend API

**Node.js + TypeScript**

* Framework: **Hono** o **Fastify**
* REST simple (no GraphQL al inicio)

#### Base de datos

**PostgreSQL**

* Con PostGIS (cuando escales mapas)
* Prisma como ORM

#### Auth (cuando toque)

* Email magic link
* O auth simple al inicio

---

### Admin

* Puede vivir dentro del mismo proyecto
* Rutas protegidas
* UI simple

---

### Infraestructura (simple)

* Frontend: Vercel / Netlify
* Backend: Fly.io / Railway
* DB: Supabase o Railway

---

## 🔑 Regla técnica del MVP

> Si una tecnología no mejora discovery, velocidad o confianza, no entra.

---


