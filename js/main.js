/* ==========================================================================
   main.js — pengontrol utama aplikasi
   Mengatur urutan scene (loading → cover → …), menyambungkan
   audio, partikel, dan interaksi buku. Halaman-halaman berikutnya
   akan didaftarkan di App.scenes seiring dibangun bertahap.
   ========================================================================== */

const App = {
  // Urutan scene akan bertambah panjang seiring halaman baru dibangun.
  scenes: ['loading', 'cover'],
  currentIndex: 0,

  els: {},

  init() {
    this.els.scenes = Array.from(document.querySelectorAll('.scene'));
    this.els.chrome = document.querySelector('.chrome');
    this.els.musicToggle = document.querySelector('.music-toggle');
    this.els.progressDots = Array.from(document.querySelectorAll('.progress-indicator__dot'));
    this.els.book = document.querySelector('.book');

    this.renderStoryText();
    this.bindMusicToggle();
    this.bindBookOpen();
    this.runLoadingSequence();
  },

  renderStoryText() {
    const dedication = document.querySelector('[data-story="cover-dedication"]');
    if (dedication) dedication.textContent = STORY.cover.dedication;

    const cta = document.querySelector('[data-story="cover-cta"]');
    if (cta) cta.textContent = STORY.cover.cta;

    const loadingLabel = document.querySelector('[data-story="loading-label"]');
    if (loadingLabel) loadingLabel.textContent = STORY.loading.label;
  },

  goTo(sceneName) {
    const index = this.scenes.indexOf(sceneName);
    if (index === -1) return;
    this.currentIndex = index;

    this.els.scenes.forEach((el) => {
      el.classList.toggle('is-active', el.dataset.scene === sceneName);
    });

    this.updateProgress();

    const sceneEl = this.els.scenes.find((el) => el.dataset.scene === sceneName);
    const particleContainer = sceneEl ? sceneEl.querySelector('.scene__particles') : null;
    if (particleContainer && !particleContainer.dataset.seeded) {
      AmbientFX.spawnDust(particleContainer, 16);
      particleContainer.dataset.seeded = 'true';
    }
  },

  updateProgress() {
    if (!this.els.progressDots.length) return;
    this.els.progressDots.forEach((dot, i) => {
      dot.classList.toggle('is-current', i === this.currentIndex);
    });
  },

  runLoadingSequence() {
    this.goTo('loading');
    const loadingParticles = document.querySelector('[data-scene="loading"] .scene__particles');
    AmbientFX.spawnDust(loadingParticles, 22);

    // ~5 detik sesuai brief: buku muncul perlahan, lalu berpindah ke cover.
    setTimeout(() => {
      this.goTo('cover');
      this.els.chrome.classList.add('is-visible');
      AmbientAudio.play();
    }, 5000);
  },

  bindMusicToggle() {
    if (!this.els.musicToggle) return;
    this.els.musicToggle.addEventListener('click', () => {
      const nowPlaying = AmbientAudio.toggle();
      this.els.musicToggle.setAttribute('aria-pressed', String(nowPlaying));
      const label = this.els.musicToggle.querySelector('.ui-label');
      if (label) label.textContent = nowPlaying ? 'Musik menyala' : 'Hidupkan Musik';
    });
  },

  bindBookOpen() {
    if (!this.els.book) return;
    this.els.book.addEventListener('click', () => {
      BookInteraction.open(this.els.book, () => {
        // Fondasi berhenti di sini — Halaman 2 (Prolog) akan mengambil alih
        // scene berikutnya begitu dibangun pada tahap selanjutnya.
        console.info('Sampul terbuka. Menunggu Halaman 2 — Prolog dibangun.');
      });
    });
  },
};

document.addEventListener('DOMContentLoaded', () => App.init());
