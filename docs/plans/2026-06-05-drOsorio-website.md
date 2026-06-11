# Dr. Claudia Osorio Psychological Services — Website Implementation Plan

> **Para ejecución:** Usar superpowers:executing-plans o superpowers:subagent-driven-development para implementar tarea por tarea.

**Goal:** Construir el sitio web completo de Dr. Claudia Osorio Psychological Services en HTML/CSS puro — sin WordPress, sin dependencias externas vulnerables — listo para subir a cualquier hosting.

**Architecture:** 8 páginas HTML estáticas con CSS compartido y JS mínimo. Sin base de datos, sin CMS. Assets locales. Hosting-agnostic.

**Tech Stack:** HTML5 semántico · CSS3 custom properties · Vanilla JS (solo para menú mobile y smooth scroll) · SVG inline icons (Heroicons) · Google Fonts (Lora + Inter)

---

## ANÁLISIS CREATIVO — QUÉ FUNCIONA EN LAS REFERENCIAS

*Aplicando creative-intelligence sobre los 10 mockups revisados*

### Patrones visuales que FUNCIONAN (replicar)
| Patrón | Por qué funciona | Aplicar en |
|--------|-----------------|------------|
| Hero split 60/40 (texto / foto consultorio) | Reduce ansiedad — comunica "espacio seguro + autoridad" en 3 segundos | Todas las páginas |
| Trust badges inmediatos bajo el hero | PSYPACT + Licensed + Multi-State — resuelve la duda de legitimidad antes de que nazca | Todas las páginas |
| Path splitter Individuals / Attorneys | Audiencias distintas — si el visitante no se identifica en 5 segundos, se va | Home + service pages |
| Proceso 3 pasos numerados con flechas | Reduce el miedo a "¿qué pasa después de contactar?" | Todas las páginas |
| CTA banner teal oscuro al final | Alta visibilidad, contraste fuerte — convierte los que llegaron al final | Todas las páginas |
| Footer 4 columnas con contacto | Mercado americano espera ver horarios, email, teléfono en el footer | Todas las páginas |

### Lo que hay que MEJORAR (más limpio)
| Problema en las referencias | Solución en este build |
|----------------------------|----------------------|
| Hero con demasiados párrafos (5-6 bloques de texto) | Máximo 2 párrafos en el hero + CTA. El resto va debajo del fold |
| Cards de servicio con listas largas de bullets | Solo 2-3 bullets por card. Más en la página de detalle |
| Elementos botánicos decorativos muy evidentes | Opacity 4-6% máximo — textura, no distracción |
| Diferente color por sección (teal / purple / pink) inconsistente | Sistema de 2 colores: teal para individuos, mauve para attorneys — aplicado con disciplina |
| Mucho texto en la sección PSYPACT | Solo 2-3 líneas + mapa + CTA al PSYPACT map oficial |

---

## ARQUETIPO DE MARCA

*Aplicando ai-graphic-design / StoryBrand*

- **Arquetipo dominante: Sage (Sabio)** — La Dra. Osorio es la guía experta, no la heroína. El paciente/abogado es el héroe.
- **Arquetipo secundario: Caregiver (Cuidador)** — Especialmente para la audiencia de individuos vulnerables.
- **Implicación visual:** Limpio, confiable, cálido-profesional. NUNCA: playful, agresivo, minimalista frío.
- **Tone of voice:** Claro, directo, compasivo. Verbos de acción suave: "support", "clarify", "document", "help".

---

## SISTEMA DE DISEÑO

### Paleta de colores
```
--teal:         #0D9D8E   ← Primario / Individuos / CTAs principales
--teal-dark:    #0A7D72   ← Hover de teal
--teal-light:   #E8F7F5   ← Backgrounds suaves
--navy:         #1B2A4A   ← Footer / CTA banners / Headlines
--mauve:        #A06090   ← Acento Attorneys (diferenciación de audiencia)
--mauve-light:  #F5ECF5   ← Background sección attorneys
--gold:         #C9944A   ← CTA secundario premium (Schedule Free Call)
--text-dark:    #1A1A2E   ← Body text principal
--text-mid:     #444B5A   ← Subtextos
--text-light:   #6B7280   ← Captions, labels
--border:       #E5E7EB   ← Bordes de cards
--bg-light:     #F9FAFB   ← Backgrounds alternados
```

### Tipografía
```
Headlines:  Lora (Google Fonts) — serif, cálida, profesional, legible
Body:       Inter (Google Fonts) — sans-serif, clarísima, estándar médico/legal
Fallback:   Georgia, 'Segoe UI', system-ui
```

