# lw-organizations-api

::: warning Work in progress
This page is a stub. Full documentation will be added when this resource is complete.
:::

**Phase:** API  
**Dependencies:** lw-db, lw-shared, lw-characters-api, lw-economy-api, lw-legal-api  
**Dependency of:** lw-inventory-api, lw-hud, lw-government, lw-tribal-governance, lw-law-enforcement, lw-ranching, lw-businesses, lw-freight, lw-crafting-trades, lw-gangs, lw-medicine, lw-journalism, lw-legal-services

Unified organization, role, and permission model for all faction types on the server. Jobs, gangs, government positions, and tribal roles all run through this API. The only org model on the server — there is no parallel system.

## Purpose

- Organization and role definitions
- Member roster and position management
- Duty state tracking per character
- Pay rate management per role
- Item lock enforcement via `lw-inventory-api`
- Location tag management for org-specific zones

## Organization types

`LawEnforcement` · `Government` · `Criminal` · `Commercial` · `Professional` · `Tribal`

See [lw-shared](/resources/lw-shared#lwutilsenumsorganizationtype) for the full enum.

::: info Circular dependency
`lw-organizations-api` and `lw-inventory-api` have a mutual dependency. Start `lw-organizations-api` first. See [Build Order](/build-order) for details.
:::

## Planned exports

Server exports for org reads, member management, duty state, and role permissions will be documented here on completion.

## Planned events

Member join, leave, duty state change, and role change events will be documented here on completion.

---

> Licensed under the [Rangeland Public License v1.0](../license) — use it, modify it, don't sell it, don't ship it.