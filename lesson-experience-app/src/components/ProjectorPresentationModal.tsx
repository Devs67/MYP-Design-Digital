import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Pause, Play, RotateCcw, X } from 'lucide-react';
import { Lesson } from '../types/curriculum';
import { cleanLabel, formatDate, lessonMeta, resourceTitle } from '../lib';

interface ProjectorPresentationModalProps {
  onClose: () => void;
  lessons: Lesson[];
  unitTitle: string;
}

const TIMER_START = 600; // 10 minutes

function formatTimer(totalSec: number) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/** Full-screen view for the classroom board: one session at a time, with an activity timer. */
export const ProjectorPresentationModal: React.FC<ProjectorPresentationModalProps> = ({ onClose, lessons, unitTitle }) => {
  const [index, setIndex] = useState(() => {
    const latest = lessons.findIndex((l) => l.isLatest);
    return latest !== -1 ? latest : Math.max(0, lessons.length - 1);
  });
  const [seconds, setSeconds] = useState(TIMER_START);
  const [running, setRunning] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!running) return;
    if (seconds <= 0) {
      setRunning(false);
      return;
    }
    const t = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [running, seconds]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    document.body.classList.add('myp-noscroll');
    if (closeRef.current) closeRef.current.focus();
    return () => {
      document.body.classList.remove('myp-noscroll');
      if (opener && typeof opener.focus === 'function') opener.focus();
    };
  }, []);

  if (lessons.length === 0) return null;
  const lesson = lessons[Math.min(index, lessons.length - 1)];
  const last = lessons.length - 1;

  const onKeyDown = (e: React.KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName;
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowLeft' && tag !== 'INPUT') setIndex((i) => Math.max(0, i - 1));
    else if (e.key === 'ArrowRight' && tag !== 'INPUT') setIndex((i) => Math.min(last, i + 1));
  };

  return (
    <div className="lx-proj" role="dialog" aria-modal="true" aria-label="Projector view" onKeyDown={onKeyDown}>
      <div className="lx-proj__bar">
        <div className="lx-proj__where">
          <p className="myp-eyebrow">Projector view</p>
          <p className="lx-small">
            {unitTitle} &middot; Session {lesson.sessionNumber} of {lessons.length}
          </p>
        </div>

        <div className="lx-timer" role="group" aria-label="Activity timer">
          <span className="lx-timer__time" aria-live="off">{formatTimer(seconds)}</span>
          <button
            type="button"
            className="lx-iconbtn"
            onClick={() => setRunning((r) => !r)}
            disabled={seconds === 0}
            aria-label={running ? 'Pause timer' : 'Start timer'}
          >
            {running ? <Pause size={20} strokeWidth={1.8} aria-hidden="true" /> : <Play size={20} strokeWidth={1.8} aria-hidden="true" />}
          </button>
          <button
            type="button"
            className="lx-iconbtn"
            onClick={() => {
              setRunning(false);
              setSeconds(TIMER_START);
            }}
            aria-label="Reset timer to 10 minutes"
          >
            <RotateCcw size={18} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

        <button ref={closeRef} type="button" className="myp-button myp-button--secondary" onClick={onClose}>
          <X size={20} strokeWidth={1.8} aria-hidden="true" />
          Close
        </button>
      </div>

      <div className="lx-proj__main">
        <p className="lx-proj__meta">
          {lessonMeta(lesson)} &middot; {formatDate(lesson.date)}
          {lesson.type === 'formative' && <span className="myp-chip">Formative</span>}
          {lesson.isLatest && <span className="myp-chip myp-chip--live">Latest session</span>}
        </p>
        <h2 className="lx-proj__title">{lesson.title}</h2>
        {lesson.paragraphs.map((p, i) => (
          <p key={i} className="lx-proj__text">{p}</p>
        ))}
        {lesson.note && (
          <p className="lx-note lx-proj__note">
            <strong>{cleanLabel(lesson.note.label)}:</strong> {lesson.note.text}
          </p>
        )}
        {lesson.resources.length > 0 && (
          <div className="lx-actions">
            {lesson.resources.map((r, i) => (
              <a key={i} className="myp-button myp-button--primary" href={r.href} target="_blank" rel="noopener noreferrer">
                {resourceTitle(r)}
                <ExternalLink size={18} strokeWidth={1.8} aria-hidden="true" />
                <span className="lx-sr">(opens in a new tab)</span>
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="lx-proj__nav">
        <button
          type="button"
          className="myp-button myp-button--secondary"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          <ArrowLeft size={20} strokeWidth={1.8} aria-hidden="true" />
          Previous session
        </button>
        <div className="lx-dots">
          {lessons.map((l, i) => (
            <button
              key={l.id}
              type="button"
              className="lx-dot"
              aria-current={i === index ? 'true' : undefined}
              aria-label={`Session ${l.sessionNumber}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="myp-button myp-button--secondary"
          onClick={() => setIndex((i) => Math.min(last, i + 1))}
          disabled={index === last}
        >
          Next session
          <ArrowRight size={20} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
