# lw-property-api

::: warning Work in progress
This page is a stub. Full documentation will be added when this resource is complete.
:::

**Phase:** API  
**Dependencies:** lw-db, lw-shared, lw-characters-api, lw-economy-api  
**Dependency of:** lw-business-api, lw-world-objects, lw-taxation, lw-logging, lw-farming, lw-ranching, lw-gangs, lw-surveying

Land and building ownership, deeds, and property status management. The authoritative source for who owns what on the map.

## Purpose

- Property registration and ownership reads
- Deed transfers between characters and organizations
- Property status lifecycle (Available → Owned → Foreclosed etc.)
- Property type classification

## Property types

`Land` · `Homestead` · `Ranch` · `Farm` · `Timberland` · `MiningClaim` · `Commercial` · `Government`

See [lw-shared](/resources/lw-shared#lwutilsenumspropertytype) for the full enum.

## Planned exports

Server exports for property reads, ownership transfers, and deed management will be documented here on completion.

## Planned events

Ownership change and status change events will be documented here on completion.

---

> Licensed under the [Rangeland Public License v1.0](../license) — use it, modify it, don't sell it, don't ship it.