// Single source of truth for the site navbar (desktop mega-menu + mobile drawer).
// Edit this file, then run `node scripts/build.js` from site/ to propagate the
// change to index.html and every treatment-*.html page.

const TREATMENTS = [
  {
    key: "hair",
    href: "treatment-hair.html",
    label: "Hair Transplant",
    cols: 3,
    items: [
      { href: "treatment-hair.html", img: "assets/hair.webp", alt: "FUE Hair Transplant", label: "FUE Hair Transplant", size: "h-64", imgClass: "object-cover object-top", cardClass: "" },
      { href: "treatment-hair.html", img: "assets/menu-dhi.webp", alt: "DHI Hair Transplant", label: "DHI Hair Transplant", size: "h-64", imgClass: "object-cover", cardClass: "" },
      { href: "treatment-hair.html", img: "assets/beard.webp", alt: "Beard Transplant", label: "Beard Transplant", size: "h-64", imgClass: "object-cover", cardClass: "" },
    ],
  },
  {
    key: "bariatric-alt",
    href: "treatment-bariatric-alt.html",
    label: "Bariatric Surgery",
    cols: 3,
    items: [
      { href: "treatment-bariatric-alt.html", img: "assets/menu-bariatric.webp", alt: "Bariatric Surgery", label: "Bariatric Surgery", size: "h-64", imgClass: "object-cover", cardClass: "" },
    ],
  },
  {
    key: "ivf",
    href: "treatment-ivf.html",
    label: "IVF",
    cols: 3,
    items: [
      { href: "treatment-ivf.html", img: "assets/menu-ivf-standard.webp", alt: "Standard IVF Treatment", label: "Standard IVF Treatment", size: "h-64", imgClass: "object-cover", cardClass: "" },
      { href: "treatment-ivf.html", img: "assets/ivf.webp", alt: "IVF + Genetic Testing (PGT)", label: "IVF + Genetic Testing (PGT)", size: "h-64", imgClass: "object-cover", cardClass: "" },
    ],
  },
  {
    key: "dental",
    href: "treatment-dental.html",
    label: "Dental",
    cols: 3,
    items: [
      { href: "treatment-dental.html", img: "assets/dental-menu.webp", alt: "Dental Implants", label: "Dental Implants", size: "h-64", imgClass: "object-cover", cardClass: "" },
      { href: "treatment-dental.html", img: "assets/menu-dental-fullmouth.webp", alt: "Full Mouth Restoration", label: "Full Mouth Restoration", size: "h-64", imgClass: "object-cover", cardClass: "" },
      { href: "treatment-dental.html", img: "assets/menu-dental-veneers.webp", alt: "Veneers / Hollywood Smile", label: "Veneers / Hollywood Smile", size: "h-64", imgClass: "object-cover", cardClass: "" },
    ],
  },
  {
    key: "orthopedic",
    href: "treatment-orthopedic.html",
    label: "Orthopedic /Spine",
    cols: 4,
    items: [
      { href: "treatment-orthopedic.html", img: "assets/menu-knee.webp", alt: "Total Knee Replacement", label: "Total Knee Replacement", size: "h-56", imgClass: "object-contain", cardClass: " bg-white", noLazy: true, noTransform: true },
      { href: "treatment-orthopedic.html", img: "assets/menu-hip.webp", alt: "Total Hip Replacement", label: "Total Hip Replacement", size: "h-56", imgClass: "object-cover", cardClass: "" },
      { href: "treatment-orthopedic.html", img: "assets/menu-cervical.webp", alt: "Cervical Disc Herniation Surgery", label: "Cervical Disc Herniation Surgery", size: "h-56", imgClass: "object-cover", cardClass: "" },
      { href: "treatment-orthopedic.html", img: "assets/spine.webp", alt: "Lumbar Disc Herniation Surgery", label: "Lumbar Disc Herniation Surgery", size: "h-56", imgClass: "object-cover", cardClass: "" },
    ],
  },
];

