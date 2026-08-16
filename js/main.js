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
