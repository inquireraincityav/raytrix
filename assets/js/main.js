// RAYTR!X — global behaviors
// Nav scroll state, mobile menu, IntersectionObserver reveals, video lightbox, booking form.

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

  // -------- VIDEO LIGHTBOX --------
  // Any element with [data-video="url.mp4"], [data-youtube="ID"] or [data-vimeo="ID"]
  // opens a full-screen player. Escape / backdrop click / X closes.
  let lb = document.querySelector(".lightbox");
  if (!lb) {
    lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = '<div class="lightbox__frame"></div><button class="lightbox__close" aria-label="Close"></button>';
    document.body.appendChild(lb);
  }
  const frame = lb.querySelector(".lightbox__frame");
  const closeBtn = lb.querySelector(".lightbox__close");

  const openLightbox = (html) => {
    frame.innerHTML = html;
    lb.classList.add("is-open");
    document.body.classList.add("lightbox-open");
  };
  const closeLightbox = () => {
    lb.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
    setTimeout(() => { frame.innerHTML = ""; }, 400);
  };

  closeBtn.addEventListener("click", closeLightbox);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-video], [data-youtube], [data-vimeo]");
    if (!trigger) return;
    e.preventDefault();
    const src = trigger.dataset.video;
    const yt  = trigger.dataset.youtube;
    const vim = trigger.dataset.vimeo;
    if (src) openLightbox(`<video src="${src}" controls autoplay playsinline></video>`);
    else if (yt) openLightbox(`<iframe src="https://www.youtube.com/embed/${yt}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`);
    else if (vim) openLightbox(`<iframe src="https://player.vimeo.com/video/${vim}?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`);
  });

  // -------- BOOKING FORM (mailto handoff) --------
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
