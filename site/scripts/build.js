// Injects the shared head, navbar, mobile drawer, and footer into every page,
// renders the markdown blog, and writes sitemap.xml. Run after editing anything
// under partials/ or content/blog/:
//
//   npm run build
//
// Only the text between the BUILD:*:START / BUILD:*:END marker comments is
// rewritten, so page-specific content is never touched. A file with no changes
// is left alone (no write, no mtime churn).
//
// Each page declares its own metadata in a PAGE-META comment on line 1:
//
//   <!-- PAGE-META {"title":"...","description":"...","path":"index.html"} -->

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");
const { head, SITE } = require("../partials/head");
const { renderHeader, renderMobileMenu, NAVBAR_SCRIPT } = require("../partials/navbar");
const { renderFooter } = require("../partials/footer");
const { renderPostPage, trFormat } = require("../partials/post");

const SITE_DIR = path.join(__dirname, "..");
const BLOG_SRC = path.join(SITE_DIR, "..", "content", "blog");
const BLOG_OUT = path.join(SITE_DIR, "blog");

// --- blog ------------------------------------------------------------------

/** Reads one markdown post and returns its metadata plus rendered HTML. */
function parsePost(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = data.slug || path.basename(filePath, ".md");
  const date = data.date instanceof Date
    ? data.date.toISOString().slice(0, 10)
    : String(data.date).slice(0, 10);

  return {
    title: data.title,
    date,
    slug,
    excerpt: data.excerpt || "",
    metaTitle: data.metaTitle || "",
    metaDescription: data.metaDescription || "",
    cover: data.cover || "",
    tags: data.tags || [],
    draft: Boolean(data.draft),
    html: marked.parse(content.trim()),
  };
}

/** One blog card. `prefix` is "" from the site root, "../" from inside blog/. */
function renderPostCard(post, prefix = "") {
  const cover = post.cover
    ? `<div class="h-44 overflow-hidden">
            <img src="${prefix}${post.cover}" alt="" width="1200" height="800" loading="lazy" class="card-img w-full h-full object-cover">
          </div>`
    : "";

  return `        <a href="${prefix}blog/${post.slug}.html" class="card group block bg-white rounded-4xl overflow-hidden border border-ink/5 hover:border-gold/50 transition">
          ${cover}
          <div class="p-6">
            <time datetime="${post.date}" class="text-xs text-ink-soft">${trFormat(post.date)}</time>
            <h3 class="font-display text-xl mt-2 leading-snug">${post.title}</h3>
            <p class="text-sm text-ink-soft leading-relaxed mt-3">${post.excerpt}</p>
            <span class="inline-block text-sm text-gold-deep font-medium mt-4">Yazıyı okuyun &rarr;</span>
          </div>
        </a>`;
}

/** All publishable posts, newest first. */
function loadPosts() {
  if (!fs.existsSync(BLOG_SRC)) return [];
  return fs
    .readdirSync(BLOG_SRC)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parsePost(path.join(BLOG_SRC, f)))
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Writes site/blog/<slug>.html for every post. Returns the file names written. */
function writePostPages(posts) {
  if (posts.length === 0) return [];
  fs.mkdirSync(BLOG_OUT, { recursive: true });

  return posts.map((post) => {
    const others = posts
      .filter((p) => p.slug !== post.slug)
      .slice(0, 3)
      .map((p) => renderPostCard(p, "../"))
      .join("\n");

    const file = path.join(BLOG_OUT, `${post.slug}.html`);
    const next = renderPostPage(post, others);
    const current = fs.existsSync(file) ? fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n") : null;
    if (current !== next) fs.writeFileSync(file, next.replace(/\n/g, "\r\n"), "utf8");
    return `blog/${post.slug}.html`;
  });
}

// --- structured data -------------------------------------------------------

const BUSINESS = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE}/#isletme`,
  name: "Ergoterapist Aleyna Keskin",
  description:
    "Çocukların gelişim alanlarını destekleyen ergoterapi ve ailelere yönelik danışmanlık hizmeti.",
  url: `${SITE}/`,
  telephone: "+905011774208",
  email: "aleynaakeskin1@gmail.com",
  image: `${SITE}/assets/og-image.jpg`,
  logo: `${SITE}/assets/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Esentepe Mah. Kasap Sk. Aslan Apt. No: 11 D: 4",
    addressLocality: "Şişli",
    addressRegion: "İstanbul",
    addressCountry: "TR",
  },
  areaServed: { "@type": "City", name: "İstanbul" },
  sameAs: ["https://instagram.com/ergoterapist.aleyna"],
  // MÜŞTERİDEN: calisma saatleri geldiginde openingHoursSpecification eklenecek.
};

const PERSON = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aleyna Keskin",
  jobTitle: "Ergoterapist",
  url: `${SITE}/hakkimda.html`,
  telephone: "+905011774208",
  email: "aleynaakeskin1@gmail.com",
  worksFor: { "@id": `${SITE}/#isletme` },
  sameAs: ["https://instagram.com/ergoterapist.aleyna"],
};

const stripTags = (s) =>
  s
    .replace(/<[^>]*>/g, "")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&bull;/g, "•")
    .replace(/&rarr;/g, "→")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Pulls question/answer pairs out of the page's <details class="faq"> blocks. */
