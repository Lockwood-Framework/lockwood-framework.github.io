# lw-world-objects

::: warning Work in progress
This page is a stub. Full documentation will be added when this resource is complete.
:::

**Phase:** World  
**Dependencies:** lw-db, lw-shared, lw-core, lw-property-api, lw-characters-api  
**Dependency of:** lw-crafting, lw-hunting, lw-fishing, lw-mining, lw-logging, lw-farming, lw-ranching, lw-businesses, lw-smuggling, lw-contraband, lw-gangs

Placeable persistent world entities with health, damage, theft, ownership, and decay state. Objects survive server restarts and are respawned on boot from database state.

## Purpose

- Persistent placeable entity registration and management
- Health, damage, and decay state tracking
- Ownership and theft state per object
- Server-restart respawn from saved state
- Object type definitions for consuming resources

## Object states

`Active` · `Damaged` · `Decayed` · `Destroyed` · `Respawning`

`Damaged` requires materials to repair. `Decayed` requires tending or maintenance. Different resolution paths. See [lw-shared](/resources/lw-shared#lwutilsenumsobjectstate) for the full enum.

## Consuming this resource

Resources that need placeable persistent entities register their object types with `lw-world-objects` and receive callbacks for state changes. They do not manage the entity lifecycle directly.

## Planned exports

Server exports for object registration, placement, and state management will be documented here on completion.

## Planned events

Object state change, damage, decay, and destruction events will be documented here on completion.

---

> Licensed under the [Rangeland Public License v1.0](../license) — use it, modify it, don't sell it, don't ship it.