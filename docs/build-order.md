# Build Order

All 22 framework resources listed in the order they must be started. Each resource may only be started after all of its dependencies are running. This order is the only supported configuration.

## Dependency graph

| # | Resource | Phase | Dependencies |
|---|---|---|---|
| 1 | [lw-db](/resources/lw-db) | Foundation | — |
| 2 | [lw-shared](/resources/lw-shared) | Foundation | — |
| 3 | [lw-controls-api](/resources/lw-controls-api) | Foundation | lw-db, lw-shared |
| 4 | [lw-core](/resources/lw-core) | Core | lw-db, lw-shared |
| 5 | [lw-characters-api](/resources/lw-characters-api) | API | lw-db, lw-shared, lw-core |
| 6 | [lw-time-api](/resources/lw-time-api) | API | lw-db, lw-shared |
| 7 | [lw-weather-api](/resources/lw-weather-api) | API | lw-db, lw-shared, lw-time-api |
| 8 | [lw-economy-api](/resources/lw-economy-api) | API | lw-db, lw-shared, lw-characters-api |
| 9 | [lw-inventory-api](/resources/lw-inventory-api) | API | lw-db, lw-shared, lw-characters-api, lw-organizations-api |
| 10 | [lw-skills-api](/resources/lw-skills-api) | API | lw-db, lw-shared, lw-characters-api |
| 11 | [lw-reputation-api](/resources/lw-reputation-api) | API | lw-db, lw-shared, lw-characters-api |
| 12 | [lw-legal-api](/resources/lw-legal-api) | API | lw-db, lw-shared, lw-characters-api |
| 13 | [lw-property-api](/resources/lw-property-api) | API | lw-db, lw-shared, lw-characters-api, lw-economy-api |
| 14 | [lw-business-api](/resources/lw-business-api) | API | lw-db, lw-shared, lw-characters-api, lw-economy-api, lw-property-api |
| 15 | [lw-bounty-api](/resources/lw-bounty-api) | API | lw-db, lw-shared, lw-characters-api, lw-legal-api |
| 16 | [lw-government-api](/resources/lw-government-api) | API | lw-db, lw-shared, lw-characters-api, lw-legal-api |
| 17 | [lw-organizations-api](/resources/lw-organizations-api) | API | lw-db, lw-shared, lw-characters-api, lw-economy-api, lw-legal-api |
| 18 | [lw-clothing-api](/resources/lw-clothing-api) | API | lw-db, lw-shared, lw-characters-api |
| 19 | [lw-appearance-api](/resources/lw-appearance-api) | API | lw-db, lw-shared, lw-characters-api |
| 20 | [lw-horse-appearance-api](/resources/lw-horse-appearance-api) | API | lw-db, lw-shared, lw-characters-api |
| 21 | [lw-ui-core](/resources/lw-ui-core) | UI | lw-shared, lw-core, lw-controls-api |
| 22 | [lw-world-objects](/resources/lw-world-objects) | World | lw-db, lw-shared, lw-core, lw-property-api, lw-characters-api |

::: info lw-inventory-api and lw-organizations-api
These two have a mutual dependency. `lw-inventory-api` depends on `lw-organizations-api` for role-restricted item access, and `lw-organizations-api` depends on `lw-inventory-api` for item locks. Both must be started before either is fully operational. Start `lw-organizations-api` first (#17 in the order above), then `lw-inventory-api` (#9) — the deferred export resolution in each resource handles the circular reference at runtime.
:::

## server.cfg block

Copy this directly into your `server.cfg`. Remove any resources you are not using, but never reorder the ones you keep.

```
ensure oxmysql

ensure lw-db
ensure lw-shared
ensure lw-controls-api
ensure lw-core
ensure lw-characters-api
ensure lw-time-api
ensure lw-weather-api
ensure lw-economy-api
ensure lw-inventory-api
ensure lw-skills-api
ensure lw-reputation-api
ensure lw-legal-api
ensure lw-property-api
ensure lw-business-api
ensure lw-bounty-api
ensure lw-government-api
ensure lw-organizations-api
ensure lw-clothing-api
ensure lw-appearance-api
ensure lw-horse-appearance-api
ensure lw-ui-core
ensure lw-world-objects
```

## Phase overview

| Phase | Resources | Purpose |
|---|---|---|
| Foundation | 1–3 | Database, utilities, input |
| Core | 4 | Session and lifecycle |
| API | 5–20 | Data and state management |
| UI | 21 | NUI foundation |
| World | 22 | Persistent world entities |

---

> Licensed under the [Rangeland Public License v1.0](./license) — use it, modify it, don't sell it, don't ship it.