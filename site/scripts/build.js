// Regenerates the shared navbar/mobile-menu/footer blocks in every page from
// site/partials/*.js. Run this after editing a partial:
//
//   node scripts/build.js
//
// Safe to run any time -- it only touches the content between the
// BUILD:*:START / BUILD:*:END marker comments in each page, and leaves a
// file untouched (no write) if nothing changed.

const fs = require("fs");
const path = require("path");
const { renderHeader, renderMobileMenu, NAVBAR_SCRIPT } = require("../partials/navbar");
const { renderFooter } = require("../partials/footer");

const SITE_DIR = path.join(__dirname, "..");

const PAGES = {
  "index.html": "index",
};

function replaceBetween(content, file, startMarker, endMarker, replacement) {
  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1) {
    throw new Error(`${file}: markers not found: ${startMarker} / ${endMarker}`);
  }
  const before = content.slice(0, startIdx + startMarker.length);
  const after = content.slice(endIdx);
  return `${before}\n${replacement}\n${after}`;
}

let changedCount = 0;

for (const [file, page] of Object.entries(PAGES)) {
  const filePath = path.join(SITE_DIR, file);
  const raw = fs.readFileSync(filePath, "utf8");
  let content = raw.replace(/\r\n/g, "\n");

  content = replaceBetween(content, file, "<!-- BUILD:HEADER:START -->", "<!-- BUILD:HEADER:END -->", renderHeader(page));
  content = replaceBetween(content, file, "<!-- BUILD:MOBILE_MENU:START -->", "<!-- BUILD:MOBILE_MENU:END -->", renderMobileMenu(page));
  content = replaceBetween(content, file, "<!-- BUILD:NAV_SCRIPT:START -->", "<!-- BUILD:NAV_SCRIPT:END -->", NAVBAR_SCRIPT);
  content = replaceBetween(content, file, "<!-- BUILD:FOOTER:START -->", "<!-- BUILD:FOOTER:END -->", renderFooter());

  content = content.replace(/\n/g, "\r\n");

  if (content !== raw) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(file, "updated");
    changedCount++;
  } else {
    console.log(file, "unchanged");
  }
}

console.log(`Build complete. ${changedCount} file(s) updated.`);
