# RAYTR!X — Website

A dark, cinematic marketing site for DJ **Raytrix** (Sagar Gamre). Static HTML/CSS/JS — no build step, no framework, no dependencies.

## Structure

```
.
├── index.html        # Home
├── about.html        # Bio, timeline, tours, celebrity list
├── gallery.html      # Photo grid (placeholder tiles)
├── contact.html      # Booking form + contact card
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── img/          # Drop real photos in here
```

## Run locally

Any static server works. Two easy options:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then open http://localhost:8000.

## Deploy

Because it's fully static, host anywhere:

- **Netlify / Vercel** — drag-and-drop the folder, or connect the repo.
- **GitHub Pages** — enable Pages on the branch, point at `/` (root).
- **Cloudflare Pages** — connect the repo, no build command needed.

## Things to swap before launch

- `assets/img/hero.jpg` — replace with a real hero portrait (referenced in `style.css` under `.hero__bg::after`).
- `gallery.html` — swap each `<div class="tile-placeholder">…</div>` for `<img src="assets/img/gallery/xx.jpg" alt="…" />`. The `columns` layout will re-flow automatically.
- `about.html` split-media — replace the placeholder with a portrait.
- `index.html` footer "Follow" — add SoundCloud / Spotify / Mixcloud / YouTube links when we have them.
- Contact form — currently uses a `mailto:` handoff. To capture enquiries server-side, point the `<form>` at [Formspree](https://formspree.io), [Basin](https://usebasin.com) or a Netlify Forms endpoint (add `netlify` attribute + honeypot).

## Design system

- Type: **Anton** (display) + **Inter** (body) — Google Fonts.
- Palette: `--bg #000`, `--fg #f5f5f5`, `--accent #ff2f4a`, `--muted #9a9a9a`.
- Grain overlay via inline SVG (no image dependency).
- Reveal-on-scroll via `IntersectionObserver` — respects `prefers-reduced-motion`.
- Marquee tickers, parallax wordmark, mobile menu — all vanilla CSS/JS.

## SEO / social

Each page has a real `<title>` and `<meta name="description">`. `index.html` also carries `og:` tags. Add an `og:image` (1200×630) once we have hero art.