### Iconos
```
Librería: Heroicons v2 (MIT license — uso comercial libre)
Formato: SVG inline (no dependencia externa, carga instantánea)
Tamaño estándar: 20px (inline) / 24px (cards) / 32px (trust bar)
Color: currentColor (hereda el color del contenedor)
```

---

## INSUMOS REQUERIDOS — CHECKLIST COMPLETO

*Todo lo que necesitamos ANTES de avanzar al código*

### 🔴 BLOQUEANTES (sin esto no podemos publicar)

- [ ] **Logo SVG/PNG** — El archivo real del logo mariposa/manos de la Dra. Osorio
  - Formato ideal: SVG con fondo transparente
  - Alternativa: PNG @2x (mínimo 200×200px) con fondo transparente
  - Si no existe: recrear con Recraft V3 usando el mockup como referencia

- [ ] **Foto de la Dra. Osorio** — Headshot profesional
  - Formato: JPG/PNG, mínimo 600×800px
  - Uso: Página Specialists, página About (sección Practice Director)
  - La del mockup (mujer con blazer oscuro) se ve muy bien — confirmar si es la real

- [ ] **Teléfono real** — El copy dice `+1 (617) 752-2526` — ¿confirmar?
  - Los mockups muestran números distintos (956, 954, 858) — todos son placeholders

- [ ] **Email real** — El copy no especifica. Necesitamos el email de contacto oficial

- [ ] **Dominio activo** — `psychevaluations.net` ¿ya está recuperado y apuntando?
  - Necesitamos saber a qué hosting apuntar (Hostinger, Bluehost, SiteGround, etc.)

### 🟡 IMPORTANTES (afectan calidad pero podemos avanzar sin ellos)

- [ ] **Foto del consultorio hero** — La imagen del sillón beige, diplomas, planta, cojín teal
  - Si no tienen el archivo original: usar foto royalty-free de Unsplash (link abajo)
  - Unsplash sugerida: https://unsplash.com/s/photos/therapy-office
  - La misma foto se usa en TODAS las páginas del hero — solo necesitamos una

- [ ] **Fotos de los 7 especialistas restantes**
  - Betsey Martinez, Andrea Barragan, Christian Rizea, Edgar Arbaje, Jill Delie, Maria Hurtado, Olga Iof
  - Si no hay fotos: placeholder profesional con iniciales (implementado en CSS)

- [ ] **Confirmar email de contacto** del formulario (a dónde llegan los mensajes)
  - Opciones: Formspree (gratis), EmailJS, o formulario simple con mailto:

- [ ] **Confirmar horario de atención** — Los mockups dicen "Mon–Fri: 8:00 AM – 6:00 PM ET"

### 🟢 OPCIONALES (mejoran pero no bloquean)

- [ ] **¿Quieren página de contacto separada?** — No está en el copy doc
- [ ] **¿Quieren blog/recursos?** — No está en el copy doc
- [ ] **¿Testimonios reales?** — No están en el copy doc (probablemente intencional por regulación)
- [ ] **Google Analytics ID** — Para tracking de visitas desde el día 1
- [ ] **¿Formulario "Request Provider Packet"?** — Mencionado en For Attorneys, ¿qué envía?

---

## MAPA DE ARCHIVOS

```
C:\Users\lilia\Clientes\DrOsorio\
│
├── index.html                              ← Homepage
├── for-individuals.html                    ← Para individuos
├── for-attorneys.html                      ← Para abogados
├── immigration-psychological-evaluations.html
├── forensic-psychological-evaluations.html
├── mental-health-psychological-evaluations.html
├── specialists.html                        ← Equipo
├── about.html                              ← Acerca de
│
├── css/
│   └── styles.css                          ← Stylesheet único compartido ✅ (iniciado)
│
├── js/
│   └── main.js                             ← Mobile menu + smooth scroll
│
├── images/
│   ├── logo.svg                            ← 🔴 INSUMO REQUERIDO
│   ├── logo-white.svg                      ← Versión blanca para footer/banner
│   ├── hero-office.jpg                     ← 🟡 INSUMO REQUERIDO
│   ├── dr-osorio-headshot.jpg              ← 🔴 INSUMO REQUERIDO
│   ├── specialist-betsey-martinez.jpg      ← 🟡
│   ├── specialist-andrea-barragan.jpg      ← 🟡
│   ├── specialist-christian-rizea.jpg      ← 🟡
│   ├── specialist-edgar-arbaje.jpg         ← 🟡
│   ├── specialist-jill-delie.jpg           ← 🟡
│   ├── specialist-maria-hurtado.jpg        ← 🟡
│   ├── specialist-olga-iof.jpg             ← 🟡
│   └── us-map-teal.svg                     ← Mapa de PSYPACT (generamos inline SVG)
│
└── docs/
    └── plans/
        └── 2026-06-05-drOsorio-website.md  ← Este archivo
```

