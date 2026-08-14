# Site build notes

Static HTML + Tailwind CDN, no framework. `index.html` and the 5
`treatment-*.html` pages share a navbar, mobile menu, and footer that used to
be copy-pasted into every file — any tweak meant editing 6 files by hand.

That's now componentized:

- `partials/navbar.js` — desktop mega-menu + mobile drawer (logo, nav links,
  dropdown panels, portal icon, Patient Advisor button, hamburger).
- `partials/footer.js` — the shared footer.
- `scripts/build.js` — injects the partials into each page, between
  `<!-- BUILD:*:START -->` / `<!-- BUILD:*:END -->` marker comments.

## Changing the navbar or footer

1. Edit `partials/navbar.js` or `partials/footer.js`.
2. Run:
   ```
   npm run build
   ```
   (or `node scripts/build.js` directly)
3. Check the diff — the script only rewrites the content between the marker
   comments in each page, so unrelated page content never changes.

Do **not** hand-edit the HTML between `<!-- BUILD:HEADER:START -->` and
`<!-- BUILD:HEADER:END -->` (or the MOBILE_MENU / NAV_SCRIPT / FOOTER
equivalents) directly in a page — it'll just get overwritten next build.
Everything else in each page (hero, treatment content, forms, etc.) is
page-specific and isn't touched by the build.
