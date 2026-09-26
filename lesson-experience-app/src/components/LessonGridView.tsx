import React from 'react';
import { Lesson, CriterionType } from '../types/curriculum';
import { Calendar, ExternalLink, Sparkles, BookOpen, AlertCircle } from 'lucide-react';

interface LessonGridViewProps {
  lessons: Lesson[];
  onOpenLesson: (lesson: Lesson) => void;
  onOpenStrandModal: (strand: string, crit: CriterionType) => void;
}

export const LessonGridView: React.FC<LessonGridViewProps> = ({
  lessons,
  onOpenLesson,
  onOpenStrandModal,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lessons.map((lesson) => {
        const isCritB = lesson.criterion === 'b';
        const isLatest = lesson.isLatest;

        return (
          <article
            key={lesson.id}
            onClick={() => onOpenLesson(lesson)}
            className={`flex flex-col justify-between bg-white dark:bg-[#162831] border rounded-2xl p-5 transition-all shadow-xs hover:shadow-md cursor-pointer ${
              isLatest
                ? 'border-[#b05a1c] ring-1 ring-[#b05a1c]/40'
                : 'border-[#d3e0e5] dark:border-[#243c48] hover:border-[#5a727b]'
            }`}
          >
            <div>
              {/* Header tags */}
              <div className="flex items-center justify-between gap-2 mb-2 text-xs font-mono text-[#5a727b] dark:text-[#90a8b2]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#5a727b]" />
                  <span>
                    {lesson.date.day ? `${lesson.date.day} ${lesson.date.mon}` : 'Scheduled'}
                  </span>
                </div>
                <span
                  className={`font-semibold ${
                    isCritB ? 'text-[#b05a1c] dark:text-[#e2803b]' : 'text-[#12707f] dark:text-[#43a8b8]'
                  }`}
                >
                  {lesson.critLabel}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-base text-[#14303c] dark:text-[#ecf3f6] mb-2 line-clamp-2">
                {lesson.title}
              </h3>

              {/* Strands */}
              <div className="flex flex-wrap items-center gap-1 mb-3">
                {lesson.strands.map((strand, i) => (
                  <span
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenStrandModal(strand, lesson.criterion);
                    }}
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#f2f5f6] dark:bg-[#1e2f38] text-[#14303c] dark:text-[#ecf3f6] border border-[#d3e0e5] dark:border-[#243c48]"
                  >
                    {strand}
                  </span>
                ))}
              </div>

              {/* Description preview */}
              <p className="text-xs text-[#5a727b] dark:text-[#90a8b2] line-clamp-3 leading-relaxed mb-4">
                {lesson.paragraphs[0] || 'Lesson overview and activities.'}
              </p>
            </div>

            {/* Footer with resources count */}
            <div className="pt-3 border-t border-[#e7eef0] dark:border-[#243c48] flex items-center justify-between text-[11px] font-mono text-[#5a727b] dark:text-[#8ba2ad]">
              <span>Session {lesson.sessionNumber}</span>
              {lesson.resources.length > 0 ? (
                <span className="flex items-center gap-1 text-[#b05a1c] dark:text-[#e2803b] font-medium">
                  <ExternalLink className="w-3 h-3" />
                  {lesson.resources.length} Resource{lesson.resources.length > 1 ? 's' : ''}
                </span>
              ) : (
                <span>No link</span>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};