---

## ESTRUCTURA DE CADA PÁGINA

Todas las páginas siguen este patrón (disciplina de diseño):

```
[NAV] sticky, shared
[HERO] split 60/40 — título + subtítulo + 2 CTAs + trust badges
[SECCIÓN PRINCIPAL] contenido específico de la página
[PROCESO 3 PASOS] siempre igual
[TRUST & PSYPACT] siempre igual
[CTA BANNER] siempre igual
[FOOTER] siempre igual
```

---

## TAREAS DE IMPLEMENTACIÓN

---

### TAREA 0: Resolver insumos bloqueantes

**Responsable:** Lorena (gestión con la Dra. Osorio)

- [ ] Solicitar a la Dra. Osorio el archivo del logo (SVG o PNG transparente)
- [ ] Solicitar foto profesional de la Dra. Osorio (headshot)
- [ ] Confirmar número de teléfono real: ¿es (617) 752-2526?
- [ ] Confirmar email de contacto oficial
- [ ] Confirmar estado del dominio psychevaluations.net y hosting
- [ ] Si no hay foto del consultorio hero: descargar de Unsplash y confirmar con la Dra.
  - Buscar: "therapy office cozy" en unsplash.com/license (free commercial use)

**Insumos que necesitamos de vuelta:** logo.svg, dr-osorio-headshot.jpg, teléfono, email

---

### TAREA 1: Sistema de diseño base (CSS + JS)

**Files:**
- Modify: `css/styles.css` (ya iniciado — completar con Lora/Inter fonts)
- Create: `js/main.js`

- [ ] **Paso 1: Agregar Google Fonts al CSS**

En `css/styles.css`, al inicio del archivo agregar:
```css
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
```
Cambiar `--font-serif` a `'Lora', Georgia, serif` y `--font-sans` a `'Inter', system-ui, sans-serif`.

- [ ] **Paso 2: Crear js/main.js**

```javascript
// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.nav__menu-btn');
  const navLinks = document.querySelector('.nav__links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('nav__links--open');
      menuBtn.setAttribute('aria-expanded',
        navLinks.classList.contains('nav__links--open'));
    });
  }

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && navLinks) {
      navLinks.classList.remove('nav__links--open');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('nav__link--active');
    }
  });
});
```

- [ ] **Paso 3: Verificar en navegador**
Abrir cualquier HTML — confirmar que Lora carga en headlines y Inter en body.

---

### TAREA 2: Homepage (index.html)

**Files:**
- Create: `index.html`

- [ ] **Paso 1: Crear estructura HTML completa**

Secciones en orden:
1. `<nav>` — logo + links + CTA Schedule Free Call
2. `<section class="hero">` — split hero con foto consultorio
3. `<section class="path-splitter">` — 2 cards: Individuals / Attorneys
4. `<section class="services">` — 3 cards de servicios
5. `<section class="process">` — 3 pasos
6. `<section class="trust-bar">` — 4 pilares de confianza
7. `<section class="cta-banner">` — CTA final
8. `<footer>` — 4 columnas

- [ ] **Paso 2: Copy del hero (del documento aprobado)**

Headline: *"Specialized Psychological Evaluations for Individuals, Families, and Attorneys"*
Subheadline: *"in Legal and Immigration Cases Across the U.S."*
Body (1 párrafo): *"We provide objective, evidence-based analysis of behavioral, cognitive, and emotional functioning to support legal proceedings, immigration documentation, and diagnostic clarification."*
CTAs: [For Individuals →] [For Attorneys →]
Trust badges: 🛡 PSYPACT Authorized · 👤 Licensed Psychologists · 🌐 Multi-State Access

- [ ] **Paso 3: Cards de servicios (del documento aprobado)**

Card 1: Immigration Psychological Evaluations → link a /immigration-psychological-evaluations.html
Card 2: Forensic Evaluations → link a /forensic-psychological-evaluations.html
Card 3: Psychological Evaluations → link a /mental-health-psychological-evaluations.html

- [ ] **Paso 4: Sección proceso (del documento aprobado)**

Step 1: Schedule Free Call
Step 2: Evaluation
Step 3: Report and Next Steps

