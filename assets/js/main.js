// RAYTR!X — global behaviors
// Nav scroll state, mobile menu, IntersectionObserver reveals, contact form stub.

(function () {
  const nav = document.querySelector(".nav");
  const burger = document.querySelector(".nav__burger");

  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (burger) {
    burger.addEventListener("click", () => {
      document.body.classList.toggle("menu-open");
    });
    document.querySelectorAll(".nav__links a").forEach((a) => {
      a.addEventListener("click", () => document.body.classList.remove("menu-open"));
    });
  }

  // Reveal on scroll
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  document.querySelectorAll(".reveal, .reveal-lines").forEach((el) => io.observe(el));

  // Hero parallax on wordmark
  const wordmark = document.querySelector(".hero__wordmark");
  if (wordmark && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener(
      "scroll",
      () => {
        const y = Math.min(window.scrollY, 600);
        wordmark.style.transform = `translateY(${y * 0.18}px)`;
        wordmark.style.opacity = String(1 - y / 900);
      },
      { passive: true }
    );
  }

  // Contact form — currently a mailto handoff; wire to a real endpoint later.
  const form = document.querySelector("#bookingForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent(
        `Booking Inquiry — ${data.get("name") || "New enquiry"}`
      );
      const body = encodeURIComponent(
        [
          `Name: ${data.get("name") || ""}`,
          `Email: ${data.get("email") || ""}`,
          `Phone: ${data.get("phone") || ""}`,
          `Event type: ${data.get("eventType") || ""}`,
          `Event date: ${data.get("date") || ""}`,
          `Location: ${data.get("location") || ""}`,
          `Budget: ${data.get("budget") || ""}`,
          "",
          "Details:",
          data.get("message") || "",
        ].join("\n")
      );
      window.location.href = `mailto:raytrixofficial@gmail.com?subject=${subject}&body=${body}`;
      const msg = form.querySelector(".msg");
      if (msg) msg.classList.add("show");
    });
  }
})();
