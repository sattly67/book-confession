/* ==========================================================================
   animation.js — helper animasi ambient (debu, hujan)
   Dipakai berulang di banyak scene, jadi disatukan di sini.
   ========================================================================== */

const AmbientFX = {
  /**
   * Menaburkan partikel debu melayang di dalam sebuah container.
   * @param {HTMLElement} container
   * @param {number} count
   */
  spawnDust(container, count = 18) {
    if (!container) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const mote = document.createElement('span');
      mote.className = 'dust-mote';
      const size = (Math.random() * 2.5 + 1.5).toFixed(1);
      const left = (Math.random() * 100).toFixed(1);
      const duration = (Math.random() * 8 + 10).toFixed(1);
      const delay = (Math.random() * 10).toFixed(1);
      const dx = (Math.random() * 40 - 20).toFixed(0);
      const opacity = (Math.random() * 0.35 + 0.15).toFixed(2);

      mote.style.setProperty('--size', `${size}px`);
      mote.style.setProperty('--duration', `${duration}s`);
      mote.style.setProperty('--delay', `${delay}s`);
      mote.style.setProperty('--dx', `${dx}px`);
      mote.style.setProperty('--o', opacity);
      mote.style.left = `${left}%`;

      frag.appendChild(mote);
    }
    container.appendChild(frag);
  },

  /**
   * Menaburkan garis hujan tipis di dalam sebuah container.
   * @param {HTMLElement} container
   * @param {number} count
   */
  spawnRain(container, count = 40) {
    if (!container) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const drop = document.createElement('span');
      drop.className = 'rain-drop';
      const left = (Math.random() * 100).toFixed(1);
      const len = (Math.random() * 30 + 25).toFixed(0);
      const duration = (Math.random() * 0.6 + 0.9).toFixed(2);
      const delay = (Math.random() * 2).toFixed(2);

      drop.style.left = `${left}%`;
      drop.style.setProperty('--len', `${len}px`);
      drop.style.setProperty('--duration', `${duration}s`);
      drop.style.setProperty('--delay', `${delay}s`);

      frag.appendChild(drop);
    }
    container.appendChild(frag);
  },

  /** Membersihkan seluruh partikel dari sebuah container. */
  clear(container) {
    if (container) container.innerHTML = '';
  },
};
