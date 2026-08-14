# Yayın öncesi kontrol listesi

Site şu an `https://aleynakeskin.vercel.app` adresinde yayında. Gerçek alan adına
geçmeden önce aşağıdakiler tamamlanmalı.

## Değiştirilmesi zorunlu

- [ ] **Örnek aile yorumları.** Anasayfadaki "Ailelerden" bölümündeki üç yorum
      tasarımı görmek için yazılmış örnek metinlerdir; her biri **"Örnek metin"**
      rozetiyle işaretli. Gerçek yorumlar geldiğinde metinleri değiştirin ve
      rozet `<span>`'lerini silin. Gerçek yorum yoksa bölümü tamamen kaldırın.
- [ ] **Alan adı.** `site/partials/head.js` içindeki `SITE` sabitini gerçek
      adresle değiştirip `npm run build` çalıştırın. Aynı adresi `robots.txt`
      içinde de güncelleyin.
- [ ] **Web3Forms endpoint'i.** `iletisim.html` içindeki formun `data-endpoint`
      özniteliği boş; doldurulana kadar form gönderimi WhatsApp'a yönleniyor.
- [ ] **Favicon'lar.** `assets/favicon*.png`, `favicon.ico` ve
      `apple-touch-icon.png` hâlâ eski markadan kalma; logodan yeniden üretilmeli.

## Müşteriden beklenen içerik

- [ ] **Eğitim ve sertifika listesi.** `hakkimda.html` içindeki `#egitim`
      bölümü `hidden` durumda; liste gelince sınıfı kaldırıp `<li>`'leri
      doldurun. Uydurma eğitim yazılmaz.
- [ ] **Çalışma saatleri.** `scripts/build.js` içindeki `BUSINESS` şemasına
      `openingHoursSpecification` olarak eklenecek; şu an bilerek boş.
- [ ] **Klinik / çalışma alanı fotoğrafları.** İletişim sayfası için.

## Geçici görseller

- [ ] `assets/placeholder/ph-*.webp` — dört dosya (üç blog kapağı ve süreç
      bölümündeki ahşap blok görseli) Unsplash'ten alınmıştır. Kaynakları
      `content/media.md` içinde. Değiştirilmeleri şart değil ama tercih edilir.

## Yayın sonrası

- [ ] Google Search Console doğrulaması ve sitemap gönderimi
- [ ] Google Business profili (adres, telefon, çalışma saatleri)
- [ ] Instagram profiline site bağlantısı

## Kontrol edilmiş olanlar

- Yapısal veri: LocalBusiness, Person, Service ×5, FAQPage ×6, BlogPosting ×3
- Meta başlık ve açıklama uzunlukları 15 sayfada da sınırlar içinde
- Tüm iç bağlantılar ve 79 görsel yolu çalışıyor
- Metinlerde tıbbi vaat, süre garantisi veya üstünlük iddiası yok
