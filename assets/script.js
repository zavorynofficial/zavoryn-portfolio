(() => {
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
    }));
  }

  document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());

  const progress = document.querySelector(".progress");
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : "0%";
  };
  window.addEventListener("scroll", updateProgress, {passive:true});
  updateProgress();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .08});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const filters = document.querySelectorAll(".filter");
  const items = document.querySelectorAll(".portfolio-item");
  if (filters.length && items.length) {
    filters.forEach(btn => btn.addEventListener("click", () => {
      filters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      items.forEach(item => {
        const show = filter === "all" || item.dataset.category.split(" ").includes(filter);
        item.classList.toggle("hidden", !show);
      });
    }));
  }

  const form = document.querySelector("#contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const business = String(data.get("business") || "").trim();
      const email = String(data.get("email") || "").trim();
      const country = String(data.get("country") || "").trim();
      const service = String(data.get("service") || "").trim();
      const timeline = String(data.get("timeline") || "").trim();
      const message = String(data.get("message") || "").trim();

      if (!name || !email || !service || !message) {
        form.reportValidity();
        return;
      }

      const subject = encodeURIComponent(`Project enquiry — ${business || name}`);
      const body = encodeURIComponent(
`Hello Zavoryn,

I'd like to discuss a project.

Name: ${name}
Business: ${business || "Not provided"}
Email: ${email}
Country: ${country || "Not provided"}
Service: ${service}
Preferred timeline: ${timeline || "Not provided"}

Project details:
${message}

Sent from the Zavoryn website.`
      );

      window.location.href = `mailto:zavoryn@outlook.com?subject=${subject}&body=${body}`;
      const success = form.querySelector(".form-success");
      if (success) success.hidden = false;
    });
  }
})();