# Abria Advisory — Website

Multi-page static site built for **GitHub Pages** hosting.
Design modelled on purvesredmond.com — slate blue + copper/bronze palette.

---

## 🚀 Deploying to GitHub Pages

### First-time setup

1. **Create a GitHub repository** — e.g. `abria-advisory-website` (can be private)
2. **Upload all files** (maintain the folder structure exactly as-is)
3. In the repo, go to **Settings → Pages**
4. Under *Source*, select **Deploy from a branch**
5. Choose `main` branch, folder `/` (root)
6. Click **Save** — your site will be live at `https://yourusername.github.io/abria-advisory-website/`

### Custom domain (e.g. abriaadvisory.com)

1. Add a file named `CNAME` (no extension) to the root of the repo containing just your domain:
   ```
   abriaadvisory.com
   ```
2. In your DNS provider (e.g. GoDaddy), add these records:
   - `A` record → `185.199.108.153`
   - `A` record → `185.199.109.153`
   - `A` record → `185.199.110.153`
   - `A` record → `185.199.111.153`
   - `CNAME` record: `www` → `yourusername.github.io`
3. Back in GitHub Pages settings, enter your custom domain and enable **Enforce HTTPS**

---

## 📁 File Structure

```
abria/
├── index.html          ← Homepage
├── services.html       ← Services (all 8 practice areas)
├── about.html          ← About the firm
├── insights.html       ← Insights / Blog listing
├── contact.html        ← Contact form + process
├── privacy.html        ← Privacy policy
├── CNAME               ← (create this for custom domain)
├── assets/
│   ├── css/
│   │   └── style.css   ← All styles (CSS variables at top)
│   └── js/
│       └── shared.js   ← Nav + footer injection + all JS
```

---

## ➕ Adding a New Page

1. **Register the page** in `assets/js/shared.js`, in the `PAGES` array:
   ```javascript
   const PAGES = [
     { label: 'Home',      href: 'index.html',    cta: false },
     { label: 'Services',  href: 'services.html',  cta: false },
     { label: 'About',     href: 'about.html',     cta: false },
     { label: 'Insights',  href: 'insights.html',  cta: false },
     // ← ADD YOUR NEW PAGE HERE:
     { label: 'Team',      href: 'team.html',      cta: false },
     { label: 'Contact',   href: 'contact.html',   cta: true  },
   ];
   ```
   - `cta: true` renders the link as a highlighted button in the nav

2. **Create the HTML file** — use this template:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Page Title | Abria Advisory</title>
     <meta name="description" content="Page description for SEO.">
     <link rel="stylesheet" href="assets/css/style.css">
   </head>
   <body>
     <nav id="nav"></nav>
     <!-- Your content here -->
     <footer id="footer"></footer>
     <script src="assets/js/shared.js"></script>
   </body>
   </html>
   ```

3. Commit and push — the nav updates on **every page automatically**.

---

## ➖ Removing a Page

1. Delete (or comment out) the entry from the `PAGES` array in `shared.js`
2. Optionally delete the `.html` file from the repo
3. The nav updates everywhere automatically on next load

---

## ✏️ Common Customizations

### Update phone / email / address
Edit the `SITE` object at the top of `assets/js/shared.js`:
```javascript
const SITE = {
  phone:   '+1 (905) 000-0000',   // ← replace
  email:   'info@abriaadvisory.com', // ← replace
  address: 'Whitby, Ontario, Canada',
  linkedin: 'https://linkedin.com/company/abria-advisory',
};
```

### Change brand colours
All colours are CSS variables at the top of `assets/css/style.css`:
```css
:root {
  --navy:        #1C2B3A;
  --copper:      #B87333;
  --copper-light:#D4924A;
  /* ... */
}
```

### Connect the contact form to Formspree
1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy the endpoint URL
3. In `contact.html`, find this line:
   ```html
   <form id="contactForm" class="contact-form" data-endpoint="#">
   ```
4. Replace `#` with your Formspree URL:
   ```html
   <form id="contactForm" class="contact-form" data-endpoint="https://formspree.io/f/YOUR_ID">
   ```

### Update SEO metadata
Each page has its own `<title>` and `<meta name="description">` — update these directly in each `.html` file.
Also update the `<link rel="canonical" href="...">` tags with your actual domain once live.

### Add your logo
Replace the text wordmark by editing `injectNav()` in `shared.js`. 
If using an SVG or PNG logo, add it to `assets/img/` and reference it:
```html
<a href="index.html" class="nav-logo">
  <img src="assets/img/abria-logo.svg" alt="Abria Advisory" height="36">
</a>
```

---

## 🔍 SEO Notes

- Each page has unique `<title>`, `<meta description>`, and `<link rel="canonical">`
- Semantic HTML5 landmarks (`<nav>`, `<section>`, `<footer>`, `aria-label`)
- No JavaScript required for content rendering (SEO-friendly static HTML)
- Multi-page structure gives each topic its own URL (better for indexing)
- Page speed: zero external JS dependencies, Google Fonts only external asset

---

*Built for Abria Advisory — GitHub Pages compatible static site*
