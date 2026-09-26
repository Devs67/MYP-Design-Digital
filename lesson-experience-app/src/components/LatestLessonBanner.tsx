import React from 'react';
import { Lesson } from '../types/curriculum';
import { Sparkles, ExternalLink, ArrowRight, Calendar, AlertCircle } from 'lucide-react';

interface LatestLessonBannerProps {
  lesson: Lesson;
  onOpenLesson: (lesson: Lesson) => void;
}

export const LatestLessonBanner: React.FC<LatestLessonBannerProps> = ({
  lesson,
  onOpenLesson,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-2 border-[#b05a1c] dark:border-[#e2803b] rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#b05a1c] text-white tracking-wide">
              <Sparkles className="w-3 h-3" />
              Latest Session
            </span>
            <span className="text-xs font-mono text-[#5a727b] dark:text-[#90a8b2]">
              Session {lesson.sessionNumber} · {lesson.date.day} {lesson.date.mon} {lesson.date.sub ? `(${lesson.date.sub})` : ''}
            </span>
            <span className="text-xs font-mono font-medium text-[#b05a1c] dark:text-[#e2803b]">
              · {lesson.critLabel}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-display text-[#14303c] dark:text-[#ecf3f6] tracking-tight">
            {lesson.title}
          </h2>

          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {lesson.strands.map((strand, i) => (
              <span
                key={i}
                className="text-[11px] font-mono text-[#14303c] dark:text-[#ecf3f6] bg-white/80 dark:bg-[#1a2d36] px-2 py-0.5 rounded border border-[#d3e0e5] dark:border-[#243c48]"
              >
                {strand}
              </span>
            ))}
          </div>

          {lesson.paragraphs.length > 0 && (
            <p className="text-sm text-[#5a727b] dark:text-[#90a8b2] leading-relaxed line-clamp-2">
              {lesson.paragraphs[0]}
            </p>
          )}

          {lesson.note && (
            <div className="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-[#2a221b] border border-amber-200 dark:border-amber-900/50 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#b05a1c] dark:text-[#e2803b] shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-[#14303c] dark:text-[#f0dcd0]">
                <strong className="text-[#b05a1c] dark:text-[#e2803b] mr-1">{lesson.note.label}:</strong>
                {lesson.note.text}
              </div>
            </div>
          )}
        </div>

        {/* Resources and action buttons */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 pt-2 md:pt-0">
          {lesson.resources.map((res, i) => (
            <a
              key={i}
              href={res.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-3 px-3.5 py-2 text-xs font-medium text-[#14303c] dark:text-[#ecf3f6] bg-white dark:bg-[#1e2f38] hover:bg-[#f2f5f6] dark:hover:bg-[#263c48] border border-[#d3e0e5] dark:border-[#243c48] rounded-xl transition-all shadow-2xs group"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="font-mono text-[10px] uppercase text-[#b05a1c] font-semibold">
                  {res.label}
                </span>
                <span className="truncate max-w-[150px]">{res.text}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#5a727b] group-hover:text-[#b05a1c] shrink-0" />
            </a>
          ))}

          <button
            type="button"
            onClick={() => onOpenLesson(lesson)}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#b05a1c] hover:bg-[#974d17] rounded-xl transition-colors cursor-pointer shadow-2xs"
          >
            <span>View Full Lesson Record</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
