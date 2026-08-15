# Ergoterapist Aleyna Keskin — Web Sitesi Tasarım Dokümanı

**Tarih:** 2026-08-14
**Durum:** Onaylandı, uygulamaya hazır
**Kapsam:** Mevcut TakeCareTurkey statik site iskeletinin, Ergoterapist Aleyna Keskin'in
çocuk ve aile odaklı ergoterapi sitesine dönüştürülmesi.

---

## 1. Amaç ve konumlandırma

Aleyna Keskin, çocukların gelişim alanlarını destekleyen ve ailelere danışmanlık veren bir
ergoterapist. Site iki kitleye aynı anda hitap etmeli:

- **Aileler** — çocuğunda dikkat, motor beceri, duyusal tepki veya günlük yaşam bağımsızlığı
  konusunda zorlanma gözlemleyen, ne yapacağını bilmeyen ebeveynler.
- **Yönlendiren profesyoneller** — okul öncesi öğretmenleri, çocuk doktorları, psikologlar.

Ton: **soft ve sıcak**, kurumsal-sert değil. Ama ciddiyeti korumalı — bu bir sağlık mesleği.
Ailenin "burada anlaşılırım" hissetmesi birincil hedef.

Mevcut Wix sitesi (`aleynaakeskin1.wixsite.com/my-site`) v1 kabul ediliyor; bu proje v10
hedefiyle sıfırdan yeniden yazılıyor. Wix'ten korunacak tek miras: **"Birlikte Mutlu Yarınlara"**
sloganı ve dört temel hizmet başlığı.

---

## 2. Marka sistemi

Kaynak: müşterinin kartviziti (krem zemin, altın-bej vurgu, siyah serif isim, martı + güneş imgesi,
"Duyu Bütünleme • Gelişimsel Destek" alt başlığı).

### 2.1 Renk paleti — "Sıcak toprak"

| Rol | Hex | Kullanım |
|---|---|---|
| `cream` | `#EFF3EC` | Sayfa zemini, kart arka planı |
| `cream-deep` | `#E6EDE3` | Zeminin bir ton koyusu |
| `gold` | `#C89B6B` | Birincil vurgu, butonlar, ayraç çizgileri, ikon dolguları |
| `gold-soft` | `#EBE6DC` | Rozet ve şerit zeminleri, koyu bölümlerde odak halkası |
| `gold-deep` | `#A97C4F` | Hover, altın üstü metin kontrastı |
| `terracotta` | `#D98E6A` | İkincil vurgu — sıcaklık, çocuk temalı bölümler |
| `sage` | `#8FA98B` | Üçüncül vurgu — sakinlik, süreç/timeline bölümleri |
| `ink` | `#2B2724` | Ana metin, başlıklar |
| `ink-soft` | `#6B635C` | İkincil metin |
| `white` | `#FFFFFF` | Yükseltilmiş kartlar, form alanları |

Zemin başlangıçta sıcak bir kırık beyazdı (`#FBF8F3`). Hero fotoğraflarının düz
arka planı (`#C9C1AC`) sayfa üstünde belirgin bir dikdörtgen olarak durduğu için
zemin, paletin kendi `sage` tonunun açık varyantına taşındı; iki yüzey artık
keskin bir kenarla karşılaşmıyor. `gold-soft` aynı anda doygunluğunun yaklaşık
yarısını bıraktı — tam gücünde yeşilimsi zeminin yanında pembe okunuyordu.

Kural: altın **vurgu** rengidir, geniş alan doldurmaz. Terracotta ve sage yardımcıdır; bir
bölümde ikisi birden kullanılmaz.

### 2.2 Tipografi

- **Başlıklar (h1–h3):** Playfair Display (Google Fonts) — kartvizitteki yüksek kontrastlı
  serifin web karşılığı. Türkçe karakter seti tam. Mevcut Merriweather'ın yerini alır.
- **Gövde:** Figtree (Google Fonts) — yuvarlak uçlu, sıcak, uzun blog metinlerinde yormayan
  sans. Mevcut 42dot Sans'ın yerini alır.
- Başlıklarda `letter-spacing: -0.01em`, `text-wrap: balance` korunur.

### 2.3 Şekil dili

- Kart köşe yarıçapı 24px+ (mevcut sitedeki `rounded-3xl` korunur, daha da yumuşatılır).
- Keskin ayraç çizgisi yerine altın ince çizgi + nokta (kartvizitteki ayraç motifi).
- Fotoğraflarda sıcak tonlu renk düzeltmesi; soğuk mavi tonlardan kaçınılır.
- İkonlar: ince çizgili (stroke) set, dolgu yok.

