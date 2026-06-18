# Session 8 Kickoff — Forensic Psychological Evaluations Page

## Tu primera acción (antes de cualquier otra cosa)

1. Lee `C:\Users\lilia\.claude\projects\C--Users-lilia\memory\drOsorio_website.md` completo.
2. Arranca el preview con MCP `Claude_Preview` → `preview_start`, nombre: `dr-osorio-site`.
3. Lee este archivo hasta el final antes de escribir una sola línea de código.

---

## Contexto del proyecto

**Cliente:** Dr. Claudia Osorio — psicóloga licenciada, PSYPACT autorizada.
**Sitio:** psychevaluations.net (HTML/CSS/JS estático, hosting Netlify).
**Working dir:** `C:\Users\lilia\Clientes\DrOsorio\`
**GitHub:** `https://github.com/lilianlorenaruiz-commits/Dr.-Osorio.git` rama `main`. Auth automática. Usar PowerShell para todos los comandos git (Bash falla en paths Windows).

### Estado actual

Páginas construidas y en `origin/main`:
- `index.html` — home completa, multi-angle audit, GEO/schema
- `for-individuals.html` — completa
- `for-attorneys.html` — completa con modal/form
- `immigration-psychological-evaluations.html` — **template de referencia para esta sesión**
- `about.html`, `privacy-policy.html`, `terms-of-service.html` — stubs

**Por construir (esta sesión):** `forensic-psychological-evaluations.html`
**CSS activo:** `css/styles.css?v=32`

---

## Tarea de esta sesión

Construir `forensic-psychological-evaluations.html` siguiendo el mismo nivel de calidad, estructura y metodología que `immigration-psychological-evaluations.html`.

**Archivo de referencia estructural:** `immigration-psychological-evaluations.html` — copia la estructura de `<head>`, nav, breadcrumb, footer y todos los patrones establecidos. Adapta el contenido para forensic.

---

## Reglas de código (no negociables)

### HTML/CSS/JS
- Sin frameworks, sin build step. HTML/CSS/JS vanilla puro.
- CSS cachebusting: usar `css/styles.css?v=32` en el `<link>`. Si agregas reglas CSS nuevas, bumpar a `?v=33` en TODOS los archivos HTML del sitio (no solo el nuevo).
- JS: el archivo `js/main.js` ya tiene todo lo necesario (nav, modal, scroll, mapa). No duplicar lógica. Si necesitas JS nuevo para esta página, agrégalo en main.js de forma condicional (verificar existencia del elemento antes de ejecutar).
- Sin inline styles. Sin `!important` salvo casos excepcionales documentados.
- Imágenes: usar las existentes en `images/optimized/`. No descargar imágenes nuevas sin confirmar con la usuaria.

### Redacción (project-wide)
- **Sin em-dashes (—)** en ningún texto de usuario. Usar coma, punto o punto y coma.
- Puntuación natural, tono humano. Nunca corporativo ni frío.
- Término canónico: "Psychological Evaluations" (no "Mental Health Evaluations" como categoría genérica).
- Voz activa. Oraciones cortas. Nada de jerga legal innecesaria en el path de individuos.

### Design tokens (respetar siempre)
| Token | Valor | Uso |
|---|---|---|
| `--teal` | `#03bcc7` | Solo decorativo (iconos, divisores). Nunca como texto o borde accionable |
| `--teal-button` | `#017a82` | Todo teal accionable: botones, links, bordes sobre fondo claro |
| `--navy` | `#1B2A4A` | Texto principal, fondos oscuros |
| `--gold` | `#C9944A` | Botones CTA (texto navy, no blanco) |
| `--font-serif` | `'Raleway'` | Solo headlines |
| `--font-sans` | `'Inter'` | Body text |

**Visual Signature aprobada:** `border-top: 3px solid var(--teal)` en `.service-card` — no tocar, es canon de marca.

---

## Estructura de la página (seguir este orden)

Copiar de `immigration-psychological-evaluations.html` y adaptar:

```
1. <head>
   - <title> con keyword principal primero
   - <meta name="description"> keyword-rich, 140-160 chars
   - <meta name="robots" content="index, follow">
   - <link rel="canonical">
   - Open Graph completo (og:title, og:description, og:url, og:type, og:image)
   - Twitter Card completo
   - Favicons (los mismos links aunque los archivos no existan aún)
   - <link rel="stylesheet" href="css/styles.css?v=32">
   - JSON-LD @graph (ver sección Schema más abajo)

2. <body>
   - Skip link: <a class="skip-link" href="#main-content">Skip to main content</a>
   - <header> con nav (copiar igual de immigration)
   - <nav aria-label="Breadcrumb"> (adaptar con "Forensic Psychological Evaluations")
   - <main id="main-content">
       a. page-hero (ver patrón abajo)
       b. Who-For section (dos audiencias: attorneys + individuals/families)
       c. Evaluation Types section (service cards con border-top teal)
       d. Process section (3 pasos como en immigration)
       e. Trust / Credenciales section
       f. CTA Banner (navy, botón gold "Schedule Free Call")
   - <footer> (copiar igual de immigration)
```

