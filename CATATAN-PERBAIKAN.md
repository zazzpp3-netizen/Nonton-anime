# Catatan Perbaikan — AnimeOtaku (Vercel)

## Bug yang sudah dibenerin
1. `api/auth/google.js` — Client ID Google sebelumnya ditulis langsung jadi
   properti `process.env` yang invalid (`process.env.19161840368-...`).
   Sudah diganti pakai `process.env.GOOGLE_CLIENT_ID` yang benar.
2. `package.json` — ditambahkan `"type": "module"` supaya `import`/`export`
   di `api/auth/google.js` bisa jalan di Vercel.
3. `vercel.json` — rewrite rule untuk path rahasia sudah diaktifkan dan
   JSON-nya diperbaiki (sebelumnya ada `{{` dobel yang bikin invalid).
4. `index.html` dipindah ke root repo (sebelumnya di dalam folder
   `project /` yang ada spasinya — Vercel nggak otomatis nemuin file di
   situ sebagai halaman utama).
5. Login Google sekarang beneran diverifikasi ke `api/auth/google.js` di
   server (sebelumnya cuma di-decode di browser, endpoint server-nya
   nggak pernah dipanggil).

## WAJIB diisi di Vercel (Project Settings → Environment Variables)

- `GOOGLE_CLIENT_ID` = `19161840368-lodj5j4fiv5nnfb2kphc9gcavsi9qn7i.apps.googleusercontent.com`
- `OWNER_EMAIL` = alamat Gmail kamu sendiri (yang dipakai buat login Google).
  Ini yang nentuin siapa yang otomatis dapat role **Developer** — dicek di
  server (`api/auth/google.js`), jadi orang lain nggak bisa akal-akalin
  dari browser.

Tanpa dua env var ini, login Google & penentuan role developer nggak akan
jalan dengan benar walau kode-nya sudah bener.

## Belum diisi — perlu domain tunnel kamu

Di `vercel.json`, bagian `destination` masih:

```
https://GANTI_DENGAN_DOMAIN_TUNNEL_KAMU/Developer/codex/zazz/vidio/server/:path*
```

Ini perlu diganti ke domain publik yang beneran nyambung ke laptop/HDD
kamu (misalnya lewat Cloudflare Tunnel atau layanan sejenis) — laptop
yang cuma nyambung ke WiFi rumah nggak akan bisa diakses dari internet
tanpa itu. Kalau belum ada domain tunnel-nya, bagian ini boleh dihapus
dulu dari `vercel.json` biar nggak bikin proses build/deploy bingung,
nanti tinggal ditambah lagi pas domainnya udah siap.

## Cara akses Admin Panel

Buka: `https://nonton-anime-otaku.vercel.app/#/Developer/codex/zazz/vidio/server`

Panel ini cuma kebuka penuh kalau kamu login Google pakai email yang
sama dengan `OWNER_EMAIL`. Selain itu, kamu juga perlu masukkan password
backend (yang ada di `.env` server Node.js kamu) buat konek ke server
video/HDD-nya.
