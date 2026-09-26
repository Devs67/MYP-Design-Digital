import React from 'react';
import { Lesson, CriterionType } from '../types/curriculum';
import { ExternalLink, Calendar, CheckCircle2, ChevronRight, FileText, Sparkles, BookOpen, AlertCircle } from 'lucide-react';

interface LessonTimelineViewProps {
  lessons: Lesson[];
  searchQuery: string;
  onOpenLesson: (lesson: Lesson) => void;
  onOpenStrandModal: (strand: string, crit: CriterionType) => void;
}

export const LessonTimelineView: React.FC<LessonTimelineViewProps> = ({
  lessons,
  searchQuery,
  onOpenLesson,
  onOpenStrandModal,
}) => {
  if (lessons.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-[#162831] border border-[#d3e0e5] dark:border-[#243c48] rounded-2xl p-8">
        <BookOpen className="w-10 h-10 text-[#5a727b] mx-auto mb-3 opacity-50" />
        <h3 className="text-base font-semibold text-[#14303c] dark:text-[#ecf3f6] mb-1">
          No lessons found matching your filters
        </h3>
        <p className="text-sm text-[#5a727b] dark:text-[#90a8b2]">
          Try clearing your search query &ldquo;{searchQuery}&rdquo; or adjusting the criterion filters above.
        </p>
      </div>
    );
  }

  return (
    <div className="relative pl-4 sm:pl-8 space-y-6 sm:space-y-8 before:absolute before:left-[17px] sm:before:left-[33px] before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-[#12707f] before:via-[#b05a1c] before:to-[#d3e0e5] dark:before:to-[#243c48]">
      {lessons.map((lesson, idx) => {
        const isCritB = lesson.criterion === 'b';
        const critColor = isCritB ? '#b05a1c' : '#12707f';
        const isLatest = lesson.isLatest;

        return (
          <div key={lesson.id} className="relative group">
            {/* Timeline node icon */}
            <div
              className={`absolute -left-4 sm:-left-8 top-5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 bg-white dark:bg-[#121c22] flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs z-10 ${
                isLatest
                  ? 'border-[#b05a1c] ring-4 ring-[#b05a1c]/20'
                  : isCritB
                  ? 'border-[#b05a1c]'
                  : 'border-[#12707f]'
              }`}
            >
              {isLatest ? (
                <Sparkles className="w-3.5 h-3.5 text-[#b05a1c]" />
              ) : (
                <span className="font-mono text-[10px] sm:text-xs font-bold text-[#14303c] dark:text-[#ecf3f6]">
                  {lesson.sessionNumber}
                </span>
              )}
            </div>

            {/* Lesson Card */}
            <article
              className={`ml-6 sm:ml-8 bg-white dark:bg-[#162831] border rounded-2xl p-5 sm:p-6 transition-all shadow-xs hover:shadow-md ${
                isLatest
                  ? 'border-[#b05a1c] ring-1 ring-[#b05a1c]/50'
                  : 'border-[#d3e0e5] dark:border-[#243c48] hover:border-[#5a727b]'
              }`}
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 mb-3">
                <div>
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#5a727b] dark:text-[#90a8b2] mb-1.5">
                    <span className="font-semibold text-[#14303c] dark:text-[#ecf3f6]">
                      Session {lesson.sessionNumber}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#5a727b]" />
                      {lesson.date.day ? `${lesson.date.day} ${lesson.date.mon}` : 'Scheduled'}
                      {lesson.date.sub && <span className="text-[11px] opacity-80">({lesson.date.sub})</span>}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={`font-semibold ${
                        isCritB ? 'text-[#b05a1c] dark:text-[#e2803b]' : 'text-[#12707f] dark:text-[#43a8b8]'
                      }`}
                    >
                      {lesson.critLabel}
                    </span>
                    {lesson.type === 'formative' && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#2f6b4f] dark:text-[#7fceac] font-semibold">
                          Formative Assessment
                        </span>
                      </>
                    )}
                    {isLatest && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#b05a1c] dark:text-[#e2803b] font-bold">
                          Latest Delivered
                        </span>
                      </>
                    )}
                  </div>

                  <h3
                    onClick={() => onOpenLesson(lesson)}
                    className="text-lg sm:text-xl font-bold font-display text-[#14303c] dark:text-[#ecf3f6] hover:text-[#b05a1c] dark:hover:text-[#e2803b] transition-colors cursor-pointer"
                  >
                    {lesson.title}
                  </h3>
                </div>

                {/* Strands chips */}
                {lesson.strands.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                    {lesson.strands.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => onOpenStrandModal(s, lesson.criterion)}
                        className="text-[10.5px] font-mono font-medium px-2 py-0.5 rounded bg-[#f2f5f6] dark:bg-[#1e2f38] text-[#14303c] dark:text-[#ecf3f6] hover:bg-[#e7eef0] dark:hover:bg-[#283e4a] border border-[#d3e0e5] dark:border-[#243c48] transition-colors cursor-pointer"
                        title="Click to view IB Strand assessment guidelines"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Body paragraphs */}
              <div className="space-y-2.5 text-sm text-[#14303c]/90 dark:text-[#ecf3f6]/90 leading-relaxed">
                {lesson.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* List items if any */}
              {lesson.listItems && lesson.listItems.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-sm text-[#14303c]/90 dark:text-[#ecf3f6]/90 list-disc list-inside">
                  {lesson.listItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {/* Fields if any (e.g. from MYP 4 timeline) */}
              {lesson.fields && lesson.fields.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[#e7eef0] dark:border-[#243c48] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {lesson.fields.map((f, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="font-mono text-[10px] uppercase text-[#5a727b] dark:text-[#8ba2ad]">
                        {f.label}
                      </span>
                      <span className="font-medium text-[#14303c] dark:text-[#ecf3f6]">
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Note / Follow-up callout */}
              {lesson.note && (
                <div className="mt-4 p-3 rounded-xl bg-[#fbeeeb]/60 dark:bg-[#2e2018]/60 border border-[#f3ddc9] dark:border-[#4d2f1d] text-xs leading-relaxed text-[#14303c] dark:text-[#f0dcd0]">
                  <strong className="text-[#b05a1c] dark:text-[#e2803b] mr-1">
                    {lesson.note.label}:
                  </strong>
                  {lesson.note.text}
                </div>
              )}

              {/* Quote if any */}
              {lesson.quote && (
                <div className="mt-3 p-2.5 rounded-lg bg-[#f2f5f6] dark:bg-[#1a2b34] text-xs italic text-[#5a727b] dark:text-[#a0b5bf] border-l-2 border-[#12707f]">
                  <strong>{lesson.quote.label ? `${lesson.quote.label}: ` : ''}</strong>
                  {lesson.quote.text}
                </div>
              )}

              {/* Meta block if any (ATL / Profile) */}
              {lesson.meta && lesson.meta.items.length > 0 && (
                <div className="mt-3 p-3 rounded-xl bg-[#f8fafb] dark:bg-[#13222a] border border-[#e7eef0] dark:border-[#243c48]">
                  <span className="text-[10px] font-mono uppercase text-[#5a727b] dark:text-[#8ba2ad] block mb-2 font-semibold">
                    {lesson.meta.title || 'Curriculum Connections'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {lesson.meta.items.map((it, i) => (
                      <div key={i}>
                        <span className="text-[9.5px] font-mono text-[#b05a1c] dark:text-[#e2803b] block">
                          {it.label}
                        </span>
                        <p className="text-xs text-[#5a727b] dark:text-[#a0b5bf] leading-tight">
                          {it.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources row */}
              <div className="mt-4 pt-3.5 border-t border-[#e7eef0] dark:border-[#243c48] flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  {lesson.resources.map((res, i) => (
                    <a
                      key={i}
                      href={res.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#14303c] dark:text-[#ecf3f6] bg-[#f8fafb] dark:bg-[#1c2e37] hover:bg-[#e7eef0] dark:hover:bg-[#253d49] border border-[#d3e0e5] dark:border-[#243c48] rounded-lg transition-colors group/link"
                    >
                      <span className="font-mono text-[9.5px] uppercase font-semibold text-[#b05a1c] dark:text-[#e2803b]">
                        {res.label}
                      </span>
                      <span className="truncate max-w-[200px]">{res.text}</span>
                      <ExternalLink className="w-3 h-3 text-[#5a727b] group-hover/link:text-[#b05a1c]" />
                    </a>
                  ))}

                  {lesson.hasNoResource && (
                    <span className="text-xs italic text-[#5a727b] dark:text-[#8ba2ad]">
                      No external resource attached to this session.
                    </span>
                  )}
                </div>

                {lesson.extraNote && (
                  <span className="text-[11px] font-mono text-[#5a727b] dark:text-[#8ba2ad]">
                    {lesson.extraNote}
                  </span>
                )}
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
};