### Patrón hero (page-hero)
```html
<section class="page-hero" aria-labelledby="page-hero-title">
  <div class="page-hero__inner">
    <p class="page-hero__label">Forensic Services</p>
    <h1 class="page-hero__title" id="page-hero-title">Forensic Psychological Evaluations</h1>
    <!-- Párrafo 1: gancho emocional corto, serif italic 22px -->
    <p class="page-hero__lead">[frase corta de enganche]</p>
    <!-- Párrafo 2: descripción institucional, sans normal 16px -->
    <p class="page-hero__body">[descripción con nombre de la práctica + servicios + proceso]</p>
    <div class="page-hero__actions">
      <a href="tel:+16177522526" class="btn btn--gold">
        <svg ...phone...></svg>
        Schedule Free Call
      </a>
    </div>
  </div>
</section>
```

---

## Contenido de Forensic Psychological Evaluations

### Audiencia primaria: attorneys (criminal defense, family law, civil litigation)
### Audiencia secundaria: individuals (court-ordered, self-referred)

### Tipos de evaluación a incluir (usar como service cards):
1. **Competency to Stand Trial (CST)** — evalúa si el acusado comprende los procedimientos y puede asistir en su propia defensa
2. **Criminal Responsibility / Mental State at Time of Offense** — NGRI (not guilty by reason of insanity), diminished capacity
3. **Violence Risk Assessment** — structured professional judgment para parole, probation, civil commitment
4. **Psychological Evaluation for Mitigation** — sentencing, capital cases, contexto de historia de vida
5. **Child Custody Psychological Evaluation** — parenting capacity, best interests of the child, family dynamics
6. **Disability / Social Security (SSI/SSDI)** — documentación funcional de limitaciones psicológicas

### Proceso forense (diferente al de immigration):
1. Case review — Dr. Osorio revisa los documentos del caso antes de comenzar
2. Clinical interview(s) + psychological testing — puede requerir múltiples sesiones
3. Report preparation — findings estructurados, terminología legal apropiada, conclusiones basadas en evidencia

### Tono: más formal que immigration
- Para attorneys: lenguaje procesal claro, énfasis en adherencia a estándares (AAPL, APA), defensibilidad del reporte en corte
- Para individuals: explicar el proceso sin jerga, qué esperar, confidencialidad y propósito

---

## Checklist SEO/GEO (aplicar en este orden)

### Meta y head
- [ ] `<title>`: keyword principal primero. Ejemplo: `Forensic Psychological Evaluations: Competency, Risk Assessment, Custody | Dr. Osorio`
- [ ] `<meta name="description">`: 140-160 chars, incluir 2-3 keywords de long tail
- [ ] `<link rel="canonical">` correcto
- [ ] Open Graph completo con imagen `dr-osorio-hero-c.jpg`
- [ ] Twitter Card completo

### Estructura semántica GEO (para AI search)
- [ ] H1 único, keyword principal
- [ ] H2 por sección (Evaluation Types, Who We Serve, How It Works, etc.)
- [ ] H3 para cada tipo de evaluación
- [ ] Breadcrumb visible en HTML: Home > Services > Forensic Psychological Evaluations
- [ ] Listas `<ul>/<ol>` para criterios de elegibilidad, casos cubiertos, documentos que produce el reporte
- [ ] FAQ section al fondo (mínimo 4 preguntas) — estas se convierten en schema FAQPage

### Contenido GEO (answer-extractable)
- Al menos una definición directa por tipo de evaluación ("A competency evaluation assesses whether...")
- Mencionar estándares clínicos por nombre (Dusky standard, AAPL guidelines, DSM-5)
- Mencionar formatos de reporte por nombre cuando aplique
- Declarar turnaround time explícitamente ("typically delivered within X business days")
- Mencionar telehealth + PSYPACT donde aplique
- Mencionar los 3 estados de práctica: MA, CT, FL

---

## Checklist Schema JSON-LD (obligatorio)