### 2.4 Logo

Müşteri tarafından sağlanacak. Gelene kadar **yer tutucu**: Playfair Display ile
"ERGOTERAPİST / Aleyna Keskin" kilitlenmiş metin logosu + altın ayraç. Logo geldiğinde tek
noktadan (`partials/navbar.js`, `partials/footer.js`, favicon, og-image) değiştirilir.

---

## 3. Site haritası

| Sayfa | Dosya | Amaç |
|---|---|---|
| Anasayfa | `index.html` | Marka vaadi, hizmet özeti, süreç, son yazılar |
| Hakkımızda | `hakkimizda.html` | Aleyna Keskin, yaklaşım, eğitim ve sertifikalar |
| Hizmetler | `hizmetler.html` | Beş hizmetin hub sayfası |
| Ergoterapi | `hizmet-ergoterapi.html` | Detay + SSS |
| Duyu Bütünleme | `hizmet-duyu-butunleme.html` | Detay + SSS |
| Öz Bakım Becerileri | `hizmet-oz-bakim-becerileri.html` | Detay + SSS |
| Günlük Yaşam Aktiviteleri | `hizmet-gunluk-yasam.html` | Detay + SSS |
| Çocuk ve Aile Danışmanlığı | `hizmet-aile-danismanligi.html` | Detay + SSS |
| Blog listesi | `blog.html` | Yazı kartları, etikete göre filtre |
| Blog yazısı | `blog/<slug>.html` | Markdown'dan üretilir |
| İletişim | `iletisim.html` | Adres, harita, WhatsApp, form |
| KVKK / Gizlilik | `kvkk.html` | Aydınlatma metni |
| 404 | `404.html` | Mevcut sayfa yeniden markalanır |

Eski Wix'teki dört hizmete **Çocuk ve Aile Danışmanlığı** eklendi — "hem aileye hem çocuğa
destek" konumlandırmasının somut karşılığı.

**v1 kapsamı dışı (v2 adayları):** destek alanlarının (DEHB, otizm, disleksi vb.) ayrı sayfaları,
çok dillilik, online randevu takvimi, üyelik/panel.

---

## 4. Anasayfa akışı

Her bölümün karşısında, mevcut sitede yeniden kullanılacak bileşen belirtilmiştir.

1. **Hero** — "Birlikte Mutlu Yarınlara" + açıklayıcı alt başlık + iki CTA (Randevu Al /
   Hizmetleri İncele). Mevcut hero video bloğu tek sıcak tonlu görsele indirgenir; video yok.
2. **Destek alanları şeridi** — dikkat ve odaklanma, DEHB, otizm spektrumu, disleksi, ince ve
   kaba motor beceriler, yeme sorunları, okul olgunluğu, sosyal beceriler. Her etiket ilgili
   hizmet sayfasına iç bağlantı verir. Uzun kuyruk SEO'nun ana kaynağı.
3. **Hizmet kartları** — mevcut `.expand-row` genişleyen kart bileşeni, beş hizmete uyarlanır.
4. **Nasıl ilerliyoruz** — mevcut `#journey` scroll-progress timeline bileşeni. Adımlar:
   İlk görüşme → Değerlendirme → Bireysel program → Seanslar → Aile eğitimi ve ev programı →
   Gelişim takibi.
5. **Aleyna Keskin önizleme** — portre + kısa biyografi + sertifika şeridi. Mevcut akreditasyon
   marquee bileşeni sertifika şeridine dönüşür.
6. **Ailelerden** — mevcut `#stories` bölümü. **Gerçek yorumlar müşteriden gelene kadar yer
   tutucu kalır; uydurma referans yazılmaz.**
7. **Blogdan son üç yazı** — `build.js` tarafından otomatik üretilir.
8. **Sık sorulan sorular** — accordion, `FAQPage` JSON-LD ile işaretlenir.
9. **İletişim CTA** — telefon, WhatsApp, adres. Ayrıca tüm sayfalarda sabit WhatsApp butonu.

---

## 5. Hizmet detay sayfası şablonu

Beş hizmet sayfası da aynı iskeleti paylaşır; yalnızca içerik değişir:

