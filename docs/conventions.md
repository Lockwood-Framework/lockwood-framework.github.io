# Conventions

All resources in the Lockwood Framework follow the same set of conventions. If you are building a resource that consumes the framework, read this page before writing any code.

## Manifest

Every resource must declare the following in `fxmanifest.lua`:

```lua
fx_version 'cerulean'
game 'rdr3'
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'
```

Server scripts load in the order declared in the manifest. Order matters.

## Lua runtime

The framework targets **Lua 5.4**. A few specifics worth knowing:

- Use `math.atan(y, x)` — `math.atan2` is deprecated in 5.4
- `gsub` returns two values — wrap in `()` when returning directly to suppress the count
- `<const>` on locals is valid and preferred for values that should not be reassigned within scope
- Use `Citizen.CreateThread` and `Wait` for threading, not raw coroutines

## Resource isolation

FiveM/RedM resources each have their own isolated Lua state. Globals defined in one resource are not accessible in another. Cross-resource data sharing requires exports.

```lua
-- Wrong — assumes a global set by another resource
local data = LWCoreData

-- Correct — explicitly call the export
local player = exports['lw-core']:GetPlayer(source)
```

## Consuming lw-db

`DB` is not a cross-resource global. Every server script that needs database access must import it at the top of the file:

```lua
local DB = exports['lw-db'].DB()
```

All sync DB calls must be inside a `Citizen.CreateThread`. See the [lw-db](/resources/lw-db) docs for the full API.

## Consuming lw-shared

Call the export once at the top of each script that needs it:

```lua
local LWUtils = exports['lw-shared']:GetUtils()
```

The returned object is deep-frozen. Mutation attempts throw an error.

## Consuming lw-controls-api

Never call raw exports directly — they do not accept callbacks. Include `lib.lua` in your manifest instead:

```lua
client_scripts {
    '@lw-controls-api/client/lib.lua',
    'client/your_script.lua',
}
```

## Config files

Config files live alongside their scripts:

- `server/config.lua` for server-only config
- `client/config.lua` for client-only config
- `shared/config.lua` only if both sides genuinely need the same non-sensitive value

All tunables go in config. No magic numbers anywhere in logic scripts.

## Migrations

Register migrations at the **top level** of the script, never inside an event handler:

```lua
-- Correct
exports['lw-db']:RegisterMigration('my-resource', '001_create_x', [[ ... ]])

AddEventHandler('lw-db:ready', function()
    CreateThread(function()
        -- safe to query here
    end)
end)

-- Wrong
AddEventHandler('lw-db:ready', function()
    exports['lw-db']:RegisterMigration('my-resource', '001_create_x', [[ ... ]])
end)
```

If a migration has a FK dependency on another resource's table, register it inside that resource's ready event instead:

```lua
AddEventHandler('lw-core:ready', function()
    exports['lw-db']:RegisterMigration('my-resource', '001_create_x', [[ ... ]])
end)
```

## CREATE TABLE conventions

Never specify `ENGINE`, `CHARSET`, or `COLLATE` in `CREATE TABLE` statements. Always inherit the database default. Hardcoding collation causes FK constraint failures when tables were created with different explicit collations.

## Foreign keys

Any table that extends a character keyed to `state_id` must declare the FK with `ON UPDATE CASCADE ON DELETE CASCADE`:

```sql
CONSTRAINT `fk_mytable_state_id`
    FOREIGN KEY (`state_id`)
    REFERENCES `lw_characters` (`state_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE
```

## EmmyLua annotations

Use EmmyLua-style annotations on all non-trivial functions. Multi-value returns require one `---@return` line per value:

```lua
---@param  stateId  string
---@param  epitaph  string|nil
---@return          boolean     success
---@return          string|nil  error message
local function SetCharacterDeceased(stateId, epitaph)
```

A single `---@return boolean, string|nil` on one line will not satisfy the LSP and will produce warnings on every multi-value return in the function body.

## Export registration

Functions passed to `exports()` must be defined as named local functions with annotations above them. Inline lambdas are not visible to the LSP:

```lua
-- Correct
---@param  license2  string
---@return           table[]
local function GetCharactersByLicense2(license2)
    return DB.query(...)
end

exports('GetCharactersByLicense2', GetCharactersByLicense2)

-- Wrong
---@return table[]
exports('GetCharactersByLicense2', function(license2)
    return DB.query(...)
end)
```

## Intermediate globals in lw-shared modules

When building shared module files assembled into `LWUtils`, use these intermediate globals to avoid collisions:

| Module | Intermediate global |
|---|---|
| Enums | `LWEnum` |
| Math | `LWMath` |
| Utils | `LWUtil` |
| Client cooldown | `LWCooldown` |
| Server cooldown | `LWPlayerCooldown` |

Each file uses the `or {}` guard: `LWEnum = LWEnum or {}`

## NUI

NUI is a last resort. Use in-game control methods and RedM UI wherever possible. When NUI is required, use `lw-ui-core`'s Vue 3 + Vite foundation and shared component library rather than rolling your own.

---

> Licensed under the [Rangeland Public License v1.0](./license) — use it, modify it, don't sell it, don't ship it.