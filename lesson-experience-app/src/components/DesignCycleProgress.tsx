import React from 'react';
import { CriterionType, Lesson } from '../types/curriculum';
import { CheckCircle2, ArrowRight, Info } from 'lucide-react';

interface DesignCycleProgressProps {
  lessons: Lesson[];
  activeFilter: 'all' | CriterionType | 'formative';
  onSelectFilter: (filter: 'all' | CriterionType | 'formative') => void;
  onOpenStrandModal: (strand: string, crit: CriterionType) => void;
}

export const DesignCycleProgress: React.FC<DesignCycleProgressProps> = ({
  lessons,
  activeFilter,
  onSelectFilter,
  onOpenStrandModal,
}) => {
  const critACount = lessons.filter((l) => l.criterion === 'a').length;
  const critBCount = lessons.filter((l) => l.criterion === 'b').length;
  const formativeCount = lessons.filter((l) => l.type === 'formative').length;

  // Determine stage status
  const hasA = critACount > 0;
  const hasB = critBCount > 0;
  const isAComplete = hasB; // If we're already in B, A is completed/synthesized

  return (
    <div className="bg-white dark:bg-[#162831] border border-[#d3e0e5] dark:border-[#243c48] rounded-xl p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#5a727b] dark:text-[#90a8b2] flex items-center gap-1.5">
            MYP Design Cycle Progression
          </h2>
          <p className="text-xs text-[#5a727b] dark:text-[#8ba2ad] mt-0.5">
            Click any phase to filter lesson records or inspect rubric expectations
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => onSelectFilter('all')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#14303c] text-white dark:bg-[#ecf3f6] dark:text-[#14303c]'
                : 'bg-[#f2f5f6] dark:bg-[#1a2d36] text-[#5a727b] dark:text-[#90a8b2] hover:text-[#14303c] dark:hover:text-white'
            }`}
          >
            All ({lessons.length})
          </button>
          <button
            type="button"
            onClick={() => onSelectFilter('a')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeFilter === 'a'
                ? 'bg-[#12707f] text-white'
                : 'bg-[#e0f0f2] text-[#12707f] dark:bg-[#173842] dark:text-[#43a8b8] hover:opacity-90'
            }`}
          >
            Criterion A ({critACount})
          </button>
          <button
            type="button"
            onClick={() => onSelectFilter('b')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeFilter === 'b'
                ? 'bg-[#b05a1c] text-white'
                : 'bg-[#fbeeeb] text-[#b05a1c] dark:bg-[#382417] dark:text-[#e2803b] hover:opacity-90'
            }`}
          >
            Criterion B ({critBCount})
          </button>
          <button
            type="button"
            onClick={() => onSelectFilter('formative')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeFilter === 'formative'
                ? 'bg-[#2f6b4f] text-white'
                : 'bg-[#e8f1ec] text-[#2f6b4f] dark:bg-[#183325] dark:text-[#7fceac] hover:opacity-90'
            }`}
          >
            Formatives ({formativeCount})
          </button>
        </div>
      </div>

      {/* Visual Design Cycle Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Criterion A */}
        <div
          onClick={() => onSelectFilter(activeFilter === 'a' ? 'all' : 'a')}
          className={`p-3 rounded-lg border transition-all cursor-pointer ${
            activeFilter === 'a'
              ? 'border-[#12707f] bg-[#e0f0f2]/40 dark:bg-[#173842]/40 ring-1 ring-[#12707f]'
              : 'border-[#d3e0e5] dark:border-[#243c48] bg-white dark:bg-[#1a2d36] hover:border-[#12707f]'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-xs font-semibold text-[#12707f] dark:text-[#43a8b8]">
              Criterion A
            </span>
            <span className="text-[10px] font-mono text-[#5a727b] dark:text-[#8ba2ad] px-1.5 py-0.5 rounded bg-[#f2f5f6] dark:bg-[#121c22]">
              {isAComplete ? 'Synthesized' : hasA ? 'Active' : 'Upcoming'}
            </span>
          </div>
          <p className="text-xs font-medium text-[#14303c] dark:text-[#ecf3f6] mb-1">
            Inquiring & Analysing
          </p>
          <p className="text-[11px] text-[#5a727b] dark:text-[#8ba2ad] line-clamp-1 mb-2">
            PPC Framework · Research Plan · Design Brief
          </p>
          <div className="flex items-center gap-1 text-[10.5px] font-mono text-[#12707f] dark:text-[#43a8b8]">
            <CheckCircle2 className="w-3 h-3 text-[#12707f]" />
            <span>{critACount} Sessions Logged</span>
          </div>
        </div>

        {/* Criterion B */}
        <div
          onClick={() => onSelectFilter(activeFilter === 'b' ? 'all' : 'b')}
          className={`p-3 rounded-lg border transition-all cursor-pointer ${
            activeFilter === 'b'
              ? 'border-[#b05a1c] bg-[#fbeeeb]/40 dark:bg-[#382417]/40 ring-1 ring-[#b05a1c]'
              : 'border-[#d3e0e5] dark:border-[#243c48] bg-white dark:bg-[#1a2d36] hover:border-[#b05a1c]'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-xs font-semibold text-[#b05a1c] dark:text-[#e2803b]">
              Criterion B
            </span>
            <span className="text-[10px] font-mono text-[#b05a1c] dark:text-[#e2803b] px-1.5 py-0.5 rounded bg-[#fbeeeb] dark:bg-[#382417] font-medium">
              In Progress
            </span>
          </div>
          <p className="text-xs font-medium text-[#14303c] dark:text-[#ecf3f6] mb-1">
            Developing Ideas
          </p>
          <p className="text-[11px] text-[#5a727b] dark:text-[#8ba2ad] line-clamp-1 mb-2">
            Specifications · Isometric Sketches · Schematics
          </p>
          <div className="flex items-center gap-1 text-[10.5px] font-mono text-[#b05a1c] dark:text-[#e2803b]">
            <span className="w-2 h-2 rounded-full bg-[#b05a1c] animate-pulse" />
            <span>{critBCount} Sessions Logged</span>
          </div>
        </div>

        {/* Criterion C */}
        <div className="p-3 rounded-lg border border-dashed border-[#d3e0e5] dark:border-[#243c48] bg-[#f8fafb]/60 dark:bg-[#16252d]/60 opacity-75">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-xs font-semibold text-[#5a727b] dark:text-[#8ba2ad]">
              Criterion C
            </span>
            <span className="text-[10px] font-mono text-[#5a727b] dark:text-[#8ba2ad]">
              Next Phase
            </span>
          </div>
          <p className="text-xs font-medium text-[#5a727b] dark:text-[#8ba2ad] mb-1">
            Creating the Solution
          </p>
          <p className="text-[11px] text-[#5a727b] dark:text-[#8ba2ad] line-clamp-1 mb-2">
            Technical Drawings · Circuit Assembly · Testing
          </p>
          <div className="flex items-center gap-1 text-[10.5px] font-mono text-[#5a727b] dark:text-[#8ba2ad]">
            <span>Scheduled for Unit Term 2</span>
          </div>
        </div>

        {/* Criterion D */}
        <div className="p-3 rounded-lg border border-dashed border-[#d3e0e5] dark:border-[#243c48] bg-[#f8fafb]/60 dark:bg-[#16252d]/60 opacity-60">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-xs font-semibold text-[#5a727b] dark:text-[#8ba2ad]">
              Criterion D
            </span>
            <span className="text-[10px] font-mono text-[#5a727b] dark:text-[#8ba2ad]">
              Upcoming
            </span>
          </div>
          <p className="text-xs font-medium text-[#5a727b] dark:text-[#8ba2ad] mb-1">
            Evaluating
          </p>
          <p className="text-[11px] text-[#5a727b] dark:text-[#8ba2ad] line-clamp-1 mb-2">
            Testing Methods · User Feedback · Impact
          </p>
          <div className="flex items-center gap-1 text-[10.5px] font-mono text-[#5a727b] dark:text-[#8ba2ad]">
            <span>Summative Phase</span>
          </div>
        </div>
      </div>
    </div>
  );
};
