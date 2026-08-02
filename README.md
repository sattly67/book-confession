# Di Antara Lembar yang Tak Pernah Kuberikan

Novel interaktif satu halaman, dibangun bertahap. HTML/CSS/JS murni, tanpa framework.

## Status saat ini

Fondasi sudah jadi:
- Struktur folder lengkap
- Sistem scene (loading → cover), tinggal tambah scene baru di `App.scenes` (js/main.js)
- Objek buku (sampul, halaman, lilin) dengan animasi buka sampul
- Ambience: debu melayang, hujan (helper siap pakai di `js/animation.js`), musik dengan fade in/out
- Data cerita terpisah dari markup di `js/story.js`

## Yang belum

Halaman 2–9 dan ending. Setiap halaman baru akan ditambahkan sebagai `<section class="scene" data-scene="...">` baru di `index.html`, teksnya didaftarkan di `js/story.js`, dan namanya ditambahkan ke `App.scenes` di `js/main.js`.

## Cara buka

Buka `index.html` langsung di browser, atau jalankan local server (misal `python -m http.server`) supaya file audio bisa dimuat dengan benar.

## Catatan

Taruh file musik ambience (piano lembut + hujan) di `assets/audio/ambience.mp3`. Tanpa file itu, tombol musik tetap berfungsi tapi tidak ada suara.