1. Hero — hizmet adı, tek cümlelik özet, CTA
2. **Nedir?** — kavramın aile diliyle açıklaması
3. **Kimler için uygundur?** — gözlemlenebilir davranış listesi (tanı listesi değil)
4. **Seanslarda neler yapılır?** — somut etkinlik örnekleri
5. **Beklenen kazanımlar** — vaat değil, hedef dili
6. **Süreç** — kaç seans, ne sıklıkta, aile katılımı
7. **SSS** — 3–5 soru, `FAQPage` şeması
8. **İlgili hizmetler** + iletişim CTA

---

## 6. İçerik ve dil kuralları

Sağlık alanı olduğu için metinlerin tamamı şu kurallara uyar:

- **Tıbbi vaat yok.** "Tedavi eder", "düzeltir", "iyileştirir" kullanılmaz. Yerine: "destekler",
  "güçlendirir", "eşlik eder", "gelişimini destekler".
- **Tanı koyma iması yok.** Site tanı koymaz, yönlendirir. Tanı listeleri yerine gözlemlenebilir
  davranış listeleri kullanılır.
- **Garanti ve süre taahhüdü yok.** "X seansta sonuç" gibi ifadeler kullanılmaz.
- **Karşılaştırmalı üstünlük iddiası yok.** ("İstanbul'un en iyisi" vb.)
- Metinler sen-siz dilinde, ebeveyne doğrudan hitap eder; jargon kullanıldığında hemen açıklanır.

---

## 7. Teknik mimari

### 7.1 Temel

Mevcut yapı korunur — yeni framework eklenmez:

- Statik HTML + Tailwind CDN (`tailwind.config` içindeki renk/font tokenları yeni paletle
  değiştirilir).
- `partials/navbar.js` ve `partials/footer.js` içindeki ortak bileşenler, `scripts/build.js`
  ile `<!-- BUILD:*:START/END -->` işaretleri arasına enjekte edilir.
- Barındırma: statik hosting (Vercel/Netlify). Temiz URL'ler (uzantısız) hosting ayarıyla açılır.

### 7.2 Blog

- Yazılar `content/blog/*.md` içinde, front-matter ile: `title`, `date`, `slug`, `excerpt`,
  `cover`, `tags`, `draft`.
- `scripts/build.js` genişletilir:
  - Markdown → HTML dönüşümü (`marked`)
  - Front-matter ayrıştırma (`gray-matter`)
  - `blog/<slug>.html` üretimi (ortak yazı şablonundan)
  - `blog.html` liste kartlarının üretimi
  - Anasayfadaki "son üç yazı" bloğunun üretimi
  - `sitemap.xml` üretimi
- Bu iki paket dışında bağımlılık eklenmez.
- **Panel yolu açık bırakılır:** Markdown + front-matter, Decap CMS'in doğal formatıdır. Panel
  istendiğinde `admin/` altına Decap eklenir; içerik yapısı yeniden yazılmaz.
- v1 ile birlikte üç örnek yazı yayınlanır.

### 7.3 İletişim formu

Statik sitede backend yok:

- **Birincil kanal:** WhatsApp butonu (`wa.me/905011774208`), tüm sayfalarda sabit.
- **Form:** Web3Forms endpoint'i ile e-postaya düşer. Endpoint müşteriden gelene kadar form
  gönderimi WhatsApp'a yönlendirir.
- Form alanları: ad, telefon, (opsiyonel) e-posta, mesaj, KVKK onay kutusu.
- **Formda tanı, sağlık durumu veya çocuğa dair özel nitelikli veri sorulmaz** — bu veriler
  yalnızca yüz yüze/telefonla alınır.

### 7.4 SEO

- Her sayfada özgün Türkçe `<title>` ve `<meta name="description">`.
- JSON-LD: `LocalBusiness` (Şişli/İstanbul, telefon, adres), `Person` (Aleyna Keskin),
  hizmet sayfalarında `Service`, SSS bölümlerinde `FAQPage`, blog yazılarında `BlogPosting`.
- `sitemap.xml` (build ile üretilir), `robots.txt`.
- Open Graph ve Twitter kartları; yeni `og-image`.
- Türkçe okunur URL'ler (`hizmet-duyu-butunleme.html`).
- Hedef anahtar kelime kümeleri: "ergoterapist şişli", "çocuk ergoterapisi istanbul",
  "duyu bütünleme terapisi", "ergoterapi nedir", "çocuk gelişimi danışmanlığı istanbul".

### 7.5 Görsel yer tutucu stratejisi

Gerçek fotoğraflar müşteriden sonra gelecek. Tasarımın gerçekçi görünmesi için iki ayrı
yaklaşım kullanılır:

