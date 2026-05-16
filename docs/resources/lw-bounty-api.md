# lw-bounty-api

::: warning Work in progress
This page is a stub. Full documentation will be added when this resource is complete.
:::

**Phase:** API  
**Dependencies:** lw-db, lw-shared, lw-characters-api, lw-legal-api  
**Dependency of:** lw-law-enforcement, lw-bounty-hunting

Bounty posting, tracking, and collection. The authoritative source for active bounties on the server. `lw-law-enforcement` creates bounties. `lw-bounty-hunting` reads and resolves them.

## Purpose

- Bounty registration against a state ID
- Active bounty reads by target or region
- Bounty claim and resolution
- Bounty expiry management

## Planned exports

Server exports for bounty reads, posting, and resolution will be documented here on completion.

## Planned events

Bounty posted, claimed, and expired events will be documented here on completion.

---

> Licensed under the [Rangeland Public License v1.0](../license) — use it, modify it, don't sell it, don't ship it.