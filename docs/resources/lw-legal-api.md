# lw-legal-api

::: warning Work in progress
This page is a stub. Full documentation will be added when this resource is complete.
:::

**Phase:** API  
**Dependencies:** lw-db, lw-shared, lw-characters-api  
**Dependency of:** lw-bounty-api, lw-government-api, lw-organizations-api, lw-crime, lw-law-enforcement, lw-prison, lw-courts, lw-smuggling, lw-bounty-hunting, lw-tribal-governance

State laws, violations, criminal records, and per-state wanted levels. The authoritative source for a character's legal standing across all states in the map.

## Purpose

- Criminal record reads and writes
- Per-state wanted level management
- Law and violation definitions
- Warrant issuance and expiry

## Wanted levels

| Level | Meaning |
|---|---|
| `None` | Clean |
| `Suspected` | Stop-and-question without warrant |
| `Wanted` | Active pursuit |
| `Notorious` | Known criminal, elevated response |
| `Outlaw` | Shoot on sight |

See [lw-shared](/resources/lw-shared#lwutilsenumswantedlevel) for the full enum.

## Planned exports

Server exports for criminal record reads, wanted level management, and violation logging will be documented here on completion.

## Planned events

Wanted level change and warrant events will be documented here on completion.

---

> Licensed under the [Rangeland Public License v1.0](../license) — use it, modify it, don't sell it, don't ship it.