- **Ortam ve etkinlik görselleri** (hero, hizmet kartları, blog kapakları, seans anları):
  Unsplash/Pexels üzerinden telifsiz, sıcak tonlu fotoğraflar `site/assets/placeholder/`
  altına indirilir. Dosya adları `ph-` önekiyle işaretlenir, böylece hangi görselin geçici
  olduğu tek bakışta belli olur.
- **Aleyna Keskin portresi ve klinik iç mekân fotoğrafları:** stok fotoğraf **kullanılmaz** —
  gerçek bir kişiyi ve gerçek bir mekânı temsil ettiği için yanıltıcı olur. Bunların yerine
  krem zeminli, altın ince çerçeveli, "Fotoğraf eklenecek" etiketli soyut yer tutucular konur.

Tüm görsel yolları tek bir yerden (`content/media.json` veya sayfa içi tek `img` etiketi)
değiştirilebilecek şekilde kurgulanır. **Site yayına alınmadan önce tüm `ph-` dosyaları
gerçek görsellerle değiştirilmelidir** — bu, yayın öncesi kontrol listesinin ilk maddesidir.

### 7.6 Erişilebilirlik ve performans

- Mevcut sitedeki `prefers-reduced-motion` desteği, focus-visible outline'ları, skip-link
  korunur ve yeni bileşenlere genişletilir.
- Tüm görseller WebP, `loading="lazy"`, açık `width`/`height`.
- Renk kontrastı: altın üzerine metin `gold-deep` veya `ink` ile yazılır; altın üstüne beyaz
  metin kullanılmaz (kontrast yetersiz).

---

## 8. Temizlik ve repo

### 8.1 Silinecekler

- `site/portal.html`, `site/portal-login.html`
- `site/treatment-*.html` (6 dosya)
- TakeCareTurkey görselleri, logosu, hero videosu, akreditasyon logoları
- Kök dizindeki TakeCareTurkey dokümanları: `ROADMAP.md`, `handoff.md`, `SITE-PLANI.md`,
  `RAKIP-ANALIZI.md`, `MUSTERI-YOL-HARITASI.md`, `WEBFLOW-KONTROL-LISTESI.md`, tüm `.docx`
  dosyaları
- `CLAUDE.md` yeniden yazılır (TakeCareTurkey mimarisi → bu projenin kuralları)

### 8.2 Git

Yeni bir repo açılacak; şimdilik yerelde çalışılıyor. Mevcut `origin` uzak deposu
`takecareturkey.git`'i gösteriyor — yanlışlıkla oraya push edilmemesi için remote kaldırılır,
yeni repo bilgisi geldiğinde eklenir. Commit geçmişi korunur.

---

## 9. Müşteriden beklenenler

Bunlar gelene kadar yer tutucuyla ilerlenir; hiçbiri uygulamayı bloke etmez:

- Logo (tasarlanıyor)
- Aleyna Keskin portre fotoğrafı
- Klinik ve seans fotoğrafları
- Eğitim ve sertifika listesi
- Gerçek aile yorumları
- Web3Forms endpoint anahtarı
- Alan adı

## 10. Sabit bilgiler

- **Telefon / WhatsApp:** +90 501 177 42 08
- **E-posta:** aleynaakeskin1@gmail.com
- **Adres:** Esentepe Mah. Kasap Sk. Aslan Apt. No: 11 D: 4, Şişli / İstanbul
- **Instagram:** @ergoterapist.aleyna
- **Slogan:** Birlikte Mutlu Yarınlara
- **Alt başlık:** Duyu Bütünleme • Gelişimsel Destek

---

## 11. Kabul kriterleri

- Sitede TakeCareTurkey'e ait hiçbir metin, görsel, renk veya sayfa kalmamış olmalı.
- 12 sayfanın tamamı yeni palet ve tipografiyle, mobil ve masaüstünde sorunsuz görünmeli.
- Beş hizmet sayfası da SEO metinleri yazılmış ve `Service` + `FAQPage` şemaları eklenmiş olmalı.
- `npm run build` çalıştığında navbar/footer tüm sayfalara enjekte edilmeli, üç örnek blog
  yazısı Markdown'dan üretilmeli, `sitemap.xml` güncellenmeli.
- Hiçbir metinde tıbbi vaat, garanti veya uydurma referans bulunmamalı.
- Logo, fotoğraf ve endpoint yer tutucuları tek noktadan değiştirilebilir olmalı.
