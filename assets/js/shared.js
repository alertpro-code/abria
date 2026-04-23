/* ============================================================
   ABRIA CAPITAL & ADVISORY — Shared Site JavaScript
   Handles: nav injection, footer injection, mobile menu,
            Formspree contact form, FAQ accordion
   Same architecture as abria.ca / alertpro.ca
   ============================================================ */

const SITE = {
  phone:       '+1 (647) 254-0231',
  phoneDisplay:'(647) 254-0231',
  email:       'info@abria.ca',
  address:     'Whitby, Ontario, Canada',
  linkedin:    'https://linkedin.com/company/abria-capital',
  formspree:   'https://formspree.io/f/xvzvwrog',   // ← replace with your Formspree ID
  advisoryUrl: 'advisory/advisory-home.html',
};

const PAGES = [
  { label: 'Home',              url: 'index.html' },
  { label: 'Funding Solutions', url: 'funding-solutions.html' },
  { label: 'How It Works',      url: 'how-it-works.html' },
  { label: 'Loan Prep',         url: 'loan-prep.html' },
  { label: 'Industries',        url: 'industries.html' },
  { label: 'Blog',              url: 'blog/index.html' },
  { label: 'About',             url: 'about.html' },
  { label: 'Contact',           url: 'contact.html' },
];

/* ---- INJECT UTILITY BAR ---- */
function injectUtilityBar() {
  // Utility bar removed — clean header only
  const bar = document.getElementById('utility-bar');
  if (bar) bar.style.display = 'none';
}

/* ---- INJECT HEADER (logo + Apply Today) ---- */
function injectHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  header.innerHTML = `
    <div class="container">
      <div class="header-inner">
        <a href="index.html" class="nav-logo">
          <img src="assets/img/abria-logo.png" alt="Abria Capital & Advisory" loading="lazy">
        </a>
        <a href="contact.html" class="btn-primary">Apply Today</a>
      </div>
    </div>`;
}

/* ---- INJECT NAV (dark bar, links only) ---- */
function injectNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const links = PAGES.map(p => {
    const active = current === p.url ? ' active' : '';
    return `<a href="${p.url}" class="${active.trim()}">${p.label}</a>`;
  }).join('');
  nav.innerHTML = `
    <div class="container" style="position:relative;">
      <button class="nav-toggle" aria-label="Toggle menu" onclick="toggleMenu()">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-inner">
        <div class="nav-links" id="navLinks">${links}</div>
      </div>
    </div>`;
}

function toggleMenu() {
  const nl = document.getElementById('navLinks');
  if (nl) nl.classList.toggle('open');
}

/* ---- INJECT FOOTER ---- */
function injectFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="assets/img/abria-logo-white.png" alt="Abria Capital & Advisory">
          <p>Canadian business funding, loan packaging, and capital advisory. We help businesses access financing and prepare the file that gets approved.</p>
          <p style="margin-top:12px;"><a href="tel:${SITE.phone}" style="color:rgba(255,255,255,0.5);">${SITE.phoneDisplay}</a><br>
          <a href="mailto:${SITE.email}" style="color:rgba(255,255,255,0.5);">${SITE.email}</a></p>
        </div>
        <div class="footer-col">
          <h5>Capital Services</h5>
          <ul>
            <li><a href="funding-solutions.html">Funding Solutions</a></li>
            <li><a href="how-it-works.html">How It Works</a></li>
            <li><a href="loan-prep.html">Loan Prep</a></li>
            <li><a href="industries.html">Industries</a></li>
            <li><a href="contact.html">Apply Now</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Funding Types</h5>
          <ul>
            <li><a href="funding-solutions.html#business-loans">Business Loans</a></li>
            <li><a href="funding-solutions.html#working-capital">Working Capital</a></li>
            <li><a href="funding-solutions.html#equipment">Equipment Financing</a></li>
            <li><a href="funding-solutions.html#lines-of-credit">Lines of Credit</a></li>
            <li><a href="funding-solutions.html#invoice">Invoice Financing</a></li>
            <li><a href="funding-solutions.html#alternative">Alternative Lending</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Company</h5>
          <ul>
            <li><a href="about.html">About Abria</a></li>
            <li><a href="blog/index.html">Blog & Insights</a></li>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="${SITE.advisoryUrl}" target="_blank">Advisory Services ↗</a></li>
            <li><a href="privacy.html">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© ${new Date().getFullYear()} Abria Capital & Advisory. All rights reserved. ${SITE.address}.</div>
        <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;">
          <a href="${SITE.advisoryUrl}" style="color:rgba(255,255,255,0.45);font-size:0.75rem;letter-spacing:0.06em;text-transform:uppercase;font-family:'Montserrat',sans-serif;font-weight:600;border-bottom:1px solid rgba(255,255,255,0.2);padding-bottom:1px;">Advisory Services →</a>
          <div class="footer-disc">Abria Capital & Advisory is a capital brokerage and advisory firm. We are not a bank, credit union, or direct lender. Financing is subject to lender qualification. Approval is not guaranteed. Abria operates in Canada.</div>
        </div>
      </div>
    </div>`;
}

/* ---- FORMSPREE SUCCESS DETECTION ---- */
function checkFormSuccess() {
  if (window.location.search.includes('success=true')) {
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if (form) form.style.display = 'none';
    if (success) {
      success.style.display = 'block';
      success.innerHTML = `
        <div style="font-size:2.5rem;margin-bottom:16px;">✓</div>
        <h3>Application Received</h3>
        <p>Thank you. We'll review your inquiry and follow up within one business day with an honest assessment of your options.</p>`;
      // Scroll to success message
      setTimeout(() => {
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }
  }
}

/* ---- FORMSPREE CONTACT FORM (JS fallback) ---- */
function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const success = document.getElementById('formSuccess');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
      const res = await fetch(SITE.formspree, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
      });
      if (res.ok) {
        form.style.display = 'none';
        if (success) {
          success.style.display = 'block';
          success.innerHTML = `
            <div style="font-size:2.5rem;margin-bottom:16px;">✓</div>
            <h3>Application Received</h3>
            <p>Thank you. We'll review your inquiry and follow up within one business day with an honest assessment of your options.</p>`;
        }
      } else {
        btn.textContent = 'Submit My Application';
        btn.disabled = false;
        alert(`There was an issue submitting the form. Please email us directly at ${SITE.email}.`);
      }
    } catch(err) {
      btn.textContent = 'Submit My Application';
      btn.disabled = false;
      alert(`Connection error. Please email us at ${SITE.email}.`);
    }
  });
}

/* ---- FAQ ACCORDION ---- */
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const a = q.nextElementSibling;
      const isOpen = q.classList.contains('open');
      document.querySelectorAll('.faq-q').forEach(el => { el.classList.remove('open'); el.nextElementSibling.classList.remove('open'); });
      if (!isOpen) { q.classList.add('open'); a.classList.add('open'); }
    });
  });
}

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  injectUtilityBar();
  injectHeader();
  injectNav();
  injectFooter();
  checkFormSuccess();
  initForm();
  initFAQ();
});
