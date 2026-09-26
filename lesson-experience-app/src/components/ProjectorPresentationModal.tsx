import React, { useState, useEffect } from 'react';
import { Lesson } from '../types/curriculum';
import { X, ChevronLeft, ChevronRight, Clock, Play, Pause, RotateCcw, ExternalLink, Sparkles } from 'lucide-react';

interface ProjectorPresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessons: Lesson[];
  unitTitle: string;
}

export const ProjectorPresentationModal: React.FC<ProjectorPresentationModalProps> = ({
  isOpen,
  onClose,
  lessons,
  unitTitle,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(600); // 10 minutes default
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    // If there is a latest lesson, start there
    const latestIdx = lessons.findIndex((l) => l.isLatest);
    if (latestIdx !== -1) {
      setCurrentIndex(latestIdx);
    } else {
      setCurrentIndex(lessons.length - 1);
    }
  }, [lessons]);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  if (!isOpen || lessons.length === 0) return null;

  const currentLesson = lessons[currentIndex] || lessons[0];

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0f171d]/95 backdrop-blur-md text-white flex flex-col justify-between p-6 sm:p-10 animate-fadeIn">
      {/* Top bar for projector */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#e2803b] font-semibold bg-[#e2803b]/10 px-3 py-1 rounded-full border border-[#e2803b]/30">
            Whiteboard Projector View
          </span>
          <span className="text-sm font-mono text-white/60">
            {unitTitle} · Session {currentLesson.sessionNumber} of {lessons.length}
          </span>
        </div>

        {/* Classroom Activity Timer */}
        <div className="flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
          <Clock className="w-4 h-4 text-[#e2803b]" />
          <span className="font-mono text-lg font-bold tracking-widest tabular-nums">
            {formatTimer(timerSeconds)}
          </span>
          <button
            type="button"
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-1 hover:text-[#e2803b] transition-colors cursor-pointer"
            title={isTimerRunning ? 'Pause timer' : 'Start timer'}
          >
            {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsTimerRunning(false);
              setTimerSeconds(600);
            }}
            className="p-1 hover:text-white transition-colors cursor-pointer"
            title="Reset timer (10 mins)"
          >
            <RotateCcw className="w-3.5 h-3.5 text-white/50" />
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Main Projector Content */}
      <div className="max-w-5xl mx-auto w-full my-auto py-8">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-sm font-mono text-white/70">
            <span className="text-[#e2803b] font-bold">
              {currentLesson.critLabel}
            </span>
            <span>·</span>
            <span>
              {currentLesson.date.day} {currentLesson.date.mon} {currentLesson.date.sub ? `(${currentLesson.date.sub})` : ''}
            </span>
            {currentLesson.type === 'formative' && (
              <>
                <span>·</span>
                <span className="text-[#7fceac] font-semibold">Formative Assessment</span>
              </>
            )}
            {currentLesson.isLatest && (
              <>
                <span>·</span>
                <span className="text-[#e2803b] font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Latest Session
                </span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            {currentLesson.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {currentLesson.strands.map((strand, i) => (
              <span
                key={i}
                className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-white border border-white/20"
              >
                {strand}
              </span>
            ))}
          </div>

          <div className="space-y-4 text-lg sm:text-xl text-white/90 leading-relaxed font-sans max-w-4xl pt-2">
            {currentLesson.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {currentLesson.note && (
            <div className="p-5 rounded-2xl bg-[#e2803b]/15 border border-[#e2803b]/40 text-base leading-relaxed text-white/95 mt-6">
              <strong className="text-[#e2803b] font-semibold mr-2">
                {currentLesson.note.label}:
              </strong>
              {currentLesson.note.text}
            </div>
          )}

          {/* Direct resource launchers */}
          {currentLesson.resources.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 pt-4">
              {currentLesson.resources.map((res, i) => (
                <a
                  key={i}
                  href={res.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#14303c] font-semibold text-sm hover:bg-[#e2803b] hover:text-white transition-colors"
                >
                  <span className="font-mono text-xs uppercase opacity-75">{res.label}</span>
                  <span>{res.text}</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom projector navigation */}
      <div className="flex items-center justify-between border-t border-white/10 pt-4 max-w-5xl mx-auto w-full">
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Previous Session</span>
        </button>

        <div className="flex items-center gap-1.5">
          {lessons.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                i === currentIndex ? 'bg-[#e2803b] scale-125' : 'bg-white/30 hover:bg-white/60'
              }`}
              title={`Jump to session ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => Math.min(lessons.length - 1, prev + 1))}
          disabled={currentIndex === lessons.length - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <span className="text-sm font-medium">Next Session</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
