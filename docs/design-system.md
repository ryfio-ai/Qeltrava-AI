# Qeltrava AI 2.0 — Design System Specification

## Brand Identity & Positioning
- **Primary Category:** AI Engineering & Intelligent Systems
- **Core Positioning:** *"Engineering Intelligence for Real-World Operations."*
- **Supporting Statement:** *"We design and build AI-powered software, intelligent automation and digital systems that turn complex operations into measurable outcomes."*
- **Brand Voice:** Confident, Technical, Precise, Quiet, Outcome-Driven.

## Color Tokens

```scss
// Backgrounds
$bg-primary: #080B12;      // Deep Navy / Near Black
$bg-surface: #0B1020;      // Surface Card Layer
$bg-elevated: #0F172A;     // Elevated Container

// Brand Colors
$brand-navy: #1B2A4A;      // Deep Brand Navy
$brand-accent: #2E75B6;    // Signal Blue (Primary Accent)
$brand-accent-hover: #256096; // Hover State

// Accents & Telemetry
$accent-emerald: #10B981; // Operational Success / Verification
$accent-amber: #F59E0B;   // Telemetry Warning / Risk
$accent-teal: #14B8A6;    // Process Intelligence
$accent-[#FF6154]: #FF6154; // Product Hunt / Flagship Badge

// Typography & Borders
$text-primary: #FFFFFF;
$text-secondary: #94A3B8; // slate-400
$text-muted: #64748B;     // slate-500
$border-soft: #1E293B;    // slate-800
```

## Typography Scale
- **Display Hero:** 64px - 80px / Leading 1.08 / Extrabold / Tracking Tight
- **Section Heading:** 36px - 56px / Leading 1.15 / Extrabold
- **Subheading / Card Title:** 20px - 28px / Leading 1.3 / Bold
- **Body Large:** 18px - 20px / Leading 1.6 / Normal
- **Body Regular:** 14px - 16px / Leading 1.5 / Normal
- **Technical Monospace:** Monospace 10px - 13px / Tracking Wider / Uppercase

## Interaction Principles
- Hover card scale: Subtly translate `y: -2px` with border transition.
- Micro-interactions: Node hover inspections in Hero visual canvas.
- Reduced Motion: Respect `prefers-reduced-motion` with instant opacity transitions.
- Focus & Keyboard Access: Visible outline ring on interactive controls (`ring-2 ring-[#2E75B6]`).
