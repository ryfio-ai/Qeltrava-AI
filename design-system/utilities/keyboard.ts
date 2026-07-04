/**
 * design-system/utilities/keyboard.ts
 * Keyboard navigation and event matching utilities.
 */

export const KEYS = {
  ENTER:     'Enter',
  ESCAPE:    'Escape',
  SPACE:     ' ',
  TAB:       'Tab',
  ARROW_UP:  'ArrowUp',
  ARROW_DOWN:'ArrowDown',
  ARROW_LEFT:'ArrowLeft',
  ARROW_RIGHT:'ArrowRight',
  HOME:      'Home',
  END:       'End',
  BACKSPACE: 'Backspace',
} as const;

/**
 * Checks if a keyboard event was triggered by one of the specified keys.
 */
export function isKeyOf(event: React.KeyboardEvent | KeyboardEvent, keyValues: string[] | string): boolean {
  if (Array.isArray(keyValues)) {
    return keyValues.includes(event.key);
  }
  return event.key === keyValues;
}
