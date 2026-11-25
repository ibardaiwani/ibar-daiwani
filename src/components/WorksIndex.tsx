import { ArrowUpDown, Search, X } from 'lucide-react';
import type { SortOrder, WorkCollection } from '../types/content';
import { filterAndSortWorks, formatDisplayDate } from '../utils/contentLogic';
import { ResilientImage } from './ResilientImage';

interface WorksIndexProps {
  works: WorkCollection[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortOrder: SortOrder;
  onSortChange: (sort: SortOrder) => void;
  onOpenWork: (workId: string) => void;
}

export function WorksIndex({
  works,
  searchQuery,
  onSearchChange,
  sortOrder,
  onSortChange,
  onOpenWork,
}: WorksIndexProps) {
  const visibleWorks = filterAndSortWorks(works, searchQuery, sortOrder);

  return (
    <section aria-labelledby="works-heading" className="mx-auto max-w-[1200px] px-4 sm:px-8 pt-10 sm:pt-14 pb-20">
      {/* Editorial Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#141413]/10">
        <div className="max-w-2xl">
          <h1
            id="works-heading"
            className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#141413] leading-[1.12]"
          >
            Works
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#575652] leading-relaxed">
            Daftar koleksi fotografi yang disusun langsung berdasarkan judul masing-masing rangkaian karya, tanpa pengelompokan kategori tematik.
          </p>
        </div>
        <p className="text-xs sm:text-sm font-mono tabular-nums text-[#575652] whitespace-nowrap">
          {visibleWorks.length} dari {works.length} koleksi
        </p>
      </div>

      {/* Search & Sort Controls */}
      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <label htmlFor="works-search" className="sr-only">
            Cari koleksi berdasarkan judul
          </label>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#73726D]"
            aria-hidden="true"
          />
          <input
            id="works-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari koleksi berdasarkan judul..."
            className="w-full rounded-md border border-[#141413]/15 bg-white pl-10 pr-9 py-2.5 text-sm text-[#141413] placeholder:text-[#8A8984] focus:border-[#141413] focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Hapus pencarian koleksi"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#73726D] hover:text-[#141413]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-[#73726D] shrink-0" aria-hidden="true" />
            <label htmlFor="works-sort" className="text-xs sm:text-sm text-[#575652] whitespace-nowrap">
              Urutkan
            </label>
          </div>
          <select
            id="works-sort"
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value as SortOrder)}
            className="flex-1 sm:flex-none rounded-md border border-[#141413]/15 bg-white pl-3 pr-8 py-2.5 text-sm text-[#141413] focus:border-[#141413] focus:outline-none"
          >
            <option value="custom">Urutan Kurasi</option>
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
          </select>
        </div>
      </div>

      {/* Gallery Grid */}
      {works.length === 0 ? (
        <div className="mt-16 py-20 text-center border border-dashed border-[#141413]/15 rounded-lg bg-white/60">
          <p className="font-serif text-xl text-[#141413]">Belum ada koleksi fotografi</p>
          <p className="mt-2 text-sm text-[#575652]">
            Koleksi baru akan segera ditampilkan di halaman ini.
          </p>
        </div>
      ) : visibleWorks.length === 0 ? (
        <div className="mt-16 py-16 text-center border-t border-b border-[#141413]/10">
          <p className="font-serif text-xl text-[#141413]">
            Tidak ada koleksi dengan judul &ldquo;{searchQuery}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="mt-4 px-4 py-2 text-sm font-medium border border-[#141413]/20 rounded-md text-[#141413] hover:bg-[#F2F0EC] transition-colors"
          >
            Tampilkan semua koleksi
          </button>
        </div>
      ) : (
        <div
          data-testid="works-grid"
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {visibleWorks.map((work, idx) => (
            <article key={work.id} className="group flex flex-col">
              <button
                type="button"
                onClick={() => onOpenWork(work.id)}
                className="text-left focus-visible:outline-none group/card"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#ECEAE4]">
                  <ResilientImage
                    src={work.coverImage || work.photos[0]?.url || ''}
                    alt={work.title}
                    fallbackLabel={work.title}
                    loading={idx < 3 ? 'eager' : 'lazy'}
                    className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.03]"
                  />
                </div>

                <div className="mt-4 flex flex-col gap-1.5">
                  <h2 className="font-serif text-xl font-medium tracking-tight text-[#141413] group-hover/card:underline underline-offset-4 decoration-[#141413]/40">
                    {work.title}
                  </h2>

                  <div className="flex items-center gap-2 text-xs text-[#575652] font-mono tabular-nums">
                    <span>{formatDisplayDate(work.date)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{work.photos.length} foto</span>
                  </div>

                  {work.description && (
                    <p className="mt-1 text-sm text-[#575652] leading-relaxed line-clamp-2">
                      {work.description}
                    </p>
                  )}
                </div>
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
