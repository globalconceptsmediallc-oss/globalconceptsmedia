/* Global Concepts Media — shared UI + cache-busting */
(() => {
  const VERSION = "20260212";

  const IS_GITHUB_PAGES =
    window.location.hostname.includes("github.io");

  const BASE = IS_GITHUB_PAGES ? "/globalconceptsmedia" : "";

  const navItems = [
    { href: `${BASE}/google-ads.html`, label: "Google Ads" },
    { href: `${BASE}/seo.html`, label: "SEO" },
    { href: `${BASE}/case-studies.html`, label: "Case Studies" },
    { href: `${BASE}/contact.html`, label: "Contact" }
  ];

  function withV(url) {
    if (!url || url.startsWith("http")) return url;
    const joiner = url.includes("?") ? "&" : "?";
    return `${url}${joiner}v=${encodeURIComponent(VERSION)}`;
  }

  function normalizePath(path) {
    if (!path) return "/";
    return path
      .split("?")[0]
      .replace(/\/index\.html$/, "/")
      .replace(/\/+$/, "") || "/";
  }

  function samePath(a, b) {
    return normalizePath(a) === normalizePath(b);
  }

  function renderHeader() {
    const header = document.getElementById("site-header");
    if (!header) return;

    const current = window.location.pathname || "/";
    const homeHref = `${BASE}/index.html`;
    const contactHref = `${BASE}/contact.html`;
    const logoSrc = `${BASE}/images/logo.jpg`;

    const links = navItems.map((item) => {
      const active = samePath(current, item.href) ? "active" : "";
      return `<a class="${active}" href="${item.href}">${item.label}</a>`;
    }).join("");

    const homeActive =
      samePath(current, `${BASE}/`) ||
      samePath(current, `${BASE}/index.html`) ||
      samePath(current, "/") ||
      samePath(current, "/index.html");

    header.innerHTML = `
      <header class="site-header">
        <div class="container navbar">
          <a class="brand" href="${homeHref}" aria-label="Global Concepts Media Home">
            <img src="${withV(logoSrc)}" alt="Global Concepts Media logo" width="40" height="40" />
            <span class="brand-text">
              <span class="brand-name">Global Concepts Media</span>
              <span class="brand-tag">Google Ads + SEO</span>
            </span>
          </a>

          <nav class="navlinks" aria-label="Primary navigation">
            <a class="${homeActive ? "active" : ""}" href="${homeHref}">Home</a>
            ${links}
          </nav>

          <div class="nav-cta">
            <a class="btn btn-primary" href="${contactHref}">Book a consult</a>
          </div>
        </div>
      </header>
    `;
  }

  function renderFooter() {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const year = new Date().getFullYear();
    const logoSrc = `${BASE}/images/logo.jpg`;

    footer.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <div class="brand" style="min-width:unset;">
              <img src="${withV(logoSrc)}" alt="Global Concepts Media logo" width="40" height="40" />
              <div class="brand-text">
                <div class="brand-name">Global Concepts Media</div>
                <div class="brand-tag">Performance marketing with standards</div>
              </div>
            </div>
            <div class="copy">© ${year} Global Concepts Media. All rights reserved.</div>
          </div>
          <div class="footer-links" aria-label="Footer links">
            <a href="${BASE}/google-ads.html">Google Ads</a>
            <a href="${BASE}/seo.html">SEO</a>
            <a href="${BASE}/case-studies.html">Case Studies</a>
            <a href="${BASE}/contact.html">Contact</a>
          </div>
        </div>
      </footer>
    `;
  }

  function wireContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const note = document.getElementById("formNote");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const website = String(fd.get("website") || "").trim();
      const message = String(fd.get("message") || "").trim();

      if (!name || !email || !message) {
        if (note) note.textContent = "Please fill in name, email, and message.";
        return;
      }

      const subject = encodeURIComponent(`New inquiry — ${name}`);
      const bodyLines = [
        `Name: ${name}`,
        `Email: ${email}`,
        website ? `Website: ${website}` : `Website:`,
        ``,
        `Message:`,
        message
      ];
      const body = encodeURIComponent(bodyLines.join("\n"));

      const to = "andy@globalconceptsmedia.com";
      const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

      if (note) note.textContent = "Opening your email client…";
      window.location.href = mailto;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();
    wireContactForm();
  });
})();
