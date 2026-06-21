# VENDOR KNOWLEDGE BASE

## OVERVIEW

Custom Astro integration that turns `src/config.yaml` into Vite virtual module `astrowind:config`.

## STRUCTURE

```text
vendor/
├── README.md                         # Legacy note; too high-level for maintenance
└── integration/
    ├── index.ts                      # Astro hooks + Vite virtual module
    ├── types.d.ts                    # Ambient module declaration
    └── utils/
        ├── configBuilder.ts          # Defaults + lodash.merge config builder
        └── loadConfig.ts             # YAML/object loader
```

## WHERE TO LOOK

| Task                           | Location                             | Notes                                                                |
| ------------------------------ | ------------------------------------ | -------------------------------------------------------------------- |
| Add config export              | `integration/utils/configBuilder.ts` | Add type, default getter, returned key                               |
| Expose config export           | `integration/index.ts`               | Add line to virtual module string                                    |
| Type config export             | `integration/types.d.ts`             | Add `declare module 'astrowind:config'` export                       |
| Change YAML loading            | `integration/utils/loadConfig.ts`    | Reads file via `fs`, parses via `js-yaml`                            |
| Change Astro lifecycle         | `integration/index.ts`               | Hooks: `astro:config:setup`, `astro:config:done`, `astro:build:done` |
| Change sitemap/robots behavior | `integration/index.ts`               | Build done hook appends sitemap line to `robots.txt`                 |

## CONFIG FLOW

```text
src/config.yaml
  → loadConfig()
  → configBuilder()
  → { SITE, I18N, METADATA, APP_BLOG, UI, ANALYTICS }
  → Vite virtual module `\0astrowind:config`
  → app imports from `astrowind:config`
```

## CONVENTIONS

- This directory is the only custom Astro integration in repo.
- `configBuilder.ts` uses per-section defaults plus `lodash.merge`; keep default objects close to section getter.
- Virtual module ID is public `astrowind:config`; resolved ID is internal `\0astrowind:config`.
- `integration/types.d.ts` must match virtual module runtime exports exactly.
- Integration also sets Astro `site` and `trailingSlash` from config.
- `trailingSlash` maps boolean YAML value to Astro `'always'` or `'never'`; no `'ignore'` mode.
- Config file is watched with `addWatchFile()` during setup.

## ANTI-PATTERNS

- Do not import `src/config.yaml` directly from app code.
- Do not add runtime config keys without updating builder, virtual module string, ambient types, and root docs.
- Do not assume config is schema-validated. YAML is parsed then merged; invalid shapes may survive until consumers break.
- Do not copy empty catch in `astro:build:done`; it currently swallows robots update failures.
- Do not treat `vendor/README.md` as current architecture docs; use this file.

## VERIFICATION

- After integration or config-shape changes: run `npm run check:astro` and `npm run build`.
- After adding virtual exports: grep/import from `astrowind:config` should type-check through `vendor/integration/types.d.ts`.
