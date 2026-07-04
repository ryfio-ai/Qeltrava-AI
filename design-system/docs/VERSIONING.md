# Qeltrava AI Design System – Versioning Policy (VERSIONING.md)

This document details the semantic versioning schema, component deprecation timeline, and upgrading protocols utilized by the Qeltrava AI Design System.

---

## Semantic Versioning (SemVer)

We strictly adhere to `MAJOR.MINOR.PATCH` versioning rules:

1. **MAJOR (`+1.0.0`)**: Backwards-incompatible API changes.
   - Removing components, hooks, or core layouts.
   - Modifying required parameters in component interfaces.
   - Large-scale refactoring of visual tokens causing breakages in existing pages.
2. **MINOR (`+0.1.0`)**: Backwards-compatible features.
   - Creating new components, hooks, layouts, or utilities.
   - Adding optional props or variant values to existing modules.
   - Introducing new theme layers (e.g. system or high-contrast overrides).
3. **PATCH (`+0.0.1`)**: Backwards-compatible bug fixes.
   - Fixing internal layout errors, alignment shifts, or CSS issues.
   - Resolving accessibility gaps (e.g., adding missing ARIA tags).
   - Repairing incorrect TypeScript types.

---

## Deprecation Process

When a component is marked for replacement, we follow a 3-step cycle:

```
[Phase 1: Deprecated Warning] ──> [Phase 2: Legacy Lock] ──> [Phase 3: Hard Removal]
      (Console warning)                (No bug fixes)              (Code deleted)
```

1. **Phase 1: Announcement (Minor Release)**
   - Component marked `@deprecated` in TypeScript jsdocs.
   - Console warning logged during development mode.
2. **Phase 2: Legacy Support (Next Major Release)**
   - Component moved to a `legacy/` subdirectory.
   - Standard maintenance frozen (no new visual or behavior updates).
3. **Phase 3: Removal (Subsequent Major Release)**
   - Component deleted from the codebase.

---

## Migration Guide Template

When upgrading major versions, every breaking change must include a migration guide following this template:

### Migration from v[X] to v[Y]

#### Component: [Component Name]
- **Type of Change**: [Breaking prop change / Component renamed / Component removed]
- **Description**: Detailed explanation of the change and rationale.
- **Before Upgrade**:
  ```tsx
  // Code snippet demonstrating old component usage
  ```
- **After Upgrade**:
  ```tsx
  // Code snippet demonstrating new component usage
  ```
