(function () {
  const PASSWORD = "vivid";
  const STORAGE_KEY = "vc_private_route_access_v3";
  const ACCESS_TTL_MS = 4 * 60 * 60 * 1000;
  let memoryUnlocked = false;
  let pendingHref = "";

  function getStoredAccess() {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return memoryUnlocked;
      const data = JSON.parse(raw);
      return Date.now() - Number(data.unlockedAt || 0) < ACCESS_TTL_MS;
    } catch (error) {
      return memoryUnlocked;
    }
  }

  function setStoredAccess() {
    memoryUnlocked = true;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ unlockedAt: Date.now() }));
    } catch (error) {
      // File URLs can block storage in some browsers; the in-memory flag keeps the current page usable.
    }
  }

  function clearStoredAccess() {
    memoryUnlocked = false;
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
      window.sessionStorage.removeItem("vc_private_route_access_v2");
    } catch (error) {
      // Ignore storage failures.
    }
  }

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function closeGate(gate) {
    if (!gate) return;
    gate.classList.remove("is-open");
    const toggle = gate.querySelector("[data-access-toggle]");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  function lockGate(gate) {
    if (!gate) return;
    gate.classList.remove("is-unlocked");
    closeGate(gate);
    const toggle = gate.querySelector("[data-access-toggle]");
    if (toggle) {
      toggle.textContent = "Private";
      toggle.setAttribute("aria-expanded", "false");
    }
    const input = gate.querySelector("[data-access-input]");
    if (input) input.value = "";
    const error = gate.querySelector("[data-access-error]");
    if (error) error.textContent = "";
    const links = gate.querySelector("[data-access-links]");
    if (links) links.innerHTML = "";
  }

  function lockAll() {
    clearStoredAccess();
    document.documentElement.classList.remove("private-unlocked");
    document.querySelectorAll("[data-access-gate]").forEach(lockGate);
  }

  function renderUnlockedLinks(gate) {
    const links = gate.querySelector("[data-access-links]");
    if (!links || links.querySelector("a")) return;

    const destinations = [
      { href: links.dataset.dashboardUrl, label: "Open Portal Dashboard" },
      { href: links.dataset.routeUrl, label: "Open Scottsdale Route" }
    ].filter((item) => item.href);

    destinations.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;
      links.appendChild(link);
    });

    const lockButton = document.createElement("button");
    lockButton.type = "button";
    lockButton.className = "private-link-button";
    lockButton.textContent = "Lock Private Access";
    lockButton.addEventListener("click", lockAll);
    links.appendChild(lockButton);
  }

  function unlock(options = {}) {
    setStoredAccess();
    document.documentElement.classList.add("private-unlocked");
    document.querySelectorAll("[data-access-gate]").forEach((gate) => {
      gate.classList.add("is-unlocked");
      if (options.showInlineGate) gate.classList.add("is-open");
      else closeGate(gate);
      renderUnlockedLinks(gate);
      const toggle = gate.querySelector("[data-access-toggle]");
      if (toggle) {
        toggle.textContent = "Private";
        toggle.setAttribute("aria-expanded", options.showInlineGate ? "true" : "false");
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
          unlock({ showInlineGate: true });
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

  function wireEdgeExperience() {
    document.querySelectorAll("[data-edge-experience]").forEach((section) => {
      const toggle = section.querySelector("[data-edge-mode-toggle]");
      const label = section.querySelector("[data-edge-mode-label]");
      const stage = section.querySelector("[data-edge-stage]");
      const controls = Array.from(section.querySelectorAll("[data-edge-focus]"));
      const cards = Array.from(section.querySelectorAll("[data-edge-card]"));
      const panels = Array.from(section.querySelectorAll("[data-edge-panel]"));
      const hotspots = Array.from(section.querySelectorAll("[data-edge-hotspot]"));
      const stageTitle = section.querySelector("[data-edge-stage-title]");
      const stageMeta = section.querySelector("[data-edge-stage-meta]");

      function setTheme(theme) {
        const isDark = theme === "dark";
        section.dataset.edgeTheme = isDark ? "dark" : "light";
        if (toggle) toggle.setAttribute("aria-pressed", String(isDark));
        if (label) label.textContent = isDark ? "Dark Mode" : "Light Mode";
      }

      function setFocus(focus) {
        if (!focus) return;
        if (stage) stage.dataset.active = focus;
        const activeControl = controls.find((control) => control.dataset.edgeFocus === focus);
        if (stageTitle && activeControl && activeControl.dataset.edgeTitle) {
          stageTitle.textContent = activeControl.dataset.edgeTitle;
        }
        if (stageMeta && activeControl && activeControl.dataset.edgeMeta) {
          stageMeta.textContent = activeControl.dataset.edgeMeta;
        }
        controls.forEach((control) => {
          control.classList.toggle("is-active", control.dataset.edgeFocus === focus);
        });
        hotspots.forEach((hotspot) => {
          hotspot.classList.toggle("is-active", hotspot.dataset.edgeHotspot === focus);
        });
        cards.forEach((card) => {
          card.classList.toggle("is-active", card.dataset.edgeCard === focus);
        });
        panels.forEach((panel) => {
          panel.classList.toggle("is-active", panel.dataset.edgePanel === focus);
        });
      }

      if (toggle) {
        toggle.addEventListener("click", () => {
          setTheme(section.dataset.edgeTheme === "dark" ? "light" : "dark");
        });
      }

      controls.forEach((control) => {
        control.addEventListener("click", () => setFocus(control.dataset.edgeFocus));
      });

      hotspots.forEach((hotspot) => {
        if (hotspot.tagName !== "BUTTON") {
          hotspot.setAttribute("role", "button");
          hotspot.setAttribute("tabindex", "0");
        }
        hotspot.addEventListener("click", (event) => {
          event.stopPropagation();
          setFocus(hotspot.dataset.edgeHotspot);
        });
        hotspot.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setFocus(hotspot.dataset.edgeHotspot);
          }
        });
      });

      cards.forEach((card) => {
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.addEventListener("click", () => setFocus(card.dataset.edgeCard));
        card.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setFocus(card.dataset.edgeCard);
          }
        });
      });

      setTheme(section.dataset.edgeTheme || "light");
      setFocus((controls.find((control) => control.classList.contains("is-active")) || controls[0] || {}).dataset.edgeFocus);
    });
  }

  function wirePremiumReveals() {
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const revealSelectors = [
      ".site-header",
      ".hero-copy > *",
      ".hero-art",
      ".client-strip > *",
      ".team-proof-wrap > *",
      ".results-grid > *",
      ".services-showcase-grid > *",
      ".growth-command-lead > *",
      ".growth-card",
      ".local-market-grid > .section-lead",
      ".local-copy",
      ".local-card",
      ".cta-grid > *",
      ".footer-main > *",
      ".footer-bottom > *"
    ];

    const variants = [
      { x: "0.2rem", y: "1.35rem", tilt: "-0.9deg", backX: "-0.26rem", backY: "-0.16rem", backTilt: "0.42deg", forwardX: "0.12rem", forwardY: "0.06rem", forwardTilt: "-0.18deg" },
      { x: "-0.9rem", y: "0.85rem", tilt: "0.8deg", backX: "0.2rem", backY: "-0.12rem", backTilt: "-0.34deg", forwardX: "-0.08rem", forwardY: "0.05rem", forwardTilt: "0.14deg" },
      { x: "0.85rem", y: "0.95rem", tilt: "-0.7deg", backX: "-0.18rem", backY: "-0.14rem", backTilt: "0.28deg", forwardX: "0.08rem", forwardY: "0.06rem", forwardTilt: "-0.12deg" },
      { x: "0", y: "1.55rem", tilt: "0.45deg", backX: "-0.12rem", backY: "-0.2rem", backTilt: "-0.22deg", forwardX: "0.06rem", forwardY: "0.08rem", forwardTilt: "0.1deg" }
    ];

    const elements = Array.from(new Set(revealSelectors.flatMap((selector) => Array.from(document.querySelectorAll(selector)))));
    if (!elements.length) return;

    elements.forEach((element, index) => {
      const variant = variants[index % variants.length];
      const delay = Math.min((index % 7) * 70, 420);
      element.classList.add("reveal-item");
      element.style.setProperty("--reveal-x", variant.x);
      element.style.setProperty("--reveal-y", variant.y);
      element.style.setProperty("--reveal-tilt", variant.tilt);
      element.style.setProperty("--reveal-back-x", variant.backX);
      element.style.setProperty("--reveal-back-y", variant.backY);
      element.style.setProperty("--reveal-back-tilt", variant.backTilt);
      element.style.setProperty("--reveal-forward-x", variant.forwardX);
      element.style.setProperty("--reveal-forward-y", variant.forwardY);
      element.style.setProperty("--reveal-forward-tilt", variant.forwardTilt);
      element.style.setProperty("--reveal-delay", `${delay}ms`);
      element.addEventListener("animationend", () => element.classList.add("reveal-complete"), { once: true });
    });

    document.documentElement.classList.add("reveal-ready");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("is-visible", "reveal-complete");
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.16 });

    function revealInitialViewport() {
      elements.forEach((element) => {
        if (element.classList.contains("is-visible")) return;
        const rect = element.getBoundingClientRect();
        const inInitialViewport = rect.top < window.innerHeight * 0.94 && rect.bottom > 0;
        if (!inInitialViewport) return;
        element.classList.add("is-visible");
        observer.unobserve(element);
      });
    }

    elements.forEach((element) => observer.observe(element));
    requestAnimationFrame(revealInitialViewport);
    window.setTimeout(revealInitialViewport, 240);
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
    wireEdgeExperience();
    wirePremiumReveals();
    const privatePageName = document.body && document.body.getAttribute("data-private-page");
    if (privatePageName) createPrivateOverlay(privatePageName);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
