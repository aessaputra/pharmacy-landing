# UTILS KNOWLEDGE BASE

## OVERVIEW

Pure TypeScript helper layer for blog data, permalinks, images, Markdown transforms, file paths, and formatting.

## STRUCTURE

| File             | Role                                 | Notes                                          |
| ---------------- | ------------------------------------ | ---------------------------------------------- |
| `blog.ts`        | Blog data + static path generation   | Largest util; 20 exports; gated by `APP_BLOG`  |
| `permalinks.ts`  | URL/canonical builders               | Central route helper; slugifies via `limax`    |
| `images.ts`      | Local image lookup + OG optimization | Uses `import.meta.glob` and Astro `getImage()` |
| `frontmatter.ts` | Remark/rehype plugins                | Reading time + responsive table wrapper        |
| `utils.ts`       | Date/trim/number formatting          | Locale comes from `I18N.language`              |
| `directories.ts` | Project-relative path helpers        | Low-use helper                                 |

## WHERE TO LOOK

| Task                       | Location                                                   | Notes                                               |
| -------------------------- | ---------------------------------------------------------- | --------------------------------------------------- |
| Fetch normalized posts     | `blog.ts` → `fetchPosts()`                                 | Cached in module-scope `_posts`                     |
| Latest posts widget        | `blog.ts` → `findLatestPosts()`                            | Calls `fetchPosts()` then slices                    |
| Related posts              | `blog.ts` → `getRelatedPosts()`                            | Category = 5 pts, tag = 1 pt                        |
| Blog static paths          | `blog.ts` → `getStaticPathsBlog*()`                        | Returns empty arrays if disabled by config          |
| Canonical URL              | `permalinks.ts` → `getCanonical()`                         | Uses `new URL(path, SITE.site)`                     |
| Site/menu hrefs            | `permalinks.ts` → `getPermalink()`, `applyGetPermalinks()` | Honors `SITE.base`, `SITE.trailingSlash`            |
| Asset URLs                 | `permalinks.ts` → `getAsset()`                             | Prefixes `SITE.base`                                |
| Local asset image refs     | `images.ts` → `findImage()`                                | Resolves strings like `~/assets/images/default.png` |
| OG images                  | `images.ts` → `adaptOpenGraphImages()`                     | Forces 1200x626 JPG                                 |
| Markdown reading time      | `frontmatter.ts`                                           | Wired in `astro.config.ts` markdown.remarkPlugins   |
| Responsive Markdown tables | `frontmatter.ts`                                           | Wired in `astro.config.ts` markdown.rehypePlugins   |

## CONVENTIONS

- Import runtime config from `astrowind:config`, not YAML.
- Import app types from `~/types`.
- Blog functions should return empty paths/results when `APP_BLOG` gates disable route type.
- `fetchPosts()` owns normalization: draft filtering, sorting, slug/permalink/category/tag shaping, render component loading.
- `permalinks.ts` is canonical route logic; do not duplicate trailing-slash/base handling in components.
- `images.ts` accepts trusted static image paths and handles failures silently today; avoid adding new silent catches.
- Markdown plugins mutate Astro/Markdown data; keep them deterministic and build-only.

## BLOG PIPELINE

```text
src/data/post/*.{md,mdx}
  → Astro Content Layer `post` collection
  → fetchPosts()
  → normalized Post[] with slug/permalink/taxonomies/readingTime
  → widgets/components/static path functions
```

## ANTI-PATTERNS

- Do not re-enable blog by toggling `config.yaml` alone; routes and content are absent.
- Do not create direct URL strings in widgets when `getPermalink()` covers case.
- Do not change `POST_PERMALINK_PATTERN` semantics without checking blog path generators.
- Do not copy existing empty catch from `images.ts` into new helpers.
- Do not move post source to `src/content/post` without updating `content.config.ts`, Decap CMS, and docs together.
