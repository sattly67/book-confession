/* ==========================================================================
   audio.js — musik ambience (piano lembut + hujan), fade in/out, volume kecil
   Taruh file musik di assets/audio/ambience.mp3 — sampai file itu ada,
   tombol tetap berfungsi sebagai toggle state tanpa memutar apa pun.
   ========================================================================== */

const AmbientAudio = (() => {
  const TARGET_VOLUME = 0.22;
  const FADE_STEP_MS = 60;

  let audioEl = null;
  let isPlaying = false;
  let fadeTimer = null;

  function ensureElement() {
    if (audioEl) return audioEl;
    audioEl = new Audio('assets/audio/ambience.mp3');
    audioEl.loop = true;
    audioEl.volume = 0;
    audioEl.preload = 'auto';
    return audioEl;
  }

  function clearFade() {
    if (fadeTimer) {
      clearInterval(fadeTimer);
      fadeTimer = null;
    }
  }

  function fadeTo(target, duration = 1800) {
    clearFade();
    const el = ensureElement();
    const steps = Math.max(1, Math.round(duration / FADE_STEP_MS));
    const start = el.volume;
    const delta = (target - start) / steps;
    let step = 0;

    fadeTimer = setInterval(() => {
      step += 1;
      el.volume = Math.min(1, Math.max(0, start + delta * step));
      if (step >= steps) {
        el.volume = target;
        clearFade();
        if (target === 0) el.pause();
      }
    }, FADE_STEP_MS);
  }

  return {
    isPlaying: () => isPlaying,

    async play() {
      const el = ensureElement();
      try {
        await el.play();
        isPlaying = true;
        fadeTo(TARGET_VOLUME);
      } catch (err) {
        // Browser mungkin memblokir autoplay sebelum interaksi pengguna;
        // ini wajar dan akan berhasil begitu tombol musik ditekan.
        console.info('Musik menunggu interaksi pengguna sebelum bisa diputar.');
      }
    },

    pause() {
      isPlaying = false;
      fadeTo(0, 900);
    },

    toggle() {
      if (isPlaying) {
        this.pause();
      } else {
        this.play();
      }
      return isPlaying;
    },
  };
})();
