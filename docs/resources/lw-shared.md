# lw-shared

**Phase:** Foundation  
**Dependencies:** none  
**Dependency of:** every resource in the stack

Shared utilities, constants, enums, math helpers, JSON wrappers, and cooldown management. The returned object is deep-frozen — mutation attempts throw an error at runtime.

## Importing

Call the export once at the top of each script that needs it. The export name is the same on both client and server:

```lua
local LWUtils = exports['lw-shared']:GetUtils()
```

---

## Enums — `LWUtils.Enums`

All enum values are strings unless noted.

### `LWUtils.Enums.Gender`
`Male` (0), `Female` (1) — integer values matching RedM natives directly.

### `LWUtils.Enums.Season`
`Spring` · `Summer` · `Autumn` · `Winter`

### `LWUtils.Enums.Weather`
Matches RedM native weather type strings. Full list in `shared/enums/weather.lua`.

::: warning
`SnowClearing` is singleplayer only. Do not use it in multiplayer logic.
:::

### `LWUtils.Enums.HealthState`
`Healthy` · `Injured` · `CriticallyInjured` · `Unconscious` · `Collapsed` · `Downed` · `Dead`

| Value | Meaning |
|---|---|
| `Unconscious` | Blunt trauma or drugs. Resolves with time, no intervention required |
| `Collapsed` | Needs-driven (dehydration, starvation, hypothermia, heatstroke). Resolved by addressing the cause |
| `Downed` | Trauma or combat. Requires medical intervention |
| `Dead` | Hands off to `lw-mortality` |

### `LWUtils.Enums.CharacterStatus`
`active` · `deceased`

Represents the character's lifecycle state, not a health or combat state. Used by `lw-characters-api`, `lw-character-selection`, `lw-mortality`, `lw-health`, `lw-needs`, and `lw-prison`.

### `LWUtils.Enums.NeedType`
`Hunger` · `Thirst` · `Fatigue` · `Temperature`

`Temperature` is a single bidirectional scale with danger zones at both ends (hypothermia / heatstroke).

### `LWUtils.Enums.SkillType`
32 skills across 8 categories. Full list in `shared/enums/skills.lua`.

Notable distinctions:
- `Butchering` is separate from `Hunting`
- `Cooking` is separate from `Crafting`
- `HorseTaming` is separate from `Riding`
- `BountyHunting` is one skill — registered vs vigilante is a legal distinction, not a skill distinction

### `LWUtils.Enums.ItemCategory`
`Weapon` · `Ammo` · `Food` · `Drink` · `Herb` · `Material` · `Component` · `Tool` · `HorseGear` · `Clothing` · `Document` · `Medical` · `Seed` · `Valuable` · `Contraband` · `TradeGood`

- `Herb` is separate from `Food` — feeds both cooking and medicine crafting
- `Component` is separate from `Material` — processed goods behave differently in recipes and market pricing
- `Contraband` is for inherently illegal goods. Stolen legal goods are tracked via provenance in `lw-inventory-api`

### `LWUtils.Enums.OrganizationType`
`LawEnforcement` · `Government` · `Criminal` · `Commercial` · `Professional` · `Tribal`

### `LWUtils.Enums.DutyState`
`OnDuty` · `OffDuty`

### `LWUtils.Enums.CrimeSeverity`
`Infraction` · `Misdemeanor` · `Felony` · `Capital`

`Capital` maps directly to the death sentence pipeline in `lw-prison`.

### `LWUtils.Enums.WantedLevel`
`None` · `Suspected` · `Wanted` · `Notorious` · `Outlaw`

Tracked per state via `lw-legal-api`. `Suspected` allows stop-and-question without a warrant.

### `LWUtils.Enums.ClothingDamageState`
`Pristine` · `Worn` · `Damaged` · `Ruined`

### `LWUtils.Enums.ClothingDirtState`
`Clean` · `Dusty` · `Dirty` · `Filthy`

Damage and dirt are independent axes.

### `LWUtils.Enums.PropertyType`
`Land` · `Homestead` · `Ranch` · `Farm` · `Timberland` · `MiningClaim` · `Commercial` · `Government`

### `LWUtils.Enums.PropertyStatus`
`Available` · `Owned` · `Contested` · `Abandoned` · `Foreclosed`

### `LWUtils.Enums.ObjectState`
`Active` · `Damaged` · `Decayed` · `Destroyed` · `Respawning`

`Damaged` requires materials to repair. `Decayed` requires tending or maintenance. Different resolution paths.

