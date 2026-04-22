/* ============================================================
   ABRIA ADVISORY — shared.js
   Injects nav + footer on every page, handles interactivity.
   To add/remove pages: edit the PAGES array below.
   ============================================================ */

// ── SITE CONFIG ──────────────────────────────────────────────
const SITE = {
  name:    'Abria Advisory',
  tagline: 'Business Consultancy & Advisory',
  phone:   '+1 (905) 000-0000',
  email:   'info@abriaadvisory.com',
  address: 'Whitby, Ontario, Canada',
  linkedin: '#',
  year: new Date().getFullYear()
};

// ── PAGE REGISTRY ─────────────────────────────────────────────
// To add a page: add an entry here and create the HTML file.
// To remove a page: delete the entry (and optionally the file).
const PAGES = [
  { label: 'Home',     href: 'index.html',    cta: false },
  { label: 'Services', href: 'services.html',  cta: false },
  { label: 'About',    href: 'about.html',     cta: false },
  { label: 'Insights', href: 'insights.html',  cta: false },
  { label: 'Contact',  href: 'contact.html',   cta: true  },
];

// ── HELPERS ───────────────────────────────────────────────────
function currentPage() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  return path === '' ? 'index.html' : path;
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
      <a href="index.html" class="nav-logo">
        <span class="wordmark">Abria Advisory</span>
        <span class="tagline-small">Business Consultancy &amp; Advisory</span>
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
          <div class="wordmark">Abria Advisory</div>
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
            <li><a href="services.html#strategic-planning">Strategic Planning</a></li>
            <li><a href="services.html#business-coaching">Business Coaching</a></li>
            <li><a href="services.html#financial-advisory">Financial Advisory</a></li>
            <li><a href="services.html#operations">Operations & Org Design</a></li>
            <li><a href="services.html#market-entry">Market Entry</a></li>
            <li><a href="services.html#hr-people">HR & People Strategy</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <address>
            ${SITE.address}<br><br>
            <a href="tel:${SITE.phone.replace(/\s/g,'')}">T: ${SITE.phone}</a><br>
            <a href="mailto:${SITE.email}">${SITE.email}</a>
          </address>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${SITE.year} Abria Advisory. All rights reserved.</span>
        <span>
          <a href="privacy.html">Privacy Policy</a>
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

    // Replace with your Formspree endpoint or backend
    const endpoint = form.dataset.endpoint || '#';
    if (endpoint === '#') {
      setTimeout(() => {
        showFormSuccess(form);
      }, 800);
      return;
    }

    fetch(endpoint, {
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
