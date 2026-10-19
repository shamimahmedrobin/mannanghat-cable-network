# Mannanghat Cable Network — Website

Minimal, fast-loading static website in English. No frameworks — just HTML + CSS + JavaScript.

## Files

| File | Purpose |
|---|---|
| `index.html` | Homepage |
| `about.html` | About Us |
| `privacy.html` | Privacy Policy |
| `terms.html` | Terms & Conditions |
| `refund.html` | Return & Refund Policy |
| `styles.css` | Design (shared by all pages) |
| `config.js` | ⭐ **All business content here** — phone numbers, packages, payment numbers, FAQs, notices |
| `app.js` | Interactions (renders homepage content from config.js) |
| `images/` | Logo + favicons (**uploaded via GitHub web UI, not the connector**) |

## Changing content

Edit only **`config.js`**. Examples:

- Hotline: `hotline: "01314773796"` (display format in `hotlineDisplay`)
- WhatsApp: `whatsapp: "8801314773796"` — country code (880) + number, no spaces
- Packages: edit the `PACKAGES` list; `popular: true` highlights a card
- Coverage: add area names to `COVERAGE_AREAS` — the coverage section appears automatically (empty = hidden)
- Payment numbers: `PAYMENTS` list
- Notices: add `{ date, text }` lines to `NOTICES`

Leave `facebook: ""` empty to hide the Facebook link.

## Logo & favicon

The files `images/logo.png`, `images/favicon.png`, `images/apple-touch-icon.png`
are **binary** — the GitHub connector corrupts binary uploads. Upload them via
the GitHub web UI: open the repo → `images/` folder → "Add file" → "Upload files"
→ drag the three PNGs from `mannanghat-logo.zip`.

Until uploaded, the site degrades gracefully (logo hides itself, default favicon shows).

## How the connection form works

No server: submitting the form opens WhatsApp with a pre-filled message to the
number in `config.js` → `whatsapp`.

## GitHub Pages

Already enabled: Settings → Pages → Deploy from a branch (main, /root).
Live at https://shamimahmedrobin.github.io/mannanghat-cable-network/
Every merge to `main` redeploys automatically in ~1–2 minutes.

## Size

Whole site ~60KB (without images) — loads in about a second on mobile data.
