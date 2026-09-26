import React from 'react';
import { Sun, Moon, Sparkles, MonitorPlay, BookOpen } from 'lucide-react';

interface TopBarProps {
  currentGrade: string;
  onSelectGrade: (grade: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenQuotes: () => void;
  onOpenProjector: () => void;
  activeView: 'timeline' | 'cards' | 'blueprint' | 'resources';
  onSelectView: (view: 'timeline' | 'cards' | 'blueprint' | 'resources') => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentGrade,
  onSelectGrade,
  isDark,
  onToggleTheme,
  onOpenQuotes,
  onOpenProjector,
  activeView,
  onSelectView,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#121c22]/95 backdrop-blur-md border-b border-[#d3e0e5] dark:border-[#243c48] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="." 
          className="text-lg md:text-xl font-display font-bold tracking-tight text-[#14303c] dark:text-[#ecf3f6] hover:opacity-80 transition-opacity truncate"
        >
          MYP Digital Design
        </a>

        {/* Zone 2: Clean navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#5a727b] dark:text-[#90a8b2]" aria-label="Main Navigation">
          <button
            type="button"
            onClick={() => onSelectGrade('myp1-2')}
            className={`cursor-pointer transition-colors pb-1 border-b-2 ${
              currentGrade === 'MYP 1' || currentGrade === 'MYP 2'
                ? 'text-[#14303c] dark:text-white border-[#b05a1c] font-semibold'
                : 'border-transparent hover:text-[#14303c] dark:hover:text-white'
            }`}
          >
            MYP 1–2
          </button>
          <button
            type="button"
            onClick={() => onSelectGrade('myp3')}
            className={`cursor-pointer transition-colors pb-1 border-b-2 ${
              currentGrade === 'MYP 3'
                ? 'text-[#14303c] dark:text-white border-[#b05a1c] font-semibold'
                : 'border-transparent hover:text-[#14303c] dark:hover:text-white'
            }`}
          >
            MYP 3
          </button>
          <button
            type="button"
            onClick={() => onSelectGrade('myp4-5')}
            className={`cursor-pointer transition-colors pb-1 border-b-2 ${
              currentGrade === 'MYP 4' || currentGrade === 'MYP 5'
                ? 'text-[#14303c] dark:text-white border-[#b05a1c] font-semibold'
                : 'border-transparent hover:text-[#14303c] dark:hover:text-white'
            }`}
          >
            MYP 4–5
          </button>
          
          <span className="text-[#d3e0e5] dark:text-[#243c48]">|</span>

          <div className="flex items-center gap-1 bg-[#f2f5f6] dark:bg-[#1a2b34] p-1 rounded-lg border border-[#d3e0e5]/80 dark:border-[#243c48]">
            <button
              type="button"
              onClick={() => onSelectView('timeline')}
              className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeView === 'timeline'
                  ? 'bg-white dark:bg-[#233844] text-[#14303c] dark:text-white font-medium shadow-xs'
                  : 'text-[#5a727b] dark:text-[#90a8b2] hover:text-[#14303c] dark:hover:text-white'
              }`}
            >
              Timeline
            </button>
            <button
              type="button"
              onClick={() => onSelectView('cards')}
              className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeView === 'cards'
                  ? 'bg-white dark:bg-[#233844] text-[#14303c] dark:text-white font-medium shadow-xs'
                  : 'text-[#5a727b] dark:text-[#90a8b2] hover:text-[#14303c] dark:hover:text-white'
              }`}
            >
              Cards
            </button>
            <button
              type="button"
              onClick={() => onSelectView('blueprint')}
              className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeView === 'blueprint'
                  ? 'bg-white dark:bg-[#233844] text-[#14303c] dark:text-white font-medium shadow-xs'
                  : 'text-[#5a727b] dark:text-[#90a8b2] hover:text-[#14303c] dark:hover:text-white'
              }`}
            >
              Rubric Map
            </button>
            <button
              type="button"
              onClick={() => onSelectView('resources')}
              className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeView === 'resources'
                  ? 'bg-white dark:bg-[#233844] text-[#14303c] dark:text-white font-medium shadow-xs'
                  : 'text-[#5a727b] dark:text-[#90a8b2] hover:text-[#14303c] dark:hover:text-white'
              }`}
            >
              Resources
            </button>
          </div>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenProjector}
            title="Classroom Projector Mode (Full-screen for whiteboard)"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#14303c] dark:text-[#ecf3f6] bg-[#f2f5f6] dark:bg-[#1a2b34] hover:bg-[#e7eef0] dark:hover:bg-[#233844] border border-[#d3e0e5] dark:border-[#243c48] rounded-lg transition-colors cursor-pointer"
          >
            <MonitorPlay className="w-3.5 h-3.5 text-[#b05a1c]" />
            <span className="hidden sm:inline">Projector</span>
          </button>

          <button
            type="button"
            onClick={onOpenQuotes}
            title="Daily Design Principle"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#14303c] dark:text-[#ecf3f6] bg-[#f2f5f6] dark:bg-[#1a2b34] hover:bg-[#e7eef0] dark:hover:bg-[#233844] border border-[#d3e0e5] dark:border-[#243c48] rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#12707f]" />
            <span className="hidden sm:inline">Inspire</span>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-[#5a727b] dark:text-[#90a8b2] hover:text-[#14303c] dark:hover:text-white bg-[#f2f5f6] dark:bg-[#1a2b34] border border-[#d3e0e5] dark:border-[#243c48] transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
