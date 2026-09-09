# Qeltrava AI 2.0 — GSAP Motion System Specification

## 1. Motion Principles
- **Intelligent & Engineered:** Motion must explain system relationships, data pipelines, and workflow progress.
- **Fail-Safe & Accessible:** Content must NEVER depend on GSAP for rendering or visibility. If JS fails or reduced motion is enabled, all content is 100% visible and accessible.
- **Selective Plugin Strategy:**
  - Standard registered plugins: `ScrollTrigger`, `ScrollToPlugin`, `MotionPathPlugin`, `Observer`, `Flip`, `TextPlugin`.
  - Optional plugins (`SplitText`, `DrawSVGPlugin`): Implemented with 2-mode architecture featuring native DOM line-wrap / CSS stroke-dashoffset fallbacks.
  - Heavy/Unused plugins (`GSDevTools`, `Physics2DPlugin`, `PixiPlugin`) are omitted from bundle dependencies.

---

## 2. Motion Tokens & Easings
```ts
DURATION_FAST   = 0.18s; // Micro-interactions (buttons, hovers)
DURATION_NORMAL = 0.32s; // Card transitions, tabs
DURATION_SLOW   = 0.65s; // Section viewport reveals
DURATION_HERO   = 0.90s; // Cinematic hero & system visualizations

POWER3_OUT    = "power3.out";    // Primary reveal easing
POWER2_OUT    = "power2.out";    // Interactive state easing
POWER2_IN_OUT = "power2.inOut";  // Connector path drawing
EXPO_OUT      = "expo.out";      // Premium hero entrance
```

---

## 3. Reusable Motion Components (`components/motion/`)

| Component | Selector / Usage | Fallback Behavior |
| :--- | :--- | :--- |
| **Reveal** | `Reveal.tsx` — Viewport entry (`opacity: 0 → 1`, `y: 30 → 0`) | Native CSS layout display if JS disabled |
| **TextReveal** | `TextReveal.tsx` — Line/sentence entrance | Native inline text display |
| **DrawLine** | `DrawLine.tsx` — SVG connector flow | CSS `stroke-dasharray` / `stroke-dashoffset` |
| **Magnetic** | `Magnetic.tsx` — Desktop CTA attraction (6-10px max offset) | Disabled on touch/mobile and reduced-motion |
| **Parallax** | `Parallax.tsx` — Depth scrub (10-30px max offset) | Disabled on mobile & reduced-motion |
| **Stagger** | `Stagger.tsx` — Sequential child reveal | Direct rendering |

---

## 4. Page Motion Hierarchy & Density

- **HIGH MOTION:** Homepage Hero, Build Lab (`#E3F2FD`), Architecture Builder Canvas, Manufacturing Data Pipeline (`IndustrialDataFlow.tsx`).
- **MEDIUM MOTION:** Proprietary Products, Engineering Pillars, Methodologies, Case Studies.
- **LOW MOTION / STILLNESS:** About Page, Technology Directory, Contact Page, Legal, Footer.
