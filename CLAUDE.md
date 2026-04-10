# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

`@gramio/keyboards` is a framework-agnostic builder for Telegram Bot API keyboards and inline-query results. It is consumed directly by [GramIO](https://gramio.dev/) and also works standalone with Grammy, Telegraf, node-telegram-bot-api, puregram, etc. Output is plain Telegram Bot API JSON — see `README.md` for framework integration examples.

Published to **both npm and JSR** as `@gramio/keyboards`. Runtime target is Node, Bun, and Deno.

## Commands

```bash
bun install        # install deps (uses bun.lock)
bun test           # run all tests (Bun's built-in test runner)
bun test tests/keyboard.test.ts           # single file
bun test -t "Keyboard with all types"     # single test by name
bunx tsc --noEmit  # type-check (no emit; dist is built via pkgroll)
bunx pkgroll       # build dist/ (cjs + esm + .d.ts + .d.cts)
```

`prepublishOnly` in `package.json` runs `tsc --noEmit && bun test && pkgroll` — do not bypass it.

Lint/format: Biome (`biome.json`). `tests/base-keyboard-constructor.test.ts` is intentionally ignored by the linter.

## Code architecture

The public surface is exported from `src/index.ts`. Everything sits on top of one base class:

- **`src/base-keyboard-constructor.ts`** — generic `BaseKeyboardConstructor<T>` that holds rows, the current row, and the layout helpers (`row`, `columns`, `wrap`, `pattern`, `filter`, `matrix`, `add`, `addIf`, `resetHelpers`). It is parameterized by the button type so it works for both reply and inline keyboards.
- **`src/keyboard.ts`** → `Keyboard` extends `BaseKeyboardConstructor<TelegramKeyboardButton>`. Adds reply-keyboard–specific methods (`text`, `requestUsers`, `requestChat`, `requestContact`, `requestLocation`, `requestPoll`, `requestManagedBot`, `webApp`) and reply-keyboard options (`oneTime`, `persistent`, `resized`, `selective`, `placeholder`). `.build()` / `.toJSON()` produces `TelegramReplyKeyboardMarkup`.
- **`src/inline-keyboard.ts`** → `InlineKeyboard` extends the base with `TelegramInlineKeyboardButton` and inline-specific methods (`text` for callback, `url`, `webApp`, `login`, `switchToChat`, `pay`, `copy`, `game`, `switchToChosenChat`).
- **`src/force-reply-keyboard.ts`**, **`src/remove-keyboard.ts`** — thin builders with no buttons; they just produce `force_reply` / `remove_keyboard` markups with option setters.
- **`src/inline-query/`** — builders for `answerInlineQuery` results (`InlineQueryResult`, `InlineQueryResultCached`, `InputMessageContent`). Separate sub-namespace, reused by GramIO.
- **`src/utils.ts`** — layout primitives (`chunk`, `customWrap`, `pattern`, `filter`), plus `keyboardsFeatureFlagsMap` and the `ButtonOptions` shared type.

**Two layout-application modes** — the base class supports both:
1. **Post-apply** (default when `enableSetterKeyboardHelpers` is false): helpers are stored in `wrapOptions` and applied once in the `keyboard` getter during `build()`.
2. **Eager** (when `enableSetterKeyboardHelpers` is true): `add()` immediately wraps rows using the active `appliedHelper` (`columns` / `wrap` / `pattern`) and `appliedFilter`. Used by GramIO.

Every instance method that adds a button delegates to a matching **`static`** on the subclass (e.g. `new Keyboard().text(...)` → `Keyboard.text(...)`). The static returns a raw `TelegramKeyboardButton`, which is the form you pass into `.add(...)` or `.combine(...)`. When adding new button types, keep this instance/static pairing.

## Types come from `@gramio/types`

Button and markup types are imported from the auto-generated `@gramio/types` package (auto-generated from the Telegram Bot API). **When upstream adds a new field or entity, bump `@gramio/types` first, then expose the new capability here.**

Workflow when Telegram adds a new button kind:
1. Check the diff on `gramiojs/types` (e.g. `gh api repos/gramiojs/types/compare/vX.Y.Z...vA.B.C`).
2. Bump `@gramio/types` in `package.json` (use `>=` range, matches existing style).
3. Run `bun install`.
4. Add instance + static method on the relevant builder (`Keyboard`, `InlineKeyboard`, etc.), mirroring existing ones: JSDoc with `@example`, `Omit<..., "request_id">`-style options when applicable, delegate instance → static.
5. Extend the "all types of button" test in `tests/keyboard.test.ts` (or the equivalent for inline).
6. `bunx tsc --noEmit && bun test`.

Note: the mutator/codegen story for GramIO lives in a sibling package and uses `@gramio/schema-parser`'s `getCustomSchema()`. If `getCustomSchema()` returns a field missing from the installed `@gramio/types`, you must bump `@gramio/types` before regenerating — same principle applies here.

## Tests

Bun's built-in runner. Test files live in `tests/` and mirror `src/` file names. Each builder has its own `*.test.ts`; `tests/base-keyboard-constructor.test.ts` covers the shared layout primitives (and is excluded from Biome's linter). When adding a button method, add it to the "all types of button" test alongside the existing entries so JSON shape stays covered.

## Release process

**Publishing is driven by `.github/workflows/publish.yml` (`workflow_dispatch`). Never `npm publish` / `jsr publish` locally.** The workflow runs `bun test`, runs `bun scripts/prepare-jsr.ts` (which syncs `deno.json` version and runs `@teidesu/slow-types-compiler fix`), publishes to JSR, publishes to npm, then creates a GitHub Release using the changelog emitted by `bun scripts/generate-changelog.ts`.

```bash
# 1. bump version in package.json, commit, push
git push origin main

# 2. kick off the workflow
gh workflow run publish.yml --repo gramiojs/keyboards --ref main

# 3. watch the run
gh run list --repo gramiojs/keyboards --workflow=publish.yml --limit 1
gh run watch <run-id> --repo gramiojs/keyboards --exit-status

# on failure, pull only the error lines (avoid dumping the full log)
gh run view <run-id> --repo gramiojs/keyboards --log-failed | grep "error TS"

# confirm new version on npm / jsr
curl -s https://registry.npmjs.org/@gramio/keyboards/latest | jq -r .version
```

Only `package.json` version is edited by hand. `deno.json` / `jsr.json` versions are overwritten by `prepare-jsr.ts` during CI, so do not rely on them locally.

## Maintain this file

Keep `CLAUDE.md` up to date. When you land a change that materially affects any of the sections above — new builder class, new layout primitive, new button category, change to the release workflow, change to the `@gramio/types` policy, new top-level script — update `CLAUDE.md` in the same commit. If something documented here drifts from reality while you're working in the repo, fix it; future Claude instances rely on this file being accurate.