function panelItem(it, textSize) {
  const lazy = it.noLazy ? "" : "loading=\"lazy\" ";
  const transition = it.noTransform
    ? "group-hover:scale-105 transition duration-500"
    : "group-hover:scale-105 transition-transform duration-500";
  return `              <a href="${it.href}" class="relative rounded-xl overflow-hidden ${it.size} group${it.cardClass}">
                <img src="${it.img}" alt="${it.alt}" ${lazy}class="absolute inset-0 w-full h-full ${it.imgClass} ${transition}">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div class="absolute bottom-3 left-4 right-3 flex items-center justify-between text-white font-semibold${textSize}"><span>${it.label}</span><span class="w-8 h-8 shrink-0 rounded-full bg-amber-400 text-ink flex items-center justify-center">→</span></div>
              </a>`;
}

function desktopNavItem(t, activeKey) {
  const isActive = t.key === activeKey;
  const triggerClass = isActive
    ? "inline-block px-3 py-2 rounded-full bg-stone text-ink"
    : "inline-block px-3 py-2 rounded-full hover:bg-stone hover:text-ink transition";
  const textSize = t.cols === 4 ? " text-sm" : "";
  const panelHtml = t.items.map((it) => panelItem(it, textSize)).join("\n");
  return `        <div class="nav-item">
          <a href="${t.href}" class="${triggerClass}">${t.label}</a>
          <div class="dropdown-panel absolute left-0 right-0 top-full">
            <div class="bg-white rounded-b-2xl shadow-xl shadow-black/10 p-4 grid grid-cols-${t.cols} gap-4">
${panelHtml}
            </div>
          </div>
        </div>`;
}

// page: "index" | "hair" | "bariatric" | "ivf" | "dental" | "orthopedic"
function renderHeader(page) {
  const overviewHref = page === "index" ? "#top" : "index.html";
  const logoHref = page === "index" ? "#top" : "index.html";
  const navItems = TREATMENTS.map((t) => desktopNavItem(t, page)).join("\n\n");

  return `<!-- NAVBAR (shared — generated from partials/navbar.js, do not edit by hand) -->
<style>
  .nav-item .dropdown-panel { opacity: 0; visibility: hidden; transition: opacity .2s ease, visibility .2s; }
  .nav-item:hover .dropdown-panel { opacity: 1; visibility: visible; }
  #nav-mega-backdrop {
    position: fixed; inset: 0; z-index: 40; opacity: 0; pointer-events: none;
    background-color: rgba(10, 14, 20, .35); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    transition: opacity .25s ease;
  }
  #site-header:has(.nav-item:hover) ~ #nav-mega-backdrop { opacity: 1; }
  @media (prefers-reduced-motion: reduce) { #nav-mega-backdrop { transition: none; } }
</style>
<header id="site-header" class="fixed top-4 inset-x-0 z-50 px-4">
  <div class="relative max-w-6xl mx-auto bg-white/95 backdrop-blur rounded-2xl shadow-lg shadow-black/5">
    <div class="flex items-center justify-between pl-4 pr-2 py-2">
      <a href="${logoHref}" class="shrink-0"><img src="assets/logo-box.webp" alt="Take Care Turkey" width="122" height="36" class="h-9 w-auto"></a>
      <nav class="hidden lg:flex items-center gap-1 text-sm font-normal text-ink/80">
        <a href="${overviewHref}" class="px-3 py-2 rounded-full hover:bg-stone hover:text-ink transition">Overview</a>

${navItems}
      </nav>
      <div class="flex items-center gap-2">
        <a href="portal-login.html" aria-label="Patient Portal" title="Patient Portal" class="hidden md:flex items-center justify-center w-[52px] h-[52px] rounded-full text-ink/70 hover:text-ink hover:bg-stone transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9.25"/>
            <circle cx="12" cy="10" r="3"/>
            <path d="M6.7 18.5c1.2-2.2 3.1-3.3 5.3-3.3s4.1 1.1 5.3 3.3"/>
          </svg>
        </a>
        <a href="#contact" class="hidden sm:flex items-center gap-2 bg-ink text-white rounded-full pl-1.5 pr-5 py-1.5 hover:bg-navy transition">
          <span class="relative">
            <img src="assets/advisor.webp" alt="" aria-hidden="true" width="32" height="32" class="w-8 h-8 rounded-full object-cover">
            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-ink"></span>
          </span>
          <span class="text-sm font-semibold">Patient Advisor</span>
        </a>
        <button id="menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" class="lg:hidden relative w-10 h-10 rounded-full hover:bg-stone transition">
          <span class="menu-line menu-line-1"></span>
          <span class="menu-line menu-line-2"></span>
          <span class="menu-line menu-line-3"></span>
        </button>
      </div>
    </div>
  </div>
</header>
<div id="nav-mega-backdrop"></div>`;
}

