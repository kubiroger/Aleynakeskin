// Shared footer + the floating WhatsApp button. Edit here, then run `npm run build`.

const { SERVICES, WHATSAPP } = require("./navbar");

const serviceLinks = (prefix) => SERVICES.map(
  (s) => `        <li><a href="${prefix}${s.href}" class="hover:text-gold transition">${s.title}</a></li>`
).join("\n");

function renderFooter(prefix = "") {
  const year = 2026;

  return `<footer class="bg-ink text-white/80 mt-24">
  <div class="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">

    <div>
      <img src="${prefix}assets/logo.png" alt="Ergoterapist Aleyna Keskin" width="798" height="250" class="h-11 w-auto brightness-0 invert opacity-95">
      <p class="font-display text-xl text-white mt-5">Birlikte Mutlu Yarınlara</p>
      <p class="text-sm mt-2 text-white/60">Duyu Bütünleme &bull; Gelişimsel Destek</p>
    </div>

    <div>
      <h2 class="text-white font-medium text-sm tracking-wide uppercase mb-4">Hizmetler</h2>
      <ul class="space-y-2.5 text-sm">
${serviceLinks(prefix)}
      </ul>
    </div>

    <div>
      <h2 class="text-white font-medium text-sm tracking-wide uppercase mb-4">İletişim</h2>
      <ul class="space-y-2.5 text-sm">
        <li><a href="tel:+905011774208" class="hover:text-gold transition">+90 501 177 42 08</a></li>
        <li><a href="mailto:aleynaakeskin1@gmail.com" class="hover:text-gold transition">aleynaakeskin1@gmail.com</a></li>
        <li class="text-white/60 leading-relaxed">Esentepe Mah. Kasap Sk.<br>Aslan Apt. No: 11 D: 4<br>Şişli / İstanbul</li>
        <li><a href="https://instagram.com/ergoterapist.aleyna" target="_blank" rel="noopener" class="inline-flex items-center gap-2 hover:text-gold transition">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"/></svg>
          @ergoterapist.aleyna
        </a></li>
      </ul>
    </div>

  </div>

  <div class="border-t border-white/10">
    <div class="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
      <p>&copy; ${year} Ergoterapist Aleyna Keskin. Tüm hakları saklıdır.</p>
      <a href="${prefix}kvkk.html" class="hover:text-white/80 transition">KVKK ve Gizlilik</a>
    </div>
  </div>
</footer>

<a href="${WHATSAPP}" target="_blank" rel="noopener" aria-label="WhatsApp'tan yazın"
   class="fixed bottom-5 right-5 z-[45] w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-ink/20 hover:scale-105 transition">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29z"/></svg>
</a>`;
}

module.exports = { renderFooter };
