(function () {
  const PASSWORD = "vivid";
  const STORAGE_KEY = "vc_private_route_access_v2";
  let memoryUnlocked = false;
  let pendingHref = "";

  function getStoredAccess() {
    try {
      return window.sessionStorage.getItem(STORAGE_KEY) === "true";
    } catch (error) {
      return memoryUnlocked;
    }
  }

  function setStoredAccess() {
    memoryUnlocked = true;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "true");
    } catch (error) {
      // File URLs can block storage in some browsers; the in-memory flag keeps the current page usable.
    }
  }

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function unlock() {
    setStoredAccess();
    document.documentElement.classList.add("private-unlocked");
    document.querySelectorAll("[data-access-gate]").forEach((gate) => {
      gate.classList.add("is-unlocked");
      gate.classList.add("is-open");
      const links = gate.querySelector("[data-access-links]");
      if (links && links.dataset.routeUrl && !links.querySelector("a")) {
        const routeLink = document.createElement("a");
        routeLink.href = links.dataset.routeUrl;
        routeLink.textContent = "Scottsdale Route";
        links.appendChild(routeLink);
      }
      const toggle = gate.querySelector("[data-access-toggle]");
      if (toggle) {
        toggle.textContent = "Unlocked";
        toggle.setAttribute("aria-expanded", "true");
      }
      const error = gate.querySelector("[data-access-error]");
      if (error) error.textContent = "";
    });
    const overlay = document.querySelector("[data-private-overlay]");
    if (overlay) overlay.remove();
    if (pendingHref) {
      const href = pendingHref;
      pendingHref = "";
      window.location.href = href;
    }
  }

  function openGate(gate) {
    if (!gate) return;
    gate.classList.add("is-open");
    const toggle = gate.querySelector("[data-access-toggle]");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
    const input = gate.querySelector("[data-access-input]");
    if (input) input.focus();
  }

  function closeGate(gate) {
    if (!gate || gate.classList.contains("is-unlocked")) return;
    gate.classList.remove("is-open");
    const toggle = gate.querySelector("[data-access-toggle]");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  function wireInlineGate(gate) {
    const toggle = gate.querySelector("[data-access-toggle]");
    const form = gate.querySelector("[data-access-form]");
    const input = gate.querySelector("[data-access-input]");
    const error = gate.querySelector("[data-access-error]");

    if (toggle) {
      toggle.addEventListener("click", () => {
        if (gate.classList.contains("is-open")) closeGate(gate);
        else openGate(gate);
      });
    }

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (normalize(input && input.value) === PASSWORD) {
          unlock();
        } else if (error) {
          error.textContent = "Wrong password.";
        }
      });
    }
  }

  function createPrivateOverlay(pageName) {
    if (getStoredAccess()) return;
    const overlay = document.createElement("div");
    overlay.className = "vc-private-overlay";
    overlay.setAttribute("data-private-overlay", "");
    overlay.innerHTML = `
      <div class="vc-private-card" role="dialog" aria-modal="true" aria-label="Private access">
        <p class="vc-private-kicker">Private Vivid Canvas Area</p>
        <h1>${pageName || "Protected Page"}</h1>
        <p>Enter the password to view this internal page.</p>
        <form data-private-overlay-form>
          <input type="password" autocomplete="current-password" placeholder="Password" aria-label="Password" />
          <button type="submit">Open</button>
        </form>
        <p class="vc-private-error" data-private-overlay-error></p>
        <a href="index.html">Back to main site</a>
      </div>
    `;
    document.body.appendChild(overlay);
    const form = overlay.querySelector("[data-private-overlay-form]");
    const input = overlay.querySelector("input");
    const error = overlay.querySelector("[data-private-overlay-error]");
    if (input) input.focus();
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (normalize(input.value) === PASSWORD) unlock();
      else error.textContent = "Wrong password.";
    });
  }

  function wireProtectedLinks() {
    document.querySelectorAll("[data-protected-link]").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (getStoredAccess()) return;
        event.preventDefault();
        pendingHref = link.getAttribute("href") || "";
        const gate = document.querySelector("[data-access-gate]");
        openGate(gate);
      });
    });
  }

  function injectOverlayStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .vc-private-overlay{position:fixed;inset:0;z-index:100000;display:grid;place-items:center;padding:24px;background:rgba(12,11,10,.92);backdrop-filter:blur(18px)}
      .vc-private-card{width:min(440px,100%);padding:28px;border:1px solid rgba(212,177,123,.35);border-radius:8px;background:#fbf7f2;color:#151413;box-shadow:0 30px 90px rgba(0,0,0,.36);font-family:Outfit,Inter,system-ui,sans-serif}
      .vc-private-kicker{margin:0 0 10px;color:#b88542;text-transform:uppercase;letter-spacing:.14em;font-size:12px;font-weight:700}
      .vc-private-card h1{margin:0 0 10px;font-family:"Cormorant Garamond",Georgia,serif;font-size:42px;line-height:.96}
      .vc-private-card p{color:#726963;line-height:1.6}
      .vc-private-card form{display:grid;grid-template-columns:1fr auto;gap:8px;margin-top:16px}
      .vc-private-card input{min-width:0;min-height:44px;padding:0 12px;border:1px solid rgba(123,97,66,.22);border-radius:5px;background:#fff;font:inherit}
      .vc-private-card button{min-height:44px;border:0;border-radius:5px;padding:0 16px;background:#111;color:#fff;text-transform:uppercase;letter-spacing:.1em;font-size:12px;font-weight:800;cursor:pointer}
      .vc-private-card a{display:inline-flex;margin-top:16px;color:#151413;font-weight:700;text-decoration:none}
      .vc-private-error{min-height:20px;margin:8px 0 0!important;color:#9c351d!important;font-size:13px}
    `;
    document.head.appendChild(style);
  }

  function init() {
    injectOverlayStyles();
    document.querySelectorAll("[data-access-gate]").forEach(wireInlineGate);
    wireProtectedLinks();
    if (getStoredAccess()) unlock();
    const privatePageName = document.body && document.body.getAttribute("data-private-page");
    if (privatePageName) createPrivateOverlay(privatePageName);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
