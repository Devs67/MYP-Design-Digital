import React from 'react';
import { ClassData } from '../types/curriculum';
import { Radio, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

interface ClassSelectorProps {
  classes: Record<string, ClassData>;
  selectedClassId: string;
  onSelectClass: (id: string) => void;
}

export const ClassSelector: React.FC<ClassSelectorProps> = ({
  classes,
  selectedClassId,
  onSelectClass,
}) => {
  const classList = Object.values(classes);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-xs font-mono tracking-wider uppercase text-[#5a727b] dark:text-[#90a8b2]">
          Select Class Section
        </h2>
        <span className="text-xs font-mono text-[#5a727b] dark:text-[#90a8b2]">
          {classList.length} Cohorts Active
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5" role="tablist" aria-label="Class Selector">
        {classList.map((cls) => {
          const isSelected = cls.id === selectedClassId;
          const isLive = cls.status === 'Live';
          const sessionCount = cls.lessons.length;
          
          return (
            <button
              key={cls.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelectClass(cls.id)}
              className={`group relative text-left p-3 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white dark:bg-[#1a2d36] border-[#b05a1c] shadow-md shadow-[#b05a1c]/10 ring-1 ring-[#b05a1c]'
                  : 'bg-white/80 dark:bg-[#16252d] border-[#d3e0e5] dark:border-[#243c48] hover:border-[#5a727b] hover:bg-white dark:hover:bg-[#1a2d36]'
              }`}
            >
              {/* Header badge row */}
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="font-mono text-[11px] font-semibold tracking-wider text-[#14303c] dark:text-[#ecf3f6]">
                  {cls.name}
                </span>

                <span
                  className={`text-[9.5px] font-mono tracking-wide px-1.5 py-0.5 rounded ${
                    isLive
                      ? 'bg-[#e8f1ec] text-[#2f6b4f] dark:bg-[#183325] dark:text-[#7fceac]'
                      : 'bg-[#e7eef0] text-[#5a727b] dark:bg-[#1f3038] dark:text-[#90a8b2]'
                  }`}
                >
                  {isLive ? 'Live' : 'Upcoming'}
                </span>
              </div>

              {/* Unit name */}
              <p className="text-xs font-medium text-[#5a727b] dark:text-[#a0b5bf] line-clamp-1 mb-2">
                {cls.unitTitle}
              </p>

              {/* Status info footer */}
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#5a727b] dark:text-[#8ba2ad] pt-1.5 border-t border-[#e7eef0] dark:border-[#243c48]">
                {isLive ? (
                  <>
                    <CheckCircle2 className={`w-3 h-3 ${isSelected ? 'text-[#b05a1c]' : 'text-[#2f6b4f]'}`} />
                    <span>{sessionCount} sessions</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-3 h-3 text-[#5a727b]" />
                    <span>Term 2</span>
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
