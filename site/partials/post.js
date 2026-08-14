// Blog post page template. The build script feeds it a parsed post and writes
// the result to site/blog/<slug>.html.

const { WHATSAPP } = require("./navbar");

const trFormat = (iso) => {
  const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
                 "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${AYLAR[m - 1]} ${y}`;
};

/**
 * @param {object} post parsed by scripts/build.js
 * @param {string} others rendered cards for the "other posts" strip
 */
function renderPost(post, others) {
  const tags = (post.tags || [])
    .map((t) => `<span class="bg-white border border-gold/40 rounded-full px-4 py-1.5 text-sm">${t}</span>`)
    .join("\n          ");

  return `  <!-- HERO -->
  <article>
  <header class="bg-cream pt-32 pb-14 sm:pt-40 sm:pb-16 px-6">
    <div class="max-w-3xl mx-auto">
      <nav aria-label="Konum" class="text-sm text-ink-soft">
        <a href="../index.html" class="hover:text-ink transition">Anasayfa</a>
        <span class="mx-2 text-gold">/</span>
        <a href="../blog.html" class="hover:text-ink transition">Blog</a>
      </nav>
      <h1 class="font-display text-4xl sm:text-5xl leading-tight mt-4">${post.title}</h1>
      <div class="rule-gold mt-5" aria-hidden="true"></div>
      <div class="flex flex-wrap items-center gap-3 mt-6">
        <time datetime="${post.date}" class="text-sm text-ink-soft">${trFormat(post.date)}</time>
        ${tags ? `<span class="text-gold" aria-hidden="true">&middot;</span>\n          ${tags}` : ""}
      </div>
    </div>
  </header>

  ${post.cover ? `<div class="max-w-[1440px] mx-auto px-6 -mt-4">
    <img src="../${post.cover}" alt="" width="1200" height="800" class="w-full h-[280px] sm:h-[400px] object-cover rounded-4xl">
  </div>` : ""}

  <!-- GOVDE -->
  <div class="py-14 sm:py-16 px-6">
    <div class="max-w-2xl mx-auto prose text-ink-soft">
${post.html}
    </div>
  </div>
  </article>

  <!-- CTA -->
  <section class="py-14 sm:py-16 px-6 bg-cream">
    <div class="max-w-2xl mx-auto text-center">
      <h2 class="font-display text-2xl sm:text-3xl">Çocuğunuzla ilgili bir sorunuz mu var?</h2>
      <p class="text-ink-soft leading-relaxed mt-4">Kısa bir görüşmede gözlemlerinizi birlikte değerlendirelim.</p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center mt-7">
        <a href="../iletisim.html" class="bg-ink text-white font-medium px-8 py-4 rounded-full hover:bg-ink-mid transition">Randevu Talep Edin</a>
        <a href="${WHATSAPP}" target="_blank" rel="noopener" class="border border-ink/15 px-8 py-4 rounded-full hover:bg-white transition">WhatsApp'tan yazın</a>
      </div>
    </div>
  </section>

  ${others ? `<!-- DIGER YAZILAR -->
  <section class="py-14 sm:py-16 px-6 bg-white">
    <div class="max-w-[1440px] mx-auto">
      <h2 class="font-display text-2xl sm:text-3xl">Diğer yazılar</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
${others}
      </div>
    </div>
  </section>` : ""}`;
}

function renderPostPage(post, others) {
  const meta = {
    title: `${post.title} | Ergoterapist Aleyna Keskin`,
    description: post.excerpt,
    path: `blog/${post.slug}.html`,
  };

  return `<!-- PAGE-META ${JSON.stringify(meta)} -->
<!DOCTYPE html>
<html lang="tr">
<head>
<!-- BUILD:HEAD:START -->
<!-- BUILD:HEAD:END -->
</head>
<body class="bg-white text-ink antialiased">
<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:z-[70] focus:top-2 focus:left-2 focus:bg-white focus:px-4 focus:py-2 focus:rounded-full focus:shadow">İçeriğe geç</a>

<!-- BUILD:HEADER:START -->
<!-- BUILD:HEADER:END -->

<!-- BUILD:MOBILE_MENU:START -->
<!-- BUILD:MOBILE_MENU:END -->

<main id="main">
${renderPost(post, others)}
</main>

<!-- BUILD:FOOTER:START -->
<!-- BUILD:FOOTER:END -->

<!-- BUILD:NAV_SCRIPT:START -->
<!-- BUILD:NAV_SCRIPT:END -->
</body>
</html>
`;
}

module.exports = { renderPostPage, trFormat };
