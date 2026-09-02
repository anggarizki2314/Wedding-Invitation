# 💍 Website Undangan Pernikahan Online (Luxury & Modern)

Website undangan pernikahan digital berbasis web yang modern, elegan, responsif, ringan, dan **100% siap di-deploy secara GRATIS ke Vercel** tanpa memerlukan backend berbayar.

---

## 🌟 Fitur Utama & Arsitektur

- **✨ Desain Elegan & Mewah (Modern Romantic Wedding)**: Tipografi editorial (*Playfair Display*, *Cinzel*, *Alex Brush*, & *Plus Jakarta Sans*), aksen *champagne gold*, ornamen botani halus, dan kartu *glassmorphism*.
- **🚩 100% Modular (Feature Flags)**: Setiap fitur (musik, galeri, rsvp, ucapan, kado, qris, live stream, health protocol, dll.) dapat diaktifkan/dinonaktifkan secara independen hanya melalui `wedding.ts`.
- **✉️ Cover Pembuka & Personalisasi Nama Tamu Otomatis**: Mendukung parameter URL WhatsApp (contoh: `?to=Bapak+Joko+&+Keluarga`). Muncul transisi buka undangan dengan efek konfeti emas (*canvas-confetti*).
- **📲 Generator Link Tamu WhatsApp Khusus Mempelai**: Dilengkapi tombol mengambang untuk mengetik nama tamu, menyalin link khusus, dan langsung membagikan broadcast undangan via WhatsApp dalam 1-klik.
- **🔄 Abstraksi Provider RSVP & Wishes (Bisa Google Sheets Gratis)**: Mendukung `none` (LocalStorage fallback), `google-sheets` (Google Apps Script Web App gratis), atau `webhook` custom API.
- **🎵 Pemutar Musik Latar (Floating Vinyl Player)**: Piringan hitam berputar dengan visualizer gelombang suara, kontrol Play/Pause, dan Mute/Unmute.
- **⏳ Hitung Mundur Real-Time (Countdown Timer)**: Penghitung mundur hari, jam, menit, dan detik menuju akad nikah tanpa memory leak.
- **👰 Profil Kedua Mempelai (The Couple)**: Menampilkan foto berbingkai mewah, nama lengkap dengan gelar, nama panggilan, info orang tua, dan tautan Instagram.
- **📅 Rangkaian Acara (Akad & Resepsi)**: Dilengkapi tombol **Petunjuk Lokasi (Google Maps)** dan **Simpan ke Kalender (Google Calendar & iCal)**.
- **📖 Perjalanan Cinta (Our Love Story)**: Garis waktu (*vertical timeline*) kisah pertemuan hingga hari bahagia.
- **🖼️ Galeri Foto & Lightbox Interaktif**: Grid foto responsif dengan modal *fullscreen lightbox* (mendukung keyboard `ESC`, `ArrowLeft`, `ArrowRight`, dan sentuhan).
- **🎁 Tanda Kasih & Amplop Digital**: Rekening bank dengan tombol **Salin Nomor Rekening** satu-klik, pop-up QRIS pembayaran digital (opsional), serta alamat pengiriman kado fisik.
- **🛡️ Anti-Broken Image Fallback (`SafeImage`)**: Jika file foto belum dimasukkan atau gagal dimuat, sistem otomatis menampilkan placeholder monogram elegan.

---

## 🛠️ Tech Stack

- **Framework**: React 18 / 19
- **Bahasa**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Efek Konfeti**: Canvas-Confetti

---

## 🚀 Cara Menjalankan Project Secara Lokal

### 1. Prasyarat
Pastikan komputer Anda sudah terinstal **Node.js** (versi 18+).

### 2. Jalankan Dev Server
Buka terminal di folder project ini, lalu jalankan:

```bash
# 1. Install seluruh dependensi
npm install

# 2. Jalankan server pengembangan lokal
npm run dev
```

Buka browser di alamat:
```
http://localhost:3000/?to=Bapak+Joko+Wirowidjojo+%26+Keluarga
```

### 3. Build untuk Produksi
```bash
npm run build
```

---

## ⚙️ Cara Mengganti Seluruh Data Undangan (1 File Saja!)

Buka file:
📁 **`src/config/wedding.ts`**

### 1. Pengaturan Sakelar Fitur (Feature Flags)
```typescript
features: {
  music: true,             // Pemutar musik latar belakang
  quote: true,             // Ayat suci / kutipan romantis
  countdown: true,         // Hitung mundur waktu acara
  loveStory: true,         // Timeline kisah cinta
  gallery: true,           // Galeri foto & Lightbox
  rsvp: true,              // Formulir RSVP
  wishes: true,            // Buku tamu ucapan
  gift: true,              // Rekening bank
  qris: true,              // Pop-up QRIS (ubah ke false jika tidak ada QRIS)
  liveStream: false,       // Live streaming YouTube/Zoom (ubah ke true jika ada)
  healthProtocol: false,   // Protokol kesehatan & etiket
  guestLinkGenerator: true // Tool pembuat link WhatsApp untuk mempelai
}
```

### 2. Pengaturan Data Mempelai, Acara, & Rekening
Sesuaikan nama, tanggal, link Google Maps, dan nomor rekening di file yang sama (`src/config/wedding.ts`).

