import { useState } from 'react';
import { AboutMe } from './components/AboutMe';
import { EssaysIndex } from './components/EssaysIndex';
import { EssayReader } from './components/EssayReader';
import { Header } from './components/Header';
import { WorkDetail } from './components/WorkDetail';
import { WorksIndex } from './components/WorksIndex';
import { INITIAL_CONTENT } from './data/seedContent';
import type { AppSection, SortOrder } from './types/content';
import { normalizeOrder } from './utils/contentLogic';

const ARCHIVE_WORKS = normalizeOrder(INITIAL_CONTENT.works);
const ARCHIVE_ESSAYS = normalizeOrder(INITIAL_CONTENT.essays);
const TOTAL_PHOTOS = ARCHIVE_WORKS.reduce(
  (sum, work) => sum + Math.max(work.photos.length, work.coverImage ? 1 : 0),
  0
);

export default function App() {
  const [section, setSection] = useState<AppSection>('works');
  const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);
  const [selectedEssayId, setSelectedEssayId] = useState<string | null>(null);

  const [worksQuery, setWorksQuery] = useState('');
  const [worksSort, setWorksSort] = useState<SortOrder>('custom');
  const [essaysQuery, setEssaysQuery] = useState('');
  const [essaysSort, setEssaysSort] = useState<SortOrder>('custom');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (nextSection: AppSection) => {
    setSection(nextSection);
    setSelectedWorkId(null);
    setSelectedEssayId(null);
    scrollToTop();
  };

  const handleOpenWork = (workId: string) => {
    setSection('works');
    setSelectedWorkId(workId);
    setSelectedEssayId(null);
    scrollToTop();
  };

  const handleOpenEssay = (essayId: string) => {
    setSection('essays');
    setSelectedEssayId(essayId);
    setSelectedWorkId(null);
    scrollToTop();
  };

  const activeWork = selectedWorkId
    ? ARCHIVE_WORKS.find((w) => w.id === selectedWorkId) ?? null
    : null;
  const activeEssay = selectedEssayId
    ? ARCHIVE_ESSAYS.find((e) => e.id === selectedEssayId) ?? null
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] text-[#141413]">
      <Header activeSection={section} onNavigate={handleNavigate} />

      <main className="flex-1">
        {section === 'works' &&
          (activeWork ? (
            <WorkDetail
              work={activeWork}
              allWorks={ARCHIVE_WORKS}
              onBack={() => setSelectedWorkId(null)}
              onOpenWork={handleOpenWork}
            />
          ) : (
            <WorksIndex
              works={ARCHIVE_WORKS}
              searchQuery={worksQuery}
              onSearchChange={setWorksQuery}
              sortOrder={worksSort}
              onSortChange={setWorksSort}
              onOpenWork={handleOpenWork}
            />
          ))}

        {section === 'essays' &&
          (activeEssay ? (
            <EssayReader
              essay={activeEssay}
              allEssays={ARCHIVE_ESSAYS}
              onBack={() => setSelectedEssayId(null)}
              onOpenEssay={handleOpenEssay}
            />
          ) : (
            <EssaysIndex
              essays={ARCHIVE_ESSAYS}
              searchQuery={essaysQuery}
              onSearchChange={setEssaysQuery}
              sortOrder={essaysSort}
              onSortChange={setEssaysSort}
              onOpenEssay={handleOpenEssay}
            />
          ))}

        {section === 'about' && (
          <AboutMe
            worksCount={ARCHIVE_WORKS.length}
            photosCount={TOTAL_PHOTOS}
            essaysCount={ARCHIVE_ESSAYS.length}
            onNavigateWorks={() => handleNavigate('works')}
            onNavigateEssays={() => handleNavigate('essays')}
          />
        )}
      </main>

      <footer className="border-t border-[#141413]/10 bg-[#FAF9F7]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#575652]">
          <p className="font-serif text-sm text-[#141413]">Ibar Daiwani Archive&apos;s</p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => handleNavigate('works')}
              className="hover:text-[#141413] transition-colors"
            >
              Works
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('essays')}
              className="hover:text-[#141413] transition-colors"
            >
              Essays
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('about')}
              className="hover:text-[#141413] transition-colors"
            >
              About Me
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