function extractFaqs(html) {
  const faqs = [];
  const re = /<details class="faq[^"]*"[^>]*>[\s\S]*?<summary[^>]*>([\s\S]*?)<\/summary>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
  let m;
  while ((m = re.exec(html))) {
    const question = stripTags(m[1]);
    const answer = stripTags(m[2]);
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}

function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Which schemas a page carries, derived from its filename and its own markup. */
function schemasFor(file, meta, content, posts) {
  const schemas = [];
  const faqs = extractFaqs(content);

  if (file === "index.html") schemas.push(BUSINESS);
  if (file === "hakkimda.html") schemas.push(PERSON);

  if (file.startsWith("hizmet-")) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: meta.title.split("|")[0].trim(),
      description: meta.description,
      url: `${SITE}/${file}`,
      serviceType: "Ergoterapi",
      provider: { "@id": `${SITE}/#isletme` },
      areaServed: { "@type": "City", name: "İstanbul" },
      audience: { "@type": "PeopleAudience", suggestedMinAge: 0 },
    });
  }

  if (file.startsWith("blog/")) {
    const slug = file.slice("blog/".length, -".html".length);
    const post = posts.find((p) => p.slug === slug);
    if (post) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        image: post.cover ? `${SITE}/${post.cover}` : undefined,
        author: { "@type": "Person", name: "Aleyna Keskin" },
        publisher: { "@id": `${SITE}/#isletme` },
        mainEntityOfPage: `${SITE}/${file}`,
        inLanguage: "tr-TR",
      });
    }
  }

  if (faqs.length) schemas.push(faqSchema(faqs));
  return schemas;
}

// --- page shell ------------------------------------------------------------

function readPageMeta(content, file) {
  const match = content.match(/<!--\s*PAGE-META\s*(\{[\s\S]*?\})\s*-->/);
  if (!match) throw new Error(`${file}: PAGE-META yorumu eksik`);
  try {
    return JSON.parse(match[1]);
  } catch (err) {
    throw new Error(`${file}: PAGE-META gecerli JSON degil -- ${err.message}`);
  }
}

function replaceBetween(content, file, name, replacement) {
  const startMarker = `<!-- BUILD:${name}:START -->`;
  const endMarker = `<!-- BUILD:${name}:END -->`;
  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1) return content; // block is optional
  if (endIdx < startIdx) throw new Error(`${file}: BUILD:${name} isaretleri ters sirada`);
  const before = content.slice(0, startIdx + startMarker.length);
  const after = content.slice(endIdx);
  return `${before}\n${replacement}\n${after}`;
}

function buildPage(filePath, file, posts) {
  const raw = fs.readFileSync(filePath, "utf8");
  let content = raw.replace(/\r\n/g, "\n");
  const meta = readPageMeta(content, file);
  const prefix = file.includes("/") ? "../" : "";

  const jsonLd = schemasFor(file, meta, content, posts);
  content = replaceBetween(content, file, "HEAD", head({ ...meta, prefix, jsonLd }));
  content = replaceBetween(content, file, "HEADER", renderHeader(file, prefix));
  content = replaceBetween(content, file, "MOBILE_MENU", renderMobileMenu(file, prefix));
  content = replaceBetween(content, file, "NAV_SCRIPT", NAVBAR_SCRIPT);
  content = replaceBetween(content, file, "FOOTER", renderFooter(prefix));

  const latest = posts.slice(0, 3).map((p) => renderPostCard(p, prefix)).join("\n");
  content = replaceBetween(content, file, "LATEST_POSTS", latest);

  const all = posts.map((p) => renderPostCard(p, prefix)).join("\n");
  content = replaceBetween(content, file, "POST_LIST", all);

  content = content.replace(/\n/g, "\r\n");
  if (content === raw) return false;
  fs.writeFileSync(filePath, content, "utf8");
  return true;
}

function listPages(dir, prefix = "") {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && entry.name === "blog") {
      return listPages(path.join(dir, entry.name), "blog/");
    }
    return entry.isFile() && entry.name.endsWith(".html") ? [prefix + entry.name] : [];
  });
}

// --- sitemap ---------------------------------------------------------------

function writeSitemap(pages, posts) {
  const dates = Object.fromEntries(posts.map((p) => [`blog/${p.slug}.html`, p.date]));
  const today = new Date().toISOString().slice(0, 10);

  const urls = pages
    .filter((f) => f !== "404.html")
    .map((f) => {
      const loc = f === "index.html" ? `${SITE}/` : `${SITE}/${f}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${dates[f] || today}</lastmod>\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(SITE_DIR, "sitemap.xml"), xml, "utf8");
}

// --- entry point -----------------------------------------------------------

function build() {
  const posts = loadPosts();
  const written = writePostPages(posts);
  if (written.length) console.log(`${written.length} blog yazisi uretildi.`);

  const pages = listPages(SITE_DIR);
  let changed = 0;

  for (const file of pages) {
    if (buildPage(path.join(SITE_DIR, file), file, posts)) {
      console.log(file, "guncellendi");
      changed++;
    }
  }

  writeSitemap(pages, posts);
  console.log(`Build tamam. ${changed}/${pages.length} sayfa guncellendi, sitemap yazildi.`);
}

if (require.main === module) build();

module.exports = { build, parsePost, renderPostCard, loadPosts, readPageMeta, replaceBetween, listPages };
