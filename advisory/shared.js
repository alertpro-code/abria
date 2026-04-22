/* ============================================================
   ABRIA ADVISORY — shared.js
   Injects nav + footer on every page, handles interactivity.
   To add/remove pages: edit the PAGES array below.
   ============================================================ */

// ── SITE CONFIG ──────────────────────────────────────────────
const SITE = {
  name:    'Abria Advisory',
  tagline: 'Business Consultancy & Advisory',
  phone:   '+1 (647) 254-0231',
  email:   'info@abria.ca',
  address: 'Greater Toronto Area, Ontario, Canada',
  linkedin: '#',
  year: new Date().getFullYear()
};

// ── PAGE REGISTRY ─────────────────────────────────────────────
// To add a page: add an entry here and create the HTML file.
// To remove a page: delete the entry (and optionally the file).
const PAGES = [
  { label: 'Home',     href: 'advisory-home.html',    cta: false },
  { label: 'Areas of Practice', href: 'services.html',  cta: false },
  { label: 'About',    href: 'advisory-about.html',     cta: false },
  { label: 'Insights', href: 'insights.html',  cta: false },
  { label: 'Working With Us', href: 'pricing.html', cta: false },
  { label: 'Contact',  href: 'advisory-contact.html',   cta: true  },
];

// ── HELPERS ───────────────────────────────────────────────────
function currentPage() {
  const path = window.location.pathname.split('/').pop() || 'advisory-home.html';
  return path === '' ? 'advisory-home.html' : path;
}

function navLinkHTML() {
  const cur = currentPage();
  return PAGES.map(p => {
    const active = (cur === p.href) ? ' class="active"' : '';
    const cta    = p.cta ? ' nav-cta' : '';
    return `<li><a href="${p.href}"${active ? ` class="active${p.cta ? ' nav-cta' : ''}"` : (p.cta ? ' class="nav-cta"' : '')}>${p.label}</a></li>`;
  }).join('');
}

function footerLinksHTML() {
  return PAGES.filter(p => !p.cta).map(p =>
    `<li><a href="${p.href}">${p.label}</a></li>`
  ).join('');
}

// ── INJECT NAV ────────────────────────────────────────────────
function injectNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  nav.innerHTML = `
    <div class="nav-inner">
      <a href="advisory-home.html" class="nav-logo">
        <img src="abria-logo-white.png" alt="Abria Advisory" class="nav-logo-img">
      </a>
      <ul class="nav-links" id="navLinks">
        ${navLinkHTML()}
      </ul>
      <a href="../index.html" class="nav-cta" style="margin-left:12px;font-size:10px;letter-spacing:0.18em;padding:8px 18px;">Capital Services →</a>
      <div class="nav-toggle" id="navToggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;

  // Hamburger toggle
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close on link click (mobile)
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });

  // Close on outside tap (mobile)
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      toggle.classList.remove('open');
      links.classList.remove('open');
    }
  });

  // Scroll shadow
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── INJECT FOOTER ─────────────────────────────────────────────
function injectFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="abria-logo-transparent.png" alt="Abria Advisory" class="footer-logo-img">
          <span class="tagline-small">Business Consultancy &amp; Advisory</span>
          <p>Boutique advisory services for entrepreneurs, business owners, and organizations navigating growth, transition, and transformation.</p>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>${footerLinksHTML()}</ul>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="practice-business-advisory.html">Business Advisory</a></li>
            <li><a href="practice-coaching.html">Business Coaching</a></li>
            <li><a href="practice-financial-services.html">Financial Services</a></li>
            <li><a href="practice-capital.html">Capital & Funding</a></li>
            <li><a href="practice-automotive.html">Automotive Advisory</a></li>
            <li><a href="practice-beverage.html">Beverage & Consumer</a></li>
            <li><a href="practice-personal-advisory.html">Personal Advisory</a></li>
            <li><a href="practice-specialty.html">Specialty Consulting</a></li>
            <li><a href="small-business-help-toronto.html">Small Business Help</a></li>
            <li><a href="franchise-consultant-ontario.html">Franchise Consulting</a></li>
            <li><a href="business-partner-dispute-help-ontario.html">Partner Disputes</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <address>
            <a href="tel:${SITE.phone.replace(/\s/g,'')}">T: ${SITE.phone}</a><br>
            <a href="mailto:${SITE.email}">${SITE.email}</a>
          </address>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${SITE.year} Abria Advisory. All rights reserved.</span>
        <span>
          <a href="advisory-privacy.html">Privacy Policy</a>
          &nbsp;·&nbsp;
          <a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
        </span>
      </div>
    </div>
  `;
}

// ── REVEAL ON SCROLL ──────────────────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
}

// ── CONTACT FORM ──────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    fetch('https://formspree.io/f/xvzvwrog', {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).then(r => {
      if (r.ok) { showFormSuccess(form); }
      else { btn.textContent = 'Error — please try again'; btn.disabled = false; }
    }).catch(() => {
      btn.textContent = 'Error — please try again'; btn.disabled = false;
    });
  });
}

function showFormSuccess(form) {
  form.innerHTML = `
    <div style="text-align:center;padding:48px 24px;">
      <div style="font-size:36px;margin-bottom:16px;">✓</div>
      <h3 style="font-family:var(--font-display);font-size:28px;font-weight:300;color:var(--navy);margin-bottom:12px;">Thank you.</h3>
      <p style="color:var(--text-muted);font-size:15px;">We'll be in touch shortly.</p>
    </div>
  `;
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();
  initReveal();
  initContactForm();
});
