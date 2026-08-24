// RAYTR!X — global behaviors
// Nav scroll state, fullscreen menu, IntersectionObserver reveals,
// video lightbox (MP4 / YouTube / Vimeo), booking form.

(function () {
  // -------- NAV SCROLL STATE --------
  const nav = document.querySelector(".nav");
  const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // -------- FULLSCREEN MENU --------
  const menuBtn = document.querySelector(".nav__menu");
  const menuOverlay = document.querySelector(".menu-overlay");
  if (menuBtn) menuBtn.addEventListener("click", () => document.body.classList.toggle("menu-open"));
  if (menuOverlay) {
    menuOverlay.addEventListener("click", (e) => {
      if (e.target === menuOverlay) document.body.classList.remove("menu-open");
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.body.classList.remove("menu-open");
      closeLightbox();
    }
  });

  // -------- REVEAL ON SCROLL --------
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
  );
  document.querySelectorAll(".reveal, .reveal-lines").forEach((el) => io.observe(el));

  // -------- VIDEO LIGHTBOX --------
  // Any element with [data-video="url.mp4"], [data-youtube="ID"] or
  // [data-vimeo="ID"] opens a full-screen player. An element with none of
  // those (a placeholder tile) shows a friendly "media coming soon" note
  // instead, so the page stays honest about what's wired up.
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
  function closeLightbox() {
    if (!lb.classList.contains("is-open")) return;
    lb.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
    setTimeout(() => { frame.innerHTML = ""; }, 400);
  }

  closeBtn.addEventListener("click", closeLightbox);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });

  // Instagram's oEmbed widget script — loaded once, lazily, only if a
  // data-instagram trigger is actually clicked.
  let igScriptPromise = null;
  const loadInstagramEmbed = () => {
    if (window.instgrm) return Promise.resolve();
    if (igScriptPromise) return igScriptPromise;
    igScriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://www.instagram.com/embed.js";
      s.async = true;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });
    return igScriptPromise;
  };

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-video], [data-youtube], [data-vimeo], [data-instagram], .reel, .video-card, .featured__media, .gallery figure.is-video");
    if (!trigger) return;
    e.preventDefault();
    const src = trigger.dataset.video;
    const yt  = trigger.dataset.youtube;
    const vim = trigger.dataset.vimeo;
    const ig  = trigger.dataset.instagram;
    frame.classList.toggle("lightbox__frame--tall", !!ig);
    if (src) {
      openLightbox(`<video src="${src}" controls autoplay playsinline></video>`);
    } else if (yt) {
      openLightbox(`<iframe src="https://www.youtube.com/embed/${yt}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`);
    } else if (vim) {
      openLightbox(`<iframe src="https://player.vimeo.com/video/${vim}?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`);
    } else if (ig) {
      openLightbox(
        `<blockquote class="instagram-media" data-instgrm-permalink="${ig}" data-instgrm-version="14" style="margin:0; width:100%; height:100%;"></blockquote>`
      );
      loadInstagramEmbed()
        .then(() => window.instgrm && window.instgrm.Embeds.process())
        .catch(() => openLightbox('<div class="lightbox__note"><div><span class="big">Couldn\'t load Instagram</span>Open the reel directly: <a href="' + ig + '" target="_blank" rel="noopener" style="color:#fff;text-decoration:underline;">' + ig + "</a></div></div>"));
    } else {
      openLightbox(
        '<div class="lightbox__note"><div><span class="big">Video coming soon</span>' +
        'Drop the source into <span class="accent">data-video</span>, <span class="accent">data-youtube</span>, or <span class="accent">data-vimeo</span> on this element.</div></div>'
      );
    }
  });

  // -------- HERO SOUND TOGGLE --------
  const soundBtn = document.querySelector(".hero__sound");
  if (soundBtn) {
    let muted = true;
    soundBtn.addEventListener("click", () => {
      muted = !muted;
      const v = document.querySelector(".hero__video video");
      if (v) v.muted = muted;
      soundBtn.setAttribute("aria-label", muted ? "Unmute" : "Mute");
      soundBtn.innerHTML = muted
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9 h4 l5 -4 v14 l-5 -4 H4 z"/><line x1="16" y1="8" x2="21" y2="16"/><line x1="21" y1="8" x2="16" y2="16"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9 h4 l5 -4 v14 l-5 -4 H4 z"/><path d="M17 8 a5 5 0 0 1 0 8"/><path d="M20 5 a9 9 0 0 1 0 14"/></svg>';
    });
  }

  // -------- BOOKING FORM (mailto handoff — swap for Formspree/Netlify later) --------
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

  // -------- FOOTER YEAR --------
  const yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();
})();
