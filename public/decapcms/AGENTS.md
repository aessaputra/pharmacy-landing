# DECAP CMS KNOWLEDGE BASE

## OVERVIEW

Static Decap CMS admin files. Current config is present but not aligned with Astro content source.

## STRUCTURE

```text
public/decapcms/
├── config.yml      # Decap CMS collection/backend/media config
└── index.html      # Admin shell; loads Netlify Identity + Decap CMS from CDN
```

## WHERE TO LOOK

| Task                        | Location                                       | Notes                                                               |
| --------------------------- | ---------------------------------------------- | ------------------------------------------------------------------- |
| Change CMS backend          | `config.yml`                                   | Currently `git-gateway`, branch `main`                              |
| Change post collection path | `config.yml` → `collections[0].folder`         | Currently wrong: `src/content/post`                                 |
| Change media storage        | `config.yml` → `media_folder`, `public_folder` | Uses `src/assets/images`, `/_astro`                                 |
| Change CMS UI shell         | `index.html`                                   | Loads scripts from `identity.netlify.com` and `unpkg.com/decap-cms` |
| Change actual Astro schema  | `src/content.config.ts`                        | Post collection loads `src/data/post/*.{md,mdx}`                    |

## CURRENT MISMATCH

`public/decapcms/config.yml` uses:

```yaml
folder: 'src/content/post'
```

Astro Content Layer uses:

```ts
base: 'src/data/post';
pattern: '**/*.{md,mdx}';
```

CMS will save/read wrong path unless config changes to `src/data/post` or Astro schema moves.

## CONVENTIONS

- Admin route is static: `/decapcms/` from `public/decapcms/index.html`.
- Backend expects Netlify Identity + Git Gateway.
- Fields mirror partial post schema: title, excerpt, category, tags, image, publishDate, author, body.
- Actual post schema also supports updateDate, draft, metadata, OpenGraph, Twitter.
- Blog is currently disabled in `src/config.yaml`; CMS-created posts will not surface without routes/config changes.

## ANTI-PATTERNS

- Do not use Decap CMS before fixing folder path mismatch.
- Do not assume `public_folder: '/_astro'` is correct in dev; `_astro` is build asset output.
- Do not enable blog only in CMS. Need `src/pages/[...blog]/` routes plus `apps.blog.*` config toggles plus posts.
- Do not store secrets in CMS config; it is served publicly.

## VERIFICATION

- After CMS config changes: run `npm run build` and manually open `/decapcms/` in preview/deployment.
- After content path changes: run `npm run check:astro` to verify content collection schema still resolves.
