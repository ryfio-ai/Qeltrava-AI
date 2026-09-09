# Qeltrava AI 2.0 — Global Typography & Color System Specification

## 1. Brand Identity & Positioning
- **Primary Category:** AI Engineering & Intelligent Systems Company
- **Core Positioning:** *"Engineering Intelligence for Real-World Operations."*
- **Supporting Statement:** *"We design and build AI-powered software, intelligent automation and digital systems that turn complex operations into measurable outcomes."*
- **Brand Personality:** Intelligent, Technical, Human, Premium.
- **Global Theme Requirement:** **LIGHT THEME ONLY**. No dark mode, theme toggles, or dark section overrides anywhere on the platform.

---

## 2. Global Typography System

### Primary Typeface: Anek Tamil
- **Google Fonts Source:** `Anek Tamil` (Variable weights: 100–800, Width variation setting: `112.5`)
- **Font Family CSS:** `"Anek Tamil", var(--font-anek-tamil), system-ui, sans-serif`
- **Optical & Variation:** `font-variation-settings: "wdth" 112.5;`
- **Role:** Default UI typeface for Navigation, Buttons, Body text, Headings, Forms, Inputs, Builder Lab cards, Tables, Labels, Metadata, Technical content, Dashboard interfaces, API output, Architecture labels, and Footer.

### Editorial Accent Typeface: Instrument Serif
- **Google Fonts Source:** `Instrument Serif` (400 Regular, 400 Italic)
- **Font Family CSS:** `"Instrument Serif", var(--font-instrument-serif), Georgia, serif`
- **Role:** Selective editorial accent used exclusively for Hero emphasis, Brand statements, Philosophical declarations, Pull quotes, Section emphasis, and selective Builder Lab headlines.
- **Rule:** Never use Instrument Serif for Buttons, Navigation, Forms, Technical labels, API output, Tables, or Dense UI.

---

## 3. Brand Color System

### Primary Color Palette
| Color | Hex | Role & Usage |
| :--- | :--- | :--- |
| **Light Blue** | `#E3F2FD` | Very light backgrounds, highlight surfaces, Builder Lab backgrounds, information panels, hover backgrounds |
| **Sky Blue** | `#90CAF9` | Secondary accents, borders, diagram connectors, supporting visual elements |
| **Primary Blue** | `#2196F3` | Primary CTA, interactive elements, links, active states, important highlights |
| **Deep Navy** | `#0D47A1` | Strong headings, brand emphasis, hero accents, high-priority UI typography |

### Supporting Structural Neutrals
| Color | Hex | Role & Usage |
| :--- | :--- | :--- |
| **White** | `#FFFFFF` | Main page background, card background |
| **Soft Neutral** | `#F8FAFC` | Secondary section background |
| **Light Border** | `#E2E8F0` | Default border |
| **Strong Border** | `#CBD5E1` | Input border, card highlight border |
| **Primary Text** | `#0F172A` | Primary readable body text |
| **Secondary Text** | `#475569` | Supporting text, subheadlines |
| **Muted Text** | `#64748B` | Metadata, tertiary text, captions |

---

## 4. CSS Variable Architecture

```css
:root {
  --qeltrava-blue-50:       #E3F2FD;
  --qeltrava-blue-200:      #90CAF9;
  --qeltrava-blue-500:      #2196F3;
  --qeltrava-blue-900:      #0D47A1;
  --qeltrava-white:         #FFFFFF;
  --qeltrava-text:          #0F172A;
  --qeltrava-text-secondary: #475569;
  --qeltrava-text-muted:    #64748B;
  --qeltrava-border:        #E2E8F0;
  --qeltrava-border-strong: #CBD5E1;
  --qeltrava-surface:       #FFFFFF;
  --qeltrava-surface-soft:  #F8FAFC;
}
```

---

## 5. Page Background Rhythm & Section Hierarchy

1. **Hero:** `#FFFFFF`
2. **Trust / Proof Strip:** `#F8FAFC`
3. **Builder Lab Section:** `#E3F2FD`
4. **The Difference:** `#F8FAFC`
5. **Engineering Pillars:** `#FFFFFF`
6. **Proprietary Products:** `#F8FAFC`
7. **Operational Proof:** `#FFFFFF`
8. **Industrial / Manufacturing:** `#F8FAFC`
9. **Brand Philosophy:** `#FFFFFF`
10. **Methodology:** `#F8FAFC`
11. **Final CTA:** `#E3F2FD`
12. **Footer:** `#F8FAFC`

---

## 6. Accessibility & Responsive Rules
- All text meets **WCAG AA** contrast requirements against white `#FFFFFF`, soft surface `#F8FAFC`, and light blue `#E3F2FD`.
- `#90CAF9` is strictly used for borders and connectors, never for small body text.
- Full Tamil language glyph support enabled via `Anek Tamil` subset loading (`subsets: ["latin", "tamil"]`).
