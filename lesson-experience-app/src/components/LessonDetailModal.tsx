import React from 'react';
import { Lesson, CriterionType } from '../types/curriculum';
import { X, Calendar, ExternalLink, Layers, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

interface LessonDetailModalProps {
  lesson: Lesson | null;
  onClose: () => void;
  onOpenStrandModal: (strand: string, crit: CriterionType) => void;
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lesson,
  onClose,
  onOpenStrandModal,
}) => {
  if (!lesson) return null;

  const isCritB = lesson.criterion === 'b';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#162831] border border-[#d3e0e5] dark:border-[#243c48] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-scaleUp">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-[#5a727b] hover:text-[#14303c] dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Metadata eyebrow */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#5a727b] dark:text-[#90a8b2] mb-2">
          <span className="font-semibold text-[#14303c] dark:text-[#ecf3f6]">
            Session {lesson.sessionNumber}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#5a727b]" />
            {lesson.date.day ? `${lesson.date.day} ${lesson.date.mon}` : 'Scheduled'}
            {lesson.date.sub && ` (${lesson.date.sub})`}
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
              <span className="text-[#2f6b4f] dark:text-[#7fceac] font-bold">
                Formative Assessment
              </span>
            </>
          )}
        </div>

        <h2 className="font-display font-bold text-2xl text-[#14303c] dark:text-[#ecf3f6] tracking-tight mb-4">
          {lesson.title}
        </h2>

        {/* Strands */}
        {lesson.strands.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {lesson.strands.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onOpenStrandModal(s, lesson.criterion)}
                className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-[#f2f5f6] dark:bg-[#1a2d36] text-[#14303c] dark:text-[#ecf3f6] border border-[#d3e0e5] dark:border-[#243c48] hover:border-[#b05a1c] cursor-pointer transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Body content */}
        <div className="space-y-3 text-sm text-[#14303c]/90 dark:text-[#ecf3f6]/90 leading-relaxed mb-6">
          {lesson.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {lesson.listItems && lesson.listItems.length > 0 && (
          <ul className="mb-6 space-y-1.5 text-sm text-[#14303c]/90 dark:text-[#ecf3f6]/90 list-disc list-inside">
            {lesson.listItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}

        {/* Fields */}
        {lesson.fields && lesson.fields.length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-[#f8fafb] dark:bg-[#13222a] border border-[#e7eef0] dark:border-[#243c48] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {lesson.fields.map((f, i) => (
              <div key={i}>
                <span className="font-mono text-[10px] uppercase text-[#5a727b] dark:text-[#8ba2ad] block">
                  {f.label}
                </span>
                <span className="font-medium text-[#14303c] dark:text-[#ecf3f6]">
                  {f.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Note / Follow-up */}
        {lesson.note && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-[#2a211a] border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-[#b05a1c] dark:text-[#e2803b] shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-[#14303c] dark:text-[#f0dcd0]">
              <strong className="text-[#b05a1c] dark:text-[#e2803b] mr-1">
                {lesson.note.label}:
              </strong>
              {lesson.note.text}
            </div>
          </div>
        )}

        {/* Resources */}
        {lesson.resources.length > 0 && (
          <div className="space-y-2 pt-4 border-t border-[#e7eef0] dark:border-[#243c48]">
            <h4 className="text-xs font-mono uppercase text-[#5a727b] dark:text-[#8ba2ad] tracking-wider mb-2">
              Attached Learning Artifacts & Tools
            </h4>
            <div className="flex flex-col gap-2">
              {lesson.resources.map((res, i) => (
                <a
                  key={i}
                  href={res.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#f8fafb] dark:bg-[#1a2d36] border border-[#d3e0e5] dark:border-[#243c48] hover:border-[#b05a1c] dark:hover:border-[#e2803b] transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase text-[#b05a1c] dark:text-[#e2803b] font-bold">
                      {res.label}
                    </span>
                    <span className="text-xs font-medium text-[#14303c] dark:text-[#ecf3f6]">
                      {res.text}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#5a727b] group-hover:text-[#b05a1c]" />
                </a>
              ))}
            </div>
          </div>
        )}

        {lesson.extraNote && (
          <p className="mt-4 text-[11px] font-mono text-[#5a727b] dark:text-[#8ba2ad]">
            {lesson.extraNote}
          </p>
        )}
      </div>
    </div>
  );
};
