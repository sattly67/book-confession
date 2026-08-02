/* ==========================================================================
   scroll.js — utilitas scroll & reveal-on-scroll
   Dipakai mulai dari Halaman 2 (Prolog) dan seterusnya, yang punya
   scroll panjang di dalam satu chapter.
   ========================================================================== */

const ScrollFX = {
  /**
   * Mengamati elemen dan menambahkan class saat elemen masuk viewport,
   * dipakai untuk reveal teks/paragraf secara bertahap saat pembaca scroll.
   * @param {string} selector
   * @param {string} activeClass
   */
  observeReveal(selector, activeClass = 'fade-in-up') {
    const items = document.querySelectorAll(selector);
    if (!items.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(activeClass);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    items.forEach((el) => io.observe(el));
  },

  /** Scroll halus ke sebuah elemen di dalam container tertentu. */
  scrollIntoView(el, options = { behavior: 'smooth', block: 'center' }) {
    if (el) el.scrollIntoView(options);
  },
};
