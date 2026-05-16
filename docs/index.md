---
layout: home

hero:
  name: Lockwood Framework
  text: A RedM framework built for serious roleplay.
  tagline: 22 open resources. One consistent ecosystem. No magic globals, no spaghetti dependencies, no compromises. — Early development, not production ready.
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/Lockwood-Framework

features:
  - title: Ground-up architecture
    details: Not a collection of scripts bolted together. Every resource shares the same data layer, permission model, and conventions. Learn the pattern once, apply it everywhere.

  - title: Forward-only migrations
    details: Schema changes are tracked by name, ordered with a sortable prefix, and never run twice. No manual SQL imports, no drift between environments.

  - title: Central input registry
    details: lw-controls-api owns the full lifecycle of player input. Context suppression, conflict detection, UiPrompt management, and hold/tap discrimination — all in one place.

  - title: Unified org model
    details: Jobs, gangs, government positions, and tribal roles all run through lw-organizations-api. One permission model for every faction type on your server.

  - title: Built for RedM
    details: Written specifically for rdr3 and fx_version cerulean. Not a FiveM port. No VORP, RSG, or RedEM:RP dependency. Fully standalone.

  - title: Rangeland Public License
    details: Use it, modify it, build on it. Just don't sell it or ship it. Source available under the RPL v1.0.
---

::: warning Early development
Lockwood Framework is not yet ready for production use. It is under active development and APIs will change without notice. Watch the repo for updates.
:::