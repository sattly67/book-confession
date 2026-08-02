/* ==========================================================================
   book.js — interaksi fisik objek buku (membuka sampul)
   ========================================================================== */

const BookInteraction = {
  /**
   * Memicu animasi membuka sampul, lalu memindahkan ke scene berikutnya
   * setelah animasi selesai (durasi harus sinkron dengan animation.css).
   * @param {HTMLElement} bookEl
   * @param {Function} onOpened
   */
  open(bookEl, onOpened) {
    if (!bookEl || bookEl.classList.contains('is-opening')) return;
    bookEl.classList.add('is-opening');

    const cover = bookEl.querySelector('.book__cover');
    const handleEnd = () => {
      cover.removeEventListener('animationend', handleEnd);
      if (onOpened) onOpened();
    };
    cover.addEventListener('animationend', handleEnd);
  },
};
