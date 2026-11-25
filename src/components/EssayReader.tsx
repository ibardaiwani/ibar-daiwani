import { ArrowLeft } from 'lucide-react';
import type { EssayArticle } from '../types/content';
import { estimateReadingMinutes, formatDisplayDate } from '../utils/contentLogic';
import { ResilientImage } from './ResilientImage';

interface EssayReaderProps {
  essay: EssayArticle;
  allEssays: EssayArticle[];
  onBack: () => void;
  onOpenEssay: (essayId: string) => void;
}

export function EssayReader({
  essay,
  allEssays,
  onBack,
  onOpenEssay,
}: EssayReaderProps) {
  const paragraphs = essay.body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const minutes = estimateReadingMinutes(essay.body);
  const currentIdx = allEssays.findIndex((item) => item.id === essay.id);
  const prevEssay = currentIdx > 0 ? allEssays[currentIdx - 1] : null;
  const nextEssay =
    currentIdx >= 0 && currentIdx < allEssays.length - 1 ? allEssays[currentIdx + 1] : null;

  return (
    <article className="mx-auto max-w-[740px] px-4 sm:px-8 pt-8 sm:pt-12 pb-24">
      {/* Top Action Row */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-[#575652] hover:text-[#141413] transition-colors whitespace-nowrap"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali ke Essays
        </button>
      </div>

      {/* Article Header */}
      <header className="mt-10 pb-8 border-b border-[#141413]/10">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tabular-nums text-[#575652]">
          <time dateTime={essay.publishedAt}>{formatDisplayDate(essay.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{minutes} menit baca</span>
        </div>

        <h1 className="mt-4 font-serif text-3xl sm:text-[42px] font-medium tracking-tight text-[#141413] leading-[1.18]">
          {essay.title}
        </h1>

        {essay.excerpt && (
          <p className="mt-5 font-serif text-lg sm:text-xl text-[#4A4945] leading-relaxed italic">
            {essay.excerpt}
          </p>
        )}
      </header>

      {/* Optional Supporting Image */}
      {essay.supportingImage && (
        <figure className="mt-10">
          <div className="overflow-hidden rounded-sm bg-[#ECEAE4]">
            <ResilientImage
              src={essay.supportingImage}
              alt={essay.supportingImageCaption || essay.title}
              fallbackLabel={essay.title}
              loading="eager"
              className="w-full max-h-[60vh] object-cover"
            />
          </div>
          {essay.supportingImageCaption && (
            <figcaption className="mt-3 text-xs sm:text-sm text-[#575652]">
              {essay.supportingImageCaption}
            </figcaption>
          )}
        </figure>
      )}

      {/* Editorial Body Prose */}
      <div className="mt-10 space-y-6 font-serif text-[17px] sm:text-[18px] leading-[1.85] text-[#222220]">
        {paragraphs.map((paragraph, idx) => (
          <p key={idx} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Adjacent Essays Navigation */}
      {(prevEssay || nextEssay) && (
        <nav
          aria-label="Navigasi antar tulisan"
          className="mt-16 pt-8 border-t border-[#141413]/10 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div>
            {prevEssay && (
              <button
                type="button"
                onClick={() => onOpenEssay(prevEssay.id)}
                className="group text-left"
              >
                <span className="block text-xs text-[#73726D]">Tulisan sebelumnya</span>
                <span className="mt-1 block font-serif text-lg text-[#141413] group-hover:underline underline-offset-4">
                  {prevEssay.title}
                </span>
              </button>
            )}
          </div>
          <div className="sm:text-right">
            {nextEssay && (
              <button
                type="button"
                onClick={() => onOpenEssay(nextEssay.id)}
                className="group text-left sm:text-right"
              >
                <span className="block text-xs text-[#73726D]">Tulisan berikutnya</span>
                <span className="mt-1 block font-serif text-lg text-[#141413] group-hover:underline underline-offset-4">
                  {nextEssay.title}
                </span>
              </button>
            )}
          </div>
        </nav>
      )}
    </article>
  );
}