Copiar estructura @graph de `immigration-psychological-evaluations.html` y adaptar:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BreadcrumbList" ... },
    { "@type": "WebPage", "@id": "...forensic..." ... },
    {
      "@type": "Service",
      "@id": "...#service",
      "name": "Forensic Psychological Evaluations",
      "serviceType": "Psychological Evaluation",
      "audience": ["Attorneys", "Individuals"],
      ...
    },
    // Un MedicalProcedure por tipo de evaluación (mínimo 4):
    { "@type": "MedicalProcedure", "name": "Competency to Stand Trial Evaluation", ... },
    { "@type": "MedicalProcedure", "name": "Criminal Responsibility Evaluation", ... },
    { "@type": "MedicalProcedure", "name": "Violence Risk Assessment", ... },
    { "@type": "MedicalProcedure", "name": "Child Custody Psychological Evaluation", ... },
    // FAQPage con las FAQ del final de la página
    { "@type": "FAQPage", ... }
  ]
}
```

**Campos críticos en cada MedicalProcedure:**
- `"name"` — nombre completo del tipo de evaluación
- `"procedureType": "Psychological Evaluation"`
- `"description"` — descripción clínica de qué evalúa y qué documenta (2-3 oraciones)
- `"followup"` — turnaround time ("typically delivered within X business days after final session")
- `"relevantSpecialty": "https://schema.org/MentalHealth"`
- `"provider": { "@id": "https://psychevaluations.net/#organization" }`

---

## Metodología de trabajo obligatoria

### Construcción
1. Construir la página completa en una pasada (no por secciones aisladas).
2. Usar `immigration-psychological-evaluations.html` como plantilla estructural. Copy/paste del `<head>`, nav, breadcrumb, footer — luego adaptar contenido.
3. Mostrar resultado en preview antes de pedir aprobación.

### Multi-angle audit (aplicar DESPUÉS de construir, ANTES de commitear)

Correr 3 agentes en paralelo (solo reportan, no tocan código):
```
Agente 1 — code-reviewer:
  Bugs, HTML/CSS válido, convenciones del proyecto
  (sin em-dashes, tono humano, tokens correctos, CSS version)

Agente 2 — silent-failure-hunter:
  JS robusto: querySelectors nulos, listeners en elementos ausentes,
  manejo de errores, casos edge

Agente 3 — a11y (general-purpose):
  WCAG 2.1 AA: contraste, ARIA, foco de teclado, jerarquía de headings,
  reduced-motion, focus-visible en interactivos
```

Consolidar findings, priorizar P0/P1/P2, aplicar fixes verificados, luego commitear.

### Commits (orden y convención)
```
feat(forensic): build forensic evaluations page
fix(forensic): [descripción de fixes del audit]
```
Un commit por bloque de trabajo. Push a `origin/main` al final de cada bloque.

---

## Accesibilidad WCAG 2.1 AA (checklist por página)

- [ ] Skip link funcional (`#main-content`)
- [ ] H1 único por página
- [ ] Contraste AA en todo el texto (4.5:1 body, 3:1 large/bold). Especial atención a: texto sobre `--navy`, texto sobre fondos teal/gold, texto muted
- [ ] `focus-visible` en todos los interactivos (nav, botones, links, cards)
- [ ] ARIA en componentes interactivos (nav dropdowns `aria-expanded`, modal si aplica)
- [ ] `aria-label` en SVG icons y elementos sin texto visible
- [ ] `role="list"` en grids de cards
- [ ] `alt` en todas las imágenes (o `alt=""` si decorativas)
- [ ] `lang="en"` en `<html>`
- [ ] `@media (prefers-reduced-motion: reduce)` en cualquier animación

---

## Impeccable audit (al finalizar)

Correr `/impeccable audit forensic-psychological-evaluations.html` para verificar:
- Contraste de colores (verificar con valores exactos, no estimaciones)
- Tipografía (jerarquía, tamaños, line-height)
- Espaciado y ritmo visual
- Componentes consistentes con el design system

**Excepciones conocidas (no son errores):**
- `border-top: 3px solid var(--teal)` en `.service-card` — Visual Signature aprobada, exempt de detección
- Raleway + Inter en @font-face — self-hosted, no es "single font"

---

## Datos de la Dra. (pendientes, no inventar)

Estos campos van vacíos o con placeholder en el código hasta que la Dra. los provea:
- NPI Registry URL
- Psychology Today URL
- PSYPACT directory URL
- LinkedIn URL
- Números de licencia MA / CT / FL
- Institución doctoral

---

## Al terminar la sesión

1. Audit multi-angle completo (3 agentes paralelos).
2. Fixes aplicados y verificados.
3. Commits granulares en `origin/main`.
4. Actualizar `C:\Users\lilia\.claude\projects\C--Users-lilia\memory\drOsorio_website.md`:
   - Cambiar estado de `forensic-psychological-evaluations.html` de PENDIENTE a ✅
   - Anotar cualquier patrón nuevo o decisión de diseño tomada en sesión
5. Actualizar `sitemap.xml` con la nueva página y `<lastmod>` del día.
6. Generar un nuevo `SESSION-9-KICKOFF.md` siguiendo este mismo formato.
