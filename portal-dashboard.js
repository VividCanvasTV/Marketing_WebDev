(function () {
  const data = window.VC_PORTAL_DATA;

  if (!data) return;

  const byId = (id) => document.getElementById(id);
  const escapeHtml = (value) =>
    String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const slugStatus = (status) =>
    String(status || "neutral")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const externalAttrs = (url) =>
    url && !url.startsWith("#")
      ? ' target="_blank" rel="noreferrer"'
      : "";

  const iconMap = {
    dashboard: "dashboard",
    sales: "sales",
    fulfillment: "fulfillment",
    content: "content",
    sops: "sops",
    tutorials: "tutorials",
    team: "team",
    pricing: "pricing",
    drive: "drive",
    reports: "reports",
    VC: "dashboard",
    SL: "sales",
    FL: "fulfillment",
    CE: "content",
    KB: "sops",
    TR: "tutorials",
    TM: "team",
    GD: "drive",
    DR: "reports",
    GHL: "tool",
    CU: "tool",
    BF: "content",
    SOP: "sops",
    CT: "content",
    "$": "pricing",
    WHY: "dashboard",
    SYS: "sops",
    BR: "content",
    NL: "sales",
    HD: "sales",
    FU: "warning",
    PM: "fulfillment",
    PS: "warning",
    CB: "content",
    SO: "sops",
    IN: "sales",
    OB: "sales",
    PHX: "sales",
    TT: "sales",
    YP: "sales",
    GB: "drive",
    AP: "tool",
    LI: "tool",
    AC: "fulfillment",
    ON: "fulfillment",
    PP: "fulfillment",
    PR: "fulfillment",
    PO: "fulfillment",
    RV: "content",
    DL: "fulfillment",
    SP: "content",
    RS: "content",
    EQ: "content",
    IP: "content",
    SR: "content",
    TH: "content",
    RR: "content",
    PC: "content",
    PN: "content",
    DV: "tutorials",
    AI: "tutorials",
    WD: "tutorials",
    LP: "tutorials",
    CI: "tutorials",
    LT: "tutorials",
    AU: "tutorials",
    ER: "tutorials",
    MG: "tutorials",
    AD: "tutorials",
    CM: "team",
    JL: "team",
    JO: "team",
    PL: "team",
    MR: "pricing",
    MV: "pricing",
    VP: "fulfillment",
    ED: "content"
  };

  const iconSrc = (item) => {
    const key = item.icon || iconMap[item.id] || iconMap[item.logo] || iconMap[item.label] || iconMap[item.title];
    return `assets/portal-icons/${key || "tool"}.svg`;
  };

  const logo = (item, isLight = false) =>
    `<span class="logo-mark${isLight ? " light" : ""}" aria-hidden="true"><img class="portal-icon" src="${escapeHtml(iconSrc(item))}" alt="" /></span>`;

  const statusBadge = (status) =>
    `<span class="status-badge ${slugStatus(status)}">${escapeHtml(status || "Ready")}</span>`;

  function setHtml(id, html) {
    const node = byId(id);
    if (node) node.innerHTML = html;
  }

  function renderNav() {
    setHtml(
      "portalNav",
      data.nav
        .map(
          (item) => `
            <a class="nav-link" href="#${escapeHtml(item.id)}" data-nav-link="${escapeHtml(item.id)}">
              ${logo(item)}
              <span>${escapeHtml(item.label)}</span>
            </a>
          `
        )
        .join("")
    );
  }

  function renderQuickActions() {
    setHtml(
      "quickActions",
      data.quickActions
        .map(
          (item) => `
            <a class="quick-action searchable" href="${escapeHtml(item.url)}"${externalAttrs(item.url)} data-search="${escapeHtml(item.label)}">
              ${logo(item, true)}
              <span>${escapeHtml(item.label)}</span>
            </a>
          `
        )
        .join("")
    );
  }

  function renderLogoCloud() {
    return data.logos
      .map((item) => {
        const media =
          item.type === "image"
            ? `<img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.name)} logo" />`
            : logo(item, true);
        return `
          <div class="logo-tile searchable" data-search="${escapeHtml(item.name)}">
            ${media}
            <strong>${escapeHtml(item.name)}</strong>
          </div>
        `;
      })
      .join("");
  }

  function renderMetrics() {
    setHtml(
      "pulseGrid",
      data.pulse
        .map(
          (item) => `
            <article class="metric-card searchable" data-search="${escapeHtml(item.label)} ${escapeHtml(item.detail)}">
              ${logo(item, true)}
              <div>
                <h3>${escapeHtml(item.label)}</h3>
                <strong>${escapeHtml(item.value)}</strong>
                ${statusBadge(item.status)}
                <p>${escapeHtml(item.detail)}</p>
              </div>
            </article>
          `
        )
        .join("")
    );
  }

  function renderAttention() {
    setHtml(
      "attentionGrid",
      data.attention
        .map(
          (item) => `
            <article class="attention-card searchable" data-search="${escapeHtml(item.title)} ${escapeHtml(item.copy)}">
              <div class="card-head">
                <div>
                  <h3>${escapeHtml(item.title)}</h3>
                  <p>${escapeHtml(item.copy)}</p>
                </div>
                ${logo(item, true)}
              </div>
              <div class="card-footer">${statusBadge(item.status)}</div>
            </article>
          `
        )
        .join("")
    );
  }

  function renderPriorities() {
    setHtml(
      "tomorrowPriorities",
      data.tomorrowPriorities
        .map(
          (item, index) => `
            <li>
              <span>${index + 1}</span>
              <strong>${escapeHtml(item)}</strong>
            </li>
          `
        )
        .join("")
    );
  }

  function loopDiagram(loopName) {
    return `
      <div class="loop-diagram" aria-label="${escapeHtml(loopName)} loop">
        ${data.loops[loopName]
          .map((step) => `<span class="loop-step">${escapeHtml(step)}</span>`)
          .join("")}
      </div>
    `;
  }

  function renderCommandCards(id, cards) {
    setHtml(
      id,
      cards
        .map(
          (item) => `
            <details class="command-card searchable" data-search="${escapeHtml(item.title)} ${escapeHtml(item.body)} ${escapeHtml(item.status)}">
              <summary>
                <div class="card-head">
                  ${logo(item, true)}
                  <div>
                    <h3>${escapeHtml(item.title)}</h3>
                    ${statusBadge(item.status)}
                  </div>
                  <span class="card-disclosure" aria-hidden="true">+</span>
                </div>
              </summary>
              <p>${escapeHtml(item.body)}</p>
              <div class="card-footer">
                ${item.url ? `<a class="open-link" href="${escapeHtml(item.url)}"${externalAttrs(item.url)}>Open</a>` : "<span></span>"}
              </div>
            </details>
          `
        )
        .join("")
    );
  }

  function progressWidth(item) {
    if (item.label === "Scheduled Posts") return "73%";
    if (item.label === "Ready to Schedule") return "55%";
    if (item.label === "Editing Queue") return "68%";
    if (item.label === "Idea Pool") return "92%";
    return "43%";
  }

  function renderContentStats() {
    setHtml(
      "contentStats",
      data.contentStats
        .map(
          (item) => `
            <article class="content-meter searchable" data-search="${escapeHtml(item.label)}">
              <div class="card-head">
                ${logo(item, true)}
                ${statusBadge(item.status)}
              </div>
              <strong>${escapeHtml(item.value)}</strong>
              <p>${escapeHtml(item.label)}</p>
              <div class="progress-track" aria-hidden="true"><div class="progress-fill" style="--progress:${progressWidth(item)}"></div></div>
            </article>
          `
        )
        .join("")
    );
  }

  function renderSops() {
    setHtml(
      "sopGrid",
      data.sops
        .map(
          (item) => `
            <details class="sop-card searchable" data-search="${escapeHtml(item.problem)} ${escapeHtml(item.name)} ${escapeHtml(item.category)} ${escapeHtml(item.owner)} ${escapeHtml(item.tool)}">
              <summary>
                <div class="card-head">
                  ${logo(item, true)}
                  <div>
                    <h3>${escapeHtml(item.name)}</h3>
                    ${statusBadge(item.status)}
                  </div>
                  <span class="card-disclosure" aria-hidden="true">+</span>
                </div>
              </summary>
              <p>${escapeHtml(item.problem)}</p>
              <div class="field-grid">
                <div class="field-row"><span>Category</span><b>${escapeHtml(item.category)}</b></div>
                <div class="field-row"><span>Owner</span><b>${escapeHtml(item.owner)}</b></div>
                <div class="field-row"><span>Tool</span><b>${escapeHtml(item.tool)}</b></div>
                <div class="field-row"><span>Updated</span><b>Apr 2026</b></div>
              </div>
              <div class="card-footer">
                <a class="open-link" href="${escapeHtml(item.link)}"${externalAttrs(item.link)}>Open SOP</a>
              </div>
            </details>
          `
        )
        .join("")
    );
  }

  function renderTutorials() {
    setHtml(
      "tutorialGrid",
      data.tutorials
        .map(
          (item) => `
            <details class="tutorial-card searchable" data-search="${escapeHtml(item.title)} ${escapeHtml(item.tool)} ${escapeHtml(item.teaches)} ${escapeHtml(item.when)}">
              <summary>
                <div class="card-head">
                  ${logo(item, true)}
                  <div>
                    <h3>${escapeHtml(item.title)}</h3>
                    <span class="status-badge">${escapeHtml(item.tool)}</span>
                  </div>
                  <span class="card-disclosure" aria-hidden="true">+</span>
                </div>
              </summary>
              <p>${escapeHtml(item.teaches)}</p>
              <div class="field-grid">
                <div class="field-row"><span>Use when</span><b>${escapeHtml(item.when)}</b></div>
                <div class="field-row"><span>Saved by</span><b>${escapeHtml(item.savedBy)}</b></div>
                <div class="field-row"><span>Date</span><b>${escapeHtml(item.date)}</b></div>
              </div>
              <div class="card-footer">
                <a class="open-link" href="${escapeHtml(item.link)}">Open Ref</a>
              </div>
            </details>
          `
        )
        .join("")
    );
  }

  function renderTeam() {
    setHtml(
      "teamGrid",
      data.people
        .map(
          (item) => `
            <article class="person-card searchable" data-search="${escapeHtml(item.name)} ${escapeHtml(item.role)} ${escapeHtml(item.responsibility)}">
              <div class="card-head">
                <div>
                  <h3>${escapeHtml(item.name)}</h3>
                  <p>${escapeHtml(item.role)}</p>
                </div>
                ${logo(item, true)}
              </div>
              <div class="field-grid">
                <div class="field-row"><span>Lane</span><b>${escapeHtml(item.responsibility)}</b></div>
                <div class="field-row"><span>Priority</span><b>${escapeHtml(item.priority)}</b></div>
                <div class="field-row"><span>Blockers</span><b>${escapeHtml(item.blockers)}</b></div>
                <div class="field-row"><span>Growth</span><b>${escapeHtml(item.growth)}</b></div>
              </div>
              <div class="person-question">${escapeHtml(item.question)}</div>
              <div class="card-footer">
                <a class="open-link" href="${escapeHtml(item.report)}">EOD Report</a>
              </div>
            </article>
          `
        )
        .join("")
    );
  }

  function renderPricing() {
    setHtml(
      "pricingGrid",
      data.pricing
        .map(
          (group) => `
            <article class="pricing-card searchable" data-search="${escapeHtml(group.group)}">
              <div class="card-head">
                <h3>${escapeHtml(group.group)}</h3>
                ${logo(group, true)}
              </div>
              <ul>
                ${group.items
                  .map(
                    ([label, price]) => `
                      <li>
                        <span>${escapeHtml(label)}</span>
                        <b>${escapeHtml(price)}</b>
                      </li>
                    `
                  )
                  .join("")}
              </ul>
            </article>
          `
        )
        .join("")
    );
    setHtml(
      "pricingRules",
      data.pricingRules
        .map(
          (item, index) => `
            <li>
              <span>${index + 1}</span>
              <strong>${escapeHtml(item)}</strong>
            </li>
          `
        )
        .join("")
    );
  }

  function renderDrive() {
    setHtml(
      "folderGrid",
      data.driveFolders
        .map(
          (item) => `
            <article class="folder-card searchable" data-search="${escapeHtml(item.code)} ${escapeHtml(item.name)} ${escapeHtml(item.detail)}">
              ${logo(item, true)}
              <div>
                <h3>${escapeHtml(item.code)}_${escapeHtml(item.name)}</h3>
                <p>${escapeHtml(item.detail)}</p>
              </div>
            </article>
          `
        )
        .join("")
    );
  }

  function renderReports() {
    setHtml(
      "reportGrid",
      data.reports
        .map(
          (item) => `
            <article class="report-card searchable" data-search="${escapeHtml(item.title)} ${escapeHtml(item.owner)}">
              <div>
                <div class="card-head">
                  <div>
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.owner)}</p>
                  </div>
                  ${logo(item, true)}
                </div>
                <ul class="prompt-list">
                  ${item.prompts
                    .map(
                      (prompt, index) => `
                        <li>
                          <span>${index + 1}</span>
                          <strong>${escapeHtml(prompt)}</strong>
                        </li>
                      `
                    )
                    .join("")}
                </ul>
              </div>
              <div class="card-footer">${statusBadge("Template")}</div>
            </article>
          `
        )
        .join("")
    );
  }

  function wireSearch() {
    const input = byId("portalSearch");
    if (!input) return;

    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      document.body.classList.toggle("is-searching", Boolean(query));
      document.querySelectorAll(".searchable").forEach((node) => {
        const text = `${node.textContent} ${node.getAttribute("data-search") || ""}`.toLowerCase();
        node.classList.toggle("is-hidden", Boolean(query) && !text.includes(query));
      });
    });
  }

  function setSectionOpen(section, shouldOpen) {
    if (!section || section.id === "dashboard") return;
    section.classList.toggle("is-open", shouldOpen);
    section.classList.toggle("is-collapsed", !shouldOpen);
    const button = section.querySelector("[data-section-toggle]");
    if (button) {
      button.textContent = shouldOpen ? "Close" : "Open";
      button.setAttribute("aria-expanded", String(shouldOpen));
    }
  }

  function enhanceSections() {
    document.querySelectorAll(".portal-section").forEach((section) => {
      if (section.id === "dashboard" || section.dataset.enhanced === "true") return;
      const heading = section.querySelector(".section-heading");
      if (!heading) return;

      const body = document.createElement("div");
      body.className = "section-body";
      while (heading.nextSibling) {
        body.appendChild(heading.nextSibling);
      }
      section.appendChild(body);

      const button = document.createElement("button");
      button.type = "button";
      button.className = "section-toggle";
      button.setAttribute("data-section-toggle", "");
      button.setAttribute("aria-expanded", "false");
      button.textContent = "Open";
      heading.appendChild(button);

      button.addEventListener("click", () => {
        setSectionOpen(section, !section.classList.contains("is-open"));
      });

      section.dataset.enhanced = "true";
      setSectionOpen(section, false);
    });
  }

  function openHashSection(hash) {
    const id = String(hash || "").replace("#", "");
    const section = byId(id);
    if (!section) return;
    setSectionOpen(section, true);
  }

  function wireHashOpeners() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      openHashSection(link.getAttribute("href"));
    });
  }

  function wireNavState() {
    const links = Array.from(document.querySelectorAll("[data-nav-link]"));
    const sections = links
      .map((link) => byId(link.getAttribute("data-nav-link")))
      .filter(Boolean);

    links.forEach((link) => {
      link.addEventListener("click", () => {
        openHashSection(`#${link.getAttribute("data-nav-link")}`);
      });
    });

    if (!("IntersectionObserver" in window)) {
      if (links[0]) links[0].classList.add("is-active");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("data-nav-link") === entry.target.id);
          });
        });
      },
      { rootMargin: "-35% 0px -58% 0px", threshold: 0.01 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function render() {
    const brandLogo = byId("brandLogo");
    if (brandLogo) {
      brandLogo.src = data.brand.logo;
      brandLogo.alt = `${data.brand.name} logo`;
    }

    setHtml("brandName", escapeHtml(data.brand.name));
    setHtml("brandSubtitle", escapeHtml(data.brand.subtitle));
    setHtml("heroTitle", escapeHtml(data.brand.pageTitle));
    setHtml("heroMantra", escapeHtml(data.brand.mantra));
    setHtml("logoCloud", renderLogoCloud());

    renderNav();
    renderQuickActions();
    renderMetrics();
    renderAttention();
    renderPriorities();
    renderCommandCards("operatingSystemGrid", data.operatingSystem);
    renderCommandCards("salesCards", data.salesCards);
    renderCommandCards("fulfillmentCards", data.fulfillmentCards);
    renderContentStats();
    renderCommandCards("contentCards", data.contentCards);
    renderSops();
    renderTutorials();
    renderTeam();
    renderPricing();
    renderDrive();
    renderReports();

    setHtml("salesLoop", loopDiagram("sales"));
    setHtml("fulfillmentLoop", loopDiagram("fulfillment"));
    setHtml("contentLoop", loopDiagram("content"));
    setHtml("teamLoop", loopDiagram("team"));
    setHtml("systemsLoop", loopDiagram("systems"));
    setHtml("brandLoop", loopDiagram("brand"));
    setHtml("financeLoop", loopDiagram("finance"));

    wireSearch();
    enhanceSections();
    wireHashOpeners();
    wireNavState();
    if (window.location.hash) openHashSection(window.location.hash);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
