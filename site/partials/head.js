// Shared <head> for every page. Fonts, design tokens, and the CSS that more
// than one page needs live here -- pages never repeat them.
//
// Each page declares its own metadata in a PAGE-META comment at the top of the
// file; scripts/build.js reads it and calls head() with the result.

const SITE = "https://aleynakeskin.vercel.app"; // TODO: alan adi baglanınca gercek adresle degistir

// Design tokens -- the approved "warm earth" palette. Do not swap these for
// colours sampled from the current logo file: that logo is a placeholder the
// client may still change.
//
// `cream` is the page canvas. It used to be a warm off-white (#FBF8F3); it is
// now a light tint of the palette's own `sage`, so the flat background of the
// hero photographs blends into the page instead of ending in a hard rectangle.
// `gold.soft` lost about half its saturation at the same time -- at full
// strength it read pink against the greener canvas.
const TOKENS = {
  ink: { DEFAULT: "#2B2724", soft: "#6B635C", mid: "#453E37" },
  gold: { DEFAULT: "#C89B6B", deep: "#A97C4F", soft: "#EBE6DC" },
  cream: { DEFAULT: "#EFF3EC", deep: "#E6EDE3" },
  terracotta: "#D98E6A",
  sage: "#8FA98B",
};

const SHARED_CSS = `
  html { scroll-behavior: smooth; color-scheme: light; }
  html, body { overflow-x: clip; }
  body { font-family: Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  h1, h2, h3, .font-display { font-family: "Playfair Display", Georgia, serif; letter-spacing: -0.01em; text-wrap: balance; }
  section[id] { scroll-margin-top: 6.5rem; }
  a, button, input, select, textarea { touch-action: manipulation; }
  :is(a, button, input, select, textarea, summary):focus-visible { outline: 2px solid #C89B6B; outline-offset: 2px; border-radius: 4px; }
  .bg-ink :is(a, button, input, select):focus-visible { outline-color: ${TOKENS.gold.soft}; }

  /* Gold rule with a dot -- the divider motif from the business card */
  .rule-gold { display: flex; align-items: center; gap: .5rem; }
  .rule-gold::before { content: ""; height: 1px; width: 100%; max-width: 8rem; background: linear-gradient(to right, #C89B6B, rgba(200,155,107,.25)); }
  .rule-gold::after { content: ""; width: 5px; height: 5px; border-radius: 50%; background: #C89B6B; flex-shrink: 0; }

  /* Photo placeholder -- stands in where a real photo of Aleyna or her room goes */
  .ph-photo { background: ${TOKENS.cream.DEFAULT}; border: 1px solid #C89B6B; border-radius: 1.5rem; display: flex; align-items: center; justify-content: center; min-height: 320px; }
  .ph-photo span { font-size: .8125rem; letter-spacing: .08em; text-transform: uppercase; color: #A97C4F; }

  /* Header: floating pill that expands to a full-width bar on scroll */
  #site-header { transition: top .4s cubic-bezier(.4,0,.2,1), padding .4s cubic-bezier(.4,0,.2,1); }
  #site-header > div { transition: max-width .4s cubic-bezier(.4,0,.2,1), border-radius .4s cubic-bezier(.4,0,.2,1), box-shadow .4s ease; }
  #site-header.scrolled { top: 0; padding: 0; }
  #site-header.scrolled > div { max-width: 100%; border-radius: 0; }

  /* Services dropdown */
  .nav-item .dropdown-panel { opacity: 0; visibility: hidden; transform: translateY(-6px); transition: opacity .2s ease, visibility .2s, transform .2s ease; }
  .nav-item:hover .dropdown-panel, .nav-item:focus-within .dropdown-panel { opacity: 1; visibility: visible; transform: none; }

  /* Mobile drawer */
  #menu-btn .menu-line { position: absolute; left: 50%; top: 50%; width: 20px; height: 2px; background: #2B2724; border-radius: 2px; transition: transform .35s cubic-bezier(.4,0,.2,1), opacity .2s ease, width .35s cubic-bezier(.4,0,.2,1); }
  #menu-btn .menu-line-1 { transform: translate(-50%, -7px); }
  #menu-btn .menu-line-2 { width: 14px; transform: translate(calc(-50% + 3px), 0); }
  #menu-btn .menu-line-3 { transform: translate(-50%, 7px); }
  #menu-btn.menu-open .menu-line-1 { transform: translate(-50%, -50%) rotate(45deg); }
  #menu-btn.menu-open .menu-line-2 { opacity: 0; transform: translate(-50%, -50%) scale(0); }
  #menu-btn.menu-open .menu-line-3 { transform: translate(-50%, -50%) rotate(-45deg); }
  .menu-panel { grid-template-rows: 0fr; transition: grid-template-rows .3s ease; }
  .menu-panel.open { grid-template-rows: 1fr; }
  .menu-toggle[aria-expanded="true"] .chevron { transform: rotate(90deg); }

  /* Scroll-in reveal */
  .fade-up { opacity: 0; transform: translateY(24px); transition: opacity .8s ease, transform .8s ease; }
  .fade-up.visible { opacity: 1; transform: none; }

  /* Cards */
  .card-img { transition: transform .7s ease; }
  .card:hover .card-img { transform: scale(1.04); }
  .expand-row { display: flex; gap: 1.25rem; }
  .expand-row .card { flex: 1 1 0%; transition: flex-grow .6s cubic-bezier(.4,0,.2,1); min-width: 0; }
  .expand-row .card:hover { flex-grow: 1.5; }
  @media (max-width: 767px) { .expand-row { flex-direction: column; } .expand-row .card:hover { flex-grow: 1; } }

  /* Process timeline with a scroll-driven fill */
  .tl-line, #tl-fill { position: absolute; left: 11px; top: 0; width: 3px; border-radius: 2px; }
  .tl-line { bottom: 0; background: rgba(43,39,36,.10); }
  #tl-fill { height: 0; background: #8FA98B; transition: height .15s linear; }
  .tl-marker { position: absolute; left: 0; top: 2px; width: 25px; height: 25px; border-radius: 8px; background: #fff; border: 1px solid rgba(43,39,36,.14); display: flex; align-items: center; justify-content: center; transition: background .3s ease, border-color .3s ease; }
  .tl-marker::after { content: ""; width: 9px; height: 9px; border-radius: 3px; background: rgba(43,39,36,.18); transition: background .3s ease; }
  .tl-step.is-passed .tl-marker { background: #8FA98B; border-color: #8FA98B; }
  .tl-step.is-passed .tl-marker::after { background: #fff; }

  /* FAQ */
  details.faq { border-bottom: 1px solid rgba(43,39,36,.10); }
  details.faq summary { list-style: none; cursor: pointer; }
  details.faq summary::-webkit-details-marker { display: none; }
  details.faq[open] summary .faq-icon { transform: rotate(45deg); }
  .faq-icon { transition: transform .25s ease; }

  /* Long-form text (blog posts, legal pages) */
  .prose p { margin-bottom: 1.15rem; line-height: 1.8; }
  .prose h2 { font-size: 1.5rem; margin: 2.25rem 0 .85rem; }
  .prose h3 { font-size: 1.2rem; margin: 1.85rem 0 .7rem; }
  .prose ul, .prose ol { margin: 0 0 1.15rem 1.25rem; line-height: 1.8; }
  .prose ul { list-style: disc; }
  .prose ol { list-style: decimal; }
  .prose li { margin-bottom: .4rem; }
  .prose a { color: #A97C4F; text-decoration: underline; text-underline-offset: 3px; }
  .prose strong { font-weight: 600; }
  .prose blockquote { border-left: 3px solid #C89B6B; padding-left: 1.15rem; margin: 1.5rem 0; color: #6B635C; }

  /* --- Mobil: uygulama benzeri alt sekme cubugu --- */
  #tab-bar { position: fixed; bottom: 0; left: 0; right: 0; z-index: 46;
    display: grid; grid-template-columns: repeat(5, 1fr);
    background: rgba(255,255,255,.94); backdrop-filter: blur(12px);
    border-top: 1px solid rgba(43,39,36,.08);
    padding-bottom: env(safe-area-inset-bottom); }
  .tab-item { display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 4px; min-height: 58px; padding: 8px 4px; color: #6B635C;
    font-size: 11px; line-height: 1.1; text-align: center;
    -webkit-tap-highlight-color: transparent; transition: color .2s ease; }
  .tab-item svg { width: 22px; height: 22px; }
  .tab-item.is-active { color: #2B2724; }
  .tab-item.is-active svg { color: #A97C4F; }
  .tab-item:active { background: rgba(43,39,36,.05); }
  .tab-item-wa { color: #128C4A; }
  /* Alt cubuk icerigi ortmesin */
  @media (max-width: 1023px) { body { padding-bottom: calc(58px + env(safe-area-inset-bottom)); } }
  /* id secicisi Tailwind'in lg:hidden sinifindan guclu; masaustunde elle gizliyoruz */
  @media (min-width: 1024px) { #tab-bar { display: none; } }

  /* --- Mobil: acilir footer bolumleri --- */
  .footer-group > summary { list-style: none; cursor: pointer; display: flex;
    align-items: center; justify-content: space-between; gap: 1rem;
    padding: .875rem 0; border-top: 1px solid rgba(255,255,255,.1); }
  .footer-group > summary::-webkit-details-marker { display: none; }
  .footer-group[open] > summary .footer-chevron { transform: rotate(180deg); }
  .footer-chevron { transition: transform .25s ease; opacity: .6; }
  .footer-panel { padding-bottom: .75rem; }
  @media (min-width: 768px) {
    .footer-group > summary { border-top: 0; padding: 0 0 1rem; cursor: default; pointer-events: none; }
    .footer-panel { padding-bottom: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    #site-header, #site-header > div, .dropdown-panel, .menu-panel, .chevron,
    #menu-btn .menu-line, #tl-fill, .tl-marker, .tl-marker::after, .faq-icon { transition: none !important; }
    .fade-up { opacity: 1; transform: none; transition: none; }
    .card-img, .expand-row .card { transition: none !important; }
    .expand-row .card:hover { flex-grow: 1; }
    .card:hover .card-img { transform: none; }
  }
`;

