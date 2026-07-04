/**
 * design-system/constants/keyboard.ts
 * Key codes used in keyboard navigation handlers across DS components.
 */

export const Keys = {
  Enter:     'Enter',
  Space:     ' ',
  Escape:    'Escape',
  Tab:       'Tab',
  ArrowUp:   'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight:'ArrowRight',
  Home:      'Home',
  End:       'End',
  Backspace: 'Backspace',
  Delete:    'Delete',
  PageUp:    'PageUp',
  PageDown:  'PageDown',
} as const;

export type Key = (typeof Keys)[keyof typeof Keys];

/** Returns true if event key is Enter or Space (activation keys) */
export function isActivationKey(e: Pick<KeyboardEvent, 'key'>): boolean {
  return e.key === Keys.Enter || e.key === Keys.Space;
}

/** Returns true if event key is ArrowUp or ArrowLeft */
export function isPrevKey(e: Pick<KeyboardEvent, 'key'>, orientation: 'vertical' | 'horizontal' = 'vertical'): boolean {
  return orientation === 'vertical' ? e.key === Keys.ArrowUp : e.key === Keys.ArrowLeft;
}

/** Returns true if event key is ArrowDown or ArrowRight */
export function isNextKey(e: Pick<KeyboardEvent, 'key'>, orientation: 'vertical' | 'horizontal' = 'vertical'): boolean {
  return orientation === 'vertical' ? e.key === Keys.ArrowDown : e.key === Keys.ArrowRight;
}
