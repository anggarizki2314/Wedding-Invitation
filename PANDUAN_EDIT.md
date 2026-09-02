# 📋 CHEATSHEET / PANDUAN CEPAT EDIT UNDANGAN

Simpan file ini sebagai panduan praktis untuk mengedit seluruh bagian website undangan kapan saja.

---

## 🗺️ PETA LOKASI EDIT (HANYA DI 3 TEMPAT INI!)

| Yang Ingin Anda Ganti | Lokasi File | Cara Mengganti |
| :--- | :--- | :--- |
| **Semua Teks, Nama, Tanggal, Rekening, & Fitur** | 📁 `src/config/wedding.ts` | Tinggal ganti tulisan di dalam tanda petik `"..."` |
| **Foto-Foto (Sampul, Pengantin, Galeri, QRIS)** | 📁 `public/images/` | Timpa/replace file foto dengan nama yang sama |
| **Lagu Musik Latar** | 📁 `public/music/` | Ganti file `wedding-song.mp3` |
| **Judul Tab Browser & Preview WhatsApp** | 📁 `index.html` & `wedding.ts` | Ganti teks di tag `<title>` dan `meta.title` |

---

## 1. ⚙️ EDIT TEKS & PENGATURAN (`src/config/wedding.ts`)

Buka file 👉 **`src/config/wedding.ts`**

### A. Aktifkan / Matikan Fitur (Feature Flags)
```typescript
features: {
  music: true,             // true = ada pemutar lagu | false = tanpa musik
  quote: true,             // true = ada ayat/quote   | false = sembunyikan quote
  countdown: true,         // true = ada hitung mundur | false = sembunyikan countdown
  loveStory: false,        // true = ada cerita cinta  | false = sembunyikan cerita
  gallery: true,           // true = ada galeri foto  | false = sembunyikan galeri
  rsvp: true,              // true = ada form RSVP    | false = tanpa form RSVP
  wishes: true,            // true = ada buku tamu ucapan | false = sembunyikan ucapan
  gift: true,              // true = ada amplop digital   | false = sembunyikan kado
  qris: true,              // true = ada scan QRIS        | false = sembunyikan QRIS
  liveStream: false,       // true = ada live streaming   | false = sembunyikan live
  healthProtocol: false,   // true = ada protokol etiket | false = sembunyikan protokol
  guestLinkGenerator: true // true = ada tombol share WA khusus mempelai di kiri bawah
}
```

---

### B. Nama Kedua Mempelai & Orang Tua
```typescript
couple: {
  groom: {
    name: "Rizki",                          // Nama panggilan pria (tampil besar)
    fullName: "Rizki Pratama, S.T.",        // Nama lengkap + gelar
    childOrder: "Putra pertama dari",       // Urutan anak
    parents: "Bpk. Bambang & Ibu Siti",     // Nama orang tua
    photo: "/images/groom.jpg",
    social: {
      platform: "instagram",
      username: "@rizkipratama",            // Username IG pria
      url: "https://instagram.com/rizkipratama"
    }
  },
  bride: {
    name: "Amelia",                         // Nama panggilan wanita (tampil besar)
    fullName: "Amelia Putri, S.Farm.",      // Nama lengkap + gelar
    childOrder: "Putri kedua dari",         // Urutan anak
    parents: "Bpk. Hendra & Ibu Nurhayati", // Nama orang tua
    photo: "/images/bride.jpg",
    social: {
      platform: "instagram",
      username: "@ameliaputri",             // Username IG wanita
      url: "https://instagram.com/ameliaputri"
    }
  }
}
```

---

### C. Tanggal, Jam, Lokasi, & Google Maps
```typescript
wedding: {
  date: "Sabtu, 12 Desember 2026",
  countdownDate: "2026-12-12T08:00:00+07:00", // Format: TAHUN-BULAN-TANGGALTJAM:MENIT:DETIK

  // Detail Akad
  akad: {
    dayName: "Sabtu",
    date: "12 Desember 2026",
    time: "08:00 - 10:00",
    timezone: "WIB",
    venue: "Nama Gedung / Masjid",
    address: "Alamat Lengkap Gedung Akad...",
    mapsUrl: "https://maps.google.com/?q=Lokasi+Akad+Anda" // Link Google Maps
  },

  // Detail Resepsi
  reception: {
    dayName: "Sabtu",
    date: "12 Desember 2026",
    time: "11:00 - 14:00",
    timezone: "WIB",
    venue: "Nama Gedung Resepsi",
    address: "Alamat Lengkap Gedung Resepsi...",
    mapsUrl: "https://maps.google.com/?q=Lokasi+Resepsi+Anda" // Link Google Maps
  }
}
```

---

### D. Rekening Bank & Alamat Kirim Kado
```typescript
gift: {
  title: "Tanda Kasih",
  description: "Doa restu Anda merupakan karunia terindah bagi kami...",
  accounts: [
    {
      bank: "Bank Central Asia (BCA)",
      accountNumber: "8830123456",        // Nomor rekening
      accountName: "RIZKI PRATAMA"         // Atas nama rekening
    },
    {
      bank: "Bank Mandiri",
      accountNumber: "1370012345678",     // Nomor rekening
      accountName: "AMELIA PUTRI"          // Atas nama rekening
    }
  ],
  qris: {
    enabled: true,                         // true jika ingin ada pop-up QRIS
    image: "/images/qris.png"
  },
  physicalGiftAddress: {
    recipient: "Rizki & Amelia",           // Nama penerima paket kado
    phone: "0812-3456-7890",              // No HP penerima
    address: "Jl. Alamat Rumah Mempelai..." // Alamat rumah untuk kirim kado fisik
  }
}
```

---

### E. Nomor WhatsApp Penerima Konfirmasi RSVP
```typescript
rsvp: {
  provider: "none",                        // 'none' (lokal) atau 'google-sheets'
  whatsappNumber: "6281234567890",         // No WhatsApp Anda (awali 62 tanpa spasi / +)
  maxGuestsPerRSVP: 4
}
```

---

## 2. 📸 GANTI FOTO (`public/images/`)

Buka folder 👉 **`public/images/`** di komputer Anda, lalu timpa dengan foto Anda:

- `cover.jpg` 👉 Foto utama berdua / sampul depan
- `groom.jpg` 👉 Foto mempelai pria
- `bride.jpg` 👉 Foto mempelai wanita
- `gallery-01.jpg` s/d `gallery-06.jpg` 👉 Foto galeri prewedding
- `qris.png` 👉 Foto QRIS donasi/kado Anda
- `og-preview.jpg` 👉 Foto thumbnail yang muncul saat link dibagikan di WhatsApp

---

## 3. 🎵 GANTI MUSIK (`public/music/`)

Buka folder 👉 **`public/music/`**
- Ganti file `wedding-song.mp3` dengan lagu romantis pilihan Anda (format `.mp3`).

---

## 4. 🔄 CARA UPDATE KE WEBSITE VERCEL SETELAH DIEDIT

Setelah Anda selesai mengedit teks atau foto di komputer Anda, cukup jalankan 3 baris perintah ini di terminal:

```bash
git add .
git commit -m "update: ganti data dan foto pernikahan"
git push
```

**Selesai!** Vercel akan otomatis mendeteksi perubahan tersebut dan meng-update website online Anda dalam waktu ~20 detik! 🚀
