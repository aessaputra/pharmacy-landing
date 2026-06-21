# PROJECT KNOWLEDGE BASE

**Generated:** 2026-06-21T11:52:36Z
**Commit:** 6e8e3c5
**Branch:** main

## OVERVIEW

AstroWind-derived static landing site for Sinar Farma. Astro v6, Tailwind CSS v4, TypeScript, MDX, Sharp, Unpic.

## STRUCTURE

```text
/
├── astro.config.ts             # Static build, integrations, Tailwind Vite plugin
├── src/config.yaml             # Site config, loaded as astrowind:config
├── src/navigation.ts           # Indonesian header/footer links
├── src/content.config.ts       # Post schema; blog disabled now
├── src/pages/                  # Only index.astro and 404.astro
├── src/layouts/                # Layout, PageLayout, MarkdownLayout, LandingLayout
├── src/components/
│   ├── widgets/                # Page sections, largest component group
│   ├── common/                 # Image, metadata, scripts, toggles
│   ├── ui/                     # Button, Form, Headline, Timeline, WidgetWrapper
│   └── blog/                   # Blog UI kept, routes/posts absent
├── src/utils/                  # Blog, permalink, image, markdown helpers
├── src/assets/styles/tailwind.css
├── public/decapcms/            # Decap CMS config, path currently mismatched
├── vendor/integration/         # Custom config-loading Astro integration
├── nginx/nginx.conf            # Docker static-serving config
├── dist/                       # Generated build output; do not edit
└── .agents/, .omo/             # Agent/workflow metadata; not app runtime
```

## WHERE TO LOOK

| Task                                              | Location                                   | Notes                                                           |
| ------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------- |
| Change site URL, SEO, language, blog flags, theme | `src/config.yaml`                          | Loaded through `astrowind:config`; no runtime schema validation |
| Change nav links                                  | `src/navigation.ts`                        | Indonesian labels: Beranda, Fitur, Tentang, Download            |
| Change homepage content                           | `src/pages/index.astro`                    | Large ad-hoc page; uses widgets + PageLayout                    |
| Change layout shell/head                          | `src/layouts/Layout.astro`                 | Imports Tailwind, metadata, scripts, view transitions           |
| Change header/footer wrapper                      | `src/layouts/PageLayout.astro`             | Uses `headerData`/`footerData` from navigation                  |
| Change landing-specific chrome                    | `src/layouts/LandingLayout.astro`          | Non-template addition; custom header action behavior            |
| Add/edit page section                             | `src/components/widgets/`                  | Props extend `~/types`; slot fallbacks common                   |
| Add/edit primitive UI                             | `src/components/ui/`                       | `Button` variants map to Tailwind utilities                     |
| Change image behavior                             | `src/components/common/Image.astro`        | Local via Astro/Sharp, remote via Unpic                         |
| Change JS interactions                            | `src/components/common/BasicScripts.astro` | Mobile menu, theme, scroll, intersection observer               |
| Change Tailwind tokens/utilities                  | `src/assets/styles/tailwind.css`           | CSS-first Tailwind v4 config                                    |
| Change colors/fonts                               | `src/components/CustomStyles.astro`        | `--aw-*` CSS vars in OKLCH                                      |
| Change blog schema                                | `src/content.config.ts`                    | `post` collection loads `src/data/post/*.{md,mdx}`              |
| Change blog data logic/routes                     | `src/utils/blog.ts`                        | 20 exports; gated by `APP_BLOG` flags                           |
| Change URL generation                             | `src/utils/permalinks.ts`                  | Slug/permalink canonical source                                 |
| Change config module exports                      | `vendor/integration/`                      | Vite virtual module `astrowind:config`                          |
| Change CMS admin                                  | `public/decapcms/`                         | Decap config path currently wrong for this repo                 |
| Deploy static output with Docker                  | `Dockerfile`, `nginx/nginx.conf`           | Nginx serves `dist` on 8080                                     |

## CODE MAP

| Symbol / File                                             | Type              | Location                                    | Role                                                    |
| --------------------------------------------------------- | ----------------- | ------------------------------------------- | ------------------------------------------------------- |
| `SITE`, `I18N`, `METADATA`, `APP_BLOG`, `UI`, `ANALYTICS` | virtual exports   | `astrowind:config`                          | Config consumed across layouts/components/utils         |
| `astrowindIntegration()`                                  | Astro integration | `vendor/integration/index.ts`               | YAML config load, virtual module, robots sitemap append |
| `configBuilder()`                                         | config factory    | `vendor/integration/utils/configBuilder.ts` | Defaults + `lodash.merge` for all config sections       |
| `Widget`, `Headline`, `Hero`, `Features`, `Content`, etc. | interfaces        | `src/types.d.ts`                            | Central prop type hub for widgets/components            |
| `fetchPosts()`                                            | function          | `src/utils/blog.ts`                         | Cached Content Layer post fetch + normalization         |
| `getStaticPathsBlog*()`                                   | functions         | `src/utils/blog.ts`                         | Blog list/post/category/tag path generation             |
| `getPermalink()`                                          | function          | `src/utils/permalinks.ts`                   | Route builder honoring `SITE.base` and trailing slash   |
| `findImage()`                                             | function          | `src/utils/images.ts`                       | Resolves `~/assets/...` image refs for Image component  |
| `readingTimeRemarkPlugin()`                               | remark plugin     | `src/utils/frontmatter.ts`                  | Adds reading time to Markdown data                      |
| `Header.astro`                                            | widget            | `src/components/widgets/Header.astro`       | Highest-complexity widget; mobile menu + sticky nav     |
| `Image.astro`                                             | component         | `src/components/common/Image.astro`         | CDN/local responsive image wrapper                      |
| `BasicScripts.astro`                                      | component         | `src/components/common/BasicScripts.astro`  | Monolithic vanilla browser behavior                     |

