# Ergoterapist Aleyna Keskin Sitesi — Uygulama Planı

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mevcut TakeCareTurkey statik site iskeletini, Ergoterapist Aleyna Keskin'in çocuk ve aile odaklı ergoterapi sitesine dönüştürmek — 12 Türkçe sayfa, markdown tabanlı blog, tam SEO işaretlemesi.

**Architecture:** Statik HTML + Tailwind CDN. Ortak `<head>`, navbar ve footer `partials/*.js` içinde tutulur ve `scripts/build.js` tarafından her sayfaya `<!-- BUILD:*:START/END -->` işaretleri arasına enjekte edilir. Blog yazıları `content/blog/*.md` içinde front-matter ile durur; aynı build script bunları HTML'e çevirir, blog listesini ve anasayfadaki son üç yazıyı üretir. Sunucu tarafı kod yoktur; form Web3Forms'a, birincil iletişim WhatsApp'a gider.

**Tech Stack:** HTML5, Tailwind CSS (CDN), vanilla JS, Node.js build script, `marked`, `gray-matter`, Google Fonts (Playfair Display + Figtree).

**Kaynak spec:** [docs/superpowers/specs/2026-08-14-ergoterapist-aleyna-keskin-site-design.md](../specs/2026-08-14-ergoterapist-aleyna-keskin-site-design.md)

## Global Constraints

Bu kısıtlar **her task için geçerlidir**, tekrar edilmese bile.

