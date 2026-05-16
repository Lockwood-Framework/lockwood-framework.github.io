# lw-ui-core

::: warning Work in progress
This page is a stub. Full documentation will be added when this resource is complete.
:::

**Phase:** UI  
**Dependencies:** lw-shared, lw-core, lw-controls-api  
**Dependency of:** lw-character-selection, lw-character-creation, lw-hud, lw-inventory-ui, lw-health, lw-needs, lw-trading, lw-crafting, lw-government, lw-courts, lw-law-enforcement, lw-prison, lw-businesses, lw-robbery, lw-contraband, lw-medicine, lw-barber, lw-mortality, and most gameplay resources with UI

Vue 3 + Vite NUI foundation. Shared component library, `useNUI` and `useControls` composables, and design tokens. All resources that require NUI build on top of this — none roll their own NUI foundation.

## Purpose

- Vue 3 + Vite NUI base application
- Shared component library (notifications, dialogs, menus, progress bars)
- `useNUI` composable for NUI message handling
- `useControls` composable wired to `lw-controls-api`
- Design tokens for consistent visual language across all resource UIs

## Building on lw-ui-core

Resources that need NUI include `lw-ui-core` as a dependency and mount their own Vue app within the shared NUI context. Full component API and composable documentation will be added on completion.

## Planned exports

Client exports for NUI focus management and shared component triggers will be documented here on completion.

---

> Licensed under the [Rangeland Public License v1.0](../license) — use it, modify it, don't sell it, don't ship it.