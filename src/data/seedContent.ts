import type { ContentStore } from '../types/content';

export const BUILTIN_SAMPLE_IMAGES = [
  {
    label: 'Panggung Prambanan Jazz',
    url: '/src/assets/images/prambanan_jazz_stage_1795614305059.jpg',
  },
  {
    label: 'Senja di Halaman Prambanan',
    url: '/src/assets/images/prambanan_jazz_twilight_1795614304495.jpg',
  },
  {
    label: 'NonaRia di Atas Panggung',
    url: '/src/assets/images/nonaria_concert_1795614305916.jpg',
  },
  {
    label: 'Arena Peresean Lombok',
    url: '/src/assets/images/peresean_lombok_duel_1795614306490.jpg',
  },
  {
    label: 'Potret Pepadu Sasak',
    url: '/src/assets/images/peresean_lombok_detail_1795614308056.jpg',
  },
  {
    label: 'Pagi di Gang Yogyakarta',
    url: '/src/assets/images/yogyakarta_morning_1795614309060.jpg',
  },
  {
    label: 'Lorong Pasar Pagi Yogyakarta',
    url: '/src/assets/images/yogyakarta_alley_1795614309787.jpg',
  },
  {
    label: 'Potret Pelukis di Studio',
    url: '/src/assets/images/portrait_artist_studio_1795614310075.jpg',
  },
];

