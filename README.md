# Nikita Sonkin — Portfolio

Personal portfolio site. Amber CRT terminal aesthetic, monospace, single-page scroll.

**Live:** https://nikitasonkin.github.io/Portfolio.io/

---

## Folder structure

```
NikitaPortfolio/
├── index.html              ← main page
├── assets/
│   ├── css/main.css        ← all styling (CRT theme, responsive)
│   ├── js/main.js          ← nav highlighting, copy buttons, timestamp
│   └── files/              ← drop CV PDF here
│       └── Nikita_Sonkin_Resume_EN.pdf   ← (add this file)
├── images/
│   └── user.jpg            ← profile photo (add this file)
└── README.md               ← you're reading it
```

---

## Run locally (no build step)

This is plain HTML + CSS + JS. No bundler, no dependencies, no npm install.

### Option 1 — Open the file directly

1. Double-click `index.html`
2. Browser opens, site renders

(JetBrains Mono loads from Google Fonts, so you need internet for the right font. Without internet, fallback monospace will be used.)

### Option 2 — Local server (recommended for testing share links)

```bash
# Python 3
cd NikitaPortfolio
python -m http.server 8000

# Or with Node
npx serve .
```

Then open http://localhost:8000

---

## Two assets you need to drop in before deploying

### 1. Profile photo

- File: `images/user.jpg`
- Dimensions: 800×800px or larger, square crop preferred
- Background: neutral or warm; the page applies a subtle sepia filter so any normal photo will look fine
- If `user.jpg` is missing, the page falls back to a placeholder so you can deploy first and add the photo later

### 2. CV PDF

- File: `assets/files/Nikita_Sonkin_Resume_EN.pdf`
- Use the latest version of your resume
- The download buttons in the hero and contact section both point to this path

---

## Deploy to GitHub Pages

This folder maps directly onto your existing repo at `nikitasonkin/Portfolio.io`.

```bash
# from the existing repo root, after backing up your current files
git checkout -b redesign/amber-crt
# replace files with the new ones
git add .
git commit -m "Redesign: amber CRT terminal aesthetic, focus on job search"
git push -u origin redesign/amber-crt
# open a PR, merge, GitHub Pages will rebuild within ~30 seconds
```

If Pages serves from `main`, just commit straight there.

---

## Customizing

### Change the accent color

Open `assets/css/main.css`, edit the `:root` block at the top:

```css
:root {
  --text-primary: #FFB000;   /* main amber — change to anything */
  --bg-primary: #1a1410;     /* warm-black background */
  /* ... */
}
```

Try `#00FF00` + `#000000` for classic green-on-black, or `#9FE1CB` + `#0D1B1F` for cool teal terminal.

### Add or remove projects

Each project is one `<article class="project">` block in `index.html`. Copy the structure of an existing one. Status badges are `[ LIVE ]`, `[ IN ACTIVE DEVELOPMENT ]`, or `[ COMPLETE ]` — controlled by adding `status--live`, `status--wip`, or `status--done` class.

### Update the cursor blink speed

In `main.css`, find `@keyframes blink` and the `.cursor { animation: ... }` line. Default is 1.05s.

---

## Browser support

- Chrome / Edge: full support
- Firefox: full support
- Safari (desktop & iOS): full support, except `backdrop-filter` on the nav requires Safari 9+ (already widely supported)
- Internet Explorer: not supported (it's 2026)

---

## SEO and metadata

The page already includes:

- Proper `<title>` and meta description
- Open Graph tags for social sharing
- Schema.org `Person` JSON-LD for rich search results
- Semantic HTML5 (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Skip-link friendly structure
- `prefers-reduced-motion` support

For the OG image (Twitter / LinkedIn previews), add a 1200×630px screenshot of the hero terminal as `og-image.png` at the root and add this line to `<head>`:

```html
<meta property="og:image" content="https://nikitasonkin.github.io/Portfolio.io/og-image.png">
```

---

## Lighthouse targets

Run Lighthouse in Chrome DevTools (Lighthouse tab → Generate report). Aim for:

- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

The current build hits all four out of the box on a clean machine.

---

## License

MIT — same as the existing repo.
