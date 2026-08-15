// Shared navbar + mobile drawer. Edit here, then run `npm run build`.

const WHATSAPP = "https://wa.me/905011774208?text=" +
  encodeURIComponent("Merhaba, çocuğum için randevu hakkında bilgi almak istiyorum.");

const SERVICES = [
  { href: "hizmet-ergoterapi.html", title: "Ergoterapi", blurb: "Günlük hayata katılımı anlamlı etkinliklerle desteklemek" },
  { href: "hizmet-duyu-butunleme.html", title: "Duyu Bütünleme", blurb: "Duyusal bilgiyi işleme biçimini anlamak ve uyumu kolaylaştırmak" },
  { href: "hizmet-oz-bakim-becerileri.html", title: "Öz Bakım Becerileri", blurb: "Giyinme, beslenme ve bakımda yaşına uygun bağımsızlık" },
  { href: "hizmet-gunluk-yasam.html", title: "Günlük Yaşam Aktiviteleri", blurb: "Ev, okul ve sosyal ortamdaki rutinlerde katılım" },
  { href: "hizmet-aile-danismanligi.html", title: "Çocuk ve Aile Danışmanlığı", blurb: "Ebeveynin evde uygulayabileceği somut yaklaşımlar" },
];

const LINKS = [
  { href: "index.html", label: "Anasayfa" },
  { href: "hakkimda.html", label: "Hakkımda" },
  { href: "hizmetler.html", label: "Hizmetler", children: SERVICES },
  { href: "blog.html", label: "Blog" },
  { href: "iletisim.html", label: "İletişim" },
];

const logo = (cls, prefix) =>
  `<img src="${prefix}assets/logo.webp" alt="Ergoterapist Aleyna Keskin" width="1034" height="254" class="${cls} w-auto">`;

const isActive = (page, href) => href === page || (page === "index.html" && href === "index.html");

// `prefix` is "../" for pages nested under blog/, "" for pages at the site root.
function renderHeader(page, prefix = "") {
  const desktopLinks = LINKS.map((l) => {
    const active = isActive(page, l.href) || (l.children && l.children.some((c) => c.href === page));
    const base = `px-3.5 py-2 rounded-full transition hover:bg-cream ${active ? "text-ink font-medium" : "text-ink-soft hover:text-ink"}`;

    if (!l.children) return `        <a href="${prefix}${l.href}" class="${base}">${l.label}</a>`;

    const panel = l.children
      .map(
        (c) => `            <a href="${prefix}${c.href}" class="block rounded-xl px-4 py-3 hover:bg-cream transition group/item">
              <span class="block font-medium text-ink group-hover/item:text-gold-deep transition">${c.title}</span>
              <span class="block text-xs text-ink-soft mt-0.5 leading-relaxed">${c.blurb}</span>
            </a>`
      )
      .join("\n");

    return `        <div class="nav-item relative">
          <a href="${prefix}${l.href}" class="${base} inline-flex items-center gap-1">
            ${l.label}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
          </a>
          <div class="dropdown-panel absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[22rem]">
            <div class="bg-white rounded-2xl shadow-xl shadow-ink/10 border border-ink/5 p-2">
${panel}
            </div>
          </div>
        </div>`;
  }).join("\n");

  return `<header id="site-header" class="fixed top-4 inset-x-0 z-50 px-4">
  <div class="relative max-w-[1440px] mx-auto bg-white/70 rounded-2xl shadow-lg shadow-ink/5">
    <div class="flex items-center justify-between pl-4 pr-2 py-2.5">
      <a href="${prefix}index.html" class="shrink-0" aria-label="Anasayfa">${logo("h-10", prefix)}</a>

      <nav class="hidden lg:flex items-center gap-0.5 text-sm" aria-label="Ana menü">
${desktopLinks}
      </nav>

      <div class="flex items-center gap-2">
        <a href="${WHATSAPP}" target="_blank" rel="noopener" class="hidden sm:inline-flex items-center gap-2 bg-ink text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-ink-mid transition">
          Randevu Talep Edin
        </a>
        <button id="menu-btn" aria-label="Menüyü aç" aria-expanded="false" aria-controls="mobile-menu" class="lg:hidden relative w-10 h-10 rounded-full hover:bg-cream transition">
          <span class="menu-line menu-line-1"></span>
          <span class="menu-line menu-line-2"></span>
          <span class="menu-line menu-line-3"></span>
        </button>
      </div>
    </div>
  </div>
</header>`;
}

