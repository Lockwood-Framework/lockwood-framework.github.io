# Getting Started

Lockwood Framework is a standalone RedM server framework. It does not wrap or depend on VORP, RSG, RedEM:RP, or any other existing framework. If you are migrating from one of those, you are starting fresh.

## Requirements

- A working RedM server running `fx_version 'cerulean'`
- [oxmysql](https://github.com/overextended/oxmysql) — required by `lw-db`
- A MySQL-compatible database (MariaDB recommended)
- Node.js 18+ if you intend to build the NUI for `lw-ui-core`

## Installation

### 1. Download the resources

Clone or download each resource from the [Lockwood Framework GitHub organization](https://github.com/Lockwood-Framework). Resources are individual repositories — download only what you need, but respect the dependency order.

### 2. Place resources in your server

Drop each resource into your `resources/` folder. The recommended convention is a `[lockwood]` category folder:

```
resources/
└── [lockwood]/
    ├── lw-db/
    ├── lw-shared/
    ├── lw-controls-api/
    ├── lw-core/
    └── ...
```

### 3. Configure your database

Create a database for your server and configure oxmysql in your `server.cfg`:

```
set mysql_connection_string "mysql://user:password@localhost/your_database"
```

### 4. Add resources to server.cfg

Resources **must** be started in dependency order. Copy the following block into your `server.cfg` and add only the resources you are using:

```
# oxmysql — must come before lw-db
ensure oxmysql

# Foundation
ensure lw-db
ensure lw-shared
ensure lw-controls-api

# Core
ensure lw-core

# API
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

# UI & World
ensure lw-ui-core
ensure lw-world-objects

# Your resources go below this line
```

::: warning Order matters
Starting a resource before its dependencies are ready will cause export resolution failures at runtime. Always follow the order above. See the [Build Order](/build-order) page for the full dependency graph.
:::

### 5. Configure lw-core

At minimum, set your `StateIdPrefix` in `lw-core/server/config.lua` before starting the server for the first time. This prefix is baked into every generated state ID and **cannot be changed after characters have been created**.

```lua
Config.StateIdPrefix = 'LW' -- 2-4 uppercase letters, your choice
```

### 6. Set up ACE permissions

Add the following to your `server.cfg` before any `ensure` statements:

```
add_principal group.lw.mod        group.lw.user
add_principal group.lw.admin      group.lw.mod
add_principal group.lw.dev        group.lw.admin
add_principal group.lw.superadmin group.lw.dev

add_ace resource.lw-core command.add_ace          allow
add_ace resource.lw-core command.remove_ace       allow
add_ace resource.lw-core command.add_principal    allow
add_ace resource.lw-core command.remove_principal allow
```

### 7. Start your server

Start the server. On first boot, `lw-db` will run all pending migrations automatically. You should see migration confirmation in the server console. If you see errors, check your database connection string first.

## Next steps

- Read the [Conventions](/conventions) page before writing any resources that consume the framework
- Browse the [resource docs](/resources/lw-db) to understand what each API exposes
- Check the [Build Order](/build-order) before adding framework resources to existing servers

---

> Licensed under the [Rangeland Public License v1.0](./license) — use it, modify it, don't sell it, don't ship it.