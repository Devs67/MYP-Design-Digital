import React from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Lesson } from '../types/curriculum';
import { cleanLabel, formatDate, hasStrandDetails, lessonMeta, resourceTitle } from '../lib';

type Variant = 'timeline' | 'card' | 'detail';

interface LessonPanelProps {
  lesson: Lesson;
  variant: Variant;
  /** timeline and card: open the lesson; detail: go back to the list */
  onAction: () => void;
  onOpenStrand?: (strand: string) => void;
}

/**
 * One lesson as a Blue Glass section panel.
 * timeline (Figma 61): everything, titled "Session N · Title".
 * card (Figma 63): the summary — no follow-up notes or planning blocks.
 * detail (Figma 64, 65): everything, plus links to the strand details.
 */
export const LessonPanel: React.FC<LessonPanelProps> = ({ lesson, variant, onAction, onOpenStrand }) => {
  const full = variant !== 'card';
  const title = variant === 'timeline' ? `Session ${lesson.sessionNumber} · ${lesson.title}` : lesson.title;
  const when = formatDate(lesson.date);

  // MYP 4 lessons repeat their Purpose / Activity / Produced fields as paragraphs; show them once.
  const fields = full && lesson.fields ? lesson.fields : [];
  const fieldLabels = fields.map((f) => cleanLabel(f.label).toLowerCase() + ':');
  const paragraphs = lesson.paragraphs.filter(
    (p) => !fieldLabels.some((label) => p.toLowerCase().startsWith(label)),
  );

  const TitleTag = variant === 'detail' ? 'h2' : 'h3';

  return (
    <article className="myp-panel lx-lesson" id={variant === 'detail' ? undefined : `lesson-${lesson.id}`}>
      <div className="myp-panel__head">
        <TitleTag className="myp-panel__title">{title}</TitleTag>
        <p className="lx-meta">{lessonMeta(lesson)}</p>
        <p className="lx-when">
          {variant !== 'timeline' && <span>Session {lesson.sessionNumber}</span>}
          {when && <span>{when}</span>}
          {lesson.isLatest && <span className="myp-chip myp-chip--live">Latest session</span>}
          {lesson.type === 'formative' && <span className="myp-chip">Formative</span>}
          {lesson.type === 'summative' && <span className="myp-chip">Summative</span>}
          {lesson.isPlanned && <span className="myp-chip">Planned</span>}
        </p>
      </div>

      {variant === 'detail' && onOpenStrand && lesson.strands.length > 0 && hasStrandDetails(lesson.criterion) && (
        <div className="lx-strandlinks">
          {lesson.strands.map((s) => (
            <button key={s} type="button" className="myp-button myp-button--text" onClick={() => onOpenStrand(s)}>
              Strand details: {s}
            </button>
          ))}
        </div>
      )}

      {paragraphs.map((p, i) => (
        <p key={i} className="lx-text">{p}</p>
      ))}

      {lesson.listItems && lesson.listItems.length > 0 && (
        <ul className="lx-bullets">
          {lesson.listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}

      {fields.length > 0 && (
        <dl className="lx-fields">
          {fields.map((f, i) => (
            <div key={i}>
              <dt>{cleanLabel(f.label)}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {full && lesson.note && (
        <p className="lx-note">
          <strong>{cleanLabel(lesson.note.label)}:</strong> {lesson.note.text}
        </p>
      )}

      {full && lesson.quote && (
        <blockquote className="lx-pull">
          {lesson.quote.label && <strong>{cleanLabel(lesson.quote.label)}: </strong>}
          {lesson.quote.text}
        </blockquote>
      )}

      {full && lesson.meta && lesson.meta.items.length > 0 && (
        <div className="lx-metablock">
          <p className="myp-eyebrow">{lesson.meta.title || 'Curriculum connections'}</p>
          <dl className="lx-fields">
            {lesson.meta.items.map((it, i) => (
              <div key={i}>
                <dt>{cleanLabel(it.label)}</dt>
                <dd>{it.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {lesson.resources.length > 0 && (
        <ul className="myp-list lx-resources">
          {lesson.resources.map((r, i) => (
            <li key={i}>
              <a className="myp-row myp-row--nolead" href={r.href} target="_blank" rel="noopener noreferrer">
                <span className="myp-row__text">
                  <span className="myp-row__title">{resourceTitle(r)}</span>
                </span>
                <span className="myp-row__go">
                  <ExternalLink size={18} strokeWidth={1.8} aria-hidden="true" />
                  <span className="lx-sr">(opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {full && lesson.extraNote && <p className="lx-small">{lesson.extraNote}</p>}

      <button type="button" className="myp-button myp-button--secondary lx-wide" onClick={onAction}>
        {variant === 'detail' ? (
          <>
            <ArrowLeft size={20} strokeWidth={1.8} aria-hidden="true" />
            Back to lessons
          </>
        ) : (
          <>
            {variant === 'timeline' ? 'Open lesson details' : 'Open lesson'}
            <ArrowRight size={20} strokeWidth={1.8} aria-hidden="true" />
            <span className="lx-sr">: {lesson.title}</span>
          </>
        )}
      </button>
    </article>
  );
};
