import React, { useState, useEffect, useMemo } from 'react';
import { CLASSES_DATA } from './data/curriculumData';
import { Lesson, CriterionType, ClassData } from './types/curriculum';
import { TopBar } from './components/TopBar';
import { ClassSelector } from './components/ClassSelector';
import { UnitHero } from './components/UnitHero';
import { DesignCycleProgress } from './components/DesignCycleProgress';
import { LatestLessonBanner } from './components/LatestLessonBanner';
import { LessonTimelineView } from './components/LessonTimelineView';
import { LessonGridView } from './components/LessonGridView';
import { CurriculumBlueprintView } from './components/CurriculumBlueprintView';
import { ResourceLockerView } from './components/ResourceLockerView';
import { ProjectorPresentationModal } from './components/ProjectorPresentationModal';
import { DesignQuoteModal } from './components/DesignQuoteModal';
import { StrandDetailModal } from './components/StrandDetailModal';
import { LessonDetailModal } from './components/LessonDetailModal';
import { Search, Filter, Layers, ListFilter, RotateCcw, Clock, Sparkles } from 'lucide-react';

export default function App() {
  // Theme state: ?theme= in the URL (site convention), else the system setting
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = new URLSearchParams(window.location.search).get('theme');
      if (saved === 'dark' || saved === 'light') return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Read initial class from URL query ?class=myp2a
  const [selectedClassId, setSelectedClassId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cls = params.get('class');
      if (cls && CLASSES_DATA[cls]) {
        return cls;
      }
    }
    return 'myp2a';
  });

  // Active view: timeline | cards | blueprint | resources
  const [activeView, setActiveView] = useState<'timeline' | 'cards' | 'blueprint' | 'resources'>('timeline');

  // Filter: all | a | b | formative
  const [activeFilter, setActiveFilter] = useState<'all' | CriterionType | 'formative'>('all');

  // Search input
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isProjectorOpen, setIsProjectorOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedLessonForModal, setSelectedLessonForModal] = useState<Lesson | null>(null);
  const [strandModalData, setStrandModalData] = useState<{
    isOpen: boolean;
    strand: string | null;
    criterion: CriterionType;
  }>({
    isOpen: false,
    strand: null,
    criterion: 'a',
  });

  // Sync theme to <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('theme', isDark ? 'dark' : 'light');
      window.history.replaceState({}, '', url.toString());
    } catch (e) {
      // ignore
    }
  }, [isDark]);

  // Sync class to URL query without full page reload
  const handleSelectClass = (classId: string) => {
    setSelectedClassId(classId);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('class', classId);
      window.history.replaceState({}, '', url.toString());
    } catch (e) {
      // ignore
    }
  };

  const currentClass: ClassData = CLASSES_DATA[selectedClassId] || CLASSES_DATA['myp2a'];

  // Handle grade navigation in topbar
  const handleSelectGrade = (gradeKey: string) => {
    if (gradeKey === 'myp1-2') {
      if (selectedClassId !== 'myp2a' && selectedClassId !== 'myp2d' && selectedClassId !== 'myp1b') {
        handleSelectClass('myp2a');
      }
    } else if (gradeKey === 'myp3') {
      handleSelectClass('myp3b');
    } else if (gradeKey === 'myp4-5') {
      handleSelectClass('myp4');
    }
  };

  // Find latest lesson
  const latestLesson = useMemo(() => {
    return currentClass.lessons.find((l) => l.isLatest);
  }, [currentClass]);

  // Filtered lessons
  const filteredLessons = useMemo(() => {
    return currentClass.lessons.filter((lesson) => {
      // Filter by criterion
      if (activeFilter !== 'all') {
        if (activeFilter === 'formative') {
          if (lesson.type !== 'formative') return false;
        } else if (lesson.criterion !== activeFilter) {
          return false;
        }
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = lesson.title.toLowerCase().includes(q);
        const matchesParas = lesson.paragraphs.some((p) => p.toLowerCase().includes(q));
        const matchesStrand = lesson.strands.some((s) => s.toLowerCase().includes(q));
        const matchesRes = lesson.resources.some((r) => r.text.toLowerCase().includes(q));
        const matchesNote = lesson.note?.text.toLowerCase().includes(q);
        return matchesTitle || matchesParas || matchesStrand || matchesRes || matchesNote;
      }

      return true;
    });
  }, [currentClass, activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f2f5f6] dark:bg-[#0f171d] text-[#14303c] dark:text-[#ecf3f6] flex flex-col font-sans transition-colors selection:bg-[#b05a1c]/20 selection:text-[#b05a1c]">
      {/* 3-zone Header */}
      <TopBar
        currentGrade={currentClass.grade}
        onSelectGrade={handleSelectGrade}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onOpenQuotes={() => setIsQuoteModalOpen(true)}
        onOpenProjector={() => setIsProjectorOpen(true)}
        activeView={activeView}
        onSelectView={setActiveView}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 flex-1">
        {/* Class Selection Deck */}
        <section aria-label="Class Selection">
          <ClassSelector
            classes={CLASSES_DATA}
            selectedClassId={selectedClassId}
            onSelectClass={handleSelectClass}
          />
        </section>

        {/* Unit Overview Hero */}
        <section aria-label="Unit Overview">
          <UnitHero currentClass={currentClass} />
        </section>

        {/* MYP Design Cycle Progress / Stage Filter */}
        <section aria-label="Design Cycle Progress">
          <DesignCycleProgress
            lessons={currentClass.lessons}
            activeFilter={activeFilter}
            onSelectFilter={setActiveFilter}
            onOpenStrandModal={(strand, crit) =>
              setStrandModalData({ isOpen: true, strand, criterion: crit })
            }
          />
        </section>

        {/* Latest Active Lesson Spotlight (if not filtered out and on timeline/cards view) */}
        {latestLesson && activeFilter === 'all' && !searchQuery && (activeView === 'timeline' || activeView === 'cards') && (
          <section aria-label="Current Lesson Focus">
            <LatestLessonBanner
              lesson={latestLesson}
              onOpenLesson={(lesson) => setSelectedLessonForModal(lesson)}
            />
          </section>
        )}

        {/* View Header with Search & Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#d3e0e5] dark:border-[#243c48]">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-mono uppercase tracking-wider text-[#14303c] dark:text-[#ecf3f6] font-bold">
              {activeView === 'timeline' && 'Chronological Lesson Stream'}
              {activeView === 'cards' && 'Curriculum Session Cards'}
              {activeView === 'blueprint' && 'MYP Strands Assessment Blueprint'}
              {activeView === 'resources' && 'Learning Artifacts & Tool Locker'}
            </h2>
            <span className="text-xs font-mono text-[#5a727b] dark:text-[#8ba2ad]">
              ({filteredLessons.length} {filteredLessons.length === 1 ? 'record' : 'records'})
            </span>
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#5a727b] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search lessons, tools, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-[#162831] border border-[#d3e0e5] dark:border-[#243c48] rounded-lg text-[#14303c] dark:text-[#ecf3f6] focus:outline-none focus:border-[#b05a1c]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-xs text-[#5a727b] hover:text-[#14303c] cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mobile View Selector Pills */}
            <div className="flex md:hidden items-center gap-1 bg-white dark:bg-[#162831] p-1 rounded-lg border border-[#d3e0e5] dark:border-[#243c48]">
              <button
                type="button"
                onClick={() => setActiveView('timeline')}
                className={`px-2 py-1 text-xs rounded ${activeView === 'timeline' ? 'bg-[#b05a1c] text-white font-medium' : 'text-[#5a727b]'}`}
              >
                Time
              </button>
              <button
                type="button"
                onClick={() => setActiveView('cards')}
                className={`px-2 py-1 text-xs rounded ${activeView === 'cards' ? 'bg-[#b05a1c] text-white font-medium' : 'text-[#5a727b]'}`}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setActiveView('blueprint')}
                className={`px-2 py-1 text-xs rounded ${activeView === 'blueprint' ? 'bg-[#b05a1c] text-white font-medium' : 'text-[#5a727b]'}`}
              >
                Map
              </button>
            </div>
          </div>
        </div>

        {/* View Switcher Output */}
        <section aria-label="Session View Content" className="min-h-[350px]">
          {activeView === 'timeline' && (
            <LessonTimelineView
              lessons={filteredLessons}
              searchQuery={searchQuery}
              onOpenLesson={(lesson) => setSelectedLessonForModal(lesson)}
              onOpenStrandModal={(strand, crit) =>
                setStrandModalData({ isOpen: true, strand, criterion: crit })
              }
            />
          )}

          {activeView === 'cards' && (
            <LessonGridView
              lessons={filteredLessons}
              onOpenLesson={(lesson) => setSelectedLessonForModal(lesson)}
              onOpenStrandModal={(strand, crit) =>
                setStrandModalData({ isOpen: true, strand, criterion: crit })
              }
            />
          )}

          {activeView === 'blueprint' && (
            <CurriculumBlueprintView
              lessons={currentClass.lessons}
              onOpenLesson={(lesson) => setSelectedLessonForModal(lesson)}
              onOpenStrandModal={(strand, crit) =>
                setStrandModalData({ isOpen: true, strand, criterion: crit })
              }
            />
          )}

          {activeView === 'resources' && (
            <ResourceLockerView lessons={currentClass.lessons} />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#d3e0e5] dark:border-[#243c48] bg-white dark:bg-[#121c22] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#5a727b] dark:text-[#8ba2ad]">
          <div>
            <span>MYP Digital Design · {currentClass.title}</span>
            <span className="mx-2">·</span>
            <span>Criterion A → Criterion B In Progress</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-[#14303c] dark:hover:text-white transition-colors cursor-pointer"
            >
              ↑ Back to top
            </button>
            <span>·</span>
            <span>Record of delivered sessions</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProjectorPresentationModal
        isOpen={isProjectorOpen}
        onClose={() => setIsProjectorOpen(false)}
        lessons={currentClass.lessons}
        unitTitle={currentClass.unitTitle}
      />

      <DesignQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      <StrandDetailModal
        isOpen={strandModalData.isOpen}
        onClose={() => setStrandModalData({ isOpen: false, strand: null, criterion: 'a' })}
        selectedStrand={strandModalData.strand}
        criterion={strandModalData.criterion}
      />

      <LessonDetailModal
        lesson={selectedLessonForModal}
        onClose={() => setSelectedLessonForModal(null)}
        onOpenStrandModal={(strand, crit) => {
          setSelectedLessonForModal(null);
          setStrandModalData({ isOpen: true, strand, criterion: crit });
        }}
      />
    </div>
  );
}
