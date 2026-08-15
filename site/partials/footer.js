// Shared footer, the mobile tab bar, and the floating WhatsApp button.
// Edit here, then run `npm run build`.

const { SERVICES, WHATSAPP } = require("./navbar");

const serviceLinks = (prefix) => SERVICES.map(
  (s) => `          <li><a href="${prefix}${s.href}" class="block py-1.5 hover:text-gold transition">${s.title}</a></li>`
).join("\n");

// Mobile tab bar -- the app-like bottom navigation.
const TABS = [
  { href: "index.html", label: "Anasayfa", icon: '<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9z"/><path d="M9 21v-7h6v7"/>' },
  { href: "hizmetler.html", label: "Hizmetler", icon: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>' },
  { href: "blog.html", label: "Blog", icon: '<path d="M4 4h16v16H4z" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>' },
  { href: "iletisim.html", label: "İletişim", icon: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>' },
];

function renderTabBar(page, prefix) {
  const isActive = (href) => href === page || (href === "hizmetler.html" && page.startsWith("hizmet-"))
    || (href === "blog.html" && page.startsWith("blog/"));

  const items = TABS.map((t) => {
    const active = isActive(t.href);
    return `    <a href="${prefix}${t.href}" class="tab-item${active ? " is-active" : ""}"${active ? ' aria-current="page"' : ""}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t.icon}</svg>
      <span>${t.label}</span>
    </a>`;
  }).join("\n");

  return `<nav id="tab-bar" class="lg:hidden" aria-label="Alt menü">
${items}
    <a href="${WHATSAPP}" target="_blank" rel="noopener" class="tab-item tab-item-wa">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23z"/></svg>
      <span>WhatsApp</span>
    </a>
  </nav>`;
}

function renderFooter(prefix = "", page = "index.html") {
  const year = 2026;

  return `<footer class="bg-ink text-white/80 mt-24">
  <div class="max-w-[1440px] mx-auto px-6 py-14 sm:py-16 grid gap-8 md:gap-12 md:grid-cols-3">

    <div>
      <img src="${prefix}assets/logo.webp" alt="Ergoterapist Aleyna Keskin" width="1034" height="254" class="h-11 w-auto brightness-0 invert opacity-95">
      <p class="font-display text-xl text-white mt-5">Birlikte Mutlu Yarınlara</p>
      <p class="text-sm mt-2 text-white/60">Duyu Bütünleme &bull; Gelişimsel Destek</p>
    </div>

    <details class="footer-group">
      <summary>
        <h2 class="text-white font-medium text-sm tracking-wide uppercase">Hizmetler</h2>
        <svg class="footer-chevron md:hidden" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
      </summary>
      <div class="footer-panel">
        <ul class="text-sm">
${serviceLinks(prefix)}
        </ul>
      </div>
    </details>

    <details class="footer-group">
      <summary>
        <h2 class="text-white font-medium text-sm tracking-wide uppercase">İletişim</h2>
        <svg class="footer-chevron md:hidden" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
      </summary>
      <div class="footer-panel">
        <ul class="text-sm space-y-2.5">
          <li><a href="tel:+905011774208" class="block py-1.5 hover:text-gold transition">+90 501 177 42 08</a></li>
          <li><a href="mailto:aleynaakeskin1@gmail.com" class="block py-1.5 hover:text-gold transition break-all">aleynaakeskin1@gmail.com</a></li>
          <li class="text-white/60 leading-relaxed py-1.5">Esentepe Mah. Kasap Sk.<br>Aslan Apt. No: 11 D: 4<br>Şişli / İstanbul</li>
          <li><a href="https://instagram.com/ergoterapist.aleyna" target="_blank" rel="noopener" class="inline-flex items-center gap-2 py-1.5 hover:text-gold transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"/></svg>
            @ergoterapist.aleyna
          </a></li>
        </ul>
      </div>
    </details>

  </div>

  <div class="border-t border-white/10">
    <div class="max-w-[1440px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
      <p>&copy; ${year} Ergoterapist Aleyna Keskin. Tüm hakları saklıdır.</p>
      <a href="${prefix}kvkk.html" class="py-2 hover:text-white/80 transition">KVKK ve Gizlilik</a>
    </div>
  </div>
</footer>

${renderTabBar(page, prefix)}

<a href="${WHATSAPP}" target="_blank" rel="noopener" aria-label="WhatsApp'tan yazın"
   class="hidden lg:flex fixed bottom-5 right-5 z-[45] w-14 h-14 rounded-full bg-[#25D366] text-white items-center justify-center shadow-lg shadow-ink/20 hover:scale-105 transition">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29z"/></svg>
</a>`;
}

module.exports = { renderFooter };
