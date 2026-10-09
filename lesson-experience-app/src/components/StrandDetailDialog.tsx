import React from 'react';
import { CriterionType } from '../types/curriculum';
import { STRAND_DESCRIPTORS } from '../data/curriculumData';
import { descriptorFor } from '../lib';
import { Dialog } from './Dialog';

interface StrandDetailDialogProps {
  criterion: CriterionType;
  selectedStrand: string | null;
  onClose: () => void;
}

/** Figma 77 (Criterion A) and 78 (Criterion B). The strand that was clicked is highlighted. */
export const StrandDetailDialog: React.FC<StrandDetailDialogProps> = ({ criterion, selectedStrand, onClose }) => {
  const strands = STRAND_DESCRIPTORS.filter((s) => s.criterion === criterion);
  const selected = descriptorFor(selectedStrand, criterion);

  return (
    <Dialog
      title={`Criterion ${criterion.toUpperCase()} · Strand details`}
      description="Assessed on a 1–8 achievement scale across four inquiry strands."
      onClose={onClose}
    >
      {strands.map((s) => {
        const on = selected !== undefined && selected.strand === s.strand;
        return (
          <section key={s.strand} className={on ? 'lx-strand lx-strand--on' : 'lx-strand'} aria-current={on ? 'true' : undefined}>
            <h3 className="lx-strand__title">{s.strand} &middot; {s.title}</h3>
            <p className="lx-text">{s.description}</p>
          </section>
        );
      })}
    </Dialog>
  );
};
