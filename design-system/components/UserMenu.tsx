'use client';
/**
 * design-system/components/UserMenu.tsx
 * Qeltrava AI Design System – UserMenu
 *
 * Exposes a header block combining Avatar, name, and details within a standard Dropdown.
 */
import React from 'react';
import { cn } from '../utils';
import { Avatar } from './Avatar';
import { Dropdown, type DropdownMenuItem } from './Overlays';
import { Icon } from './Icon';
import type { BaseComponentProps } from '../types';

export interface UserMenuProps extends BaseComponentProps {
  /** User name displayed in the menu header */
  name:         string;
  /** Secondary subtitle (like email or role) */
  subtitle?:    string;
  /** User image source URL */
  src?:         string;
  /** Dropdown menu items mapping */
  items:        DropdownMenuItem[];
  /** Avatar size variant. Default is 'sm' */
  avatarSize?:  'xs' | 'sm' | 'md';
}

export function UserMenu({
  name,
  subtitle,
  src,
  items,
  avatarSize = 'sm',
  className,
  'data-testid': testId,
}: UserMenuProps) {
  const trigger = (
    <button
      type="button"
      className={cn(
        'inline-flex items-center gap-[var(--space-2)] p-1 rounded-full text-left',
        'hover:bg-[var(--color-bg-hover)] transition-all outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)]'
      )}
      aria-label={`User menu for ${name}`}
      data-testid={testId ? `${testId}-trigger` : undefined}
    >
      <Avatar src={src} name={name} size={avatarSize} />
      <span className="hidden sm:flex flex-col pr-[var(--space-2)] text-left select-none leading-tight">
        <span className="text-[var(--font-size-sm)] font-semibold text-[var(--color-text)] truncate max-w-[120px]">
          {name}
        </span>
        {subtitle && (
          <span className="text-[10px] text-[var(--color-text-tertiary)] truncate max-w-[120px]">
            {subtitle}
          </span>
        )}
      </span>
      <Icon name="ChevronDown" size={14} className="text-[var(--color-text-tertiary)] shrink-0 hidden sm:inline" />
    </button>
  );

  // Prepend a custom user-profile-header item into the dropdown menu items
  const menuItems: DropdownMenuItem[] = [
    {
      // Visual custom header block inside dropdown
      label: name,
      icon: (
        <div className="flex flex-col py-1 pointer-events-none select-none text-left leading-normal">
          <p className="font-semibold text-[var(--font-size-sm)] text-[var(--color-text)] truncate">{name}</p>
          {subtitle && (
            <p className="text-[var(--font-size-xs)] text-[var(--color-text-secondary)] truncate">{subtitle}</p>
          )}
        </div>
      ),
      disabled: true,
    },
    { divider: true },
    ...items,
  ];

  return (
    <Dropdown
      trigger={trigger}
      items={menuItems}
      align="right"
      className={className}
    />
  );
}
export default UserMenu;
