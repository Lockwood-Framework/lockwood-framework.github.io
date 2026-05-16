# lw-clothing-api

::: warning Work in progress
This page is a stub. Full documentation will be added when this resource is complete.
:::

**Phase:** API  
**Dependencies:** lw-db, lw-shared, lw-characters-api  
**Dependency of:** lw-character-selection, lw-character-creation, lw-needs

Owned clothing items, worn outfit state, dirt and damage state, and weather appropriateness. Damage and dirt are independent axes. Warmth rating is a numeric value per item — not an enum.

## Purpose

- Owned clothing item registry per character
- Active outfit state reads and writes
- Dirt and damage state tracking
- Warmth rating reads for `lw-needs` temperature calculations
- Weather appropriateness flags

## States

**Damage:** `Pristine` · `Worn` · `Damaged` · `Ruined`  
**Dirt:** `Clean` · `Dusty` · `Dirty` · `Filthy`

See [lw-shared](/resources/lw-shared#lwutilsenumsclothingdamagestate) for the full enums.

## Planned exports

Server exports for clothing reads, outfit management, and state updates will be documented here on completion.

## Planned events

Outfit change and state change events will be documented here on completion.

---

> Licensed under the [Rangeland Public License v1.0](../license) — use it, modify it, don't sell it, don't ship it.