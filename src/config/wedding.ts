import { WeddingConfig } from "./types"

export const weddingConfig: WeddingConfig = {
  // 1. Feature Flags (Aktifkan / Nonaktifkan fitur sesuai kebutuhan)
  features: {
    music: true,             // Pemutar musik latar mengambang (Floating Vinyl)
    quote: true,             // Ayat suci / Kutipan romantis
    countdown: true,         // Hitung mundur hari pernikahan
    loveStory: false,        // Kisah perjalanan cinta (Our Story Timeline)
    gallery: true,           // Galeri foto prewedding & Fullscreen Lightbox
    rsvp: true,              // Formulir konfirmasi kehadiran RSVP
    wishes: true,            // Buku tamu ucapan & doa restu
    gift: true,              // Tanda kasih / Amplop digital rekening bank
    qris: false,             // Pop-up QRIS pembayaran (hanya muncul jika true)
    liveStream: false,       // Siaran langsung YouTube/Zoom (opsional)
    healthProtocol: false,   // Panduan & etiket acara (opsional)
    guestLinkGenerator: true // Tool generator link WhatsApp untuk memudahkan mempelai
  },

  // 2. Metadata SEO & Preview WhatsApp / Social Media
  meta: {
    title: "The Wedding of Agsal & Fanny | 04.10.2026",
    description: "Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dalam momen istimewa pernikahan kami. Agsal & Fanny.",
    ogImage: "/images/og-preview.jpg",
    hashtag: "#AgsalFannyInLove",
    baseUrl: "https://wedding-invitation-dssssssss.vercel.app"
  },

  // 3. Data Mempelai (Couple)
  couple: {
    groom: {
      name: "Agsal",
      nickname: "Agsal",
      fullName: "Agsal Jilhamsah",
      childOrder: "Putra kedua dari",
      parents: "Bapak H. Edi Fahrudin S & Ibu Asih",
      photo: "/images/groom.jpg",
      social: {
        platform: "instagram",
        username: "",
        url: "#",
      },
    },
    bride: {
      name: "Fanny",
      nickname: "Fanny",
      fullName: "Defanny Fania Putri",
      childOrder: "Putri kedua dari",
      parents: "Alm. Bapak Ahmad Fatoni & Ibu Dedeh",
      photo: "/images/bride.jpg",
      social: {
        platform: "instagram",
        username: "",
        url: "#",
      },
    },
  },

  // 4. Kutipan Romantis / Ayat Suci (Quote Section)
  quote: {
    text: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21",
    arabicText: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
  },

  // 5. Informasi Rangkaian Acara (Akad & Resepsi)
  wedding: {
    date: "Minggu, 4 Oktober 2026",
    countdownDate: "2026-10-04T08:00:00+07:00",

    // Detail Akad Nikah
    akad: {
      title: "Akad Nikah",
      subtitle: "Prosesi Ijab Kabul & Penyatuan Janji Suci",
      dayName: "Minggu",
      date: "4 Oktober 2026",
      time: "08:00 - 09:00",
      timezone: "WIB",
      venue: "Rumah Mempelai Pria",
      address: "Desa Cicadas RT 03 RW 23, Kecamatan Gunung Putri, Kab. Bogor 16964",
      mapsUrl: "https://maps.app.goo.gl/TA8sGS1ePW3HFMVm9",
      calendarDateStart: "20261004T080000",
      calendarDateEnd: "20261004T090000",
    },

    // Detail Resepsi Pernikahan
    reception: {
      title: "Resepsi Pernikahan",
      subtitle: "Perayaan & Ramah Tamah Kebahagiaan",
      dayName: "Minggu",
      date: "4 Oktober 2026",
      time: "10:00 - Selesai",
      timezone: "WIB",
      venue: "Rumah Mempelai Pria",
      address: "Desa Cicadas RT 03 RW 23, Kecamatan Gunung Putri, Kab. Bogor 16964",
      mapsUrl: "https://maps.app.goo.gl/TA8sGS1ePW3HFMVm9",
      calendarDateStart: "20261004T100000",
      calendarDateEnd: "20261004T160000",
    },
  },

  // 6. Kisah Perjalanan Cinta (Our Love Story)
  story: [
    {
      year: "2021",
      title: "Pertemuan Pertama",
      description: "Awal perjumpaan yang penuh makna, merajut percakapan hangat yang menjadi awal dari kisah indah kami.",
    },
    {
      year: "2023",
      title: "Menjalin Komitmen",
      description: "Menemukan kesamaan visi hidup dan melangkah bersama dalam ikatan komitmen yang lebih serius.",
    },
    {
      year: "2025",
      title: "Momen Lamaran",
      description: "Di hadapan kedua keluarga besar, kami mengikat janji suci pertunangan untuk menuju jenjang pernikahan.",
    },
    {
      year: "2026",
      title: "Hari Bahagia (The Wedding)",
      description: "Menyatukan langkah dan hati dalam ikatan suci pernikahan yang diridhoi Allah SWT.",
    },
  ],

  // 7. Galeri Foto Prewedding
  gallery: {
    title: "Galeri Kebahagiaan",
    subtitle: "Momen-momen indah perjalanan kami menuju hari bahagia",
    images: [
      {
        url: "/images/gallery-01.jpg?v=2",
        alt: "Prewedding Agsal & Fanny 1",
        caption: "A New Journey Begins",
      },
      {
        url: "/images/gallery-02.jpg?v=2",
        alt: "Prewedding Agsal & Fanny 2",
        caption: "Bound by Love",
      },
      {
        url: "/images/gallery-03.jpg?v=2",
        alt: "Prewedding Agsal & Fanny 3",
        caption: "Together Forever",
      },
      {
        url: "/images/gallery-04.jpg?v=2",
        alt: "Prewedding Agsal & Fanny 4",
        caption: "Warm Embrace",
      },
      {
        url: "/images/gallery-05.jpg?v=2",
        alt: "Prewedding Agsal & Fanny 5",
        caption: "Cherished Moments",
      },
      {
        url: "/images/gallery-06.jpg?v=2",
        alt: "Prewedding Agsal & Fanny 6",
        caption: "Eternal Promise",
      },
    ],
  },

  // 8. Musik Latar Belakang (Audio Player)
  music: {
    src: "/music/wedding-song.mp3",
    title: "Pernikahan Kita - Tiara Andini & Arsy Widianto",
    artist: "Tiara Andini & Arsy Widianto",
    autoplayOnOpen: true,
  },

  // 9. Tanda Kasih / Amplop Digital (Wedding Gift)
  gift: {
    title: "Tanda Kasih",
    description: "Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih secara digital, Anda dapat menggunakan fasilitas berikut:",
    accounts: [
      {
        bank: "Bank CIMB Niaga",
        accountNumber: "762504546400",
        accountName: "AGSAL JILHAMSAH",
      },
      {
        bank: "ShopeePay",
        accountNumber: "088809011376",
        accountName: "AGSAL JILHAMSAH",
      },
    ],
    qris: {
      enabled: false,
      image: "/images/qris.png",
    },
    physicalGiftAddress: {
      recipient: "Agsal & Fanny",
      phone: "0815-1768-6536",
      address: "Desa Cicadas RT 03 RW 23, Kecamatan Gunung Putri, Kab. Bogor 16964",
    },
  },

  // 10. RSVP & Konfirmasi Kehadiran (Provider Abstraction)
  rsvp: {
    provider: "none", // 'none' | 'google-sheets' | 'webhook'
    googleSheetsEndpoint: "",
    webhookUrl: "",
    whatsappNumber: "6281517686536", // Nomor WhatsApp Agsal untuk konfirmasi RSVP
    maxGuestsPerRSVP: 4,
  },

  // 11. Live Streaming (Opsional)
  liveStream: {
    platform: "YouTube",
    url: "https://youtube.com/live/wedding-agsal-fanny",
    time: "Minggu, 4 Oktober 2026 | 08:00 WIB",
  },

  // 12. Protokol Acara (Etiket Tamu)
  healthProtocol: {
    items: [
      {
        icon: "Clock",
        title: "Tepat Waktu",
        desc: "Hadir tepat waktu sesuai jadwal sesi undangan.",
      },
      {
        icon: "Camera",
        title: "Foto Bersama",
        desc: "Tertib dan bergantian saat sesi foto bersama mempelai.",
      },
      {
        icon: "HeartHandshake",
        title: "Kenyamanan Bersama",
        desc: "Menjaga kenyamanan dan kekhidmatan seluruh rangkaian acara.",
      },
      {
        icon: "Sparkles",
        title: "Dresscode Elegan",
        desc: "Disarankan mengenakan busana bernuansa Batik / Pastel / Formal.",
      },
    ],
  },

  // 13. Ucapan Awal & Doa Restu (Kosong secara default, akan terisi otomatis saat tamu mengirim RSVP)
  presetWishes: [],
}
