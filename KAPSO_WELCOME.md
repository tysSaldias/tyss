# KAPSO_WELCOME.md — Knowledge Base para Kapso WhatsApp AI

## Contexto

**Timbres y Sellos Saldias** va a integrar un bot de WhatsApp via [Kapso](https://kapso.com). Kapso es una plataforma "WhatsApp for developers" que permite crear agentes de IA que responden por WhatsApp.

Para que el agente IA de Kapso pueda responder consultas de clientes, necesita un **knowledge base** con toda la información del negocio: productos, precios, políticas, FAQ, etc.

**Tu tarea:** Extraer toda la información de este repo y generar un archivo `kapso-knowledge-base.md` que Kapso pueda consumir como contexto de su agente IA.

---

## Qué generar

Crear el archivo **`kapso-knowledge-base.md`** en la raíz del repo con toda la información organizada en las siguientes secciones. El formato debe ser **Markdown limpio** (sin HTML, sin componentes Svelte, sin imports).

---

## Secciones requeridas

### 1. INFORMACIÓN DEL NEGOCIO

Extraer de las páginas de inicio, `/nosotros` y `/por-que-elegirnos`:

- Nombre del negocio
- Descripción (qué hacen)
- Ubicaciones (direcciones exactas)
- Horarios de atención
- Canales de contacto (WhatsApp, email, Instagram)
- Valores / diferenciadores

---

### 2. CATÁLOGO DE PRODUCTOS

Extraer de `/catalogo` y cada página de `/producto/*`:

Para **CADA producto**, incluir:

```
### [Nombre del producto]
- **Categoría:** Timbre de Goma / Accesorio
- **Precio desde:** $X.XXX
- **Descripción breve:** (1 línea)
- **Tamaños disponibles:** (listar cada talla con su precio)
- **Estado:** Disponible / Próximamente
- **URL:** /producto/slug
```

Productos a documentar (extraer precios y tamaños exactos de cada página):

1. Timbre Automático Rectangular (`/producto/timbre-automatico-rectangular`)
2. Fechador Automático (`/producto/fechador-automatico`)
3. Timbre Cuadrado Automático (`/producto/timbre-cuadrado-automatico`)
4. Timbre Redondo Automático (`/producto/timbre-redondo-automatico`)
5. Timbre Portátil Bolsillo (`/producto/timbre-portatil`)
6. Timbre Manual (`/producto/timbre-manual`)
7. Tampón Manual (`/producto/tampon-manual`)
8. Dactilar D233 (`/producto/dactilar-d233`)
9. Tinta para Timbres (`/producto/tinta-timbres`)
10. Roller Documentos (`/producto/roller-documentos`) — Próximamente
11. Roller Packaging (`/producto/roller-packaging`) — Próximamente
12. Set Escolar (`/producto/set-escolar`) — Próximamente

**Importante:** Extraer los precios y tamaños REALES de cada página de producto, no usar placeholders.

---

### 3. PREGUNTAS FRECUENTES (FAQ)

Extraer de `/faq`:

Copiar **TODAS** las preguntas y respuestas agrupadas por categoría:

- Sobre Timbres y Sellos Saldias
- Ubicación y Sucursales
- Envíos y Despacho
- Pagos y Documentación
- Productos
- Diseño y Personalización
- Empresas y Profesionales
- Por Qué Elegirnos

Formato:
```
#### [Categoría]

**P:** [Pregunta exacta]
**R:** [Respuesta exacta]

**P:** [Pregunta exacta]
**R:** [Respuesta exacta]
```

---

### 4. POLÍTICAS

Extraer de `/garantias` y `/despacho`:

#### 4.1 Garantías y Devoluciones
- Marco legal (Ley N° 19.496)
- Productos personalizados y aprobación de diseño
- Garantía por fallas (30 días prioritario, 6 meses legal)
- Lo que NO cubre la garantía
- Derecho a retracto (productos no personalizados, 10 días)
- Transporte y responsabilidad
- Clientes empresa (B2B)
- Cómo gestionar un reclamo (3 pasos)

#### 4.2 Despacho y Envíos
- Despacho gratis zona (Quilpué, Villa Alemana, Belloto)
- Envíos a todo Chile (Starken, Bluexpress)
- Modalidad por pagar (contra entrega)
- Tiempos: fabricación 1-2 días, envío según destino
- Retiro en tienda (2 sucursales)
- Seguimiento de pedido
- Requisitos y condiciones de entrega

---

### 5. PROCESO DE COMPRA

Extraer de `/faq` y la página de inicio:

Cómo funciona el proceso completo:
1. Elegir producto en catálogo
2. Definir tamaño y texto
3. Cotizar por WhatsApp (+56 9 8813 4375)
4. Confirmar precio, tiempo y entrega
5. Aprobar diseño (envío previo)
6. Fabricación (1-2 días)
7. Entrega (despacho gratis zona / envío Chile / retiro)

---

### 6. INFORMACIÓN PARA EL AGENTE IA

Agregar esta sección como **instrucciones para el agente de Kapso**:

```markdown
## Instrucciones para el agente de WhatsApp

Sos el asistente virtual de Timbres y Sellos Saldias. Tu objetivo es ayudar a los clientes con:

1. **Consultas de productos:** Describir productos, precios, tamaños, diferencias entre modelos
2. **Cotizaciones:** Guiar al cliente para armar su pedido y enviarlo por WhatsApp
3. **Políticas:** Explicar garantías, envíos, pagos, devoluciones
4. **Proceso de compra:** Explicar pasos, tiempos, formas de pago
5. **Contacto:** Dar datos del negocio, horarios, ubicaciones

### Reglas:
- Sé amable, claro y directo
- Si no sabés algo, decí "No tengo esa información, escribinos al +56 9 8813 4375"
- Siempre ofrecé continuar la conversación por WhatsApp para cotizar
- No inventes precios o información que no esté en esta base
- El canal principal de atención es WhatsApp: +56 9 8813 4375
- Horario de atención: Lun-Vie 10:00-18:00 hrs
```

---

## Formato de salida

El archivo `kapso-knowledge-base.md` debe ser:

- **Markdown puro** (sin HTML, sin componentes, sin imports de Svelte/React)
- **Autocontenido** (toda la info necesaria en un solo archivo)
- **Text search friendly** (que el agente IA pueda encontrar respuestas buscando keywords)
- **Ordenado** por probabilidad de consulta (productos primero, FAQ después, políticas al final)

---

## Notas técnicas

- Este knowledge base se cargará como contexto en un nodo de agente IA de Kapso
- Kapso tiene un límite de tokens por contexto — priorizar info sobre ruido
- Los precios y tamaños deben ser EXACTOS (copiar de las páginas de producto)
- Las URLs relativas son para referencia interna, el agente no necesita navegarlas

---

## Verificación

Al terminar, verificar que:
- [ ] Todos los 12 productos están documentados con precios reales
- [ ] Todas las FAQ (~40) están incluidas
- [ ] Las políticas de garantía y despacho están completas
- [ ] No hay HTML ni código de componentes
- [ ] El archivo es legible y está bien organizado