/**
 * @param {object} meta
 * @param {string} meta.title       full <title>, 60 chars or fewer
 * @param {string} meta.description meta description, 158 chars or fewer
 * @param {string} meta.path        page path relative to site root, e.g. "hizmetler.html" ("" for home)
 * @param {string} [meta.image]     OG image path relative to site root
 * @param {object|object[]} [meta.jsonLd] structured data appended as-is
 */
function head({ title, description, path = "", image = "assets/og-image.jpg", jsonLd, prefix = "" }) {
  const url = `${SITE}/${path}`;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const schemaTags = schemas
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n");

  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#2B2724">

<link rel="icon" href="${prefix}favicon.ico" sizes="48x48">
<link rel="icon" type="image/png" sizes="32x32" href="${prefix}assets/favicon-32.png">
<link rel="apple-touch-icon" href="${prefix}assets/apple-touch-icon.png">

<meta property="og:type" content="website">
<meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="Ergoterapist Aleyna Keskin">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">

<script src="https://cdn.tailwindcss.com"></script>
<script>
tailwind.config = { theme: { extend: {
  colors: ${JSON.stringify(TOKENS)},
  fontFamily: {
    sans: ["Figtree", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
    display: ["Playfair Display", "Georgia", "serif"]
  },
  borderRadius: { "4xl": "2rem" }
} } }
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Figtree:wght@400;500;600&display=swap" rel="stylesheet">
<style>${SHARED_CSS}</style>
${schemaTags}`;
}

module.exports = { head, TOKENS, SITE };
