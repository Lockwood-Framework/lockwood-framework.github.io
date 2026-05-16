# lw-weather-api

::: warning Work in progress
This page is a stub. Full documentation will be added when this resource is complete.
:::

**Phase:** API  
**Dependencies:** lw-db, lw-shared, lw-time-api  
**Dependency of:** lw-time-system, lw-needs, lw-clothing-api

Owns regional weather state across the map. Weather transitions are driven by season and time state from `lw-time-api`. Other resources read current weather to apply gameplay effects — `lw-needs` for temperature, `lw-clothing-api` for warmth appropriateness.

## Purpose

- Regional weather state engine
- Weather transition scheduling based on season
- Current weather read API for consuming resources
- Excludes `SnowClearing` — singleplayer only, never used in multiplayer logic

## Planned exports

Server and client exports will be documented here on completion.

## Planned events

Weather change events will be documented here on completion.

---

> Licensed under the [Rangeland Public License v1.0](../license) — use it, modify it, don't sell it, don't ship it.