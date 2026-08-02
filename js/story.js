/* ==========================================================================
   story.js — sumber teks cerita, terpisah dari markup
   Setiap chapter baru cukup ditambahkan di sini, lalu di-render oleh book.js
   ========================================================================== */

const STORY = {
  meta: {
    title: 'Di Antara Lembar yang Tak Pernah Kuberikan',
    subtitle: 'Sebuah Novel Interaktif Tentang Keberanian Untuk Jujur',
  },

  // 0 — layar loading
  loading: {
    label: 'membuka lembaran pertama…',
  },

  // Halaman 1 — cover
  cover: {
    dedication:
      'Untuk seseorang yang mungkin tidak pernah menyadari bahwa namanya pernah memenuhi begitu banyak halaman dalam hidupku.',
    cta: 'Buka Buku',
  },

  // Halaman-halaman berikutnya akan ditambahkan bertahap:
  // prolog, pertemuan, halHalKecil, tidakPernahKauKetahui,
  // tentangKetulusan, surat, pengakuan, pertanyaan, ending
};
