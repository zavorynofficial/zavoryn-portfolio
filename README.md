# Zavoryn — Static Website

**Brand:** Zavoryn  
**Slogan:** Make Business Smarter  
**Email:** zavoryn@outlook.com  
**Instagram/Facebook:** zavoryn.official

## What this is

A premium, responsive, static agency website designed for Zavoryn. It includes:

- Home
- About
- Services
- Portfolio
- 3 concept project detail pages
- Contact
- Privacy
- Terms
- 404
- Responsive mobile navigation
- Portfolio filters
- Scroll reveal animations
- Contact form that prepares an email through `mailto:`
- No backend, database, admin panel, or paid dependency

## Files

- `index.html`
- `about.html`
- `services.html`
- `portfolio.html`
- `project-dental.html`
- `project-medspa.html`
- `project-realestate.html`
- `contact.html`
- `privacy.html`
- `terms.html`
- `404.html`
- `assets/style.css`
- `assets/script.js`
- `assets/favicon.svg`

## Deploy

This can be deployed as a static site on GitHub Pages, Cloudflare Pages, Netlify, or similar static hosting.

For Cloudflare Pages, connect the GitHub repository and use:
- Framework preset: None
- Build command: none
- Output directory: `/`

Keep `index.html` at the repository root.

## Editing

Because this is plain HTML/CSS/JS, you can edit it from GitHub's browser editor (`github.dev`) without VS Code.

## Contact form

The contact form does not store submissions because this version has no backend. It creates an email draft addressed to `zavoryn@outlook.com`.

If a real lead database is needed later, add a backend such as Supabase or a form service.
