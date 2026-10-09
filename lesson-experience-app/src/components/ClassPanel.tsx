import React, { useId } from 'react';
import { ChevronDown, MonitorPlay, Printer, Sparkles, CalendarCheck } from 'lucide-react';
import { ClassData } from '../types/curriculum';

interface ClassPanelProps {
  classes: Record<string, ClassData>;
  currentClass: ClassData;
  onSelectClass: (id: string) => void;
  onOpenToday: () => void;
  onOpenProjector: () => void;
  onOpenQuote: () => void;
}

/** The unit panel at the top of the timeline (Figma 61 "Sensing Our World"). */
export const ClassPanel: React.FC<ClassPanelProps> = ({
  classes,
  currentClass,
  onSelectClass,
  onOpenToday,
  onOpenProjector,
  onOpenQuote,
}) => {
  const selectId = useId();
  const frame = currentClass.unitFrame;
  const hasLatest = currentClass.lessons.some((l) => l.isLatest);

  // "Statement of Inquiry: …" is stored as one string; show its label like the other lines
  let soiLabel = '';
  let soiText = frame && frame.quote ? frame.quote : '';
  const colon = soiText.indexOf(':');
  if (colon > 0 && colon < 30) {
    soiLabel = soiText.slice(0, colon);
    soiText = soiText.slice(colon + 1).trim();
  }

  return (
    <section className="myp-panel" aria-labelledby={`${selectId}-title`}>
      <h2 className="myp-panel__title" id={`${selectId}-title`}>{currentClass.unitTitle}</h2>

      <label className="myp-input" htmlFor={selectId}>
        <span className="myp-input__label">Class</span>
        <span className="myp-input__row">
          <select
            id={selectId}
            className="lx-select"
            value={currentClass.id}
            onChange={(e) => onSelectClass(e.target.value)}
          >
            {Object.values(classes).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} &middot; {c.unitTitle}{c.status === 'Live' ? '' : ' (upcoming)'}
              </option>
            ))}
          </select>
          <ChevronDown size={20} strokeWidth={1.8} aria-hidden="true" />
        </span>
      </label>

      {currentClass.facts.length > 0 && (
        <p className="lx-small">
          {currentClass.facts.map((f, i) => (
            <span key={i} className="lx-fact">
              {f.label}: {f.value}
            </span>
          ))}
        </p>
      )}

      {frame &&
        frame.items.map((item, i) => (
          <p key={i} className="lx-kv">
            <span>{item.label}:</span> {item.value}
          </p>
        ))}
      {soiText && (
        <p className="lx-kv">
          {soiLabel && <span>{soiLabel}:</span>} {soiText}
        </p>
      )}
      {frame && frame.note && <p className="lx-small">{frame.note}</p>}

      <div className="lx-actions">
        {hasLatest && (
          <button type="button" className="myp-button myp-button--primary" onClick={onOpenToday}>
            <CalendarCheck size={20} strokeWidth={1.8} aria-hidden="true" />
            Today&rsquo;s lesson
          </button>
        )}
        <button type="button" className="myp-button myp-button--secondary" onClick={onOpenQuote}>
          <Sparkles size={20} strokeWidth={1.8} aria-hidden="true" />
          Design quote
        </button>
        <button type="button" className="myp-button myp-button--secondary" onClick={onOpenProjector}>
          <MonitorPlay size={20} strokeWidth={1.8} aria-hidden="true" />
          Projector view
        </button>
        <button type="button" className="myp-button myp-button--secondary" onClick={() => window.print()}>
          <Printer size={20} strokeWidth={1.8} aria-hidden="true" />
          Print log
        </button>
      </div>
    </section>
  );
};
