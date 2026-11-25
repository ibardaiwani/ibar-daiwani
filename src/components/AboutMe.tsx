import { ArrowUpRight, Mail } from 'lucide-react';
import { ResilientImage } from './ResilientImage';

interface AboutMeProps {
  worksCount: number;
  photosCount: number;
  essaysCount: number;
  onNavigateWorks: () => void;
  onNavigateEssays: () => void;
}

export function AboutMe({
  worksCount,
  photosCount,
  essaysCount,
  onNavigateWorks,
  onNavigateEssays,
}: AboutMeProps) {
  return (
    <section
      aria-labelledby="about-heading"
      className="mx-auto max-w-[1100px] px-4 sm:px-8 pt-10 sm:pt-14 pb-24"
    >
      {/* Page Header */}
      <div className="pb-8 border-b border-[#141413]/10">
        <h1
          id="about-heading"
          className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#141413] leading-[1.12]"
        >
          About Me
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#575652] max-w-2xl leading-relaxed">
          Tentang praktik fotografi dokumenter, catatan perjalanan, dan arsip personal di balik Ibar Daiwani Archive&apos;s.
        </p>
      </div>

      {/* Main Split Editorial Section */}
      <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 lg:gap-16 items-start">
        {/* Portrait Column */}
        <figure className="w-full max-w-sm lg:max-w-none">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-sm bg-[#ECEAE4]">
            <ResilientImage
              src="/src/assets/images/about_ibar_portrait_1795615293596.jpg"
              alt="Ibar Daiwani di ruang kerja dengan kamera film dan buku catatan"
              fallbackLabel="Ibar Daiwani"
              loading="eager"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 text-xs font-mono text-[#73726D]">
            Ibar Daiwani · Fotografi &amp; Tulisan
          </figcaption>
        </figure>

        {/* Narrative & Details Column */}
        <div className="space-y-8">
          <div className="space-y-5 font-serif text-[17px] sm:text-[18px] leading-[1.85] text-[#222220] max-w-[65ch]">
            <p>
              Halo, saya <span className="text-[#141413] font-medium">Ibar Daiwani</span>. Situs ini adalah ruang arsip pribadi tempat saya menghimpun rangkaian fotografi dan tulisan pendek yang dikumpulkan dari berbagai perjalanan, panggung musik, pertemuan budaya, hingga jeda sunyi sehari-hari.
            </p>
            <p>
              Saya memilih untuk tidak mengelompokkan karya ke dalam kategori tematik yang kaku. Setiap koleksi foto dan setiap esai berdiri sendiri berdasarkan judul dan waktunya—membiarkan satu peristiwa yang sama dapat dituturkan dari beberapa sudut pandang tanpa dibatasi label.
            </p>
            <p>
              Melalui arsip ini, saya berharap pengunjung dapat menelusuri setiap judul secara perlahan, menikmati ritme visual dalam galeri foto, dan membaca catatan di balik layar sebagai bagian dari percakapan yang utuh.
            </p>
          </div>

          {/* Quiet Archive Index Summary */}
          <div className="pt-8 border-t border-[#141413]/10 grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <p className="font-mono text-2xl sm:text-3xl font-medium tabular-nums text-[#141413]">
                {worksCount}
              </p>
              <p className="mt-1 text-xs text-[#575652]">Koleksi Works</p>
            </div>
            <div>
              <p className="font-mono text-2xl sm:text-3xl font-medium tabular-nums text-[#141413]">
                {photosCount}
              </p>
              <p className="mt-1 text-xs text-[#575652]">Foto Terarsip</p>
            </div>
            <div>
              <p className="font-mono text-2xl sm:text-3xl font-medium tabular-nums text-[#141413]">
                {essaysCount}
              </p>
              <p className="mt-1 text-xs text-[#575652]">Tulisan Essays</p>
            </div>
          </div>

          {/* Contact Section */}
          <div id="kontak" className="pt-8 border-t border-[#141413]/10 space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#141413]">
              Kontak &amp; Kolaborasi
            </h2>
            <p className="text-sm sm:text-[15px] text-[#4A4945] leading-relaxed max-w-xl">
              Terbuka untuk percakapan seputar proyek dokumentasi, publikasi editorial, pameran, maupun arsip fotografi.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="mailto:ibardaiwanii@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md bg-[#141413] text-[#FAF9F7] hover:bg-[#2C2C2A] transition-colors whitespace-nowrap"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                ibardaiwanii@gmail.com
              </a>
              <button
                type="button"
                onClick={onNavigateWorks}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-md border border-[#141413]/20 bg-white text-[#141413] hover:bg-[#F2F0EC] transition-colors whitespace-nowrap"
              >
                Jelajahi Works
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onNavigateEssays}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-md border border-[#141413]/20 bg-white text-[#141413] hover:bg-[#F2F0EC] transition-colors whitespace-nowrap"
              >
                Baca Essays
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
