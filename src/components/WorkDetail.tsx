import { useEffect, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { WorkCollection } from '../types/content';
import { formatDisplayDate } from '../utils/contentLogic';
import { ResilientImage } from './ResilientImage';

interface WorkDetailProps {
  work: WorkCollection;
  allWorks: WorkCollection[];
  onBack: () => void;
  onOpenWork: (workId: string) => void;
}

export function WorkDetail({
  work,
  allWorks,
  onBack,
  onOpenWork,
}: WorkDetailProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos =
    work.photos.length > 0
      ? work.photos
      : work.coverImage
        ? [{ id: `${work.id}-cover`, url: work.coverImage }]
        : [];

  const currentIdx = allWorks.findIndex((item) => item.id === work.id);
  const prevWork = currentIdx > 0 ? allWorks[currentIdx - 1] : null;
  const nextWork = currentIdx >= 0 && currentIdx < allWorks.length - 1 ? allWorks[currentIdx + 1] : null;

  useEffect(() => {
    setLightboxIndex(null);
  }, [work.id]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % photos.length));
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + photos.length) % photos.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, photos.length]);

  const activePhoto = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <article className="mx-auto max-w-[1200px] px-4 sm:px-8 pt-8 sm:pt-12 pb-24">
      {/* Top Action Row */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-[#575652] hover:text-[#141413] transition-colors whitespace-nowrap"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali ke Works
        </button>
      </div>

      {/* Collection Header */}
      <header className="mt-8 pb-10 border-b border-[#141413]/10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tabular-nums text-[#575652]">
            <span>{formatDisplayDate(work.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{photos.length} foto</span>
          </div>

          <h1 className="mt-3 font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#141413] leading-[1.14]">
            {work.title}
          </h1>

          {work.description && (
            <p className="mt-4 text-base text-[#4A4945] leading-relaxed">{work.description}</p>
          )}
        </div>
      </header>

      {/* Photo Plates Gallery */}
      {photos.length === 0 ? (
        <div className="mt-12 py-16 text-center border border-dashed border-[#141413]/15 rounded-md">
          <p className="text-sm text-[#575652]">Koleksi ini belum memiliki foto.</p>
        </div>
      ) : (
        <div
          data-testid="work-gallery-plates"
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10"
        >
          {photos.map((photo, idx) => {
            const isHeroLead = idx === 0 && photos.length % 2 === 1;
            return (
              <figure
                key={photo.id}
                className={isHeroLead ? 'md:col-span-2' : ''}
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`Perbesar foto ${idx + 1} dari ${work.title}`}
                  className="group block w-full overflow-hidden rounded-sm bg-[#ECEAE4] text-left"
                >
                  <ResilientImage
                    src={photo.url}
                    alt={photo.caption || `${work.title} — Foto ${idx + 1}`}
                    fallbackLabel={work.title}
                    loading={idx < 2 ? 'eager' : 'lazy'}
                    className={`w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015] ${
                      isHeroLead ? 'max-h-[72vh] aspect-[16/10]' : 'aspect-[4/3]'
                    }`}
                  />
                </button>
                <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-xs sm:text-sm text-[#575652]">
                  <span>{photo.caption || ''}</span>
                  <span className="font-mono text-xs tabular-nums text-[#8A8984] shrink-0">
                    {String(idx + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      )}

      {/* Adjacent Collections Navigation */}
      {(prevWork || nextWork) && (
        <nav
          aria-label="Navigasi antar koleksi"
          className="mt-20 pt-8 border-t border-[#141413]/10 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div>
            {prevWork && (
              <button
                type="button"
                onClick={() => onOpenWork(prevWork.id)}
                className="group text-left"
              >
                <span className="block text-xs text-[#73726D]">Koleksi sebelumnya</span>
                <span className="mt-1 block font-serif text-lg text-[#141413] group-hover:underline underline-offset-4">
                  {prevWork.title}
                </span>
              </button>
            )}
          </div>
          <div className="sm:text-right">
            {nextWork && (
              <button
                type="button"
                onClick={() => onOpenWork(nextWork.id)}
                className="group text-left sm:text-right"
              >
                <span className="block text-xs text-[#73726D]">Koleksi berikutnya</span>
                <span className="mt-1 block font-serif text-lg text-[#141413] group-hover:underline underline-offset-4">
                  {nextWork.title}
                </span>
              </button>
            )}
          </div>
        </nav>
      )}

      {/* Fullscreen Lightbox */}
      {activePhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Tampilan penuh foto dari ${work.title}`}
          className="fixed inset-0 z-50 bg-[#0D0D0C]/95 text-[#FAF9F7] flex flex-col justify-between p-4 sm:p-8"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-serif text-base sm:text-lg truncate">{work.title}</p>
              <p className="text-xs font-mono tabular-nums text-[#A8A7A1]">
                {lightboxIndex + 1} / {photos.length}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Tutup tampilan foto"
              className="p-2.5 rounded-md bg-white/10 text-[#FAF9F7] hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 min-h-0">
            {photos.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length)
                }
                aria-label="Foto sebelumnya"
                className="absolute left-0 sm:left-2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
            )}

            <ResilientImage
              src={activePhoto.url}
              alt={activePhoto.caption || `${work.title} — Foto ${lightboxIndex + 1}`}
              fallbackLabel={work.title}
              loading="eager"
              className="max-h-[75vh] max-w-full object-contain rounded-xs"
            />

            {photos.length > 1 && (
              <button
                type="button"
                onClick={() => setLightboxIndex((lightboxIndex + 1) % photos.length)}
                aria-label="Foto berikutnya"
                className="absolute right-0 sm:right-2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="text-center min-h-[1.5rem]">
            {activePhoto.caption && (
              <p className="text-sm text-[#D6D5D0] max-w-2xl mx-auto">{activePhoto.caption}</p>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
