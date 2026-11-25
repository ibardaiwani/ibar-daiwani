import type { AppSection } from '../types/content';

interface HeaderProps {
  activeSection: AppSection;
  onNavigate: (section: AppSection) => void;
}

export function Header({ activeSection, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF9F7]/95 backdrop-blur-sm border-b border-[#141413]/10">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('works')}
          className="font-serif text-base sm:text-xl font-medium tracking-tight text-[#141413] hover:opacity-75 transition-opacity whitespace-nowrap shrink-0"
        >
          Ibar Daiwani Archive&apos;s
        </button>

        {/* Zone 2: Clean typography navigation links */}
        <nav aria-label="Navigasi utama" className="flex items-center gap-4 sm:gap-8">
          <button
            type="button"
            onClick={() => onNavigate('works')}
            aria-current={activeSection === 'works' ? 'page' : undefined}
            className={`relative py-1 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'works'
                ? 'text-[#141413]'
                : 'text-[#575652] hover:text-[#141413]'
            }`}
          >
            Works
            {activeSection === 'works' && (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#141413]"
              />
            )}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('essays')}
            aria-current={activeSection === 'essays' ? 'page' : undefined}
            className={`relative py-1 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'essays'
                ? 'text-[#141413]'
                : 'text-[#575652] hover:text-[#141413]'
            }`}
          >
            Essays
            {activeSection === 'essays' && (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#141413]"
              />
            )}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('about')}
            aria-current={activeSection === 'about' ? 'page' : undefined}
            className={`relative py-1 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'about'
                ? 'text-[#141413]'
                : 'text-[#575652] hover:text-[#141413]'
            }`}
          >
            About Me
            {activeSection === 'about' && (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#141413]"
              />
            )}
          </button>
        </nav>

        {/* Zone 3: Single Visitor Action (Desktop) */}
        <div className="hidden sm:flex items-center shrink-0">
          <a
            href="mailto:ibardaiwanii@gmail.com"
            className="px-4 py-2 text-xs sm:text-sm font-medium rounded-md border border-[#141413]/20 bg-white text-[#141413] hover:bg-[#141413] hover:text-[#FAF9F7] hover:border-[#141413] transition-colors whitespace-nowrap shrink-0"
          >
            Kontak
          </a>
        </div>
      </div>
    </header>
  );
}
