/* Blog subdirectory — overrides asset paths from shared.js */
const ROOT = '../';
document.addEventListener('DOMContentLoaded', () => {
  // Fix logo paths
  setTimeout(() => {
    document.querySelectorAll('.nav-logo img, .footer-brand img').forEach(img => {
      if (img.src.includes('assets/img/')) {
        img.src = ROOT + 'assets/img/abria-logo.png';
      }
    });
    // Fix nav hrefs
    document.querySelectorAll('#navLinks a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('../') && !href.startsWith('#')) {
        a.setAttribute('href', ROOT + href);
      }
    });
    document.querySelectorAll('#site-footer a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('../') && !href.startsWith('#')) {
        a.setAttribute('href', ROOT + href);
      }
    });
  }, 50);
});
