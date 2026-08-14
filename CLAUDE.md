# Ergoterapist Aleyna Keskin — Web Sitesi

Çocukların gelişim alanlarını destekleyen ve ailelere danışmanlık veren bir
ergoterapistin tanıtım sitesi. Statik HTML, Tailwind CDN, Node build script.
Sunucu tarafı kod yok.

## Kaynaklar

- Tasarım spec'i: [docs/superpowers/specs/2026-08-14-ergoterapist-aleyna-keskin-site-design.md](docs/superpowers/specs/2026-08-14-ergoterapist-aleyna-keskin-site-design.md)
- Uygulama planı: [docs/superpowers/plans/2026-08-14-ergoterapist-aleyna-keskin-site.md](docs/superpowers/plans/2026-08-14-ergoterapist-aleyna-keskin-site.md)
- Site metinleri: [content/copy.md](content/copy.md)

## Mimari

- `site/*.html` — sayfalar. Ortak `<head>`, navbar ve footer elle düzenlenmez;
  `site/partials/*.js` içinde durur, `npm run build` ile enjekte edilir.
- `content/blog/*.md` — blog yazıları, front-matter'lı. Build script bunlardan
  `site/blog/<slug>.html`, blog listesini, anasayfadaki son üç kartı ve
  `sitemap.xml`'i üretir.
- Form backend'i yok: birincil kanal WhatsApp, form Web3Forms'a gider.

## Kurallar

- **Tıbbi vaat yasak.** "Tedavi eder / düzeltir / iyileştirir" yazılmaz;
  "destekler / güçlendirir / eşlik eder" yazılır. Tanı koyma iması, süre
  garantisi ve karşılaştırmalı üstünlük iddiası da yasak.
- **Uydurma içerik yasak.** Gerçek yorum, sertifika veya istatistik yoksa yer
  tutucu bırakılır.
- Renk paleti ve tipografi spec'te sabittir; yeni renk eklenmez.
- `ph-` önekli görseller geçicidir; yayına almadan önce hepsi değişmelidir
  (kontrol listesi: `content/yayin-oncesi.md`).
- Commit mesajları İngilizce, iletişim Türkçe.
