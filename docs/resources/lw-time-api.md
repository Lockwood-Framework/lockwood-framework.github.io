# lw-time-api

::: warning Work in progress
This page is a stub. Full documentation will be added when this resource is complete.
:::

**Phase:** API  
**Dependencies:** lw-db, lw-shared  
**Dependency of:** lw-weather-api, lw-time-system, lw-needs, lw-hunting, lw-fishing, lw-foraging, lw-farming, lw-market

Owns the in-game calendar, clock state, and season tracking. The authoritative source for current in-game time across the server. Other resources read from this API — none of them manage time state independently.

## Purpose

- In-game time state (hour, minute, day, month, year)
- Season calculation based on current date
- 3:1 real-to-game time scaling state
- Time change event dispatch

## Planned exports

Server and client exports will be documented here on completion.

## Planned events

Time and season change events will be documented here on completion.

---

> Licensed under the [Rangeland Public License v1.0](../license) — use it, modify it, don't sell it, don't ship it.