// Single source of truth for the shared site footer (index.html + treatment pages).
// Edit this file, then run `node scripts/build.js` from site/ to propagate the
// change to every page that includes it.
// Layout adapted from the Evermind Webflow template footer (contact-c):
// light background, brand block left + labelled link columns right,
// bottom bar with copyright + dot-separated legal links, disclaimer + socials.

function renderFooter() {
  return `<!-- TRUST STRIP: partner hospital accreditations & awards (rendered with the footer on every page) -->
<style>
  .trust-logo { filter: grayscale(1); opacity: .5; transition: filter .35s ease, opacity .35s ease; }
  .trust-logo:hover { filter: grayscale(0); opacity: 1; }
  @media (prefers-reduced-motion: reduce) { .trust-logo { transition: none; } }
  /* Primary CTA hover feedback: navy alone is too close to ink, so add a soft lift + glow */
  :is(a, button)[class*="hover:bg-navy"] { transition: background-color .3s ease, box-shadow .3s ease, transform .3s ease; }
  :is(a, button)[class*="hover:bg-navy"]:hover { box-shadow: 0 6px 18px rgba(23, 37, 90, .35); transform: translateY(-1px); }
  @media (prefers-reduced-motion: reduce) { :is(a, button)[class*="hover:bg-navy"], :is(a, button)[class*="hover:bg-navy"]:hover { transition: none; transform: none; } }
</style>
<section class="w-full px-6 py-14 bg-white" aria-label="Accreditations, awards and partner hospitals">
  <div class="max-w-screen-2xl mx-auto flex flex-col items-center gap-12">

    <!-- Group 1: accreditations & awards (badges) -->
    <div class="flex flex-col items-center gap-8 w-full pt-10 border-t border-ink/10">
      <div class="text-xs font-semibold tracking-[0.2em] text-ink/40 uppercase text-center">Accreditations &amp; Awards</div>
      <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-8 lg:gap-x-10 xl:gap-x-14">
        <img src="assets/trust/jci.png" alt="Joint Commission International Quality Approval" title="JCI — Joint Commission International" class="trust-logo h-16 md:h-20 w-auto" width="250" height="250" loading="lazy">
        <img src="assets/trust/iso-27001.png" alt="ISO 27001 Information Security Management certification" title="ISO 27001 — Information Security" class="trust-logo h-10 md:h-12 w-auto" width="347" height="131" loading="lazy">
        <img src="assets/trust/iso-ims.png" alt="ISO 9001, ISO 14001 & ISO 45001 Integrated Management System certification" title="ISO 9001 / 14001 / 45001 — Integrated Management System" class="trust-logo h-20 md:h-24 w-auto" width="143" height="291" loading="lazy">
        <img src="assets/trust/doctify-2025.png" alt="Doctify Outstanding Patient Experience Award 2025" title="Doctify — Outstanding Patient Experience 2025" class="trust-logo h-16 md:h-20 w-auto rounded-xl" width="899" height="520" loading="lazy">
        <img src="assets/trust/planetree.png" alt="Planetree Certified — Excellence in Person-Centered Care" title="Planetree Certified — Excellence in Person-Centered Care" class="trust-logo h-20 md:h-24 w-auto" width="396" height="687" loading="lazy">
        <img src="assets/trust/leed.png" alt="LEED Platinum green building certification — U.S. Green Building Council" title="LEED Platinum — U.S. Green Building Council" class="trust-logo h-14 md:h-16 w-auto" width="320" height="320" loading="lazy">
      </div>
    </div>

    <!-- Group 2: partner hospitals & travel (wordmarks) -->
    <div class="flex flex-col items-center gap-8 w-full pt-10 border-t border-ink/10">
      <div class="text-xs font-semibold tracking-[0.2em] text-ink/40 uppercase text-center">Trusted Partner Hospitals &amp; Travel</div>
      <div class="flex flex-wrap items-center justify-center gap-x-12 gap-y-7 md:gap-x-16 lg:gap-x-20">
        <img src="assets/trust/medicana.png" alt="Medicana International partner hospital" title="Medicana International" class="trust-logo h-8 md:h-9 w-auto" width="1150" height="420" loading="lazy">
        <img src="assets/trust/memorial.png" alt="Memorial Healthcare Group partner hospital" title="Memorial Healthcare Group" class="trust-logo h-5 md:h-6 w-auto" width="250" height="39" loading="lazy">
        <img src="assets/trust/acibadem.png" alt="Acıbadem Healthcare Group partner hospital" title="Acıbadem Healthcare Group" class="trust-logo h-4 md:h-5 w-auto" width="295" height="42" loading="lazy">
        <img src="assets/trust/turkish-airlines.png" alt="Turkish Airlines travel partner" title="Turkish Airlines" class="trust-logo h-8 md:h-9 w-auto" width="860" height="271" loading="lazy">
      </div>
    </div>

  </div>
</section>
<footer class="bg-stone text-ink border-t border-ink/10">
  <div class="px-6 md:px-10 pt-16 pb-10">

    <!-- Top: brand left, link columns right -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
      <div class="max-w-sm">
        <a href="index.html" class="inline-block"><img src="assets/logo-box.webp" alt="Take Care Turkey" class="h-10 bg-white rounded-md p-1"></a>
        <p class="mt-5 text-sm leading-relaxed text-ink/60">World-class medical care in Istanbul — surgery, travel and aftercare handled end to end by one dedicated team, at a fraction of Western prices.</p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-8">
        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-navy/70 mb-4">Treatments</div>
          <div class="flex flex-col gap-2.5 text-sm">
            <a href="treatment-hair.html" class="text-ink/70 hover:text-ink transition">Hair Transplant</a>
            <a href="treatment-bariatric-alt.html" class="text-ink/70 hover:text-ink transition">Bariatric Surgery</a>
            <a href="treatment-ivf.html" class="text-ink/70 hover:text-ink transition">IVF</a>
            <a href="treatment-dental.html" class="text-ink/70 hover:text-ink transition">Dental</a>
            <a href="treatment-orthopedic.html" class="text-ink/70 hover:text-ink transition">Orthopedic &amp; Spine</a>
          </div>
        </div>
        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-navy/70 mb-4">Company</div>
          <div class="flex flex-col gap-2.5 text-sm">
            <a href="index.html" class="text-ink/70 hover:text-ink transition">Home</a>
            <a href="index.html#contact" class="text-ink/70 hover:text-ink transition">Contact</a>
            <a href="portal-login.html" class="text-ink/70 hover:text-ink transition">Patient Portal</a>
          </div>
        </div>
        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-navy/70 mb-4">Support</div>
          <div class="flex flex-col gap-2.5 text-sm">
            <a href="mailto:care@takecareturkey.com" class="text-ink/70 hover:text-ink transition">care@takecareturkey.com</a>
            <a href="index.html#contact" class="text-ink/70 hover:text-ink transition">Get a Free Consultation</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom bar: copyright + dot-separated legal links -->
    <div class="mt-14 pt-6 border-t border-ink/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-ink/50">
      <p>&copy; 2026 TakeCare Turkey. Istanbul.</p>
      <div class="flex items-center gap-2">
        <a href="#" class="hover:text-ink transition">Privacy Policy</a>
        <span aria-hidden="true">&middot;</span>
        <a href="#" class="hover:text-ink transition">Terms</a>
        <span aria-hidden="true">&middot;</span>
        <a href="#" class="hover:text-ink transition">KVKK / GDPR</a>
      </div>
    </div>

    <!-- Disclaimer + socials -->
    <div class="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <p class="max-w-2xl text-xs leading-relaxed text-ink/40">TakeCare Turkey is a medical travel facilitator. Information on this website is provided for general guidance only and does not constitute medical advice; treatment suitability is always determined by licensed physicians after a personal medical assessment.</p>
      <div class="flex items-center gap-3">
        <a href="#" aria-label="Instagram" class="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center text-ink/60 hover:text-ink hover:border-ink/40 transition">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>
        </a>
        <a href="#" aria-label="Facebook" class="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center text-ink/60 hover:text-ink hover:border-ink/40 transition">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.87.24-1.46 1.49-1.46h1.6V4.45c-.28-.04-1.23-.12-2.34-.12-2.32 0-3.9 1.41-3.9 4v2.17H7.75v3h2.6V21h3.15Z"/></svg>
        </a>
        <a href="#" aria-label="WhatsApp" class="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center text-ink/60 hover:text-ink hover:border-ink/40 transition">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3.2-.5 0-.2 0-.4-.1-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3Z"/></svg>
        </a>
      </div>
    </div>
  </div>
</footer>`;
}

module.exports = { renderFooter };
