# lw-controls-api

**Phase:** Foundation  
**Dependencies:** lw-shared  
**Dependency of:** every resource that registers player input

Central input binding registry. Owns the full lifecycle of player input — context suppression, capability flag state, binding registration with conflict detection, UiPrompt lifecycle, and callback dispatch. No resource polls controls directly.

## Architecture

Client-only resource. No server scripts, no database access. All state is runtime-only.

## Manifest requirement

Never call raw exports directly — they do not accept callbacks. Include `lib.lua` in your resource's manifest:

```lua
client_scripts {
    '@lw-controls-api/client/lib.lua',
    'client/your_script.lua',
}
```

`lib.lua` exposes a single global: `LWControls`. All binding registration, context management, flag operations, and input queries go through it.

## Key design decisions

- **No raw hashes.** Bindings declare a named `INPUT_*` string. The API resolves it to a hash via the internal `LWInputs.Map` registry.
- **Two context systems.** The suppression stack gates which bindings fire. The engine context determines which inputs are physically detectable. Both must be declared.
- **Conflict detection.** Dev mode blocks conflicting bindings. Prod mode silently drops the second and warns.
- **Hold cancel on eligibility loss.** If a hold is in progress and the binding loses eligibility, `onCancel` fires automatically.
- **Native input suppression.** `DisableControlAction` is called every frame for eligible bindings. It auto-resets at frame end.

---

## Context suppression stack

The suppression stack determines which bindings are allowed to fire. Only bindings whose `context` matches the top of the stack are eligible.

- The `world` base context is implicit, always present, and cannot be popped.
- Every pushed context must declare which engine context it maps to.

```lua
-- Push a suppression context
local token = LWControls.PushContext('inventory', 'GameMenu')

-- Pop it when done
LWControls.PopContext(token)

-- Query
local ctx = LWControls.GetActiveContext()       -- 'inventory'
local eng = LWControls.GetActiveEngineContext() -- 'GameMenu'
```

---

## Capability flags

Flags gate whether an eligible binding actually fires. Only the registering resource can mutate its own flags. Any resource can read any flag.

```lua
-- Declare ownership (call once at resource start)
LWControls.RegisterFlag('nearCorpse')

-- Set / clear
LWControls.SetFlag('nearCorpse', true)
LWControls.SetFlag('nearCorpse', false)

-- Read (any resource)
local val = LWControls.GetFlag('nearCorpse')  -- boolean, false if unknown

-- Manual cleanup (optional — auto-runs on resource stop)
LWControls.UnregisterFlag('nearCorpse')
```

---

## Registering bindings

`control` is an `INPUT_*` name string. `context` is the suppression context the binding fires in. Both are required.

### Tap binding

```lua
LWControls.RegisterBinding({
    id       = 'loot',
    control  = 'INPUT_LOOT',
    context  = 'world',
    requires = { 'nearCorpse' },  -- all flags must be true  (optional)
    blocks   = { 'handcuffed' },  -- all flags must be false (optional)
    prompt   = { label = 'Loot' },
    onPress  = function()
        -- fires on button press
    end,
})
```

### Hold binding

```lua
LWControls.RegisterBinding({
    id         = 'skin',
    control    = 'INPUT_INTERACT_OPTION1',
    context    = 'world',
    requires   = { 'nearCorpse' },
    holdTime   = 1500,                   -- ms to complete
    prompt     = { label = 'Skin Animal' },
    onStart    = function() end,          -- hold begun
    onProgress = function(p) end,         -- p = 0.0–1.0, fires each frame
    onComplete = function() end,          -- holdTime reached
    onCancel   = function() end,          -- released early or eligibility lost
})
```

### Mounted context

Inputs only valid on horseback must use an explicit context push:

```lua
-- When player mounts
local mountToken = LWControls.PushContext('mounted', 'OnMount')

LWControls.RegisterBinding({
    id      = 'whistle',
    control = 'INPUT_WHISTLE_HORSEBACK',
    context = 'mounted',
    onPress = function() end,
})

-- When player dismounts
LWControls.PopContext(mountToken)
```

---

## Other functions

```lua
-- Unregister a binding and clear its callbacks
LWControls.UnregisterBinding('skin')

-- Update a prompt label without re-registering
LWControls.UpdatePromptLabel('skin', 'Loot Body')

-- Swap callbacks on an existing binding without re-registering
LWControls.UpdateCallbacks('skin', {
    onComplete = function() end,
    onCancel   = function() end,
})

-- Look up a hash for an INPUT_* name
local hash = LWControls.GetInputHash('INPUT_INTERACT_OPTION1')

-- Look up a full entry (hash, contexts, keyboard, controller)
local entry = LWControls.GetInputEntry('INPUT_INTERACT_OPTION1')
```

## Shared-key inputs

Some `INPUT_*` names share a physical key with many other engine actions. The engine decides which action fires based on current game state. Prefer inputs that own their key exclusively in the relevant context. Check `LWInputs.Map[name].contexts` — inputs with short context lists are more reliable for custom bindings.

## Cleanup

On `onResourceStop`, the API automatically purges all bindings, prompts, flags, and pushed contexts registered by the stopped resource. No consuming resource needs cleanup hooks.

---

> Licensed under the [Rangeland Public License v1.0](../license) — use it, modify it, don't sell it, don't ship it.