---

## 📊 Integrasi Google Sheets GRATIS untuk RSVP & Wishes (Opsional)

Jika Anda ingin data RSVP & ucapan tersimpan di Google Spreadsheet dan bisa dilihat oleh tamu lain secara live:

### Langkah 1: Buat Google Spreadsheet
1. Buka [Google Sheets](https://sheets.google.com/) dan buat spreadsheet baru.
2. Buat header di Baris 1:
   - Kolom A: `timestamp`
   - Kolom B: `name`
   - Kolom C: `attendance`
   - Kolom D: `guestCount`
   - Kolom E: `message`

### Langkah 2: Buat Apps Script
1. Di Google Sheets, klik menu **Extensions (Ekstensi)** -> **Apps Script**.
2. Hapus semua kode yang ada, lalu paste kode berikut:

```javascript
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rows = sheet.getDataRange().getValues();
  var data = [];
  
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][1]) {
      data.unshift({
        id: "gs-" + i,
        name: rows[i][1],
        attendance: rows[i][2] || "Hadir",
        message: rows[i][4] || "",
        time: "Baru saja"
      });
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var body = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    body.name,
    body.attendance,
    body.guestCount || 1,
    body.message
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Klik tombol **Deploy (Terapkan)** -> **New deployment (Penerapan baru)**.
4. Pilih tipe **Web app (Aplikasi web)**.
5. Pada bagian **Who has access (Siapa yang memiliki akses)**, pilih **Anyone (Siapa saja)**.
6. Klik **Deploy** dan salin **Web App URL** yang didapat.

### Langkah 3: Masukkan URL ke `src/config/wedding.ts`
```typescript
rsvp: {
  provider: "google-sheets",
  googleSheetsEndpoint: "https://script.google.com/macros/s/AKfycb.../exec",
  whatsappNumber: "6281234567890",
  maxGuestsPerRSVP: 4
}
```

---

## 📸 Standarisasi File Asset Foto (`public/images/`)

Cukup letakkan file foto Anda di folder `public/images/` dengan nama standar:
- `cover.jpg` : Foto utama sampul & latar belakang
- `groom.jpg` : Foto mempelai pria
- `bride.jpg` : Foto mempelai wanita
- `gallery-01.jpg` s/d `gallery-06.jpg` : Foto galeri prewedding
- `qris.png` : Gambar QRIS untuk amplop digital
- `og-preview.jpg` : Gambar thumbnail saat link dibagikan di WhatsApp

---

## 🎵 Cara Mengganti Musik

Ganti file:
📁 **`public/music/wedding-song.mp3`**

---

## 📲 Cara Membagikan Undangan via WhatsApp

Gunakan tool bawaan **"Bagikan Undangan"** yang muncul di pojok kiri bawah website, atau tambahkan parameter secara manual:

```text
https://website-undangan-anda.vercel.app/?to=Nama+Tamu
```

### Contoh:
- `https://website-undangan-anda.vercel.app/?to=Bapak+Joko+Wirowidjojo+&+Keluarga`
- `https://website-undangan-anda.vercel.app/?to=Sahabat+Dimas+Aditya`

---

## ☁️ Tutorial Deploy GRATIS ke Vercel

1. Buka [github.com](https://github.com/) dan buat repository baru (misal: `undangan-pernikahan`).
2. Jalankan perintah di terminal project Anda:
   ```bash
   git init
   git add .
   git commit -m "feat: luxury wedding invitation web app"
   git branch -M main
   git remote add origin https://github.com/USERNAME_ANDA/undangan-pernikahan.git
   git push -u origin main
   ```
3. Buka [vercel.com](https://vercel.com/) dan login dengan GitHub.
4. Klik **"Add New..."** -> **"Project"** -> Pilih repository `undangan-pernikahan`.
5. Klik **"Deploy"**. Website Anda langsung online dalam ~30 detik dengan HTTPS gratis!

---

## 🌐 Cara Menghubungkan Custom Domain

1. Masuk ke dashboard project di **Vercel** -> **Settings** -> **Domains**.
2. Masukkan domain Anda (misal: `theweddingofrizki.com`).
3. Ikuti petunjuk DNS dari Vercel (tambahkan CNAME atau A Record di penyedia domain Anda).

---

## 📋 Checklist Final Sebelum Kirim ke Tamu

- [x] **Build Check**: `npm run build` berhasil 100% tanpa error.
- [ ] **Data Mempelai**: Nama lengkap, gelar, dan nama orang tua di `src/config/wedding.ts` sudah diverifikasi.
- [ ] **Waktu & Lokasi**: Jadwal Akad dan Resepsi sudah benar.
- [ ] **Google Maps**: Tautan Google Maps mengarah ke lokasi gedung yang tepat.
- [ ] **Nomor Rekening**: Nomor rekening dan nama pemilik rekening bank sudah dicek ulang.
- [ ] **Foto-foto**: Foto mempelai dan galeri di `public/images/` sudah diganti dengan foto asli Anda.
- [ ] **Musik**: File `wedding-song.mp3` di `public/music/` sudah dicoba dan terdengar merdu.
- [ ] **Uji Coba di HP**: Buka link di smartphone untuk memastikan seluruh animasi, tombol, dan tampilan terlihat sempurna.
