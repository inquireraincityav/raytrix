# RAYTR!X — Website

Static marketing site for DJ **Raytrix** (Sagar Gamre). Dark, cinematic DJ-industry design (video-first hero, editorial type in Space Grotesk + Inter, red accent) with Indian/Bollywood design touches — a jali lattice pattern and marigold-gold detailing. No build step, no framework, no dependencies.

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

## Videos

The site is built to lean heavily on video. Four delivery paths are supported, and any of them can be dropped in on the home page reel, the "Selected sets" grid, or the gallery:

| Source | Attribute | Example |
|--------|-----------|---------|
| Self-hosted MP4 | `data-video="path.mp4"` | `data-video="assets/video/reel.mp4"` |
| YouTube | `data-youtube="ID"` | `data-youtube="dQw4w9WgXcQ"` |
| Vimeo | `data-vimeo="ID"` | `data-vimeo="76979871"` |
| Instagram Reel | `data-instagram="URL"` | `data-instagram="https://www.instagram.com/reel/Cxxxxxxxxxx/"` |

Any element with one of those attributes becomes clickable and opens the built-in lightbox player. Escape / backdrop-click / X closes it.

Instagram Reels render via Instagram's own oEmbed widget (`embed.js`), loaded lazily the first time a Reel is opened — it needs normal internet access, so it only works once the site is actually deployed (not in a sandboxed preview). The lightbox automatically switches to a tall 9:16 frame for Instagram content.

### Where to drop files

```
assets/
  video/
    reel.mp4              # home + gallery hero reel (recommended 1920×1080 H.264, ≤ 10 MB)
    wedding.mp4
    kittysu.mp4
    …
  img/
    reel-poster.jpg       # 1920×1080 still — displayed before play
    gallery/
      07-poster.jpg       # video posters for the mixed gallery
```

For **self-hosted MP4s**, keep files under ~10 MB and encode with `ffmpeg -vcodec libx264 -crf 24 -preset slow -movflags +faststart` for fast starts. For longer highlight reels or full sets, use YouTube or Vimeo instead so they don't blow up page weight.

### Turning any tile into a video

In gallery.html, swap a photo `<figure>` for:

```html
<figure class="is-video" data-video="assets/video/xx.mp4">
  <img src="assets/img/gallery/xx-poster.jpg" alt="…">
  <figcaption>Set at KITTY SU</figcaption>
</figure>
```

The `.is-video` class shows a small ▶ badge; the `data-*` attribute triggers the lightbox on click.

### Hero background video (optional)

To use a muted looping clip behind the hero instead of a still portrait, swap the `<div class="tile">` inside `.hero__portrait` for:

```html
<video autoplay muted loop playsinline poster="assets/img/hero-poster.jpg">
  <source src="assets/video/hero.mp4" type="video/mp4">
</video>
```

Add `.hero--video` on the `<section class="hero">` so the sizing rules kick in.

## Design system

- Palette: `--bg #000`, `--elev #0d0d0f`, `--fg #fafafa`, `--accent #ff3a2d` (vermillion red), `--gold #d9a441` (marigold gold — Indian/Bollywood accent). Dark only, no light mode.
- Type: **Space Grotesk** for display/headings; **Inter** for body / UI.
- Film-grain overlay via inline SVG (no external image).
- Reveal-on-scroll via `IntersectionObserver` — respects `prefers-reduced-motion`.
- Nav is transparent over the hero video and solidifies to a blurred pill once scrolled.
- Featured Show section uses a jali lattice pattern (Indo-Islamic pierced-stone motif) in gold as a background texture.
- Music cards reveal a vinyl record with a gold label behind the cover art on hover, plus a play button.
- Marquee tickers scroll continuously to break up section rhythm.

## SEO / social

Each page has a real `<title>` and `<meta name="description">`. `index.html` also carries `og:` tags. Add a 1200 × 630 `og:image` once we have the hero art.
