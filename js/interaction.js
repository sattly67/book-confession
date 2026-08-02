/* ==========================================================================
   interaction.js — interaksi lintas-halaman: efek tinta menulis (typewriter)
   Halaman 2 (Prolog) dan Halaman 6 (Tentang Ketulusan) akan memakai ini.
   ========================================================================== */

const InkWriter = {
  /**
   * Menulis teks karakter demi karakter ke dalam sebuah elemen,
   * meniru efek tinta yang sedang dituliskan tangan.
   * @param {HTMLElement} el
   * @param {string} text
   * @param {{speed?: number, onDone?: Function}} options
   */
  write(el, text, { speed = 38, onDone } = {}) {
    if (!el) return;
    el.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'ink-cursor';

    let i = 0;
    const tick = () => {
      el.textContent = text.slice(0, i);
      el.appendChild(cursor);
      i += 1;
      if (i <= text.length) {
        setTimeout(tick, speed);
      } else if (onDone) {
        onDone();
      }
    };
    tick();
  },
};
