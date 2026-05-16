# lw-inventory-api

::: warning Work in progress
This page is a stub. Full documentation will be added when this resource is complete.
:::

**Phase:** API  
**Dependencies:** lw-db, lw-shared, lw-characters-api, lw-organizations-api  
**Dependency of:** lw-horses, lw-needs, lw-crafting, lw-hunting, lw-fishing, lw-foraging, lw-mining, lw-logging, lw-farming, lw-ranching, lw-robbery, lw-smuggling, lw-contraband, lw-medicine, lw-mortality, and most gameplay resources

Items, storage, transfers, provenance lock enforcement, and role-restricted item access. The authoritative source for what any character or container holds.

## Purpose

- Item definitions and storage management
- Character and container inventory reads and writes
- Item transfers between characters and containers
- Provenance tracking for stolen goods
- Role-restricted item access via `lw-organizations-api`

::: info Circular dependency
`lw-inventory-api` and `lw-organizations-api` have a mutual dependency. Start `lw-organizations-api` first. Deferred export resolution in each resource handles the circular reference at runtime. See [Build Order](/build-order) for details.
:::

## Planned exports

Server exports for inventory reads, item transfers, and storage management will be documented here on completion.

## Planned events

Inventory change events will be documented here on completion.

---

> Licensed under the [Rangeland Public License v1.0](../license) — use it, modify it, don't sell it, don't ship it.