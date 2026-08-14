const test = require("node:test");
const assert = require("node:assert");
const path = require("path");
const { parsePost, renderPostCard } = require("./build.js");

const FIXTURE = path.join(__dirname, "..", "..", "content", "blog", "duyu-butunleme-nedir.md");

test("parsePost front-matter'i ve govdeyi ayirir", () => {
  const post = parsePost(FIXTURE);
  assert.strictEqual(post.title, "Duyu bütünleme nedir, çocuğumda nasıl fark ederim?");
  assert.strictEqual(post.slug, "duyu-butunleme-nedir");
  assert.strictEqual(post.excerpt, "Etiketli kıyafeti çıkarmak isteyen, salıncaktan hiç doymayan ya da kalabalıkta bunalan çocuklar. Duyusal işlemlemenin ne olduğunu ve evde nelere dikkat edebileceğinizi anlattım.");
  assert.match(post.html, /<h2>Duyusal işlemleme ne demek\?<\/h2>/);
});

test("parsePost draft bayragini okur", () => {
  const post = parsePost(FIXTURE);
  assert.strictEqual(post.draft, false);
});

test("parsePost tarihi ISO formatinda dondurur", () => {
  const post = parsePost(FIXTURE);
  assert.strictEqual(post.date, "2026-07-28");
});

test("renderPostCard baslik, ozet ve baglanti icerir", () => {
  const card = renderPostCard(parsePost(FIXTURE));
  assert.match(card, /blog\/duyu-butunleme-nedir\.html/);
  assert.match(card, /Duyu bütünleme nedir/);
  assert.match(card, /Etiketli kıyafeti/);
});
