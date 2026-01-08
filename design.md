# 🎨 Branding, Paleta de Colores y Lineamientos de Producto  
**Proyecto:** quehacer.pe

Este documento define la identidad visual, criterios de diseño y decisiones transversales que deben mantenerse tanto en web como en app, considerando escalabilidad, i18n y consistencia de estado.

---

## 🧭 Identidad de marca

### Nombre
**quehacer.pe**

### Personalidad
- Cercana
- Urbana
- Confiable
- Local, pero moderna
- Útil antes que aspiracional

No es una marca “cool forzada”, es una marca **que te ayuda a decidir**.

---

## 🎯 Principios visuales

- Claridad sobre decoración
- Información primero
- Diseño limpio y ligero
- Enfoque en contenido y decisiones
- Visualmente neutro para no competir con fotos

---

## 🎨 Paleta de colores (propuesta)

### Color principal – Acción y orientación
**Indigo urbano**
- `#4F46E5`
- Uso: CTAs, enlaces, estados activos, destacados sutiles

Transmite:
- Confianza
- Tecnología
- Dirección

---

### Color secundario – Contexto local
**Verde urbano**
- `#16A34A`
- Uso: etiquetas, estados positivos, lugares gratuitos, parques

Transmite:
- Espacios abiertos
- Tranquilidad
- Accesibilidad

---

### Acento – Descubrimiento
**Amber suave**
- `#F59E0B`
- Uso: ratings, estrellas, micro-destacados

Transmite:
- Exploración
- Atención sin agresividad

---

### Neutros (base del sistema)

- **Texto principal:** `#111827`
- **Texto secundario:** `#6B7280`
- **Fondos claros:** `#F9FAFB`
- **Bordes:** `#E5E7EB`

Los neutros hacen que el contenido mande.

---

### Estados
- Éxito: `#16A34A`
- Error: `#DC2626`
- Advertencia: `#F59E0B`
- Info: `#2563EB`

---

## 🧱 Uso de colores (reglas)

- Máximo 1 color fuerte por vista
- El amarillo solo para ratings o alertas
- Nunca usar rojo como CTA
- Destacados patrocinados usan color + badge, no solo color

---

## 🅰️ Tipografía (recomendación)

- **Primary:** Inter
- Legible
- Neutral
- Excelente para i18n

Escalas claras:
- Títulos fuertes
- Texto de lectura cómodo
- Labels pequeños y claros

---

## 🌍 i18n (Español / Inglés)

### Principios
- Español como idioma por defecto
- Inglés como segundo idioma
- Nunca hardcodear strings

### Reglas
- Contenido editorial puede no estar traducido al inicio
- UI siempre traducida
- Fechas y formatos localizados

### Tono
- Español: natural, cercano
- Inglés: simple, directo, no literal

---

## 🧠 Estado y data (decisiones globales)

### Zustand
Usar para:
- Preferencias del usuario
- Filtros activos
- UI state (modales, vistas)
- Ubicación actual
- Idioma seleccionado

No usar para:
- Data remota
- Cache de servidor

---

### TanStack React Query
Usar para:
- Lugares
- Planes
- Ratings
- Comentarios
- Destacados

Beneficios:
- Cache automático
- Revalidación
- Optimistic updates

---

## ➕ Librerías extra recomendadas

### i18n
- `i18next`
- `react-i18next`

### Forms
- `react-hook-form`
- Validaciones simples

### Fechas
- `date-fns`
- Locales por idioma

### Mapas
- Leaflet
- OpenStreetMap

### Icons
- Tabler Icons (importación explícita)

---

## 🧪 Accesibilidad (no opcional)

- Contraste AA mínimo
- Focus visible
- Navegación por teclado
- Labels claros
- Roles ARIA cuando aplique

---

## 🧩 Consistencia cross-plataforma

- Mismos colores
- Mismos tokens
- Misma jerarquía visual
- Misma lógica de navegación

---

## 🔑 Regla final de diseño

> Si el diseño distrae de la decisión, está mal diseñado.

---

Este documento define la identidad y decisiones transversales del producto.  
Cualquier nuevo componente o feature debe respetar estos lineamientos.