function mobileAccordionItem(t) {
  const subLinks = t.items
    .map((it) => `            <a href="${it.href}" class="block py-2 hover:text-ink transition">${it.label}</a>`)
    .join("\n");
  return `    <div class="border-t border-ink/5 mt-1 pt-1">
      <button class="menu-toggle w-full flex items-center justify-between gap-3 px-3 py-3.5 rounded-xl font-semibold hover:bg-stone transition" aria-expanded="false">
        <span class="flex items-center gap-2.5"><span class="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>${t.label}</span>
        <svg class="chevron w-4 h-4 shrink-0 text-ink/40 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
      </button>
      <div class="menu-panel grid transition-[grid-template-rows] duration-300 ease-out">
        <div class="overflow-hidden">
          <div class="pl-8 pr-3 pb-2 space-y-0.5 text-sm text-ink/70">
${subLinks}
          </div>
        </div>
      </div>
    </div>`;
}

function mobileFlatItem(t, activeKey, isFirst) {
  const isActive = t.key === activeKey;
  const border = isFirst ? "border-t border-ink/5 mt-1 pt-1" : "border-t border-ink/5";
  const cls = isActive
    ? `flex items-center gap-2.5 px-3 py-3.5 rounded-xl font-semibold bg-stone text-navy transition ${border}`
    : `flex items-center gap-2.5 px-3 py-3.5 rounded-xl font-semibold hover:bg-stone transition ${border}`;
  return `    <a href="${t.href}" class="${cls}">
      <span class="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>${t.label}
    </a>`;
}

// On the index page, a treatment with only one sub-item has nothing to expand
// into -- render it as a plain link (matching its single-image desktop
// dropdown) instead of a one-item accordion.
function mobileSingleLinkOnIndex(t) {
  return `    <a href="${t.href}" class="flex items-center gap-2.5 px-3 py-3.5 rounded-xl font-semibold hover:bg-stone transition border-t border-ink/5 mt-1 pt-[calc(0.875rem+1px)]">
      <span class="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>${t.label}
    </a>`;
}