**Renk paleti** (yalnız bu hex'ler kullanılır):
- `cream` `#FBF8F3` — sayfa zemini, kart arka planı
- `gold` `#C89B6B` — birincil vurgu, butonlar, ayraçlar
- `gold-deep` `#A97C4F` — hover, altın üstü metin
- `terracotta` `#D98E6A` — ikincil vurgu
- `sage` `#8FA98B` — üçüncül vurgu
- `ink` `#2B2724` — ana metin ve başlıklar
- `ink-soft` `#6B635C` — ikincil metin
- `white` `#FFFFFF` — yükseltilmiş kart, form alanı

Altın geniş alan doldurmaz, vurgudur. Bir bölümde terracotta ve sage birlikte kullanılmaz. **Altın üstüne beyaz metin yazılmaz** (kontrast yetersiz) — `ink` veya `gold-deep` kullanılır.

**Tipografi:** Başlıklar `Playfair Display`, gövde `Figtree`. Google Fonts'tan tek `<link>` ile yüklenir. Başlıklarda `letter-spacing:-0.01em; text-wrap:balance`.

**Dil ve içerik kuralları** (metin yazılan her task için bağlayıcı):
- Tıbbi vaat yasak: "tedavi eder", "düzeltir", "iyileştirir", "geçirir" kullanılmaz. Yerine: "destekler", "güçlendirir", "eşlik eder".
- Tanı koyma iması yasak. Tanı listesi yerine gözlemlenebilir davranış listesi yazılır.
- Süre/sonuç garantisi yasak ("6 seansta sonuç" vb.).
- Karşılaştırmalı üstünlük iddiası yasak ("İstanbul'un en iyisi" vb.).
- Uydurma referans/yorum/istatistik yazılmaz. Gerçek veri yoksa yer tutucu bırakılır.
- Ebeveyne "siz" diye doğrudan hitap edilir; jargon geçtiğinde hemen sade karşılığı verilir.

**Sabit bilgiler** (birebir kullanılır):
- Telefon / WhatsApp: `+90 501 177 42 08` → `https://wa.me/905011774208`
- E-posta: `aleynaakeskin1@gmail.com`
- Adres: `Esentepe Mah. Kasap Sk. Aslan Apt. No: 11 D: 4, Şişli / İstanbul`
- Instagram: `@ergoterapist.aleyna` → `https://instagram.com/ergoterapist.aleyna`
- Slogan: `Birlikte Mutlu Yarınlara`
- Alt başlık: `Duyu Bütünleme • Gelişimsel Destek`

**Erişilebilirlik:** Her sayfada skip-link, `:focus-visible` outline, `prefers-reduced-motion` desteği, görsellerde açık `width`/`height` ve anlamlı `alt`. Dekoratif görsellerde `alt=""`.

**Commit:** Her task sonunda commit. Commit mesajları İngilizce, imperative, gövdede ne/neden. Sonuna `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>` eklenir.

**Doğrulama:** Bu projede birim test altyapısı yalnızca `scripts/build.js` için vardır (Task 11). Sayfalar için doğrulama = `npm run build` hatasız çalışır + sayfa tarayıcıda açılır + konsolda hata yoktur + `read_page` ile beklenen başlıklar görünür.

**Dosya adlandırma:** Türkçe okunur, ASCII, tire ayraçlı (`hizmet-duyu-butunleme.html`). Geçici görseller `ph-` önekli.

---

## Dosya yapısı

| Dosya | Sorumluluk |
|---|---|
| `site/partials/head.js` | Ortak `<head>`: fontlar, tailwind config, paylaşılan CSS, sayfaya özel meta'yı parametre alır |
| `site/partials/navbar.js` | Masaüstü menü + mobil çekmece |
| `site/partials/footer.js` | Footer + sabit WhatsApp butonu |
| `site/partials/post.js` | Blog yazısı HTML şablonu |
| `site/scripts/build.js` | Partial enjeksiyonu, markdown→HTML, blog listesi, sitemap |
| `site/scripts/build.test.js` | Build script birim testleri (node:test) |
| `content/copy.md` | Tüm sayfaların Türkçe metinleri — tek doğruluk kaynağı |
| `content/blog/*.md` | Blog yazıları, front-matter'lı |
| `site/assets/placeholder/ph-*.webp` | Geçici görseller |
| `site/*.html` | 12 sayfa |

---

## Task 1: Temizlik ve proje iskeleti

TakeCareTurkey'e ait her şey silinir, proje kimliği değişir, yeni bağımlılıklar kurulur.

**Files:**
- Delete: `site/portal.html`, `site/portal-login.html`, `site/treatment-bariatric.html`, `site/treatment-bariatric-alt.html`, `site/treatment-dental.html`, `site/treatment-hair.html`, `site/treatment-ivf.html`, `site/treatment-orthopedic.html`
- Delete: `ROADMAP.md`, `handoff.md`, `SITE-PLANI.md`, `RAKIP-ANALIZI.md`, `MUSTERI-YOL-HARITASI.md`, `WEBFLOW-KONTROL-LISTESI.md`, kökteki tüm `*.docx`
- Delete: `site/assets/` içindeki TakeCareTurkey görselleri (aşağıdaki komutta listeli)
- Modify: `site/package.json`
- Rewrite: `CLAUDE.md`

**Interfaces:**
- Produces: `npm run build` komutu (henüz eski davranışıyla), `marked` ve `gray-matter` bağımlılıkları

- [ ] **Step 1: Eski sayfaları ve dokümanları sil**

```bash
cd site && rm -f portal.html portal-login.html treatment-bariatric.html treatment-bariatric-alt.html treatment-dental.html treatment-hair.html treatment-ivf.html treatment-orthopedic.html
```

```bash
rm -f ROADMAP.md handoff.md SITE-PLANI.md RAKIP-ANALIZI.md MUSTERI-YOL-HARITASI.md WEBFLOW-KONTROL-LISTESI.md *.docx
```

- [ ] **Step 2: Eski görselleri sil**

```bash
cd site/assets && rm -rf akredite trust bariatric-h && rm -f advisor.webp bariatric2.webp beard.webp card-*.webp dental*.webp gen*.webp hair*.webp hair*.png ivf*.webp logo-box.webp menu-*.webp spine.webp surgery*.webp surgery*.png hero-video.mp4 hero-video-poster.webp og-image.jpg
```

Beklenen: `site/assets/` içinde yalnızca `favicon.ico`, `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png` kalır. Bunlar da Task 12'de logo gelince değişecek — şimdilik durur.

- [ ] **Step 3: package.json'ı güncelle**

`site/package.json` içeriğini tamamen şununla değiştir:

```json
{
  "name": "aleynakeskin-site",
  "private": true,
  "type": "commonjs",
  "scripts": {
    "build": "node scripts/build.js",
    "test": "node --test scripts/"
  },
  "dependencies": {
    "gray-matter": "^4.0.3",
    "marked": "^12.0.2"
  }
}
```

- [ ] **Step 4: Bağımlılıkları kur**

```bash
cd site && npm install
```

Beklenen: `node_modules/` oluşur, `package-lock.json` yazılır, hata yok.

- [ ] **Step 5: .gitignore'a node_modules ekle**

Kökte `.gitignore` yoksa oluştur, varsa satırı ekle:

```
node_modules/
```

- [ ] **Step 6: CLAUDE.md'yi yeniden yaz**

Kökteki `CLAUDE.md` içeriğini tamamen şununla değiştir:

```markdown
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
- `ph-` önekli görseller geçicidir; yayına almadan önce hepsi değişmelidir.
- Commit mesajları İngilizce, iletişim Türkçe.
```

- [ ] **Step 7: Build'in hâlâ çalıştığını doğrula**

```bash
cd site && npm run build
```

Beklenen: script yalnızca `index.html`'i bulur ve hata vermeden tamamlanır. Eğer build.js silinen `treatment-*.html` dosyalarını sabit listeden okuyup hata veriyorsa, `scripts/build.js` içindeki sayfa listesini `["index.html"]` olarak güncelle — tam liste Task 4'te yazılacak.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "Strip TakeCareTurkey pages, assets, and docs

Clears the way for the Aleyna Keskin site: removes the six treatment
pages, the patient portal, all medical-tourism imagery, and the old
roadmap documents. Renames the package and adds marked + gray-matter
for the upcoming markdown blog pipeline.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 2: Site metinleri

Tüm sayfaların Türkçe metinleri tek dosyada yazılır. Sonraki sayfa task'ları metni buradan alır — hiçbir metin doğrudan HTML'e uydurulmaz.

**Files:**
- Create: `content/copy.md`

**Interfaces:**
- Produces: Her sayfa için `## <sayfa>` başlığı altında: `meta.title`, `meta.description`, `h1`, ve bölüm bölüm gövde metni. Sonraki task'lar bu başlıklara isimle atıfta bulunur.

- [ ] **Step 1: copy.md iskeletini oluştur**

`content/copy.md` dosyasını şu bölüm başlıklarıyla oluştur ve her birini doldur:

```
# Site metinleri
## Ortak (navbar, footer, CTA'lar, WhatsApp metni)
## Anasayfa
## Hakkımızda
## Hizmetler (hub)
## Hizmet: Ergoterapi
## Hizmet: Duyu Bütünleme
## Hizmet: Öz Bakım Becerileri
## Hizmet: Günlük Yaşam Aktiviteleri
## Hizmet: Çocuk ve Aile Danışmanlığı
## Blog (liste sayfası)
## İletişim
## KVKK ve Gizlilik
## 404
```

- [ ] **Step 2: Anasayfa metnini yaz**

Şu alt başlıkların hepsi doldurulur:

- `meta.title` — 55-60 karakter, "Ergoterapist Aleyna Keskin" + "Şişli / İstanbul" içerir
- `meta.description` — 150-158 karakter, çocuk ergoterapisi ve aile danışmanlığını anlatır
- `hero.h1` — `Birlikte Mutlu Yarınlara`
- `hero.alt` — iki cümlelik alt başlık: kime, ne için
- `hero.cta` — birincil `Randevu Talep Edin`, ikincil `Hizmetleri İnceleyin`
- `destek-alanlari` — 8 etiket: dikkat ve odaklanma, DEHB, otizm spektrumu, disleksi ve öğrenme güçlüğü, ince ve kaba motor beceriler, yeme ve beslenme zorlukları, sosyal beceriler, okul olgunluğu. Her etiketin yanına bir cümlelik açıklama.
- `hizmetler` — beş hizmetin başlığı + birer cümlelik özeti
- `surec` — altı adım, her biri başlık + 1-2 cümle: İlk görüşme, Değerlendirme, Bireysel program, Seanslar, Aile eğitimi ve ev programı, Gelişim takibi
- `hakkinda-onizleme` — Aleyna Keskin'i tanıtan iki paragraf. **Eğitim geçmişi ve sertifikalar müşteriden gelmediği için `[MÜŞTERİDEN: eğitim ve sertifika listesi]` yer tutucusu bırakılır.**
- `aileler` — bölüm başlığı ve giriş cümlesi. Yorumların yerine `[MÜŞTERİDEN: gerçek aile yorumları]` yer tutucusu.
- `sss` — 6 soru-cevap. Örnek sorular: "Ergoterapi hangi yaş aralığına uygundur?", "Seanslar ne kadar sürer?", "Ailenin katılımı nasıl oluyor?", "Değerlendirme süreci nasıl işliyor?", "Randevu nasıl alınır?", "Seanslar nerede yapılıyor?"

- [ ] **Step 3: Beş hizmet sayfasının metnini yaz**

Her hizmet için aynı sekiz alt başlık doldurulur:

`meta.title`, `meta.description`, `hero.h1`, `hero.ozet` (tek cümle), `nedir` (2-3 paragraf), `kimler-icin` (6-8 maddelik gözlemlenebilir davranış listesi — tanı listesi değil), `seanslarda` (5-6 somut etkinlik örneği), `kazanimlar` (5-6 madde, hedef dilinde), `surec` (seans sıklığı ve aile katılımı — **süre garantisi verilmeden**), `sss` (3-5 soru-cevap).

Anahtar kelime hedefleri: Ergoterapi → "ergoterapi nedir", "çocuk ergoterapisi istanbul"; Duyu Bütünleme → "duyu bütünleme terapisi", "duyusal işlemleme"; Öz Bakım → "öz bakım becerileri çocuk"; Günlük Yaşam → "günlük yaşam aktiviteleri ergoterapi"; Aile Danışmanlığı → "çocuk ve aile danışmanlığı istanbul".

- [ ] **Step 4: Kalan sayfaların metnini yaz**

- **Hakkımızda:** Aleyna Keskin'in mesleki yaklaşımı (3-4 paragraf), çalışma felsefesi, kimlerle çalıştığı. Eğitim/sertifika bölümü yer tutucu.
- **Hizmetler hub:** giriş paragrafı + beş hizmetin ikişer cümlelik tanıtımı.
- **Blog listesi:** sayfa başlığı + "Ailelere yönelik bilgilendirici yazılar" tonunda giriş.
- **İletişim:** giriş cümlesi, adres/telefon/e-posta/Instagram blokları, form alan etiketleri, KVKK onay metni ("İletişim formunu göndererek, size dönüş yapılabilmesi için paylaştığınız iletişim bilgilerinin işlenmesine izin vermiş olursunuz."), form yerine WhatsApp'ı öneren kısa not.
- **KVKK ve Gizlilik:** veri sorumlusu, işlenen veriler (yalnız iletişim bilgileri), işleme amacı, saklama, haklar, başvuru kanalı. **Site üzerinden sağlık verisi toplanmadığı açıkça yazılır.**
- **404:** kısa, sıcak bir mesaj + anasayfaya dönüş.

- [ ] **Step 5: İçerik kurallarını denetle**

`content/copy.md` içinde şu aramaları yap; hiçbiri eşleşmemeli:

```bash
grep -niE "tedavi ed|iyileştir|düzeltir|garanti|en iyi|birinci|kesin sonuç" content/copy.md
```

Beklenen: çıktı boş. Eşleşme varsa metni Global Constraints'teki dile göre düzelt.

- [ ] **Step 6: Commit**

```bash
git add content/copy.md && git commit -m "Write all Turkish site copy

Single source of truth for every page: meta tags, headings, service
descriptions, process steps, and FAQs. Language follows the no-medical-
claims rules from the spec; unavailable client material (credentials,
testimonials) is left as explicit placeholders rather than invented.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 3: Görsel yer tutucular

**Files:**
- Create: `site/assets/placeholder/ph-*.webp`
- Create: `content/media.md`

**Interfaces:**
- Produces: `ph-hero.webp`, `ph-ergoterapi.webp`, `ph-duyu.webp`, `ph-ozbakim.webp`, `ph-gunluk.webp`, `ph-aile.webp`, `ph-blog-1.webp`, `ph-blog-2.webp`, `ph-blog-3.webp`, `ph-og.jpg` — sonraki task'lar bu adlarla referans verir.

- [ ] **Step 1: Telifsiz görselleri indir**

Unsplash ve Pexels'ten sıcak tonlu, çocuk/oyun/gelişim temalı, telifsiz görseller indir. Her biri için indirme kaynağını not al. Portre ve klinik iç mekân görseli **indirilmez**.

- [ ] **Step 2: WebP'ye çevir ve boyutlandır**

Hero 1600px genişlik, kart görselleri 800px, blog kapakları 1200px. Kalite 80.

```bash
cd site/assets/placeholder && for f in *.jpg; do cwebp -q 80 "$f" -o "${f%.jpg}.webp" && rm "$f"; done
```

`cwebp` yoksa alternatif olarak Node `sharp` ile tek seferlik dönüştürme scripti yazılabilir; kalıcı bağımlılık eklenmez.

- [ ] **Step 3: Portre ve klinik için CSS yer tutucusu tanımla**

Stok fotoğraf yerine kullanılacak bileşen, Task 4'teki ortak CSS'e eklenecek:

```html
<div class="ph-photo" role="img" aria-label="Fotoğraf eklenecek">
  <span>Fotoğraf eklenecek</span>
</div>
```

```css
.ph-photo { background:#FBF8F3; border:1px solid #C89B6B; border-radius:1.5rem; display:flex; align-items:center; justify-content:center; min-height:320px; }
.ph-photo span { font-size:.8125rem; letter-spacing:.08em; text-transform:uppercase; color:#A97C4F; }
```

- [ ] **Step 4: media.md ile kaynakları kayda geçir**

`content/media.md` dosyasına tablo yaz: dosya adı, kaynak URL, lisans, hangi sayfada kullanıldığı, "değiştirilecek mi" sütunu. Tüm `ph-` satırları "evet".

- [ ] **Step 5: Commit**

```bash
git add site/assets/placeholder content/media.md && git commit -m "Add temporary royalty-free imagery

Warm-toned placeholders so layout work has real images to sit against.
Every file is ph-prefixed and logged in content/media.md with its source
and licence. No stock portrait is used for Aleyna herself — that slot
gets a labelled CSS placeholder instead, so it cannot ship by accident.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 4: Tasarım sistemi ve ortak bileşenler

Palet, tipografi ve paylaşılan `<head>`/navbar/footer tek noktaya taşınır; build script bunları enjekte eder.

**Files:**
- Create: `site/partials/head.js`
- Rewrite: `site/partials/navbar.js`, `site/partials/footer.js`
- Modify: `site/scripts/build.js`
- Modify: `site/index.html` (yalnız iskelet — içerik Task 5'te)

**Interfaces:**
- Consumes: Task 2 `content/copy.md` ortak metinleri, Task 3 `.ph-photo` CSS'i
- Produces:
  - `head.js` → `module.exports = function head({ title, description, path, image })` — string döner
  - `navbar.js` → `module.exports = { HEADER, MOBILE_MENU, NAV_SCRIPT }`
  - `footer.js` → `module.exports = { FOOTER }`
  - build işaretleri: `<!-- BUILD:HEAD:START/END -->`, `HEADER`, `MOBILE_MENU`, `NAV_SCRIPT`, `FOOTER`

- [ ] **Step 1: head.js'i yaz**

Şunları içerir: charset, viewport, sayfaya özel `<title>`/`<meta description>`, canonical, Open Graph + Twitter, favicon linkleri, Google Fonts preconnect + tek link (`Playfair+Display:wght@500;600;700` ve `Figtree:wght@400;500;600`), `tailwind.config` (Global Constraints'teki sekiz renk + `display: Playfair Display` / `sans: Figtree`), ve paylaşılan `<style>` bloğu.

Paylaşılan `<style>` şunları taşır (mevcut `index.html:37-99` içinden korunanlar): navbar scroll geçişi, `html{scroll-behavior:smooth}`, başlık font kuralları, `section[id]{scroll-margin-top}`, `:focus-visible` outline'ları, mobil menü animasyonları, `.fade-up`, `.card-img`, `.expand-row`, timeline (`.tl-*`), marquee (`.gallery-*`), ve Task 3'teki `.ph-photo`. Tüm `#17255A` değerleri `#C89B6B`, `#0A0A0A` → `#2B2724`, `#F5F5F7` → `#FBF8F3` ile değişir. `prefers-reduced-motion` blokları aynen korunur.

- [ ] **Step 2: navbar.js'i yeniden yaz**

Menü: `Anasayfa` · `Hakkımızda` · `Hizmetler` (5 alt bağlantılı açılır panel) · `Blog` · `İletişim` + birincil buton `Randevu Talep Edin` (WhatsApp'a gider). Mega-menü yerine sade açılır liste — beş hizmet için görsel panel gereksiz. Logo yerine metin logo kilidi: `ERGOTERAPİST` (0.08em letter-spacing, 11px, gold-deep) üstte, `Aleyna Keskin` (Playfair Display, 20px, ink) altta. Mobil çekmece ve hamburger animasyonu mevcut yapıdan korunur, renkleri güncellenir.

- [ ] **Step 3: footer.js'i yeniden yaz**

Üç sütun: (1) metin logo + slogan + `Duyu Bütünleme • Gelişimsel Destek`, (2) hizmet bağlantıları, (3) iletişim bilgileri + Instagram. Altta telif satırı ve `KVKK ve Gizlilik` bağlantısı. Ayrıca sağ altta sabit WhatsApp butonu (`position:fixed; bottom:1.25rem; right:1.25rem; z-index:45`), `aria-label="WhatsApp'tan yazın"`.

- [ ] **Step 4: build.js'i güncelle**

- Sayfa listesini sabit dizi yerine `site/*.html` glob'undan üret (böylece yeni sayfa eklenince liste güncellenmez).
- `BUILD:HEAD` işaretini destekle. Her sayfanın kendi meta'sını nereden alacağı: sayfanın en üstünde `<!-- PAGE-META {"title":"...","description":"...","path":"..."} -->` yorum satırı; build bunu JSON olarak okuyup `head()` fonksiyonuna geçirir.
- Meta yorumu eksik olan sayfada anlaşılır hata fırlat: `PAGE-META eksik: <dosya>`.

- [ ] **Step 5: index.html'i iskelete indir**

`index.html`'i şu yapıya indir: `PAGE-META` yorumu, `BUILD:HEAD` işaretleri, skip-link, `BUILD:HEADER`, `BUILD:MOBILE_MENU`, boş `<main id="main">`, `BUILD:FOOTER`, `BUILD:NAV_SCRIPT`. TakeCareTurkey içeriğinin tamamı silinir.

- [ ] **Step 6: Build'i çalıştır ve doğrula**

```bash
cd site && npm run build
```

Beklenen: hata yok, `index.html` içinde işaretler arası bloklar dolu.

- [ ] **Step 7: Tarayıcıda aç**

`site/` klasörünü statik sunucuyla aç (`.claude/launch.json` içine `npx serve site` girdisi ekle), sayfayı yükle. Beklenen: krem zemin, çalışan navbar, mobil çekmece açılıp kapanıyor, konsolda hata yok, WhatsApp butonu görünüyor.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "Rebuild the shared shell with the warm-earth design system

Moves the duplicated <head> into partials/head.js so fonts, tokens, and
shared CSS live in one place, driven by a per-page PAGE-META comment.
Navbar and footer are rewritten for the five services, and the page list
now comes from a glob instead of a hand-maintained array.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 5: Anasayfa

**Files:**
- Modify: `site/index.html`

**Interfaces:**
- Consumes: Task 2 `## Anasayfa`, Task 3 `ph-hero.webp` ve hizmet görselleri, Task 4 kabuğu
- Produces: `#destek-alanlari`, `#hizmetler`, `#surec`, `#hakkinda`, `#aileler`, `#blog-son`, `#sss` bölüm id'leri (navbar ve diğer sayfalar bunlara bağlanır)

- [ ] **Step 1: Hero bölümü**

Krem zemin, solda metin (h1 `Birlikte Mutlu Yarınlara`, alt başlık, iki CTA), sağda `ph-hero.webp` yumuşak köşeli. Video yok. Altın ince ayraç + nokta motifi h1 altında.

- [ ] **Step 2: Destek alanları şeridi**

Sekiz etiket, `rounded-full` haplar hâlinde, her biri ilgili hizmet sayfasına bağlanır. Hap zemini `cream`, kenarlık `gold` %40 opaklık, metin `ink`.

- [ ] **Step 3: Hizmet kartları**

Mevcut `.expand-row` genişleyen kart deseni beş hizmete uyarlanır — masaüstünde hover'da genişler, mobilde alt alta yığılır. Her kartta görsel, başlık, tek cümle özet, `Detaylı bilgi →`.

- [ ] **Step 4: Süreç timeline'ı**

Mevcut `#journey` scroll-progress bileşeni altı adıma uyarlanır. Dolgu rengi `sage`, işaretçiler krem zeminli.

- [ ] **Step 5: Hakkında önizleme**

Solda `.ph-photo` yer tutucusu, sağda iki paragraf + `Hakkımda daha fazlası →`. Sertifika şeridi yerine `[MÜŞTERİDEN: eğitim ve sertifika listesi]` yorum satırı ve gizli (`hidden`) marquee iskeleti — liste gelince açılır.

- [ ] **Step 6: Ailelerden bölümü**

Başlık + giriş cümlesi + üç boş yorum kartı iskeleti, her birinde `Yorum eklenecek` etiketi. **Uydurma yorum yazılmaz.**

- [ ] **Step 7: Blogdan son yazılar**

`<!-- BUILD:LATEST_POSTS:START/END -->` işaretleri arasına boş bir üç kart ızgarası bırak — Task 11'de build script dolduracak.

- [ ] **Step 8: SSS accordion**

Altı soru, `<details>`/`<summary>` ile (JS gerektirmez, erişilebilir). Açık soruda altın sol kenarlık.

- [ ] **Step 9: İletişim CTA**

Telefon, WhatsApp, adres; `iletisim.html`'e birincil buton.

- [ ] **Step 10: Build + tarayıcı doğrulaması**

```bash
cd site && npm run build
```

Tarayıcıda: masaüstü (1280px) ve mobil (375px) görünüm kontrol edilir, `prefers-reduced-motion` açıkken animasyonların durduğu doğrulanır, konsol temiz olmalı, tüm iç bağlantılar çalışmalı.

- [ ] **Step 11: Commit**

```bash
git add site/index.html && git commit -m "Build the homepage

Nine sections from hero to contact CTA, reusing the expanding service
cards and scroll-progress timeline from the old build with the new
palette. Testimonial and credential slots ship as labelled empty states
so nothing invented reaches the page.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 6: Hizmet sayfası şablonu ve Ergoterapi sayfası

İlk hizmet sayfası aynı zamanda diğer dördünün şablonu olur.

**Files:**
- Create: `site/hizmet-ergoterapi.html`

**Interfaces:**
- Consumes: Task 2 `## Hizmet: Ergoterapi`, Task 4 kabuğu
- Produces: Bölüm sırası ve sınıf isimleri Task 7 ve 8 tarafından birebir kopyalanır: `#nedir`, `#kimler-icin`, `#seanslarda`, `#kazanimlar`, `#surec`, `#sss`, `#ilgili`

- [ ] **Step 1: Sayfayı kabuktan oluştur**

`PAGE-META` yorumu + BUILD işaretleri (`index.html`'in ilk 20 satırındaki desen), boş `<main>`.

- [ ] **Step 2: Yedi bölümü yaz**

Sırayla: hero (başlık + tek cümle özet + CTA), `#nedir`, `#kimler-icin` (madde listesi, her maddede küçük altın onay ikonu), `#seanslarda` (üçlü kart ızgarası), `#kazanimlar`, `#surec`, `#sss` (`<details>`), `#ilgili` (diğer dört hizmete kart bağlantısı) + iletişim CTA.

- [ ] **Step 3: Build + doğrula**

```bash
cd site && npm run build
```

Tarayıcıda aç; başlık hiyerarşisi tek `h1` + bölüm `h2`'leri olmalı.

- [ ] **Step 4: İçerik kuralı denetimi**

```bash
grep -niE "tedavi ed|iyileştir|düzeltir|garanti|en iyi" site/hizmet-ergoterapi.html
```

Beklenen: boş çıktı.

- [ ] **Step 5: Commit**

```bash
git add site/hizmet-ergoterapi.html && git commit -m "Add the ergoterapi service page

Establishes the seven-section template the remaining four service pages
copy: what it is, who it suits, what happens in sessions, expected gains,
process, FAQ, related services.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 7: Duyu Bütünleme ve Öz Bakım Becerileri sayfaları

**Files:**
- Create: `site/hizmet-duyu-butunleme.html`, `site/hizmet-oz-bakim-becerileri.html`

**Interfaces:**
- Consumes: Task 6 şablonu (bölüm sırası ve sınıflar birebir), Task 2 ilgili metin bölümleri

- [ ] **Step 1: Duyu Bütünleme sayfasını yaz**

Task 6 şablonunun yedi bölümü, `## Hizmet: Duyu Bütünleme` metniyle. Kapak görseli `ph-duyu.webp`. `#ilgili` bölümünde bu sayfa kendine bağlanmaz.

- [ ] **Step 2: Öz Bakım Becerileri sayfasını yaz**

Aynı şablon, `## Hizmet: Öz Bakım Becerileri` metniyle, kapak `ph-ozbakim.webp`.

- [ ] **Step 3: Build + doğrula**

```bash
cd site && npm run build
```

Her iki sayfa tarayıcıda açılır; `#ilgili` bağlantılarının hepsi 404 vermeden çalışmalı (henüz yazılmamış sayfalar Task 8'de gelecek — o ana kadar kırık bağlantı beklenir, Task 8 sonunda tekrar kontrol edilir).

- [ ] **Step 4: İçerik kuralı denetimi**

```bash
grep -niE "tedavi ed|iyileştir|düzeltir|garanti|en iyi" site/hizmet-duyu-butunleme.html site/hizmet-oz-bakim-becerileri.html
```

Beklenen: boş çıktı.

- [ ] **Step 5: Commit**

```bash
git add site/hizmet-duyu-butunleme.html site/hizmet-oz-bakim-becerileri.html && git commit -m "Add sensory integration and self-care service pages

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 8: Günlük Yaşam ve Aile Danışmanlığı sayfaları

**Files:**
- Create: `site/hizmet-gunluk-yasam.html`, `site/hizmet-aile-danismanligi.html`

- [ ] **Step 1: Günlük Yaşam Aktiviteleri sayfasını yaz**

Task 6 şablonu, `## Hizmet: Günlük Yaşam Aktiviteleri` metni, kapak `ph-gunluk.webp`.

- [ ] **Step 2: Çocuk ve Aile Danışmanlığı sayfasını yaz**

Aynı şablon, `## Hizmet: Çocuk ve Aile Danışmanlığı` metni, kapak `ph-aile.webp`. Bu sayfada odak çocuk değil ebeveyn — `#kimler-icin` listesi ebeveynin yaşadığı zorlukları anlatır.

- [ ] **Step 3: Tüm hizmet bağlantılarını doğrula**

```bash
cd site && npm run build && grep -ho 'href="hizmet-[^"]*"' *.html | sort -u
```

Çıkan her dosya adı için `site/` içinde dosyanın var olduğunu doğrula. Beş dosya da mevcut olmalı.

- [ ] **Step 4: İçerik kuralı denetimi**

```bash
grep -niE "tedavi ed|iyileştir|düzeltir|garanti|en iyi" site/hizmet-gunluk-yasam.html site/hizmet-aile-danismanligi.html
```

Beklenen: boş çıktı.

- [ ] **Step 5: Commit**

```bash
git add site/hizmet-gunluk-yasam.html site/hizmet-aile-danismanligi.html && git commit -m "Add daily-living and family-counselling service pages

Completes the five-service set. The family page keeps the shared template
but addresses the parent rather than the child.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 9: Hizmetler hub ve Hakkımızda sayfaları

**Files:**
- Create: `site/hizmetler.html`, `site/hakkimizda.html`

- [ ] **Step 1: Hizmetler hub sayfasını yaz**

Kısa hero + beş hizmetin kart ızgarası (anasayfadaki kart deseni, ama hover-genişleme yerine sabit ızgara) + "Hangisinin uygun olduğundan emin değilseniz" tonunda yönlendirme bloğu + iletişim CTA.

- [ ] **Step 2: Hakkımızda sayfasını yaz**

Hero (isim + unvan + `.ph-photo`), mesleki yaklaşım bölümü, "Nasıl çalışıyorum" bölümü, eğitim/sertifika bölümü — `[MÜŞTERİDEN]` yer tutucusuyla ve `hidden` iskeletle, çalışma alanı bilgisi (adres + Instagram), iletişim CTA.

- [ ] **Step 3: Build + doğrula**

```bash
cd site && npm run build
```

Her iki sayfa tarayıcıda kontrol edilir; navbar'daki aktif sayfa vurgusunun doğru çalıştığı doğrulanır.

- [ ] **Step 4: Commit**

```bash
git add site/hizmetler.html site/hakkimizda.html && git commit -m "Add services hub and about pages

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 10: İletişim, KVKK ve 404 sayfaları

**Files:**
- Create: `site/iletisim.html`, `site/kvkk.html`
- Modify: `site/404.html`

**Interfaces:**
- Produces: Form `id="iletisim-form"`, Web3Forms endpoint'i `data-endpoint` özniteliğinde tutulur — anahtar gelince tek yerden değişir.

- [ ] **Step 1: İletişim sayfasını yaz**

İki sütun: solda iletişim bilgileri (telefon, WhatsApp, e-posta, adres, Instagram — her biri tıklanabilir), sağda form. Altta Google Maps iframe (`loading="lazy"`, `title="Konum haritası"`).

- [ ] **Step 2: Formu kur**

Alanlar: `ad` (zorunlu, 2-60), `telefon` (zorunlu, `inputmode="tel"`), `eposta` (opsiyonel), `mesaj` (zorunlu, textarea), KVKK onay kutusu (zorunlu). **Tanı, teşhis veya çocuğun sağlık durumuna dair alan yok** — form altında "Çocuğunuza dair detayları görüşmemizde konuşalım; lütfen bu formda sağlık bilgisi paylaşmayın." notu.

Endpoint henüz yok:

```html
<form id="iletisim-form" data-endpoint="" novalidate>
```

Form gönderimi JS ile yakalanır: `data-endpoint` boşsa alanlar bir WhatsApp mesajına dönüştürülüp `https://wa.me/905011774208?text=...` adresine yönlendirilir; doluysa `fetch` ile POST edilir ve başarı/hata mesajı `aria-live="polite"` bir alanda gösterilir.

- [ ] **Step 3: KVKK sayfasını yaz**

Task 2'deki metin. Sade tek sütun, okunur satır uzunluğu (`max-w-2xl`).

- [ ] **Step 4: 404'ü yeniden markala**

Kabuğa taşı, Task 2'deki metni koy, anasayfa ve hizmetler bağlantısı ekle.

- [ ] **Step 5: Formu tarayıcıda test et**

Boş formu gönder → tarayıcı doğrulaması alanları işaretlemeli. Alanları doldurup gönder → WhatsApp bağlantısına yönlendirmeli (endpoint boş olduğu için). Konsol temiz olmalı.

- [ ] **Step 6: Commit**

```bash
git add site/iletisim.html site/kvkk.html site/404.html && git commit -m "Add contact, privacy, and 404 pages

The contact form deliberately collects no health data and falls back to
a prefilled WhatsApp message until the Web3Forms key arrives — the
endpoint lives in one data attribute so swapping it is a one-line change.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 11: Blog altyapısı

Bu task'ta gerçek birim testleri var — build script'in markdown boru hattı test edilir.

**Files:**
- Create: `content/blog/*.md` (3 yazı), `site/partials/post.js`, `site/scripts/build.test.js`, `site/blog.html`
- Modify: `site/scripts/build.js`, `site/index.html` (LATEST_POSTS bloğu)

**Interfaces:**
- Consumes: `marked`, `gray-matter` (Task 1)
- Produces:
  - `build.js` → `parsePost(filePath)` döner `{ title, date, slug, excerpt, cover, tags, draft, html }`
  - `build.js` → `renderPostCard(post)` döner HTML string
  - `partials/post.js` → `module.exports = function post({ title, date, excerpt, cover, tags, html })`

- [ ] **Step 1: Başarısız testi yaz**

`site/scripts/build.test.js`:

```js
const test = require("node:test");
const assert = require("node:assert");
const { parsePost } = require("./build.js");

test("parsePost front-matter'i ve govdeyi ayirir", () => {
  const post = parsePost("../content/blog/test-fixture.md");
  assert.strictEqual(post.title, "Test yazisi");
  assert.strictEqual(post.slug, "test-yazisi");
  assert.match(post.html, /<p>Merhaba<\/p>/);
});

test("parsePost draft bayragini okur", () => {
  const post = parsePost("../content/blog/test-fixture.md");
  assert.strictEqual(post.draft, false);
});
```

Ve fixture `content/blog/test-fixture.md`:

```markdown
---
title: Test yazisi
date: 2026-08-14
slug: test-yazisi
excerpt: Kisa ozet
cover: /assets/placeholder/ph-blog-1.webp
tags: [test]
draft: false
---

Merhaba
```

- [ ] **Step 2: Testi çalıştır, başarısız olduğunu gör**

```bash
cd site && npm test
```

Beklenen: FAIL — `parsePost is not a function`.

- [ ] **Step 3: parsePost'u yaz**

`build.js` içine `gray-matter` ile front-matter ayrıştırma, `marked` ile gövde dönüşümü ekle ve `module.exports.parsePost = parsePost` ile dışa aç.

- [ ] **Step 4: Testi çalıştır, geçtiğini gör**

```bash
cd site && npm test
```

Beklenen: PASS.

- [ ] **Step 5: Yazı şablonunu ve üretimi ekle**

`partials/post.js` blog yazısı iskeletini döner: hero (kapak, başlık, tarih, etiketler), `prose` gövde, "Diğer yazılar" bloğu, iletişim CTA. `build.js` her `content/blog/*.md` için (draft olmayanlar) `site/blog/<slug>.html` yazar, tarihe göre ters sıralar.

- [ ] **Step 6: blog.html ve LATEST_POSTS'u üret**

`build.js`, `blog.html` içindeki `<!-- BUILD:POST_LIST:START/END -->` ve `index.html` içindeki `<!-- BUILD:LATEST_POSTS:START/END -->` bloklarını `renderPostCard` çıktısıyla doldurur. Anasayfada son üç yazı gösterilir.

- [ ] **Step 7: Üç gerçek yazıyı yaz**

Fixture'ı sil, yerine üç yazı:
1. `duyu-butunleme-nedir.md` — "Duyu bütünleme nedir, çocuğumda nasıl fark ederim?"
2. `okul-oncesi-ince-motor-beceriler.md` — "Okul öncesi dönemde ince motor becerileri destekleyen 7 ev etkinliği"
3. `ergoterapiye-ne-zaman-basvurulur.md` — "Ergoterapiye ne zaman başvurmalı?"

Her biri 600-900 kelime, Global Constraints'teki dil kurallarına uyar, sonunda iletişim çağrısı vardır.

```bash
rm content/blog/test-fixture.md
```

Fixture silindiği için `build.test.js` yazılardan birine (`duyu-butunleme-nedir.md`) bakacak şekilde güncellenir.

- [ ] **Step 8: Test + build + doğrula**

```bash
cd site && npm test && npm run build
```

Beklenen: testler geçer, `site/blog/` altında üç HTML üretilir, `blog.html` üç kart gösterir, anasayfada son üç yazı görünür.

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "Add the markdown blog pipeline

Posts live as front-matter markdown under content/blog and the build
script renders them to HTML, fills the listing page, and injects the
three newest onto the homepage. The format is Decap CMS's native one, so
adding an admin panel later needs no content migration.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 12: SEO işaretlemesi ve sitemap

**Files:**
- Modify: `site/partials/head.js`, `site/scripts/build.js`, tüm `site/*.html`
- Create: `site/robots.txt`, `site/sitemap.xml` (üretilir), `site/assets/ph-og.jpg`

- [ ] **Step 1: JSON-LD bloklarını ekle**

- Her sayfada `LocalBusiness`: ad, telefon, adres (Şişli/İstanbul), `openingHours` **yalnız müşteriden geldiyse** — gelmediği için bu alan yazılmaz, `[MÜŞTERİDEN: çalışma saatleri]` yorumu bırakılır.
- `hakkimizda.html`: `Person` (Aleyna Keskin, `jobTitle: Ergoterapist`).
- Beş hizmet sayfası: `Service` + `FAQPage`.
- Anasayfa: `FAQPage`.
- Blog yazıları: `BlogPosting` (başlık, tarih, yazar, kapak).

`head.js` opsiyonel `jsonLd` parametresi alır; sayfalar `PAGE-META` içinde `"schema"` anahtarıyla tür belirtir.

- [ ] **Step 2: robots.txt yaz**

```
User-agent: *
Allow: /

Sitemap: https://DOMAIN/sitemap.xml
```

`DOMAIN` alan adı gelene kadar yer tutucudur; `content/media.md` yanında bir `content/yayin-oncesi.md` kontrol listesine bu madde eklenir.

- [ ] **Step 3: sitemap üretimini ekle**

`build.js` sonunda tüm `site/*.html` ve `site/blog/*.html` dosyalarından `sitemap.xml` üretilir; blog yazılarında `lastmod` front-matter tarihidir.

- [ ] **Step 4: og-image üret**

Krem zemin, metin logo kilidi, slogan ve alt başlıkla 1200×630 görsel. Logo gelene kadar `ph-og.jpg`.

- [ ] **Step 5: Meta denetimi**

```bash
cd site && grep -c "PAGE-META" *.html
```

Beklenen: her sayfa için 1. Ardından her sayfanın `<title>` uzunluğunun 60 karakteri, `<meta description>` uzunluğunun 158 karakteri aşmadığı kontrol edilir.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "Add structured data, sitemap, and robots.txt

LocalBusiness on every page, Person on the about page, Service plus
FAQPage on the five service pages, BlogPosting on posts. Opening hours
are left out rather than guessed. Sitemap is generated from the built
pages, so new posts land in it automatically.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 13: Son doğrulama ve yayın öncesi kontrol listesi

**Files:**
- Create: `content/yayin-oncesi.md`

- [ ] **Step 1: Tüm sayfaları tarayıcıda gez**

12 sayfanın hepsi masaüstü (1280px) ve mobil (375px) genişlikte açılır. Kontrol edilenler: yatay kaydırma yok, başlık hiyerarşisi tek `h1`, tüm görsellerde `alt`, konsol temiz, tüm iç bağlantılar çalışıyor.

- [ ] **Step 2: TakeCareTurkey kalıntısı taraması**

```bash
grep -riE "takecare|turkey|hair transplant|bariatric|ivf|dental|17255A|F5F5F7|Merriweather|42dot" site/ content/ --include="*.html" --include="*.js" --include="*.md"
```

Beklenen: boş çıktı. Eşleşme varsa temizlenir.

- [ ] **Step 3: İçerik kuralı son denetimi**

```bash
grep -riE "tedavi ed|iyileştir|düzeltir|garanti|en iyi|kesin sonuç" site/ content/
```

Beklenen: boş çıktı.

- [ ] **Step 4: Erişilebilirlik kontrolü**

`prefers-reduced-motion` açıkken animasyonlar durur; klavye ile sekme gezintisinde her odaklanabilir öğede görünür outline vardır; mobil çekmece açıkken Escape tuşu kapatır.

- [ ] **Step 5: Yayın öncesi kontrol listesini yaz**

`content/yayin-oncesi.md`:

- [ ] `ph-` önekli tüm görseller gerçekleriyle değiştirildi (liste: `content/media.md`)
- [ ] Logo eklendi (navbar, footer, favicon, apple-touch-icon, og-image)
- [ ] Aleyna Keskin portresi eklendi, `.ph-photo` yer tutucuları kaldırıldı
- [ ] Eğitim ve sertifika listesi eklendi, `hidden` iskelet açıldı
- [ ] Gerçek aile yorumları eklendi veya bölüm kaldırıldı
- [ ] Web3Forms endpoint'i `iletisim.html` içindeki `data-endpoint`'e yazıldı
- [ ] Çalışma saatleri `LocalBusiness` şemasına eklendi
- [ ] Alan adı `robots.txt`, `sitemap.xml` ve canonical/OG etiketlerinde güncellendi
- [ ] Google Search Console doğrulaması yapıldı

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "Add pre-launch checklist and fix final review findings

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Notlar

- **Tailwind CDN:** production için ideal değil (çalışma zamanı derleme, ~100KB). Mevcut site zaten böyle kurulu ve bu proje için basitlik daha değerli. Performans sorun olursa Tailwind CLI ile derlenmiş tek CSS dosyasına geçilir — bu ayrı bir iş, plana dahil değil.
- **Panel (Decap CMS):** kapsam dışı. Task 11'in markdown + front-matter formatı Decap'ın doğal formatı olduğu için sonradan `admin/` klasörü eklemek içerik göçü gerektirmez.
- **Temiz URL'ler:** `.html` uzantısız adresler barındırma ayarıyla (Vercel `cleanUrls`) açılır; kod değişikliği gerekmez.
