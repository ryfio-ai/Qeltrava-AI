# Qeltrava AI Design System – Component Template (COMPONENT_TEMPLATE.md)

Use this markdown document as a copy-paste boilerplate when creating new components in the `design-system/components/` directory.

---

## 1. Directory Structure

Place the new file in:
`design-system/components/[ComponentName].tsx`

And immediately expose it in `design-system/index.ts`.

---

## 2. Code Boilerplate

```tsx
'use client';
/**
 * design-system/components/MyComponent.tsx
 * Qeltrava AI Design System – MyComponent
 *
 * [Brief description of what this component does]
 */
import React, { forwardRef } from 'react';
import { cn } from '../utils';
import type { BaseComponentProps } from '../types';

export interface MyComponentProps extends BaseComponentProps {
  /** Optional visual variant. Default is 'default' */
  variant?:    'default' | 'primary' | 'subtle';
  /** Children element contents */
  children?:   React.ReactNode;
}

export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(({
  variant = 'default',
  children,
  className,
  'data-testid': testId,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-[var(--duration-150)]',
        variant === 'default' && 'bg-[var(--surface-1)] text-[var(--color-text)]',
        variant === 'primary' && 'bg-[var(--color-primary)] text-[var(--color-text-inverted)]',
        variant === 'subtle' && 'bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]',
        className
      )}
      data-testid={testId}
      {...props}
    >
      {children}
    </div>
  );
});

MyComponent.displayName = 'MyComponent';
export default MyComponent;
```

---

## 3. Checklist for Complete Components

- [ ] Extends `BaseComponentProps` and supports `className` + `data-testid`.
- [ ] Forwards React ref to the root interactive component/element.
- [ ] Contains zero hardcoded hex codes, pixel sizes, or inline styles.
- [ ] Includes brief JSDoc comments explaining all component properties.
- [ ] Uses only design system tokens (`var(--space-*)`, `var(--radius-*)`, etc.).
- [ ] Meets WCAG AA contrast standards across dark and high-contrast themes.
