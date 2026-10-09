import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CriterionType, Lesson } from '../types/curriculum';
import { STRAND_DESCRIPTORS } from '../data/curriculumData';
import { formatDate, lessonCoversStrand } from '../lib';

interface CurriculumBlueprintViewProps {
  lessons: Lesson[];
  onOpenLesson: (lesson: Lesson) => void;
  onOpenStrand: (strand: string, crit: CriterionType) => void;
}

const CRITERIA: { id: CriterionType; name: string; empty: string }[] = [
  { id: 'a', name: 'Inquiring & Analysing', empty: 'Integrated across exploratory problem discussions.' },
  { id: 'b', name: 'Developing Ideas', empty: 'Scheduled for upcoming design iteration sessions.' },
];

/** Figma 62: one panel per criterion, each strand with the sessions that covered it. */
export const CurriculumBlueprintView: React.FC<CurriculumBlueprintViewProps> = ({ lessons, onOpenLesson, onOpenStrand }) => (
  <>
    {CRITERIA.map((crit) => (
      <section key={crit.id} className="myp-panel" aria-labelledby={`bp-${crit.id}`}>
        <div className="myp-panel__head">
          <h2 className="myp-panel__title" id={`bp-${crit.id}`}>Criterion {crit.id.toUpperCase()}</h2>
          <p className="myp-panel__sub">{crit.name}</p>
        </div>

        {STRAND_DESCRIPTORS.filter((d) => d.criterion === crit.id).map((d) => {
          const covered = lessons.filter((l) => lessonCoversStrand(l, d));
          return (
            <div key={d.strand} className="lx-strand">
              <h3 className="lx-strand__title">{d.strand} &middot; {d.title}</h3>
              <p className="lx-text">{d.description}</p>
              {covered.length > 0 ? (
                <ul className="myp-list lx-sessions" aria-label={`Sessions covering ${d.strand}`}>
                  {covered.map((l) => (
                    <li key={l.id}>
                      <button type="button" className="myp-row myp-row--nolead" onClick={() => onOpenLesson(l)}>
                        <span className="myp-row__text">
                          <span className="myp-row__title">Session {l.sessionNumber} &middot; {l.title}</span>
                          <span className="myp-row__detail">{formatDate(l.date)}</span>
                        </span>
                        <span className="myp-row__go">
                          <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="lx-small">{crit.empty}</p>
              )}
              <button
                type="button"
                className="myp-button myp-button--secondary lx-wide"
                onClick={() => onOpenStrand(d.strand, crit.id)}
              >
                View strand details
                <span className="lx-sr">: {d.strand}</span>
              </button>
            </div>
          );
        })}
      </section>
    ))}
  </>
);
