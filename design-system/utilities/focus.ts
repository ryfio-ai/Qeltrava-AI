/**
 * design-system/utilities/focus.ts
 * Focus management utilities.
 */

const FOCUSABLE_SELECTOR =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';

/**
 * Returns a list of focusable child elements within a parent node.
 */
export function getFocusableElements(element: HTMLElement): HTMLElement[] {
  return Array.from(element.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
}

/**
 * Focuses the first focusable element inside the parent node.
 */
export function focusFirstElement(element: HTMLElement): boolean {
  const focusable = getFocusableElements(element);
  const first = focusable[0];
  if (first) {
    first.focus();
    return true;
  }
  return false;
}