- [ ] **Paso 5: Abrir en navegador y revisar**
- Hero se ve correctamente en desktop (split 60/40)
- Trust badges alineados horizontalmente
- Cards de servicio en 3 columnas
- Reducir al 768px: hero stacks correctamente

- [ ] **Paso 6: Commit**
```bash
git init
git add .
git commit -m "feat: homepage completa con sistema de diseño"
```

---

### TAREA 3: Página For Individuals

**Files:**
- Create: `for-individuals.html`

- [ ] **Paso 1:** Hero con headline "Psychological Evaluations for Individuals and Families" + copy del doc aprobado
- [ ] **Paso 2:** 3 cards de evaluaciones (Immigration / Forensic / Psychological) con copy del doc
- [ ] **Paso 3:** Sección "How It Works" 3 pasos
- [ ] **Paso 4:** CTA banner teal "Need help choosing the right evaluation?"
- [ ] **Paso 5:** Verificar mobile

---

### TAREA 4: Página For Attorneys

**Files:**
- Create: `for-attorneys.html`

- [ ] **Paso 1:** Hero headline "A Reliable Psychological Evaluation Practice for Legal and Immigration Cases" + copy doc aprobado
- [ ] **Paso 2:** 3 cards de evaluaciones — mismo layout pero con acento mauve (diferencia visual Attorneys vs Individuals)
- [ ] **Paso 3:** "How It Works" 3 pasos versión attorneys
- [ ] **Paso 4:** CTA final con 2 botones: "Schedule a Call" + "Request Provider Packet"
- [ ] **Paso 5:** Verificar que acento mauve aplica correctamente

---

### TAREA 5: Página Immigration Psychological Evaluations

**Files:**
- Create: `immigration-psychological-evaluations.html`

- [ ] **Paso 1:** Hero + breadcrumb (Home > Services > Immigration Evaluations)
- [ ] **Paso 2:** Sección "Who This Is For" — 2 columnas: Individuals / Attorneys con sus listas
- [ ] **Paso 3:** "What the Evaluation Includes" — grid de 6 items con iconos
- [ ] **Paso 4:** "How the Process Works" — 3 pasos
- [ ] **Paso 5:** "Trust & PSYPACT" con mapa USA + link al mapa oficial PSYPACT
- [ ] **Paso 6:** CTA final "Schedule Free Call"

---

### TAREA 6: Página Forensic Psychological Evaluations

**Files:**
- Create: `forensic-psychological-evaluations.html`

- [ ] **Paso 1:** Hero + breadcrumb
- [ ] **Paso 2:** "Who This Is For" — solo columna Attorneys (esta página es más legal)
- [ ] **Paso 3:** "What the Evaluation Includes" — grid de 5 items del doc aprobado
- [ ] **Paso 4:** Proceso 3 pasos
- [ ] **Paso 5:** Trust & PSYPACT
- [ ] **Paso 6:** CTA final

---

### TAREA 7: Página Psychological Evaluations (Mental Health)

**Files:**
- Create: `mental-health-psychological-evaluations.html`

- [ ] **Paso 1:** Hero con copia del doc aprobado
- [ ] **Paso 2:** "Who This Is For" — 2 columnas
- [ ] **Paso 3:** 3 sub-secciones: "What a Psych Eval Clarifies" + "When May Be Needed" + "What It Includes"
- [ ] **Paso 4:** Proceso 3 pasos
- [ ] **Paso 5:** Trust & PSYPACT
- [ ] **Paso 6:** CTA final

---

### TAREA 8: Página Specialists

**Files:**
- Create: `specialists.html`

- [ ] **Paso 1:** Hero "Meet Our Licensed Specialists" + badges PSYPACT
- [ ] **Paso 2:** Card destacado "Practice Director" — Dr. Claudia Osorio con foto grande, credenciales, 2 CTAs
- [ ] **Paso 3:** Grid 4 columnas de los 7 especialistas restantes — foto + nombre + título + especialidades + idiomas + 2 links (View Profile / Schedule Call)
- [ ] **Paso 4:** Si no hay fotos — implementar placeholder con iniciales en CSS:
```css
.specialist-avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--teal-light);
  color: var(--teal);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
}
```
- [ ] **Paso 5:** Sección Trust & PSYPACT simplificada
- [ ] **Paso 6:** CTA banner

---

### TAREA 9: Página About

**Files:**
- Create: `about.html`

