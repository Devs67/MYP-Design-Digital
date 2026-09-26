import React from 'react';
import { CriterionType } from '../types/curriculum';
import { STRAND_DESCRIPTORS } from '../data/curriculumData';
import { X, Layers, CheckCircle2, Target, Award } from 'lucide-react';

interface StrandDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStrand: string | null;
  criterion: CriterionType;
}

export const StrandDetailModal: React.FC<StrandDetailModalProps> = ({
  isOpen,
  onClose,
  selectedStrand,
  criterion,
}) => {
  if (!isOpen) return null;

  const critStrands = STRAND_DESCRIPTORS.filter((s) => s.criterion === criterion);
  const matched = critStrands.find((s) =>
    selectedStrand?.toLowerCase().includes(s.strand.toLowerCase())
  );

  const critTitle = criterion === 'a' ? 'Criterion A: Inquiring & Analysing' : 'Criterion B: Developing Ideas';
  const critColor = criterion === 'a' ? '#12707f' : '#b05a1c';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#162831] border border-[#d3e0e5] dark:border-[#243c48] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-scaleUp">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-[#5a727b] hover:text-[#14303c] dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#b05a1c] dark:text-[#e2803b] mb-2 font-semibold">
          <Layers className="w-4 h-4" />
          <span>IB MYP Design Rubric Standard</span>
        </div>

        <h3 className="font-display font-bold text-xl text-[#14303c] dark:text-[#ecf3f6] mb-1">
          {critTitle}
        </h3>
        <p className="text-xs text-[#5a727b] dark:text-[#90a8b2] mb-6">
          Assessed on a 1–8 achievement scale across four inquiry strands.
        </p>

        {matched && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-[#28211b] border border-amber-200 dark:border-amber-900/50">
            <span className="font-mono text-xs font-bold text-[#b05a1c] dark:text-[#e2803b] block mb-1">
              Active Focus: {matched.strand} — {matched.title}
            </span>
            <p className="text-xs text-[#14303c] dark:text-[#ecf3f6] leading-relaxed">
              {matched.description}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-[#5a727b] dark:text-[#8ba2ad] tracking-wider">
            All Strands in this Criterion
          </h4>
          {critStrands.map((strand, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border text-xs transition-colors ${
                matched?.strand === strand.strand
                  ? 'border-[#b05a1c] bg-[#fbeeeb]/50 dark:bg-[#382417]/50 ring-1 ring-[#b05a1c]'
                  : 'border-[#e7eef0] dark:border-[#243c48] bg-[#f8fafb] dark:bg-[#1a2d36]'
              }`}
            >
              <div className="flex items-center justify-between font-semibold text-[#14303c] dark:text-[#ecf3f6] mb-1">
                <span>{strand.strand}: {strand.title}</span>
                <Target className="w-3.5 h-3.5 text-[#5a727b]" />
              </div>
              <p className="text-[#5a727b] dark:text-[#90a8b2] leading-relaxed">
                {strand.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
