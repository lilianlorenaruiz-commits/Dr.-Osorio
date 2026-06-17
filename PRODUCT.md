# Product

## Register

brand

## Users

Two distinct audiences, served by separate paths through the same site:

- **Individuals and families** seeking a psychological evaluation, most often as part of an immigration case (hardship waivers, asylum, related filings). They arrive anxious, often unfamiliar with the evaluation process, sometimes more comfortable in Spanish than English. Their job: understand what an evaluation involves, feel reassured it's handled with care, and book a free call.
- **Immigration and forensic attorneys** who refer clients for evaluation or need an expert report for a case. They arrive evaluating credibility and competence: licensure scope, turnaround, report quality. Their job: confirm Dr. Osorio is qualified and available, then request a provider packet or schedule a call.

## Product Purpose

psychevaluations.net is Dr. Claudia Osorio's professional marketing site. It exists to convert both audiences into a booked call or a provider-packet request, by establishing credibility (multi-state PSYPACT licensure, bilingual practice, forensic and immigration specialization) clearly enough that a stranger can act on it in one visit. Success is a call scheduled or a packet requested, not just a page read.

## Brand Personality

Professional, warm, expert. Clinical authority delivered in a human voice, never cold or corporate, never casual to the point of undermining credibility. The site should read like a competent person talking to you, not an institution issuing a statement.

## Anti-references

No specific named sites were flagged. Avoid by default: the generic SaaS/startup look (hero-metric cliché, gradient text, uniform card grids) and the opposite failure mode of cold, impersonal, institutional gray. Both undercut the "warm but expert" personality this site is built on.

## Design Principles

1. **Credibility through specificity.** State multi-state licensure (PSYPACT), bilingual capability, and credentials plainly. Never imply what can be said outright.
2. **Two audiences, two paths, no dilution.** Individuals get compassionate, plain-language guidance; attorneys get precise, procedural detail. A page trying to serve both generically serves neither.
3. **Human voice over corporate gloss.** No em-dashes, natural punctuation, warmth without losing clinical authority. (Established project-wide writing rule; see HANDOFF notes.)
4. **Accessibility is non-negotiable.** WCAG 2.1 AA across every page, verified per page, not assumed. This is already true of `index.html`, `for-individuals.html`, and `for-attorneys.html`; hold every new page to the same bar.
5. **Every page converts to one action.** A call or a provider-packet/referral request. No dead-end pages, no ambiguous next step.

## Accessibility & Inclusion

WCAG 2.1 AA, established and verified per page (contrast, focus-visible states, ARIA on interactive components like the request-packet modal, keyboard navigation, skip link). Bilingual audience consideration (English/Spanish) for the individuals path. Maintain this bar for the pages still pending: `immigration-psychological-evaluations.html`, `forensic-psychological-evaluations.html`, `mental-health-psychological-evaluations.html`, `specialists.html`, `about.html`.

## Visual Signatures (deliberate, exempt from generic anti-pattern detection)

Some brand decisions get flagged by automated detectors as anti-patterns. The following are intentional, validated through multi-angle review, and considered project canon. They should not be removed by future polish passes without explicit brand approval.

- **Border-top teal on `.service-card`** (`border-top: 3px solid var(--teal)` over `border-radius: var(--radius-lg)`). Approved in Session 1 as part of the service-card P0 fix, validated multi-angle in Sessions 4 to 6, reaffirmed in Session 7 audit triage (2026-06-16). It is the visual signature of the three service cards across home, for-individuals, and for-attorneys, and will carry into the three service detail pages and specialists. Exempt from Impeccable's `border-accent-on-rounded` rule.
