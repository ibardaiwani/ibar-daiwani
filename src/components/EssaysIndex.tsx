import { ArrowUpDown, Search, X } from 'lucide-react';
import type { EssayArticle, SortOrder } from '../types/content';
import {
  estimateReadingMinutes,
  filterAndSortEssays,
  formatDisplayDate,
} from '../utils/contentLogic';
import { ResilientImage } from './ResilientImage';

interface EssaysIndexProps {
  essays: EssayArticle[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortOrder: SortOrder;
  onSortChange: (sort: SortOrder) => void;
  onOpenEssay: (essayId: string) => void;
}

export function EssaysIndex({
  essays,
  searchQuery,
  onSearchChange,
  sortOrder,
  onSortChange,
  onOpenEssay,
}: EssaysIndexProps) {
  const visibleEssays = filterAndSortEssays(essays, searchQuery, sortOrder);

  return (
    <section
      aria-labelledby="essays-heading"
      className="mx-auto max-w-[960px] px-4 sm:px-8 pt-10 sm:pt-14 pb-24"
    >
      {/* Editorial Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#141413]/10">
        <div className="max-w-2xl">
          <h1
            id="essays-heading"
            className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#141413] leading-[1.12]"
          >
            Essays
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#575652] leading-relaxed">
            Kumpulan catatan dan tulisan yang tersusun berdasarkan judul dan tanggal publikasi, tanpa pengelompokan tematik.
          </p>
        </div>
        <p className="text-xs sm:text-sm font-mono tabular-nums text-[#575652] whitespace-nowrap">
          {visibleEssays.length} dari {essays.length} tulisan
        </p>
      </div>

      {/* Search & Sort Toolbar */}
      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <label htmlFor="essays-search" className="sr-only">
            Cari tulisan berdasarkan judul
          </label>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#73726D]"
            aria-hidden="true"
          />
          <input
            id="essays-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari tulisan berdasarkan judul..."
            className="w-full rounded-md border border-[#141413]/15 bg-white pl-10 pr-9 py-2.5 text-sm text-[#141413] placeholder:text-[#8A8984] focus:border-[#141413] focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Hapus pencarian tulisan"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#73726D] hover:text-[#141413]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-[#73726D] shrink-0" aria-hidden="true" />
            <label htmlFor="essays-sort" className="text-xs sm:text-sm text-[#575652] whitespace-nowrap">
              Urutkan
            </label>
          </div>
          <select
            id="essays-sort"
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

      {/* Editorial Article List */}
      {essays.length === 0 ? (
        <div className="mt-16 py-20 text-center border border-dashed border-[#141413]/15 rounded-lg bg-white/60">
          <p className="font-serif text-xl text-[#141413]">Belum ada tulisan diterbitkan</p>
          <p className="mt-2 text-sm text-[#575652]">
            Tulisan terbaru akan segera tersedia di halaman ini.
          </p>
        </div>
      ) : visibleEssays.length === 0 ? (
        <div className="mt-16 py-16 text-center border-t border-b border-[#141413]/10">
          <p className="font-serif text-xl text-[#141413]">
            Tidak ada tulisan dengan judul &ldquo;{searchQuery}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="mt-4 px-4 py-2 text-sm font-medium border border-[#141413]/20 rounded-md text-[#141413] hover:bg-[#F2F0EC] transition-colors"
          >
            Tampilkan semua tulisan
          </button>
        </div>
      ) : (
        <div data-testid="essays-list" className="mt-10 divide-y divide-[#141413]/10 border-t border-b border-[#141413]/10">
          {visibleEssays.map((essay) => {
            const minutes = estimateReadingMinutes(essay.body);
            return (
              <article key={essay.id} className="py-8 first:pt-7 last:pb-7">
                <button
                  type="button"
                  onClick={() => onOpenEssay(essay.id)}
                  className="group w-full text-left grid grid-cols-1 md:grid-cols-[160px_1fr_auto] gap-4 md:gap-8 items-start"
                >
                  {/* Publication Date */}
                  <div className="flex md:flex-col items-center md:items-start gap-2 md:gap-1 pt-1 text-xs font-mono tabular-nums text-[#575652]">
                    <time dateTime={essay.publishedAt}>
                      {formatDisplayDate(essay.publishedAt)}
                    </time>
                    <span className="md:hidden" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-[#73726D]">{minutes} menit baca</span>
                  </div>

                  {/* Title & Optional Excerpt */}
                  <div className="min-w-0">
                    <h2 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[#141413] leading-snug group-hover:underline underline-offset-4 decoration-[#141413]/40">
                      {essay.title}
                    </h2>
                    {essay.excerpt && (
                      <p className="mt-2.5 text-sm sm:text-[15px] text-[#4A4945] leading-relaxed max-w-2xl">
                        {essay.excerpt}
                      </p>
                    )}
                    <span className="mt-3 inline-block text-xs font-medium text-[#141413]/70 group-hover:text-[#141413] transition-colors">
                      Baca tulisan
                    </span>
                  </div>

                  {/* Optional Supporting Image Thumbnail */}
                  {essay.supportingImage ? (
                    <div className="w-full md:w-36 aspect-[4/3] overflow-hidden rounded-sm bg-[#ECEAE4] shrink-0">
                      <ResilientImage
                        src={essay.supportingImage}
                        alt={essay.title}
                        fallbackLabel={essay.title}
                        className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : (
                    <div className="hidden md:block md:w-36 shrink-0" aria-hidden="true" />
                  )}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
