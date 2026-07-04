/**
 * design-system/index.ts
 * Qeltrava AI Design System – Barrel export
 *
 * Import from this file in application code:
 *   import { Button, Card, Dialog } from '@/design-system';
 */

// ── Utilities ──────────────────────────────────────────────────────────────
export { cn, focusRing }                                      from './utils';
export * as tokens                                             from './tokens';
export * from './utilities';

// ── Foundation ────────────────────────────────────────────────────────────
export { Button }                                              from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize }         from './components/Button';

export { Icon }                                                from './components/Icon';
export type { IconProps, IconSize }                            from './components/Icon';

export {
  Heading, Text, Lead, Label, Caption, Overline, Code,
}                                                              from './components/Typography';
export type {
  HeadingProps, TextProps, LabelProps,
}                                                              from './components/Typography';

export { Link }                                                from './components/Link';
export type { LinkProps, LinkVariant }                         from './components/Link';

export { Badge }                                               from './components/Badge';
export type { BadgeProps, BadgeVariant, BadgeSize }            from './components/Badge';

export { Avatar }                                              from './components/Avatar';
export type { AvatarProps, AvatarStatus }                      from './components/Avatar';

export { AvatarGroup }                                         from './components/AvatarGroup';
export type { AvatarGroupProps }                               from './components/AvatarGroup';

// ── Inputs ────────────────────────────────────────────────────────────────
export { Input }                                               from './components/Input';
export type { InputProps, InputSize }                          from './components/Input';

export { Textarea }                                            from './components/Textarea';
export type { TextareaProps, TextareaSize }                    from './components/Textarea';

export { Select }                                              from './components/Select';
export type { SelectProps, SelectSize, SelectOption }          from './components/Select';

export { Checkbox }                                            from './components/Checkbox';
export type { CheckboxProps, CheckboxSize }                    from './components/Checkbox';

export { Radio, RadioGroup }                                   from './components/Radio';
export type { RadioProps, RadioGroupProps, RadioSize }         from './components/Radio';

export { Switch }                                              from './components/Switch';
export type { SwitchProps, SwitchSize }                        from './components/Switch';

export { Combobox }                                            from './components/Combobox';
export type { ComboboxProps, ComboboxOption }                  from './components/Combobox';

export { SearchInput }                                         from './components/SearchInput';
export type { SearchInputProps }                               from './components/SearchInput';

export { OTPInput }                                            from './components/OTPInput';
export type { OTPInputProps }                                  from './components/OTPInput';

export { FileUpload }                                          from './components/FileUpload';
export type { FileUploadProps, FileUploadVariant }              from './components/FileUpload';

export { Rating }                                              from './components/Rating';
export type { RatingProps }                                    from './components/Rating';

export { TagInput }                                            from './components/TagInput';
export type { TagInputProps }                                  from './components/TagInput';

export { Carousel }                                            from './components/Carousel';
export type { CarouselProps }                                  from './components/Carousel';

// ── Feedback ──────────────────────────────────────────────────────────────
export { Alert }                                               from './components/Alert';
export type { AlertProps, AlertVariant }                       from './components/Alert';

export {
  ToastProvider, useToast,
}                                                              from './components/Toast';
export type {
  ToastProviderProps, ToastItem, ToastVariant, ToastPosition,
}                                                              from './components/Toast';

export {
  Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard,
}                                                              from './components/Skeleton';
export type { SkeletonProps, SkeletonTextProps }               from './components/Skeleton';

export { Spinner, SpinnerOverlay }                             from './components/Spinner';
export type { SpinnerProps, SpinnerSize }                      from './components/Spinner';

export {
  Progress, CircularProgress, Steps,
}                                                              from './components/Progress';
export type {
  ProgressProps, CircularProgressProps, StepsProps,
  ProgressSize, ProgressVariant,
}                                                              from './components/Progress';

export { Callout }                                             from './components/Callout';
export type { CalloutProps }                                   from './components/Callout';

