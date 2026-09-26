import React from 'react';
import { Lesson, CriterionType } from '../types/curriculum';
import { STRAND_DESCRIPTORS } from '../data/curriculumData';
import { CheckCircle2, FileCheck, ArrowRight, Layers } from 'lucide-react';

interface CurriculumBlueprintViewProps {
  lessons: Lesson[];
  onOpenLesson: (lesson: Lesson) => void;
  onOpenStrandModal: (strand: string, crit: CriterionType) => void;
}

export const CurriculumBlueprintView: React.FC<CurriculumBlueprintViewProps> = ({
  lessons,
  onOpenLesson,
  onOpenStrandModal,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#162831] border border-[#d3e0e5] dark:border-[#243c48] rounded-2xl p-6 shadow-xs">
        <h2 className="text-base font-display font-bold text-[#14303c] dark:text-[#ecf3f6] mb-1">
          IB MYP Assessment Strands Matrix
        </h2>
        <p className="text-xs text-[#5a727b] dark:text-[#90a8b2] leading-relaxed">
          Mapping classroom sessions to official IB Middle Years Programme Design criteria. Each strand represents an essential inquiry milestone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Criterion A Container */}
        <div className="bg-white dark:bg-[#162831] border border-[#12707f]/30 dark:border-[#12707f]/50 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#e0f0f2] dark:border-[#1e3842]">
            <div>
              <span className="font-mono text-xs font-bold text-[#12707f] dark:text-[#43a8b8] uppercase tracking-wider">
                Criterion A
              </span>
              <h3 className="font-display font-bold text-lg text-[#14303c] dark:text-[#ecf3f6]">
                Inquiring & Analysing
              </h3>
            </div>
            <span className="text-xs font-mono text-[#12707f] bg-[#e0f0f2] dark:bg-[#173842] dark:text-[#43a8b8] px-2.5 py-1 rounded-full font-medium">
              4 Strands
            </span>
          </div>

          <div className="space-y-3">
            {STRAND_DESCRIPTORS.filter((s) => s.criterion === 'a').map((desc, idx) => {
              // Match lessons covering this strand
              const matchingLessons = lessons.filter(
                (l) =>
                  l.criterion === 'a' &&
                  l.strands.some((st) => st.toLowerCase().includes(desc.strand.toLowerCase()))
              );

              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-[#e7eef0] dark:border-[#243c48] bg-[#f8fafb] dark:bg-[#1a2d36] hover:border-[#12707f] transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-semibold text-[#12707f] dark:text-[#43a8b8]">
                      {desc.strand} · {desc.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#5a727b] dark:text-[#8ba2ad]">
                      {matchingLessons.length} Session{matchingLessons.length === 1 ? '' : 's'}
                    </span>
                  </div>

                  <p className="text-xs text-[#5a727b] dark:text-[#8ba2ad] mb-3 leading-relaxed">
                    {desc.description}
                  </p>

                  {matchingLessons.length > 0 ? (
                    <div className="space-y-1.5 pt-2 border-t border-[#e7eef0] dark:border-[#243c48]">
                      {matchingLessons.map((l) => (
                        <div
                          key={l.id}
                          onClick={() => onOpenLesson(l)}
                          className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#14232a] border border-[#d3e0e5] dark:border-[#243c48] hover:border-[#12707f] cursor-pointer text-xs group"
                        >
                          <span className="font-medium text-[#14303c] dark:text-[#ecf3f6] truncate group-hover:text-[#12707f]">
                            Session {l.sessionNumber}: {l.title}
                          </span>
                          <span className="font-mono text-[10px] text-[#5a727b] shrink-0 ml-2">
                            {l.date.day} {l.date.mon}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] font-mono text-[#5a727b] dark:text-[#8ba2ad] italic">
                      Integrated across exploratory problem discussions.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Criterion B Container */}
        <div className="bg-white dark:bg-[#162831] border border-[#b05a1c]/30 dark:border-[#b05a1c]/50 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#fbeeeb] dark:border-[#382417]">
            <div>
              <span className="font-mono text-xs font-bold text-[#b05a1c] dark:text-[#e2803b] uppercase tracking-wider">
                Criterion B
              </span>
              <h3 className="font-display font-bold text-lg text-[#14303c] dark:text-[#ecf3f6]">
                Developing Ideas
              </h3>
            </div>
            <span className="text-xs font-mono text-[#b05a1c] bg-[#fbeeeb] dark:bg-[#382417] dark:text-[#e2803b] px-2.5 py-1 rounded-full font-medium">
              4 Strands
            </span>
          </div>

          <div className="space-y-3">
            {STRAND_DESCRIPTORS.filter((s) => s.criterion === 'b').map((desc, idx) => {
              const matchingLessons = lessons.filter(
                (l) =>
                  l.criterion === 'b' &&
                  l.strands.some((st) => st.toLowerCase().includes(desc.strand.toLowerCase()))
              );

              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-[#e7eef0] dark:border-[#243c48] bg-[#f8fafb] dark:bg-[#1a2d36] hover:border-[#b05a1c] transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-semibold text-[#b05a1c] dark:text-[#e2803b]">
                      {desc.strand} · {desc.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#5a727b] dark:text-[#8ba2ad]">
                      {matchingLessons.length} Session{matchingLessons.length === 1 ? '' : 's'}
                    </span>
                  </div>

                  <p className="text-xs text-[#5a727b] dark:text-[#8ba2ad] mb-3 leading-relaxed">
                    {desc.description}
                  </p>

                  {matchingLessons.length > 0 ? (
                    <div className="space-y-1.5 pt-2 border-t border-[#e7eef0] dark:border-[#243c48]">
                      {matchingLessons.map((l) => (
                        <div
                          key={l.id}
                          onClick={() => onOpenLesson(l)}
                          className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#14232a] border border-[#d3e0e5] dark:border-[#243c48] hover:border-[#b05a1c] cursor-pointer text-xs group"
                        >
                          <span className="font-medium text-[#14303c] dark:text-[#ecf3f6] truncate group-hover:text-[#b05a1c]">
                            Session {l.sessionNumber}: {l.title}
                          </span>
                          <span className="font-mono text-[10px] text-[#5a727b] shrink-0 ml-2">
                            {l.date.day} {l.date.mon}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] font-mono text-[#5a727b] dark:text-[#8ba2ad] italic">
                      Scheduled for upcoming design iteration sessions.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
