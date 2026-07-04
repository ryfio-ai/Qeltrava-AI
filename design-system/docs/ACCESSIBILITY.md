# Qeltrava AI Design System – Accessibility Standards (ACCESSIBILITY.md)

Accessibility is a primary quality metric of the Qeltrava AI Design System. Every component must be built to support all users, including those using assistive screen readers or navigating strictly via keyboard inputs.

---

## Contrast Standards (WCAG AA+)

- **Text Contrast**: A minimum contrast ratio of **4.5:1** is required for normal text and **3.0:1** for large text (bold 18px+ or 24px+).
- **Non-Text Contrast**: User interface controls, focus rings, state indicators, and icons must meet a contrast ratio of **3.0:1** against adjacent backgrounds.
- **Verification**: Colors defined inside `design-tokens.css` are pre-validated to meet WCAG AA contrast standards. Do not bypass variables with hardcoded colors.

---

## Keyboard Navigation Requirements

All interactive elements must be focusable and operable using standard keyboard keys:

| Key | Expected Action |
|---|---|
| `Tab` | Moves focus forward through interactive nodes. |
| `Shift + Tab` | Moves focus backward through interactive nodes. |
| `Enter` | Activates links or triggers button clicks. |
| `Space` | Selects checkboxes, checks radio buttons, toggles switches, or triggers buttons. |
| `Escape` | Closes open modals, dropdowns, draw sheets, or context menus. |
| `Arrow Keys` | Navigates between items in lists, combobox options, tabs, or slider elements. |

---

## Screen Reader Accessibility (ARIA Roles)

Expose state variables and roles to screen readers using standard ARIA configurations:

1. **Overlay Dialogs / Modals**:
   - Outermost panel must have `role="dialog"` or `role="alertdialog"`.
   - Must set `aria-modal="true"`.
   - Must point `aria-labelledby` to the visual title element.
2. **Inputs**:
   - Active input elements must have descriptive, associated `<label>` tags or `aria-label` / `aria-labelledby`.
   - Error states should assign `aria-invalid="true"` and point `aria-describedby` to the error notification text.
3. **Dropdowns & Selects**:
   - Triggers must have `aria-haspopup="listbox"` or `aria-haspopup="menu"`.
   - Expand state mapped to `aria-expanded={isOpen}`.
   - List options must have `role="option"` or `role="menuitem"`.
