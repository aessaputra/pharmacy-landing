# Design System

## Product

Sinar Farma Indonesian apotek company-profile landing page.

## Register

brand

## Brand Personality

The interface must express **terpercaya**, **ramah**, and **cepat**.

- **Terpercaya:** clear hierarchy, strong readability, careful factual boundaries.
- **Ramah:** approachable spacing and plain language without cuteness.
- **Cepat:** compact sections, short copy, obvious anchors, and low-friction scanning.

## Aesthetic Lane

A clean apotek-trust system: orderly, bright, and operational, with a quiet pharmacy-counter rhythm rather than a generic wellness or ecommerce look.

Reference image in words: a tidy Indonesian pharmacy shelf and counter in daylight, where labels are easy to scan and the experience feels calm, legitimate, and efficient.

Avoid the default warm cream landing page, hospital blue, marketplace promo design, clinic booking UI, and editorial-magazine styling.

## Compact Token Direction

Use the existing AstroWind token structure in `src/components/CustomStyles.astro` and `src/assets/styles/tailwind.css`.

Token intent:

- Page background: clean neutral or lightly green-tinted neutral, never beige by default.
- Surface: crisp, readable panels for grouped content.
- Muted surface: subtle category grouping only.
- Border: quiet separators with enough contrast in light and dark.
- Primary: grounded pharmacy green for action and brand emphasis.
- Secondary: deeper green for hover, text emphasis, and supporting accents.
- Accent: fresh but restrained highlight for small moments only.
- Heading text: high-contrast ink.
- Body text: AA-readable ink.
- Muted text: subdued but still legible.
- Semantic colors: use only for real state feedback, not medical proof.

All future visual code should reference tokens or Tailwind utilities derived from tokens. Do not add one-off hardcoded colors in page components.

## Typography Rules

- Current committed font is Inter Variable; keep it until a deliberate font decision is made in a token task.
- Use type hierarchy, weight, and spacing to create character instead of switching fonts casually.
- Keep headings calm and confident.
- Use fluid `clamp()` sizing for major headings when custom CSS is needed.
- Display letter-spacing must not be tighter than `-0.04em`.
- Use balanced heading wraps and pretty paragraph wraps where supported.
- Body text should stay within 65–75ch.
- Avoid repeated tiny uppercase section eyebrows.
- Avoid all-caps body copy.

## Spacing Rules

- Use the project spacing scale and Tailwind utilities.
- Major sections should breathe; content groups should stay compact.
- Vary vertical rhythm intentionally so the page does not feel like stacked template blocks.
- Prefer one dominant reading column for hero and intro content.
- Use grid only for true two-dimensional grouping; use flex for simple rows and wraps.
- For responsive category groups, prefer `repeat(auto-fit, minmax(280px, 1fr))` when custom CSS is needed.

## Radius and Surface Rules

- Use modest radii for panels and cards.
- Pills are allowed only for buttons or small tags.
- Avoid oversized rounded cards.
- Do not pair a decorative 1px border with a large soft shadow.
- Use either a restrained border or a restrained shadow, not both as decoration.
- Avoid nested cards.
- Avoid glassmorphism as a default treatment.

## Motion Rules

Motion should support clarity, not decoration.

- Use short, gentle transform/opacity transitions.
- Prefer ease-out quart/quint/expo-style motion.
- Do not animate layout properties unless necessary.
- Do not gate content visibility on animation.
- Provide reduced-motion fallbacks.
- Use stagger only when it reinforces reading order.
- Avoid scattered effects across every section.

## Light / Dark QA

Preserve light and dark support. The site must continue to use `ui.theme: 'system'` in config.

Light mode expectations:

- Body text has strong contrast on neutral surfaces.
- Accent green is selective and not promotional.
- Category surfaces remain readable without pale gray copy.

Dark mode expectations:

- Text remains readable without washed-out gray.
- Borders and focus states remain visible.
- Accent green remains calm and accessible.
- No hidden content, alternate claims, or contact promises appear only in one theme.

QA must include both themes before declaring visual tasks complete.

## Forbidden UI Tropes

Do not add:

- Gradient text.
- Repeating section eyebrows.
- Hero metric blocks.
- Identical icon-card grids as the main page structure.
- Oversized rounded cards.
- Decorative glass panels.
- Side-stripe border accents.
- Sketchy doodle SVGs or fake pharmacy illustrations.
- Diagonal stripe backgrounds.
- Emojis as structural icons.
- Marketplace promo banners, discounts, ratings, testimonials, or proof counters.

## No Fake Facts

The design must never rely on fabricated business, social, legal, medical, or contact facts. If a fact is not verified, leave it out or frame the section as awaiting official details.

Doc-only guardrail references to forbidden terms are allowed here because this file is non-user-facing planning material.

## Signature Element Direction

Use one restrained, memorable pharmacy-specific structure: a compact “rak kebutuhan” or shelf-map composition that groups allowed categories as labeled rows or compartments. It should feel like organized shelves, not cards with icons.

The signature element must:

- Use approved categories only.
- Avoid product availability promises.
- Avoid medical advice.
- Work in light and dark themes.
- Use token-derived colors and modest radius.
- Stay readable on mobile.

## Allowed Content Pattern

Allowed page structure:

1. Hero with one headline, one short support paragraph, and one safe CTA.
2. Category snapshot for general apotek needs.
3. Value strip using terpercaya, ramah, cepat as tone values only.
4. Short about block.
5. Safe contact area without invented details.

## Forbidden Content Pattern

Do not design components for prescription ordering, consultation, diagnosis, delivery, pickup, checkout, appointment booking, pricing, testimonials, ratings, licenses, certificates, addresses, phone numbers, WhatsApp links, email links, opening hours, maps, or fake social handles unless verified information is later supplied by the user.

## Implementation Skill Preflight

Before future UI work, follow skill preflight: using-superpowers discipline, Astro conventions, Tailwind design-system workflow, Impeccable or frontend design guidance, and copywriting guidance for Indonesian marketing copy.

## Definition of Done

This design foundation is ready when future implementers can build Sinar Farma pages with consistent tokens, concise Indonesian copy, safe factual boundaries, and verified light/dark behavior without inventing unsupported promises.
