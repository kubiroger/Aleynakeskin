// Injects the shared head, navbar, mobile drawer, and footer into every page.
// Run after editing anything under partials/:
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
const { head } = require("../partials/head");
const { renderHeader, renderMobileMenu, NAVBAR_SCRIPT } = require("../partials/navbar");
const { renderFooter } = require("../partials/footer");

const SITE_DIR = path.join(__dirname, "..");

const BLOCKS = [
  { name: "HEAD", render: (page, meta) => head(meta) },
  { name: "HEADER", render: (page) => renderHeader(page) },
  { name: "MOBILE_MENU", render: (page) => renderMobileMenu(page) },
  { name: "NAV_SCRIPT", render: () => NAVBAR_SCRIPT },
  { name: "FOOTER", render: () => renderFooter() },
];

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

function buildPage(filePath, file) {
  const raw = fs.readFileSync(filePath, "utf8");
  let content = raw.replace(/\r\n/g, "\n");
  const meta = readPageMeta(content, file);

  for (const block of BLOCKS) {
    content = replaceBetween(content, file, block.name, block.render(file, meta));
  }

  content = content.replace(/\n/g, "\r\n");
  if (content === raw) return false;
  fs.writeFileSync(filePath, content, "utf8");
  return true;
}

function listPages(dir, prefix = "") {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      if (entry.isDirectory() && entry.name === "blog") {
        return listPages(path.join(dir, entry.name), "blog/");
      }
      return entry.isFile() && entry.name.endsWith(".html") ? [prefix + entry.name] : [];
    });
}

function build() {
  const pages = listPages(SITE_DIR);
  let changed = 0;

  for (const file of pages) {
    if (buildPage(path.join(SITE_DIR, file), file)) {
      console.log(file, "guncellendi");
      changed++;
    } else {
      console.log(file, "degismedi");
    }
  }

  console.log(`Build tamam. ${changed}/${pages.length} dosya guncellendi.`);
}

if (require.main === module) build();

module.exports = { build, readPageMeta, replaceBetween, listPages };
