# lw-economy-api

::: warning Work in progress
This page is a stub. Full documentation will be added when this resource is complete.
:::

**Phase:** API  
**Dependencies:** lw-db, lw-shared, lw-characters-api  
**Dependency of:** lw-inventory-api, lw-property-api, lw-business-api, lw-organizations-api, lw-market, lw-trading, lw-banking, lw-gambling, and most gameplay resources

Owns all currency, transactions, and the ledger. The single source of truth for money movement on the server. No resource moves money without going through this API.

## Purpose

- Character and organization balance management
- Atomic transactions with ledger entries
- Transaction history reads
- Currency formatting utilities

## Planned exports

Server exports for balance reads, transfers, and ledger queries will be documented here on completion.

## Planned events

Transaction events will be documented here on completion.

---

> Licensed under the [Rangeland Public License v1.0](../license) — use it, modify it, don't sell it, don't ship it.