function renderMobileMenu(page, prefix = "") {
  const items = LINKS.map((l) => {
    const active = isActive(page, l.href);
    const cls = `block px-3 py-3.5 rounded-xl transition hover:bg-cream ${active ? "text-ink font-medium" : "text-ink"}`;

    if (!l.children) return `    <a href="${prefix}${l.href}" class="${cls}">${l.label}</a>`;

    const sub = l.children
      .map((c) => `        <a href="${prefix}${c.href}" class="block px-3 py-2.5 rounded-lg text-sm text-ink-soft hover:bg-cream hover:text-ink transition">${c.title}</a>`)
      .join("\n");

    return `    <button class="menu-toggle w-full flex items-center justify-between px-3 py-3.5 rounded-xl hover:bg-cream transition text-left" aria-expanded="false">
      <span class="text-ink">${l.label}</span>
      <svg class="chevron transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
    </button>
    <div class="menu-panel grid overflow-hidden">
      <div class="min-h-0 pl-3 pb-1">
        <a href="${prefix}${l.href}" class="block px-3 py-2.5 rounded-lg text-sm font-medium text-ink hover:bg-cream transition">Tüm hizmetler</a>
${sub}
      </div>
    </div>`;
  }).join("\n");

  return `<div id="mobile-menu-backdrop" class="fixed inset-0 bg-ink/40 backdrop-blur-md z-[55] opacity-0 pointer-events-none transition-opacity duration-300 lg:hidden"></div>

<aside id="mobile-menu" class="fixed top-0 right-0 z-[60] h-full w-[86%] max-w-sm bg-white translate-x-full transition-transform duration-300 ease-out lg:hidden flex flex-col shadow-2xl" aria-hidden="true" aria-label="Mobil menü">
  <div class="flex items-center justify-between px-5 py-4 border-b border-ink/10 shrink-0">
    ${logo("h-9", prefix)}
    <button id="menu-close" aria-label="Menüyü kapat" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-cream transition">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
  </div>

  <nav class="flex-1 overflow-y-auto overscroll-contain px-3 py-2" aria-label="Mobil ana menü">
${items}
  </nav>

  <div class="border-t border-ink/10 p-4 space-y-2.5 shrink-0">
    <a href="${WHATSAPP}" target="_blank" rel="noopener" class="block bg-ink text-white text-center font-medium py-3.5 rounded-full hover:bg-ink-mid transition">Randevu Talep Edin</a>
    <a href="tel:+905011774208" class="block text-center text-sm text-ink-soft py-2">+90 501 177 42 08</a>
  </div>
</aside>`;
}

const NAVBAR_SCRIPT = `<script>
(() => {
  const sh = document.getElementById("site-header");
  const onScroll = () => sh.classList.toggle("scrolled", window.scrollY > 60);
  document.addEventListener("scroll", onScroll, { passive: true }); onScroll();

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

  // Footer bolumleri: mobilde kapali, tabletten itibaren acik. HTML'de acik
  // dogarlar, boylece masaustunde acilip kapanma titremesi olmaz.
  const genis = window.matchMedia("(min-width: 768px)");
  const footerSenkron = () => document.querySelectorAll("footer .footer-group").forEach(d => { d.open = genis.matches; });
  genis.addEventListener("change", footerSenkron);
  footerSenkron();

  // Ayni anda goruntuye giren kardesler blok halinde degil, sirayla belirir.
  // Gecikme 60ms ile artar ve 240ms'te durur -- daha uzunu bekletmeye baslar.
  const io = new IntersectionObserver((entries) => {
    const gelenler = entries.filter(e => e.isIntersecting);
    gelenler.forEach((e, i) => {
      e.target.style.transitionDelay = Math.min(i * 60, 240) + "ms";
      e.target.classList.add("visible");
      io.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -10% 0px" });
  document.querySelectorAll(".fade-up").forEach(el => io.observe(el));
})();
</script>`;

module.exports = { renderHeader, renderMobileMenu, NAVBAR_SCRIPT, SERVICES, WHATSAPP };
