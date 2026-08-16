(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const year = document.querySelector("[data-year]");

  if (year) year.textContent = new Date().getFullYear();

  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => document.body.classList.remove("nav-open"));
  });

  window.addEventListener("scroll", () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
  });

  document.querySelectorAll(".acc-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const open = panel.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  const pairToggle = document.querySelectorAll("input[name='art']");
  const pairFields = document.querySelector(".pair-fields");
  pairToggle.forEach((input) => {
    input.addEventListener("change", () => {
      if (!pairFields) return;
      pairFields.hidden = input.value !== "Paarmitglied";
    });
  });

  const pages = [
    { href: "index.html", title: "Startseite", text: "Robehuuse Quartierverein Wuchemärt Anlässe" },
    { href: "ueber-uns.html", title: "Über uns", text: "Vorstand Geschichte Lukas Küng Bea Hartmeier Einzugsgebiet Vereine" },
    { href: "historisches.html", title: "Historisches", text: "Eckdaten Ried Wappen Schule Post Konsum Brunnen Mühle Messikommer" },
    { href: "videos.html", title: "Videos Robenhausen", text: "YouTube Wuchemärt Messikommer Küfer Berli Turpestafette" },
    { href: "vergangenheit.html", title: "Aus der näheren Vergangenheit", text: "Tempo 30 Post UNESCO Pfahlbauer" },
    { href: "rueckblick.html", title: "Rückblick", text: "Tavolata Seniorennachmittag Chlausmärt Suurchruute Quiz Flohmärt" },
    { href: "wuchemaert.html", title: "Wuchemärt", text: "Rössliplatz Samstag Marktsaison Standvermietung" },
    { href: "marktfahrer.html", title: "Marktfahrer", text: "Montanari Guyer Müller Polsini Kafi Feister" },
    { href: "maerthelfer.html", title: "Märthelfer gesucht", text: "Aufbau Abbau CHF 40 Patrick Rüegg" },
    { href: "anlaesse.html", title: "Anlässe", text: "Ostermärt Suurchruute Tatort Littering Jahresprogramm" },
    { href: "veranstaltung-einreichen.html", title: "Veranstaltung einreichen", text: "Öffentliche Veranstaltung publizieren" },
    { href: "mitmachen.html", title: "Mitmachen", text: "Mitgliedschaft CHF 25 Ehrenmitglieder" },
    { href: "newsletter.html", title: "Newsletter", text: "Anlässe Neuigkeiten E-Mail" },
    { href: "links.html", title: "Links", text: "FAGERO Theater Viva Wetzipedia Wetzikon Restaurants" },
    { href: "kontakt.html", title: "Kontakt", text: "IBAN Adresse Formular" },
  ];

  const searchInput = document.querySelector("[data-search]");
  const searchResults = document.querySelector("[data-search-results]");
  if (searchInput && searchResults) {
    const render = (query) => {
      const q = query.trim().toLowerCase();
      const hits = q
        ? pages.filter((page) => `${page.title} ${page.text}`.toLowerCase().includes(q))
        : pages;
      searchResults.innerHTML = hits
        .map((page) => `<a href="${page.href}"><strong>${page.title}</strong></a>`)
        .join("") || "<p>Keine Treffer.</p>";
    };
    searchInput.addEventListener("input", () => render(searchInput.value));
    render("");
  }

  document.querySelectorAll("form[data-enhance]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const success = form.querySelector(".form-success");
      const payload = new FormData(form);
      try {
        await fetch(form.action, {
          method: "POST",
          body: payload,
          headers: { Accept: "application/json" },
        });
        form.reset();
        if (pairFields) pairFields.hidden = true;
        if (success) success.classList.add("is-visible");
      } catch {
        form.submit();
      }
    });
  });
})();