## CONVENTIONS

- Node.js `>=22.12.0`; CI uses Node 22 and `npm ci`.
- npm only. No pnpm/yarn/bun lock.
- TypeScript extends `astro/tsconfigs/base`; `strictNullChecks: true`, `allowJs: true`.
- Use `~/` imports for `src/*`.
- Use `astrowind:config`; do not import `src/config.yaml` directly.
- Astro components use frontmatter prop destructuring, often with `await Astro.slots.render('slot')` fallbacks.
- Widget props extend shared interfaces from `~/types`; common pattern: `Omit<Headline, 'classes'>, Widget`.
- Use `class:list` for conditional Astro classes.
- Use `twMerge()` when accepting `class`/`className` overrides.
- Rich widget copy often uses `set:html`; keep data trusted/static.
- Tailwind v4 config lives in CSS: `@theme`, `@utility`, `@variant dark`, `@custom-variant intersect`.
- Theme variables use `--aw-*` prefix in `CustomStyles.astro`; light vars in `:root`, dark vars in `.dark`.
- Button classes are Tailwind custom utilities: `btn`, `btn-primary`, `btn-secondary`, `btn-tertiary`.
- Content collection source is `src/data/post/`, not `src/content/post/`.
- Prettier: 2 spaces, 120 print width, semicolons, single quotes, ES5 trailing commas, Astro plugin.
- ESLint: flat config with JS recommended, `typescript-eslint`, `eslint-plugin-astro`.
- Unused args/array destructures may start with `_`.
- Non-null assertions are allowed by ESLint here.

## ANTI-PATTERNS (THIS PROJECT)

- Do not edit `dist/`; generated build output.
- Do not re-enable blog by config only. Blog routes under `src/pages/[...blog]/` are absent and `src/data/post/` is empty.
- Do not use Decap CMS as-is: `public/decapcms/config.yml` points to `src/content/post`, but Astro loads `src/data/post`.
- Do not add Tailwind JS config; project uses Tailwind v4 CSS-first config.
- Do not bypass `astrowind:config` when reading site/blog/UI config.
- Do not assume README route tree is current; current `src/pages/` has only `index.astro` and `404.astro`.
- Avoid new empty catch blocks. Existing silent catches: `src/utils/images.ts`, `vendor/integration/index.ts`.
- Treat `src/components/common/SocialShare.astro` as legacy no-op compatibility shell.
- Treat `hasExternalScripts = false` in `astro.config.ts` as dead Partytown branch unless wired to real config.
- `src/components/common/Image.astro` contains deliberate `as unknown as` workaround for Astro Image forwarding; do not copy elsewhere.

## UNIQUE STYLES

- Site is customized for Indonesian Sinar Farma content (`i18n.language: id`, `textDirection: ltr`).
- Blog UI/utilities remain from AstroWind, but deployment is landing-page only.
- Config data flow: `src/config.yaml` → `vendor/integration` → Vite virtual module → app imports.
- Image flow: remote URLs via Unpic; local `~/assets/...` through Astro assets/Sharp.
- `LandingLayout.astro` is local addition; not default AstroWind layout list.
- Custom animation variant: `intersect` works with browser logic in `BasicScripts.astro`.

## COMMANDS

```bash
npm run dev             # Dev server localhost:4321
npm run build           # Production static build to ./dist/
npm run preview         # Preview build output
npm run check           # astro check + ESLint + Prettier
npm run check:astro     # Astro diagnostics
npm run check:eslint    # ESLint only
npm run check:prettier  # Prettier check only
npm run fix             # ESLint fix + Prettier write
```

## VERIFICATION

- Standard gate after code changes: `npm run build` then `npm run check`.
- No unit/integration test framework exists; verification is build + static analysis + visual QA.
- Visual QA targets: homepage, 404, dark mode, mobile menu, anchor navigation.
- After Astro integration/config changes, run `npm run check:astro` and `npm run build`.

## CHILD KNOWLEDGE BASES

- `src/utils/AGENTS.md` — utility exports, blog/permalink/image/markdown contracts.
- `vendor/AGENTS.md` — custom Astro integration and virtual module lifecycle.
- `public/decapcms/AGENTS.md` — CMS config, Netlify Identity, current path mismatch.

## NOTES

- Existing `CLAUDE.md` delegates to this file.
- `.agents/skills/` contains project skills; do not document as app runtime.
- `.omo/` contains work/evidence state; do not document as app runtime.
- `sandbox.config.json` may mention Node 18; project engine and CI require Node 22+.
- `netlify.toml`, `vercel.json`, and `public/_headers` all set immutable cache for `/_astro/*`.