### `LWUtils.Enums.NotificationType`
`Success` · `Error` · `Warning` · `Info`

### `LWUtils.Enums.NotificationPriority`
`Low` · `Normal` · `High` · `Critical`

`Critical` bypasses the notification queue and displays immediately.

---

## Math — `LWUtils.Math`

### Numeric

```lua
LWUtils.Math.Clamp(val, min, max)       -- clamp to range, inclusive
LWUtils.Math.Lerp(a, b, t)             -- linear interpolation, t clamped internally
LWUtils.Math.Normalize(val, min, max)   -- maps value to 0.0–1.0
LWUtils.Math.RoundTo(val, places)       -- round to N decimal places
LWUtils.Math.PercentOf(val, total)      -- returns 0.0–100.0
```

### Vector

```lua
LWUtils.Math.Vec3Distance(a, b)           -- 3D distance between vector3 points
LWUtils.Math.Vec2Distance(a, b)           -- 2D distance, ignores Z axis
LWUtils.Math.IsPointInRadius(p, c, r)     -- sphere check (3D)
LWUtils.Math.IsPointInRadius2D(p, c, r)   -- cylinder check (2D, ignores Z)
LWUtils.Math.HeadingToVector(heading)     -- degrees → normalized vector3
LWUtils.Math.VectorToHeading(vec)         -- vector3 → degrees (0–360)
```

::: info
Uses `math.atan(y, x)` — Lua 5.4 compatible. Verify RedM heading convention (0 = North, clockwise) when first using `HeadingToVector` / `VectorToHeading` in a native context.
:::

### Random

```lua
LWUtils.Math.RandomInt(min, max)        -- integer, inclusive
LWUtils.Math.RandomFloat(min, max)      -- float
LWUtils.Math.WeightedRandom(entries)    -- entries: array of { item, weight }
```

---

## Utils — `LWUtils.Utils`

### Table — `LWUtils.Utils.Table`

```lua
DeepCopy(t)              -- deep copy, no shared state
Merge(target, ...)       -- merge sources into target, later keys win
Contains(t, value)       -- value search on array-style tables
Filter(t, predicate)     -- predicate receives (value, index)
Map(t, mapper)           -- mapper receives (value, index)
Count(t)                 -- safe count for non-sequential and mixed tables
```

::: warning
Use `Count` instead of `#t` for hash-style or non-sequential tables.
:::

### String — `LWUtils.Utils.String`

```lua
Trim(s)                               -- strip leading/trailing whitespace
Split(s, delimiter)                   -- returns array of substrings
StartsWith(s, prefix)                 -- boolean
EndsWith(s, suffix)                   -- boolean
Truncate(s, maxLength, ellipsis)      -- ellipsis defaults to '...'
Capitalize(s)                         -- first letter upper, rest lower
SnakeToTitle(s)                       -- 'on_duty' → 'On Duty'
WrapText(text, lineLength, maxLines)  -- word-wrap into array of lines
```

`WrapText` splits at word boundaries, never mid-word. Standard call for epitaphs: `WrapText(epitaph, 50, 5)`.

### JSON — `LWUtils.Utils.JSON`

Both methods return `result, error`. Always check the second value.

```lua
local encoded, err = LWUtils.Utils.JSON.Encode(value)
local decoded, err = LWUtils.Utils.JSON.Decode(s)
```

---

## Cooldown — `LWUtils.Cooldown` (client only)

Single-player context. Uses `GetGameTimer()`.

```lua
local cd = LWUtils.Cooldown.New(5000)

cd:Check()      -- true if expired, resets timer. false if active.
cd:Reset()      -- force reset
cd:Remaining()  -- ms remaining
cd:IsActive()   -- read-only peek, does not reset
```

## PlayerCooldown — `LWUtils.PlayerCooldown` (server only)

Multi-player context, keyed by source. Uses `GetGameTimer()`.

```lua
local robberyCD = LWUtils.PlayerCooldown.New(30000)

robberyCD:Check(source)     -- true if expired for this source, resets their timer
robberyCD:Reset(source)     -- force reset for source
robberyCD:Remaining(source) -- ms remaining for source
robberyCD:IsActive(source)  -- read-only peek
```

Player cleanup on disconnect is automatic via a single `playerDropped` handler in `lw-shared`. Consuming resources do not need their own cleanup hooks.

---

> Licensed under the [Rangeland Public License v1.0](../license) — use it, modify it, don't sell it, don't ship it.