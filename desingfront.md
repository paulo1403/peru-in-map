# 🎨 Sistema de Diseño – quehacer.pe

Este documento describe el diseño visual y de interacción de los componentes principales de la plataforma. Sirve como guía para implementar UI consistente, accesible y enfocada en decisiones rápidas.

---

## 🧭 Principios de diseño

- La interfaz ayuda a decidir, no a explorar por explorar
- Menos opciones visibles = mejores decisiones
- Diseño sobrio, urbano y neutral
- Priorizar lectura y escaneo rápido
- Todo debe sentirse rápido y liviano

---

## 🔘 Buttons

### Tipos

#### Primary
Uso:
- Acción principal de la vista
- Guardar
- Confirmar

Estilo:
- Fondo: color primario
- Texto: blanco
- Borde: none
- Radius: medio
- Hover: oscurecer ligeramente
- Disabled: opacidad + cursor not-allowed

Regla:
- Máximo 1 primary por vista

---

#### Secondary
Uso:
- Acciones alternativas
- Cancelar
- Filtros

Estilo:
- Fondo: transparente
- Borde: 1px neutro
- Texto: color primario

---

#### Tertiary / Ghost
Uso:
- Acciones secundarias
- Links
- Icon buttons

Estilo:
- Fondo: none
- Texto: neutro
- Hover: fondo sutil

---

## 🧾 Inputs

### Text input
Uso:
- Búsqueda
- Comentarios
- Formularios simples

Estilo:
- Fondo blanco
- Borde neutro
- Radius pequeño
- Placeholder claro
- Focus visible con color primario

Reglas:
- Labels siempre visibles
- Placeholder no reemplaza label
- Error debajo del input

---

### Select / Dropdown
Uso:
- Filtros
- Categorías
- Distrito

Estilo:
- Igual a input
- Icono discreto
- No usar selects nativos sin estilo

---

### Textarea
Uso:
- Comentarios
- Descripciones

Reglas:
- Altura mínima
- Resize vertical permitido
- Contador opcional

---

## ⭐ Ratings

### Estrellas
- Color: amber
- Tamaño medio
- Clickable
- Feedback inmediato

Reglas:
- No animaciones exageradas
- Mostrar promedio y número de reviews

---

## 🪟 Modals

### Uso
- Confirmaciones
- Formularios
- Información puntual

### Estilo
- Fondo blanco
- Sombra suave
- Radius grande
- Padding generoso

### Overlay
- Fondo oscuro con blur sutil
- Click fuera cierra modal (excepto acciones críticas)

### Reglas
- No modals encadenados
- No usar modal para navegación larga

---

## 📦 Cards (lugares / planes)

### Card de lugar
Incluye:
- Imagen principal
- Nombre
- Rating
- Tags
- Distrito

Estilo:
- Fondo blanco
- Borde o sombra ligera
- Hover: elevación mínima

Reglas:
- Click en toda la card
- No sobrecargar información

---

### Card destacada
Diferencia:
- Badge “Destacado”
- Borde o fondo sutil
- Nunca llamativa en exceso

---

## 🧭 Navegación

### Header
- Logo
- Buscador
- Idioma
- Acciones mínimas

### Footer
- Información legal
- Contacto
- Idioma

Reglas:
- Navegación clara
- Sin menús profundos

---

## 🗺️ Mapa

### Comportamiento
- Vista secundaria
- Toggle on/off
- Sin autoplay ni zoom agresivo

### Pins
- Color neutro
- Destacados con badge

---

## 🧩 Filtros

### Presentación
- Chips o dropdowns
- Siempre visibles
- Reset claro

Reglas:
- Pocos filtros
- Filtros activos visibles

---

## 🚨 Estados

### Loading
- Skeletons
- Nunca spinners largos

### Empty
- Mensaje claro
- CTA sugerido

### Error
- Texto humano
- Acción posible

---

## ♿ Accesibilidad

- Focus visible
- Navegación con teclado
- Roles ARIA cuando aplique
- Contraste AA mínimo
- Tamaños clicables adecuados

---

## 🌍 i18n

- Textos adaptables
- Evitar strings largas fijas
- Diseño flexible a idiomas

---

## 🔑 Regla final de diseño

> Si un componente no ayuda a decidir más rápido, debe simplificarse.

---

Este sistema de diseño es la base visual de *quehacer.pe* y debe respetarse en todas las vistas.
