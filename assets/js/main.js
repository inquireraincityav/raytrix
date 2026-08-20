// RAYTR!X — global behaviors
// Nav scroll state, mobile menu, IntersectionObserver reveals, booking form.

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
    burger.addEventListener("click", () => document.body.classList.toggle("menu-open"));
    document.querySelectorAll(".nav__links a").forEach((a) =>
      a.addEventListener("click", () => document.body.classList.remove("menu-open"))
    );
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  document.querySelectorAll(".reveal, .reveal-lines").forEach((el) => io.observe(el));

  // Booking form → mailto handoff. Swap to a real endpoint (Formspree, Basin,
  // Netlify Forms) when we're ready to capture leads server-side.
  const form = document.querySelector("#bookingForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const subject = encodeURIComponent(`Booking Inquiry — ${d.get("name") || "New enquiry"}`);
      const body = encodeURIComponent(
        [
          `Name: ${d.get("name") || ""}`,
          `Email: ${d.get("email") || ""}`,
          `Phone: ${d.get("phone") || ""}`,
          `Event type: ${d.get("eventType") || ""}`,
          `Event date: ${d.get("date") || ""}`,
          `Location: ${d.get("location") || ""}`,
          `Budget: ${d.get("budget") || ""}`,
          "",
          "Details:",
          d.get("message") || "",
        ].join("\n")
      );
      window.location.href = `mailto:raytrixofficial@gmail.com?subject=${subject}&body=${body}`;
      const msg = form.querySelector(".msg");
      if (msg) msg.classList.add("show");
    });
  }
})();
