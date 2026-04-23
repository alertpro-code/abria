/* Blog subdirectory shared.js - standalone, no dependency on parent shared.js */

const SITE_BLOG = {
  phone:       '+1 (647) 254-0231',
  phoneDisplay:'(647) 254-0231',
  email:       'info@abria.ca',
  advisoryUrl: '../advisory/advisory-home.html',
  formspree:   'https://formspree.io/f/xvzvwrog',
};

const PAGES_BLOG = [
  { label: 'Home',              url: '../index.html' },
  { label: 'Funding Solutions', url: '../funding-solutions.html' },
  { label: 'How It Works',      url: '../how-it-works.html' },
  { label: 'Loan Prep',         url: '../loan-prep.html' },
  { label: 'Industries',        url: '../industries.html' },
  { label: 'Blog',              url: 'index.html' },
  { label: 'About',             url: '../about.html' },
  { label: 'Contact',           url: '../contact.html' },
];

function injectUtilityBarBlog() {
  const bar = document.getElementById('utility-bar');
  if (!bar) return;
  bar.innerHTML = `
    <div class="container">
      <div class="util-phone">Call us: <span>${SITE_BLOG.phoneDisplay}</span></div>
      <div style="display:flex;align-items:center;gap:16px;">
        <a href="mailto:${SITE_BLOG.email}" style="color:rgba(255,255,255,0.4);font-size:0.72rem;">${SITE_BLOG.email}</a>
        <a href="${SITE_BLOG.advisoryUrl}" class="util-advisory">Advisory Services →</a>
      </div>
    </div>`;
}

function injectHeaderBlog() {
  const header = document.getElementById('site-header');
  if (!header) return;
  header.innerHTML = `
    <div class="container">
      <div class="header-inner">
        <a href="../index.html" class="nav-logo">
          <img src="../assets/img/abria-logo.png" alt="Abria Capital" loading="lazy">
        </a>
        <a href="../contact.html" class="btn-primary">Apply Today</a>
      </div>
    </div>`;
}

function injectNavBlog() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const links = PAGES_BLOG.map(p => {
    const active = current === p.url.split('/').pop() ? ' active' : '';
    return `<a href="${p.url}" class="${active.trim()}">${p.label}</a>`;
  }).join('');
  nav.innerHTML = `
    <div class="container" style="position:relative;">
      <button class="nav-toggle" aria-label="Toggle menu" onclick="document.getElementById('navLinksBlog').classList.toggle('open')">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-inner">
        <div class="nav-links" id="navLinksBlog">${links}</div>
      </div>
    </div>`;
}

function injectFooterBlog() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="../assets/img/abria-logo-white.png" alt="Abria Capital">
          <p>Canadian business funding, loan packaging, and capital advisory.</p>
          <p style="margin-top:12px;"><a href="tel:+16472540231" style="color:rgba(255,255,255,0.5);">${SITE_BLOG.phoneDisplay}</a><br>
          <a href="mailto:${SITE_BLOG.email}" style="color:rgba(255,255,255,0.5);">${SITE_BLOG.email}</a></p>
        </div>
        <div class="footer-col">
          <h5>Capital Services</h5>
          <ul>
            <li><a href="../funding-solutions.html">Funding Solutions</a></li>
            <li><a href="../how-it-works.html">How It Works</a></li>
            <li><a href="../loan-prep.html">Loan Prep</a></li>
            <li><a href="../industries.html">Industries</a></li>
            <li><a href="../contact.html">Apply Now</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Blog</h5>
          <ul>
            <li><a href="index.html">All Articles</a></li>
            <li><a href="how-to-get-a-business-loan-canada.html">How to Get a Business Loan</a></li>
            <li><a href="why-business-loan-declined-canada.html">Why Applications Get Declined</a></li>
            <li><a href="alternative-lending-canada-guide.html">Alternative Lending Guide</a></li>
            <li><a href="bad-credit-business-loan-canada.html">Bad Credit Business Loans</a></li>
            <li><a href="business-plan-for-loan-canada.html">Business Plans for Loans</a></li>
            <li><a href="what-lenders-look-for-business-loan-canada.html">What Lenders Look For</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Company</h5>
          <ul>
            <li><a href="../about.html">About Abria</a></li>
            <li><a href="../contact.html">Contact Us</a></li>
            <li><a href="${SITE_BLOG.advisoryUrl}">Advisory Services →</a></li>
            <li><a href="../privacy.html">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© ${new Date().getFullYear()} Abria Capital. All rights reserved.</div>
        <div class="footer-disc">Not a bank or direct lender. Financing subject to lender qualification.</div>
      </div>
    </div>`;
}

function initBackToTopBlog() {
  const btn = document.createElement('button');
  btn.innerHTML = '↑';
  btn.setAttribute('aria-label', 'Back to top');
  btn.style.cssText = `position:fixed;bottom:28px;right:24px;width:44px;height:44px;border-radius:50%;background:#3a7bd5;color:#fff;border:none;font-size:1.1rem;font-weight:700;cursor:pointer;display:none;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(15,28,63,0.25);z-index:999;font-family:'Montserrat',sans-serif;`;
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => { btn.style.display = window.scrollY > 400 ? 'flex' : 'none'; });
  btn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

document.addEventListener('DOMContentLoaded', () => {
  injectUtilityBarBlog();
  injectHeaderBlog();
  injectNavBlog();
  injectFooterBlog();
  initBackToTopBlog();
});