export { Banner }                                              from './components/Banner';
export type { BannerProps }                                    from './components/Banner';

export { AnnouncementBar }                                     from './components/AnnouncementBar';
export type { AnnouncementBarProps }                           from './components/AnnouncementBar';

export { StatusIndicator }                                     from './components/StatusIndicator';
export type { StatusIndicatorProps, StatusIndicatorVariant }   from './components/StatusIndicator';

// ── Containers ────────────────────────────────────────────────────────────
export { Card, CardHeader, CardBody, CardFooter, CardImage }   from './components/Card';
export type { CardProps, CardVariant, CardPadding }            from './components/Card';

export { StatCard }                                            from './components/StatCard';
export type { StatCardProps, StatTrend }                       from './components/StatCard';

export { MetricCard }                                          from './components/MetricCard';
export type { MetricCardProps }                                from './components/MetricCard';

export {
  Surface, Divider, Container, Stack,
}                                                              from './components/Containers';
export type {
  SurfaceProps, SurfaceLevel,
  DividerProps, DividerOrientation,
  ContainerProps, ContainerSize,
  StackProps, StackDirection, StackGap,
}                                                              from './components/Containers';

export { ScrollArea }                                          from './components/ScrollArea';
export type { ScrollAreaProps }                                from './components/ScrollArea';

// ── Navigation ────────────────────────────────────────────────────────────
export { Breadcrumb, Pagination }                              from './components/Navigation';
export type {
  BreadcrumbProps, BreadcrumbItem,
  PaginationProps,
}                                                              from './components/Navigation';

// ── Overlays ──────────────────────────────────────────────────────────────
export {
  Dialog, Drawer, Tooltip, Dropdown, Popover,
}                                                              from './components/Overlays';
export type {
  DialogProps, DialogSize,
  DrawerProps, DrawerSide,
  TooltipProps, TooltipSide,
  DropdownProps, DropdownItem, DropdownMenuItem,
  PopoverProps,
}                                                              from './components/Overlays';

export { ContextMenu }                                         from './components/ContextMenu';
export type { ContextMenuProps }                               from './components/ContextMenu';

export { CommandMenu }                                         from './components/CommandMenu';
export type { CommandMenuProps, CommandItem, CommandGroup }     from './components/CommandMenu';

// ── Data Display ──────────────────────────────────────────────────────────
export { Table, Timeline, Accordion, Tabs }                    from './components/DataDisplay';
export type {
  TableProps, TableColumn,
  TimelineProps, TimelineEvent,
  AccordionProps, AccordionItem,
  TabsProps, TabItem,
}                                                              from './components/DataDisplay';

export { TreeView }                                            from './components/TreeView';
export type { TreeViewProps, TreeItem }                        from './components/TreeView';

export { UserMenu }                                            from './components/UserMenu';
export type { UserMenuProps }                                  from './components/UserMenu';

export { Stepper }                                             from './components/Stepper';
export type { StepperProps, StepItem }                         from './components/Stepper';

export { SplitPane }                                           from './components/SplitPane';
export type { SplitPaneProps }                                 from './components/SplitPane';

export { Masonry }                                             from './components/Masonry';
export type { MasonryProps }                                   from './components/Masonry';

// ── States ────────────────────────────────────────────────────────────────
export {
  EmptyState, ErrorState, SuccessState, LoadingState,
}                                                              from './components/States';
export type {
  EmptyStateProps, ErrorStateProps, SuccessStateProps, LoadingStateProps,
}                                                              from './components/States';

// ── Layouts ───────────────────────────────────────────────────────────────
export * from './layouts';

// ── Motion ────────────────────────────────────────────────────────────────
export * from './motion';

// ── Hooks ─────────────────────────────────────────────────────────────────
export * from './hooks';

// ── Providers ─────────────────────────────────────────────────────────────
export * from './providers';

// ── Accessibility ─────────────────────────────────────────────────────────
export * from './accessibility';