export const INITIAL_CONTENT: ContentStore = {
  works: [
    {
      id: 'work-prambanan-jazz-2022',
      title: 'Prambanan Jazz 2022',
      coverImage: '/src/assets/images/prambanan_jazz_stage_1795614305059.jpg',
      date: '2022-07-03',
      description:
        'Rangkaian foto suasana keseluruhan festival dari sore menjelang malam di pelataran Candi Prambanan—panggung terbuka, cahaya senja, dan penonton yang duduk di atas rumput.',
      order: 0,
      photos: [
        {
          id: 'p-pj-1',
          url: '/src/assets/images/prambanan_jazz_stage_1795614305059.jpg',
          caption: 'Cahaya panggung menyala saat langit senja meredup di belakang menara candi.',
        },
        {
          id: 'p-pj-2',
          url: '/src/assets/images/prambanan_jazz_twilight_1795614304495.jpg',
          caption: 'Penonton duduk santai di pelataran rumput menunggu sesi pertunjukan berikutnya.',
        },
      ],
    },
    {
      id: 'work-nonaria-prambanan-2022',
      title: 'NonaRia at Prambanan Jazz 2022',
      coverImage: '/src/assets/images/nonaria_concert_1795614305916.jpg',
      date: '2022-07-03',
      description:
        'Dokumentasi tersendiri yang berfokus pada penampilan NonaRia di malam kedua—menangkap dinamika vokal, akordeon, dan kontrabas dalam jarak dekat.',
      order: 1,
      photos: [
        {
          id: 'p-nr-1',
          url: '/src/assets/images/nonaria_concert_1795614305916.jpg',
          caption: 'Trio NonaRia membawakan repertoar klasik dengan balutan cahaya sorot hangat.',
        },
        {
          id: 'p-nr-2',
          url: '/src/assets/images/prambanan_jazz_stage_1795614305059.jpg',
          caption: 'Sudut panggung terbuka saat alunan instrumen akustik bergema ke seluruh pelataran.',
        },
      ],
    },
    {
      id: 'work-peresean-lombok',
      title: 'Peresean, Lombok',
      coverImage: '/src/assets/images/peresean_lombok_duel_1795614306490.jpg',
      date: '2023-08-19',
      description:
        'Pertemuan dua pepadu di arena tanah berdebu dengan rotan dan perisai kulit kerbau, dipotret di bawah matahari sore yang rendah.',
      order: 2,
      photos: [
        {
          id: 'p-pl-1',
          url: '/src/assets/images/peresean_lombok_duel_1795614306490.jpg',
          caption: 'Debu tanah mengepul di udara saat kedua pepadu saling membaca langkah.',
        },
        {
          id: 'p-pl-2',
          url: '/src/assets/images/peresean_lombok_detail_1795614308056.jpg',
          caption: 'Jeda singkat di tepi arena bersama perisai ende dan ikat kepala tenun Sasak.',
        },
      ],
    },
    {
      id: 'work-journey-yogyakarta',
      title: 'A Journey to Yogyakarta',
      coverImage: '/src/assets/images/yogyakarta_morning_1795614309060.jpg',
      date: '2024-05-11',
      description:
        'Catatan visual berjalan kaki sejak pukul enam pagi menyusuri kampung lama, sepeda terparkir, dan lorong pasar yang baru membuka hari.',
      order: 3,
      photos: [
        {
          id: 'p-jy-1',
          url: '/src/assets/images/yogyakarta_morning_1795614309060.jpg',
          caption: 'Cahaya pagi jatuh miring di depan pintu kayu jati dan barisan sepeda tua.',
        },
        {
          id: 'p-jy-2',
          url: '/src/assets/images/yogyakarta_alley_1795614309787.jpg',
          caption: 'Tumpukan besek bambu dan kain batik indigo di bawah atap lorong pasar pagi.',
        },
      ],
    },
    {
      id: 'work-portrait-of-an-artist',
      title: 'Portrait of an Artist',
      coverImage: '/src/assets/images/portrait_artist_studio_1795614310075.jpg',
      date: '2025-02-14',
      description:
        'Seri potret sunyi di ruang kerja seorang pelukis—cahaya jendela samping, kanvas linen mentah, dan jeda panjang sebelum sapuan kuas berikutnya.',
      order: 4,
      photos: [
        {
          id: 'p-pa-1',
          url: '/src/assets/images/portrait_artist_studio_1795614310075.jpg',
          caption: 'Berdiri di samping kanvas yang baru setengah jalan, diterangi cahaya jendela timur.',
        },
      ],
    },
  ],
  essays: [
    {
      id: 'essay-menunggu-senja-candi',
      title: 'Menunggu Senja di Halaman Candi',
      publishedAt: '2022-07-12',
      excerpt:
        'Tentang bagaimana jarak antara panggung dan penonton yang duduk di atas rumput mengubah cara kita memotret sebuah pertunjukan.',
      supportingImage: '/src/assets/images/prambanan_jazz_twilight_1795614304495.jpg',
      supportingImageCaption: 'Pelataran rumput Candi Prambanan menjelang malam, Juli 2022.',
      order: 0,
      body: `Ketika memotret sebuah festival musik ruang terbuka, godaan terbesar biasanya adalah terus mendekat ke bibir panggung. Kita mengejar ekspresi pemusik, siluet instrumen, dan permainan lampu sorot yang dramatis.

Namun di Prambanan malam itu, cerita yang paling melekat justru terjadi lima puluh meter di belakang menara tata suara. Orang-orang menggelar tikar, berbincang pelan sebelum lampu panggung menyala penuh, sementara siluet candi berubah warna dari abu-abu batu menjadi keemasan lalu menyatu dengan langit biru tua.

Dari sana saya belajar bahwa satu peristiwa tidak harus dipadatkan ke dalam satu folder tunggal. Dokumentasi suasana keseluruhan festival dan potret intim satu penampil di atas panggung adalah dua percakapan yang berbeda—masing-masing pantas memiliki ruang dan judulnya sendiri.`,
    },
    {
      id: 'essay-catatan-pagi-yogyakarta',
      title: 'Catatan Pagi dari Gang-Gang Yogyakarta',
      publishedAt: '2024-05-24',
      excerpt:
        'Berjalan tanpa daftar tujuan membuat mata lebih peka terhadap arah cahaya, bunyi sapu lidi, dan detail kecil yang luput saat siang tiba.',
      supportingImage: '/src/assets/images/yogyakarta_morning_1795614309060.jpg',
      supportingImageCaption: 'Sudut permukiman lama di pagi hari, Yogyakarta.',
      order: 1,
      body: `Ada jeda singkat sekitar empat puluh lima menit setelah matahari terbit ketika kota belum sepenuhnya bergegas. Pintu-pintu kayu baru dibuka setengah, sepeda masih bersandar di tepi dinding, dan bayangan pepohonan memanjang melintasi jalan konblok.

Saya memilih berjalan tanpa membawa rencana pemotretan yang kaku. Hanya satu kamera, satu lensa tetap, dan kesediaan untuk berhenti setiap kali arah cahaya menyentuh permukaan yang menarik perhatian.

Saat sampai di lorong pasar, ritme berubah perlahan. Tumpukan anyaman bambu dan kain batik yang baru dikeluarkan dari lemari kayu memantulkan cahaya dari celah atap. Tidak ada momen spektakuler yang perlu dikejar—cukup hadir dengan tenang dan membiarkan ruang berbicara.`,
    },
    {
      id: 'essay-keheningan-ruang-kerja-pelukis',
      title: 'Keheningan di Ruang Kerja Pelukis',
      publishedAt: '2025-03-02',
      excerpt:
        'Memotret seseorang di tempat ia berkarya menuntut kesabaran untuk tidak segera mengarahkan pose, melainkan menunggu ritme aslinya muncul.',
      supportingImage: '/src/assets/images/portrait_artist_studio_1795614310075.jpg',
      supportingImageCaption: 'Cahaya jendela timur di dalam studio lukis.',
      order: 2,
      body: `Studio adalah ruang yang jujur. Di dindingnya tertinggal bekas percobaan warna, di sudut lantai berjajar rangka kayu kosong, dan di dekat jendela ada kursi yang paling sering dipakai untuk menatap kanvas dari kejauhan.

Selama setengah jam pertama saya tidak mengangkat kamera sama sekali. Kami hanya berbicara tentang bahan linen mentah, bau minyak cat, dan bagaimana cahaya pagi di sisi timur studio menentukan kapan ia mulai melukis setiap hari.

Ketika akhirnya satu bingkai diambil di samping kanvas yang belum selesai, tidak ada lagi rasa canggung di antara lensa dan subjek. Yang tersisa hanyalah keheningan yang memang sudah lama tinggal di ruangan itu.`,
    },
    {
      id: 'essay-arsip-tanpa-kategori',
      title: 'Mengapa Arsip Tidak Selalu Membutuhkan Kategori',
      publishedAt: '2025-06-18',
      excerpt:
        'Sebuah koleksi foto atau tulisan sering kali melampaui batas label tematik. Membiarkan judul berdiri sendiri memberi ruang tafsir yang lebih jujur.',
      order: 3,
      body: `Setiap kali kita dipaksa memilih satu kategori sebelum menerbitkan karya, selalu ada sesuatu yang terasa menyempit. Apakah sebuah perjalanan ke desa di Lombok masuk ke kategori dokumenter, perjalanan, atau budaya? Apakah potret seorang musisi di balik panggung termasuk musik atau potret?

Klasifikasi tematik memang berguna bagi katalog perpustakaan besar, tetapi bagi arsip pribadi seorang fotografer dan penulis, kotak-kotak tersebut sering kali justru menghalangi kebebasan berkarya.

Ketika arsip disusun langsung berdasarkan judul koleksi, tanggal, dan urutan yang dipilih sendiri oleh pembuatnya, setiap karya hadir apa adanya. Pengunjung cukup membaca judulnya, melihat fotonya, atau membuka tulisannya—tanpa perlu lebih dulu digiring oleh label yang membatasi makna.`,
    },
  ],
};
