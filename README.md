# RAYTR!X — Website

Static marketing site for DJ **Raytrix** (Sagar Gamre). Warm cream palette, editorial type (Fraunces + Space Grotesk), vermillion + cobalt accents. No build step, no framework, no dependencies.

## Structure

```
.
├── index.html        # Home
├── about.html        # Bio, timeline, tours, celebrity list
├── gallery.html      # Photo grid (placeholder tiles for now)
├── contact.html      # Booking form + contact card
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── img/
        ├── logo.svg        # nav logo (dark-on-cream)  — REPLACE with client's actual logo
        └── logo-light.svg  # optional light variant  — REPLACE if used
```

## Run locally

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open http://localhost:8000.

## Deploy

Because it's fully static, host anywhere:
- **Netlify / Vercel / Cloudflare Pages** — connect the repo, no build command needed.
- **GitHub Pages** — enable Pages on the branch, root folder.

## Things to swap before launch

1. **Logo** — `assets/img/logo.svg` is a text placeholder. Save the real RAYTR!X logo (SVG preferred, transparent PNG works too) at `assets/img/logo.svg` and it drops straight into the nav on every page.
2. **Hero portrait** — `index.html` and `about.html` reference a `<div class="tile">` placeholder. Swap each for an `<img src="assets/img/hero.jpg" alt="Raytrix" />` — portrait orientation, 1200 × 1500 or larger.
3. **Gallery photos** — 12 placeholder tiles in `gallery.html`. Swap each `<div class="tile">…</div>` for `<img src="assets/img/gallery/xx.jpg" alt="…">` — the masonry layout re-flows automatically.
4. **Music links** — footer "Follow" list on every page: add SoundCloud, Spotify, Mixcloud, YouTube. On the home page, the three "Selected sets" cards can be turned into real SoundCloud/Mixcloud embeds.
5. **Booking form backend** — currently a `mailto:` handoff. To capture leads server-side, point the `<form>` at [Formspree](https://formspree.io), [Basin](https://usebasin.com) or Netlify Forms (add the `netlify` attribute + a honeypot).

## Design system

- Palette: `--cream #f2ede1`, `--paper #f7f3e9`, `--ink #0f0f10`, `--vermillion #ff4a1c`, `--cobalt #1a3fff`.
- Type: **Fraunces** (variable serif — supports weight + italic + optical-size axes) for headings; **Space Grotesk** for body / UI.
- Paper grain overlay via inline SVG (no external image).
- Reveal-on-scroll via `IntersectionObserver` — respects `prefers-reduced-motion`.
- Rotating "Bookings Open" badge on the hero uses SVG `textPath` on a circle — no dependencies.
- Marquee tickers alternate between cream, ink, and vermillion backgrounds to break up scroll rhythm.

## SEO / social

Each page has a real `<title>` and `<meta name="description">`. `index.html` also carries `og:` tags. Add a 1200 × 630 `og:image` once we have the hero art.
