'use client';
/**
 * design-system/components/TreeView.tsx
 * Qeltrava AI Design System – TreeView
 *
 * Recursive nested navigation tree component.
 * Conforms to the W3C WAI-ARIA Tree View Design Pattern.
 */
import React, { useState } from 'react';
import { cn } from '../utils';
import { Icon } from './Icon';
import type { BaseComponentProps } from '../types';

export interface TreeItem {
  id:        string;
  label:     string;
  icon?:     string;
  children?: TreeItem[];
  disabled?: boolean;
}

export interface TreeViewProps extends BaseComponentProps {
  /** Array of hierarchical tree items */
  items:             TreeItem[];
  /** Callback triggered when a leaf node is selected */
  onSelect?:         (item: TreeItem) => void;
  /** Set of initially expanded node IDs */
  defaultExpanded?:  string[];
  /** Controlled active/selected node ID */
  selectedId?:       string;
}

export function TreeView({
  items,
  onSelect,
  defaultExpanded = [],
  selectedId,
  className,
  'data-testid': testId,
}: TreeViewProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(defaultExpanded));

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const renderNode = (node: TreeItem, level: number = 0) => {
    const hasChildren = !!node.children && node.children.length > 0;
    const isExpanded = expandedIds.has(node.id);
    const isSelected = selectedId === node.id;

    const handleNodeClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (node.disabled) return;

      if (hasChildren) {
        toggleExpand(node.id);
      } else if (onSelect) {
        onSelect(node);
      }
    };

    return (
      <li
        key={node.id}
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
        aria-disabled={node.disabled}
        className="outline-none"
      >
        <div
          onClick={handleNodeClick}
          className={cn(
            'flex items-center gap-[var(--space-2)] px-[var(--space-2)] py-1.5 rounded-[var(--radius-md)] cursor-pointer select-none text-[var(--font-size-sm)] transition-colors',
            isSelected
              ? 'bg-[var(--color-primary)] text-white'
              : 'text-[var(--color-text-primary)] hover:bg-[var(--state-hover-overlay)]',
            node.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
          )}
          style={{ paddingLeft: `${Math.max(8, level * 16 + 8)}px` }}
        >
          {/* Collapse/Expand Chevron */}
          <span className="shrink-0 text-[var(--color-text-tertiary)] w-4 h-4 flex items-center justify-center">
            {hasChildren && (
              <span className={cn('transform transition-transform', isExpanded && 'rotate-90')}>
                <Icon name="ChevronRight" size={14} />
              </span>
            )}
          </span>

          {/* Node Icon */}
          {node.icon && (
            <span className={cn('shrink-0', isSelected ? 'text-white' : 'text-[var(--color-text-secondary)]')}>
              <Icon name={node.icon} size={14} />
            </span>
          )}

          {/* Node Label */}
          <span className="truncate">{node.label}</span>
        </div>

        {/* Recursive Children Renders */}
        {hasChildren && isExpanded && (
          <ul role="group" className="mt-0.5 space-y-0.5">
            {node.children!.map((child) => renderNode(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul
      role="tree"
      className={cn('space-y-0.5', className)}
      data-testid={testId}
    >
      {items.map((item) => renderNode(item, 0))}
    </ul>
  );
}
export default TreeView;