// page: "index" | "hair" | "bariatric" | "ivf" | "dental" | "orthopedic"
function renderMobileMenu(page) {
  const overviewHref = page === "index" ? "#top" : "index.html";
  const isIndex = page === "index";

  const navBody = isIndex
    ? TREATMENTS.map((t) => (t.items.length > 1 ? mobileAccordionItem(t) : mobileSingleLinkOnIndex(t))).join("\n\n")
    : TREATMENTS.map((t, i) => mobileFlatItem(t, page, i === 0)).join("\n");

  const advisorBlock = `    <a href="#contact" class="flex items-center gap-3 bg-stone rounded-xl px-3 py-2.5">
      <span class="relative shrink-0">
        <img src="assets/advisor.webp" alt="" aria-hidden="true" width="36" height="36" class="w-9 h-9 rounded-full object-cover">
        <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-stone"></span>
      </span>
      <span>
        <span class="block text-sm font-semibold">Patient Advisor</span>
        <span class="block text-xs text-ink/50">Chat with our team</span>
      </span>
    </a>`;

  const footerBlock = isIndex
    ? `${advisorBlock}
    <a href="#contact" class="block bg-ink text-white text-center font-semibold py-3.5 rounded-full hover:bg-navy transition">Reserve Your Care</a>`
    : `${advisorBlock}
    <a href="#contact" class="block bg-ink text-white text-center font-semibold py-3.5 rounded-full hover:bg-navy transition">Reserve Your Care</a>`;

  const portalLink = isIndex
    ? `    <a href="portal-login.html" class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-stone transition text-sm font-medium text-ink/70">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.25"/><circle cx="12" cy="10" r="3"/><path d="M6.7 18.5c1.2-2.2 3.1-3.3 5.3-3.3s4.1 1.1 5.3 3.3"/></svg>
      Patient Portal
    </a>
`
    : "";

  return `<!-- MOBILE MENU BACKDROP (z-50: must also cover the fixed site header/logo) -->
<div id="mobile-menu-backdrop" class="fixed inset-0 bg-ink/40 backdrop-blur-md z-[55] opacity-0 pointer-events-none transition-opacity duration-300 lg:hidden"></div>

<!-- MOBILE MENU DRAWER -->
<aside id="mobile-menu" class="fixed top-0 right-0 z-[60] h-full w-[86%] max-w-sm bg-white translate-x-full transition-transform duration-300 ease-out lg:hidden flex flex-col shadow-2xl" aria-hidden="true">
  <div class="flex items-center justify-between px-5 py-4 border-b border-ink/10 shrink-0">
    <img src="assets/logo-box.webp" alt="Take Care Turkey" width="122" height="36" class="h-8 w-auto">
    <button id="menu-close" aria-label="Close menu" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone transition">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
  </div>

  <nav class="flex-1 overflow-y-auto overscroll-contain px-3 py-2">
    <a href="${overviewHref}" class="block px-3 py-3.5 rounded-xl font-semibold hover:bg-stone transition">Overview</a>

${navBody}
  </nav>

  <div class="border-t border-ink/10 p-4 space-y-2.5 shrink-0">
${portalLink}${footerBlock}
  </div>
</aside>`;
}

const NAVBAR_SCRIPT = `<script>
(() => {
  const sh = document.getElementById("site-header");
  const onS = () => sh.classList.toggle("scrolled", window.scrollY > 60);
  document.addEventListener("scroll", onS, { passive: true }); onS();

  const menuBtn = document.getElementById("menu-btn");
  const menuClose = document.getElementById("menu-close");
  const menu = document.getElementById("mobile-menu");
  const backdrop = document.getElementById("mobile-menu-backdrop");

  const openMenu = () => {
    menu.classList.remove("translate-x-full");
    backdrop.classList.remove("opacity-0", "pointer-events-none");
    document.body.classList.add("overflow-hidden");
    menuBtn.classList.add("menu-open");
    menuBtn.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
  };
  const closeMenu = () => {
    menu.classList.add("translate-x-full");
    backdrop.classList.add("opacity-0", "pointer-events-none");
    document.body.classList.remove("overflow-hidden");
    menuBtn.classList.remove("menu-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
  };

  menuBtn.addEventListener("click", openMenu);
  menuClose.addEventListener("click", closeMenu);
  backdrop.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
  menu.querySelectorAll(".menu-toggle").forEach(t => {
    t.addEventListener("click", () => {
      const panel = t.nextElementSibling;
      const isOpen = t.getAttribute("aria-expanded") === "true";
      t.setAttribute("aria-expanded", String(!isOpen));
      panel.classList.toggle("open", !isOpen);
    });
  });
})();
</script>`;

module.exports = { renderHeader, renderMobileMenu, NAVBAR_SCRIPT, TREATMENTS };
