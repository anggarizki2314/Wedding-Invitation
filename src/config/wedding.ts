import { WeddingConfig } from './types'

/**
 * =======================================================================
 * PUSAT KONFIGURASI UTAMA WEBSITE UNDANGAN PERNIKAHAN
 * =======================================================================
 * Semua data, status fitur, teks, nama mempelai, tanggal, rekening,
 * dan URL tersimpan di file ini.
 * 
 * Komponen website 100% membaca konfigurasi ini secara modular.
 * =======================================================================
 */

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
    qris: true,              // Pop-up QRIS pembayaran (hanya muncul jika true)
    liveStream: false,       // Siaran langsung YouTube/Zoom (opsional)
    healthProtocol: false,   // Panduan & etiket acara (opsional)
    guestLinkGenerator: true // Tool generator link WhatsApp untuk memudahkan mempelai
  },

  // 2. Metadata SEO & Preview WhatsApp / Social Media
  meta: {
    title: "The Wedding of Rizki & Amelia | 12.12.2026",
    description: "Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dalam momen istimewa pernikahan kami. Rizki & Amelia.",
    ogImage: "/images/og-preview.jpg",
    hashtag: "#RizkiAmeliaInLove",
    baseUrl: "https://wedding-invitation-dssssssss.vercel.app"
  },

  // 3. Data Mempelai (Couple)
  couple: {
    groom: {
      name: "Rizki",
      fullName: "Rizki Pratama, S.T.",
      nickname: "Rizki",
      childOrder: "Putra pertama dari",
      parents: "Bpk. Bambang Wijaya & Ibu Siti Rohmah",
      photo: "/images/groom.jpg",
      social: {
        platform: "instagram",
        username: "@rizkipratama",
        url: "https://instagram.com/rizkipratama",
      },
    },
    bride: {
      name: "Amelia",
      fullName: "Amelia Putri, S.Farm.",
      nickname: "Amelia",
      childOrder: "Putri kedua dari",
      parents: "Bpk. Hendra Gunawan & Ibu Nurhayati",
      photo: "/images/bride.jpg",
      social: {
        platform: "instagram",
        username: "@ameliaputri",
        url: "https://instagram.com/ameliaputri",
      },
    },
  },

  // 4. Detail Acara Pernikahan (Akad & Resepsi)
  wedding: {
    date: "Sabtu, 12 Desember 2026",
    countdownDate: "2026-12-12T08:00:00+07:00",

    akad: {
      title: "Akad Nikah",
      subtitle: "Momen Sakral Ijab & Qabul",
      dayName: "Sabtu",
      date: "12 Desember 2026",
      time: "08:00 - 10:00",
      timezone: "WIB",
      venue: "Grand Ballroom Hotel Indonesia Kempinski",
      address: "Jl. M.H. Thamrin No.1, Menteng, Jakarta Pusat, DKI Jakarta 10310",
      mapsUrl: "https://maps.google.com/?q=Hotel+Indonesia+Kempinski+Jakarta",
      mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322964!2d106.8206123!3d-6.1947413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4219a584061%3A0x6b13cf14a1e94119!2sHotel%20Indonesia%20Kempinski%20Jakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid",
      calendarDateStart: "20261212T080000",
      calendarDateEnd: "20261212T100000",
    },

    reception: {
      title: "Resepsi Pernikahan",
      subtitle: "Perayaan & Ramah Tamah",
      dayName: "Sabtu",
      date: "12 Desember 2026",
      time: "11:00 - 14:00",
      timezone: "WIB",
      venue: "Grand Ballroom Hotel Indonesia Kempinski",
      address: "Jl. M.H. Thamrin No.1, Menteng, Jakarta Pusat, DKI Jakarta 10310",
      mapsUrl: "https://maps.google.com/?q=Hotel+Indonesia+Kempinski+Jakarta",
      mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322964!2d106.8206123!3d-6.1947413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4219a584061%3A0x6b13cf14a1e94119!2sHotel%20Indonesia%20Kempinski%20Jakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid",
      calendarDateStart: "20261212T110000",
      calendarDateEnd: "20261212T140000",
    },
  },

  // 5. Ayat Suci / Kutipan Romantis
  quote: {
    arabicText: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    text: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21",
  },

  // 6. Perjalanan Cinta (Our Love Story)
  story: [
    {
      year: "2021",
      title: "Pertemuan Pertama",
      description: "Takdir mempertemukan kami dalam sebuah seminar teknologi di Jakarta. Percakapan santai di sela acara menjadi awal dari persahabatan yang indah.",
    },
    {
      year: "2022",
      title: "Menjalin Komitmen",
      description: "Setelah saling mengenal dan menemukan banyak kesamaan visi hidup, kami memutuskan untuk melangkah bersama dalam ikatan komitmen yang lebih serius.",
    },
    {
      year: "2025",
      title: "Momen Lamaran (The Proposal)",
      description: "Di bawah langit sore yang indah dan disaksikan kedua keluarga besar, kami mengikat janji pertunangan untuk melangkah ke jenjang pernikahan.",
    },
    {
      year: "2026",
      title: "Hari Bahagia (The Wedding)",
      description: "Dengan izin Allah SWT dan restu kedua orang tua tercinta, kami siap menyatukan langkah dalam ikatan suci pernikahan abadi.",
    },
  ],

  // 7. Galeri Foto Prewedding
  gallery: {
    title: "Momen Bahagia",
    subtitle: "Potret kenangan dan perjalanan cinta kami",
    images: [
      {
        url: "/images/cover.jpg",
        alt: "Rizki & Amelia Wedding Portrait",
        caption: "Bersama merajut masa depan impian",
      },
      {
        url: "/images/gallery-01.jpg",
        alt: "Wedding Rings and Bouquet",
        caption: "Simbol ikatan cinta abadi",
      },
      {
        url: "/images/gallery-02.jpg",
        alt: "Romantic Walk in Garden",
        caption: "Langkah bersama menuju lembaran baru",
      },
      {
        url: "/images/gallery-03.jpg",
        alt: "Intimate Couple Portrait",
        caption: "Kehangatan cinta dalam setiap tatapan",
      },
      {
        url: "/images/gallery-04.jpg",
        alt: "Groom Portrait",
        caption: "Momen bahagia sang mempelai",
      },
      {
        url: "/images/gallery-05.jpg",
        alt: "Bride Portrait",
        caption: "Senyuman manis di hari yang dinanti",
      },
    ],
  },

  // 8. Musik Latar Belakang (Audio Player)
  music: {
    src: "/music/wedding-song.mp3",
    title: "Pernikahan Kita (Acoustic Piano)",
    artist: "Romantic Wedding",
    autoplayOnOpen: true,
  },

  // 9. Tanda Kasih / Amplop Digital (Wedding Gift)
  gift: {
    title: "Tanda Kasih",
    description: "Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih secara digital, Anda dapat menggunakan fasilitas berikut:",
    accounts: [
      {
        bank: "Bank Central Asia (BCA)",
        accountNumber: "8830123456",
        accountName: "RIZKI PRATAMA",
      },
      {
        bank: "Bank Mandiri",
        accountNumber: "1370012345678",
        accountName: "AMELIA PUTRI",
      },
      {
        bank: "Bank Syariah Indonesia (BSI)",
        accountNumber: "7123456789",
        accountName: "RIZKI PRATAMA",
      },
    ],
    qris: {
      enabled: true,
      image: "/images/qris.png",
    },
    physicalGiftAddress: {
      recipient: "Rizki & Amelia",
      phone: "0812-3456-7890",
      address: "Jl. Boulevard Indah No. 88, Menteng Residence, Jakarta Pusat 10350",
    },
  },

  // 10. RSVP & Konfirmasi Kehadiran (Provider Abstraction)
  rsvp: {
    provider: "none", // 'none' | 'google-sheets' | 'webhook'
    googleSheetsEndpoint: "", // Masukkan Web App URL dari Google Apps Script jika provider = 'google-sheets'
    webhookUrl: "",          // Masukkan URL webhook jika provider = 'webhook'
    whatsappNumber: "6281234567890", // Ganti dengan nomor WhatsApp Anda (tanpa tanda + atau spasi)
    maxGuestsPerRSVP: 4,
  },

  // 11. Live Streaming (Opsional)
  liveStream: {
    platform: "YouTube",
    url: "https://youtube.com/live/wedding-rizki-amelia",
    time: "Sabtu, 12 Desember 2026 | 08:00 WIB",
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
        desc: "Disarankan mengenakan busana bernuansa Pastel / Gold / Formal.",
      },
    ],
  },

  // 13. Ucapan Awal Bawaan (Preset Fallback Wishes)
  presetWishes: [
    {
      id: "wish-1",
      name: "Dimas & Sarah",
      attendance: "Hadir",
      message: "Selamat menempuh hidup baru Rizki dan Amelia! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Bahagia selalu sampai kakek nenek! Aamiin.",
      time: "2 jam yang lalu",
    },
    {
      id: "wish-2",
      name: "Bpk. Rahmat Santoso (Keluarga Besar Alumni)",
      attendance: "Hadir",
      message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khoir. Selamat atas pernikahannya Rizki & Amelia, semoga senantiasa diberkahi kelimpahan rezeki.",
      time: "5 jam yang lalu",
    },
    {
      id: "wish-3",
      name: "dr. Citra Anindya",
      attendance: "Hadir",
      message: "Happy wedding Amel tersayang! MasyaAllah akhirnya hari yang dinanti tiba juga. Cantik banget pasti, can't wait to see you both on Saturday!",
      time: "Kemarin",
    },
    {
      id: "wish-4",
      name: "Arif Hidayat & Partner",
      attendance: "Belum Pasti",
      message: "Selamat ya Bro Rizki! Lancar-lancar sampai hari H. Semoga dilancarkan semua persiapan dan acaranya nanti.",
      time: "2 hari yang lalu",
    },
  ],
}
