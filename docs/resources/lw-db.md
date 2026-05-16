# lw-db

**Phase:** Foundation  
**Dependencies:** none  
**Dependency of:** every resource that touches the database

The database layer for Lockwood Framework. A thin wrapper around [oxmysql](https://github.com/overextended/oxmysql) that provides synchronous and asynchronous query methods plus a forward-only migration engine.

## Manifest requirement

Every resource that uses the database must include oxmysql's library in its manifest:

```lua
server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/your_script.lua',
}
```

## Importing DB

`DB` is not a cross-resource global. Import it at the top of every server script that needs it:

```lua
local DB = exports['lw-db'].DB()
```

## Sync methods

All sync methods must be called inside a `Citizen.CreateThread`.

```lua
DB.query(query, params)         -- array of row tables, {} if no match
DB.single(query, params)        -- first row table or nil
DB.scalar(query, params)        -- first column of first row or nil
DB.insert(query, params)        -- auto-increment ID
DB.update(query, params)        -- affected row count
DB.prepare(query, params)       -- single or batch prepared statement
DB.transaction(queries, params) -- true on commit, false on rollback
DB.rawExecute(query, params)    -- raw driver result
```

`params` is always optional and defaults to `{}`.

## Async methods

Same names with an `Async` suffix and a callback as the final argument:

```lua
DB.queryAsync(query, params, cb)
DB.singleAsync(query, params, cb)
DB.scalarAsync(query, params, cb)
DB.insertAsync(query, params, cb)
DB.updateAsync(query, params, cb)
```

## prepare

```lua
-- Single execution
DB.prepare('SELECT * FROM `t` WHERE `id` = ?', { id })

-- Batch execution
DB.prepare('INSERT INTO `t` (`name`) VALUES (?)', { { 'alice' }, { 'bob' } })
```

## transaction

```lua
-- Shared params
DB.transaction(
    { 'INSERT INTO `a` VALUES (?)', 'INSERT INTO `b` VALUES (?)' },
    { val }
)

-- Per-query params
DB.transaction({
    { query = 'INSERT INTO `a` VALUES (?)', values = { val1 } },
    { query = 'INSERT INTO `b` VALUES (?)', values = { val2 } },
})
```

## Migrations

Migrations are registered at the top level of the script, never inside an event handler. See [Conventions](/conventions#migrations) for the full rules.

```lua
exports['lw-db']:RegisterMigration(
    'my-resource',   -- resource name
    '001_create_x',  -- unique name, sortable prefix recommended
    [[
        CREATE TABLE IF NOT EXISTS `x` (
            `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
            PRIMARY KEY (`id`)
        )
    ]]
)
```

Migrations are tracked in `lw_migrations` by resource name and migration name. Already-run migrations are silently skipped. Migrations registered before `lw-db` is ready are queued and drained automatically on boot.

### CREATE TABLE rules

- Never specify `ENGINE`, `CHARSET`, or `COLLATE` — always inherit the database default
- Use `CREATE TABLE IF NOT EXISTS` — migrations may be registered multiple times across restarts
- FK constraints on `state_id` must include `ON UPDATE CASCADE ON DELETE CASCADE`

## Ready event

```lua
AddEventHandler('lw-db:ready', function()
    CreateThread(function()
        -- DB is live, all migrations have run
        -- safe to use sync DB calls here
    end)
end)
```

---

> Licensed under the [Rangeland Public License v1.0](../license) — use it, modify it, don't sell it, don't ship it.