- [ ] **Paso 1:** Hero "Licensed Psychologists for Immigration, Forensic, and Psychological Evaluations"
- [ ] **Paso 2:** Sección Practice Director — foto Dra. Osorio + bio completa del doc aprobado + credenciales con iconos
- [ ] **Paso 3:** "Mission & Approach" — 1 columna, texto del doc aprobado
- [ ] **Paso 4:** "Who We Serve" — 2 columnas: Individuals / Attorneys con CTAs
- [ ] **Paso 5:** Trust & PSYPACT con mapa USA
- [ ] **Paso 6:** CTA final "Request Evaluation" + "Schedule Free Call"

---

### TAREA 10: SEO y Metadata

**Files:**
- Modify: todos los .html (agregar en `<head>`)

- [ ] **Paso 1:** Agregar en cada página:
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="[descripción específica por página]">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://psychevaluations.net/[página]/"/>

<!-- Open Graph (para cuando comparten en redes) -->
<meta property="og:title" content="[título de página] | Dr. Claudia Osorio Psychological Services">
<meta property="og:description" content="[descripción]">
<meta property="og:url" content="https://psychevaluations.net/[página]/">
<meta property="og:type" content="website">
```

- [ ] **Paso 2:** Title tags por página:
```
index.html:             "Psychological Evaluation Services | Dr. Claudia Osorio"
for-individuals.html:   "Evaluations for Individuals & Families | Dr. Claudia Osorio"
for-attorneys.html:     "Psychological Evaluations for Attorneys | Dr. Claudia Osorio"
immigration-*.html:     "Immigration Psychological Evaluations | Dr. Claudia Osorio"
forensic-*.html:        "Forensic Psychological Evaluations | Dr. Claudia Osorio"
mental-health-*.html:   "Psychological Evaluations | Dr. Claudia Osorio"
specialists.html:       "Our Licensed Specialists | Dr. Claudia Osorio"
about.html:             "About Our Practice | Dr. Claudia Osorio Psychological Services"
```

---

### TAREA 11: Testing y QA antes de publicar

- [ ] **Desktop (1280px):** Revisar cada página — hero, cards, proceso, footer
- [ ] **Tablet (768px):** Grids colapsan correctamente
- [ ] **Mobile (375px):** Hero stacks, menú hamburguesa funciona, CTAs son tappables (mínimo 44px)
- [ ] **Todos los links internos** funcionan entre páginas
- [ ] **Links externos:** teléfono tel: abre dialer, PSYPACT map abre en nueva pestaña
- [ ] **Velocidad:** Abrir Chrome DevTools > Lighthouse — target: Performance > 90
- [ ] **Formulario de contacto:** si se implementó, enviar test

---

### TAREA 12: Deploy

- [ ] Comprimir imágenes con TinyPNG o Squoosh (target: < 200KB por imagen)
- [ ] Subir archivos al hosting vía FTP o panel de control
- [ ] Verificar que `psychevaluations.net` resuelve correctamente
- [ ] Navegar el sitio en vivo desde un celular real
- [ ] Agregar Google Analytics si tienen el ID

---

## DECISIONES DE DISEÑO PENDIENTES — Confirmar con la Dra. Osorio

| Decisión | Opción A | Opción B | Impacto |
|----------|----------|----------|---------|
| Formulario de contacto | Embebido en cada página (Formspree) | Página separada /contact | Alto |
| Fotos de especialistas | Usar headshots reales | Placeholders con iniciales inicialmente | Medio |
| Mapa PSYPACT | Link al mapa oficial (externo) | Mapa SVG estático decorativo + link | Bajo |
| "Request Provider Packet" | Modal con formulario | Mailto link simple | Medio |
| Blog/Recursos | Sí (añade SEO) | No por ahora | Bajo |

---

## RESUMEN EJECUTIVO

**Lo que tenemos listo para construir:**
- ✅ Copy completo aprobado (8 páginas)
- ✅ Sistema de diseño definido (colores, tipografía, layout)
- ✅ Análisis visual de 10 referencias con decisiones tomadas
- ✅ Arquetipo de marca: Sage + Caregiver
- ✅ CSS base iniciado

**Lo que necesitamos antes de publicar:**
- 🔴 Logo SVG/PNG (de la Dra. Osorio)
- 🔴 Foto profesional de la Dra. Osorio
- 🔴 Teléfono real confirmado
- 🔴 Email de contacto real

**Lo que podemos empezar HOY sin esperar:**
- Construir todas las 8 páginas con placeholders para logo y fotos
- Cuando lleguen los assets reales, es un swap de 10 minutos

---

*Plan preparado por: Lorena Ruiz + Claude · Fecha: 2026-06-05*
*Copy source: dr_osorio_final_website_copy.md (aprobado)*
*Referencias visuales: 10 mockups analizados (primera y segunda tanda)*
