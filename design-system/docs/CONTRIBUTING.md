# Qeltrava AI Design System – Contribution Guide (CONTRIBUTING.md)

Welcome! Thank you for contributing to the Qeltrava AI Design System. This document contains guidelines, requirements, and best practices for creating and modifying components, layouts, hooks, and tokens.

---

## Technical Architectural Principles

1. **Tokens as Single Source of Truth**: Never write arbitrary/raw values (hex, pixel, transition times) in component styling. Always consume Design System CSS variables (e.g., `var(--color-primary)`, `var(--space-4)`).
2. **Strict TypeScript Typing**: Every file must compile under strict TypeScript compiler rules. Avoid `any` types. Expose proper component properties extending `BaseComponentProps`.
3. **Accessibility (ARIA & WCAG)**: All components must support screen reader accessibility, keyboard focus traps, standard keyboard navigation, and target at least WCAG AA color contrast standards.
4. **Tailwind Framework Integration**: Component styling should prioritize Tailwind classes (consuming semantic tokens) combined with the `cn()` merge utility.

---

## Coding Standards

### 1. Directory Structure
All contributions should fit within the correct folder structure:
- `components/` – Stateless reusable visual components
- `hooks/` – Custom React lifecycle hooks
- `providers/` – Global contexts and providers
- `layouts/` – Grid, flex, and block layout templates
- `accessibility/` – A11y helper components/utilities
- `motion/` – Animating transition primitives
- `utilities/` – Spacing, formatting, validation helpers

### 2. Component Design Pattern
Every new component should follow this template structure:
- Define props extending `BaseComponentProps`.
- Forward refs when wrapping interactive input controls.
- Implement `data-testid` on the outermost container element.
- Define a display name.

---

## Pull Request Checklist

Before submitting a Pull Request, ensure your branch satisfies the following checklist:
- [ ] Code compiles without errors: run `npx tsc --noEmit`.
- [ ] No ESLint or code style warnings.
- [ ] Standard keyboard interaction mappings implemented (Enter/Space on buttons, Escape to exit, Arrows in lists).
- [ ] ARIA tags (role, aria-expanded, aria-live) properly assigned.
- [ ] Visual verification of hover, focus, disabled, active, and error states.
- [ ] Responsive layouts audited (mobile screens to extra large displays).
- [ ] Dark and high-contrast color scheme rendering tested.
