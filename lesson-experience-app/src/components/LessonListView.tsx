import React from 'react';
import { Lesson } from '../types/curriculum';
import { LessonPanel } from './LessonPanel';

interface LessonListViewProps {
  lessons: Lesson[];
  variant: 'timeline' | 'card';
  onOpenLesson: (lesson: Lesson) => void;
  onClearFilters: () => void;
}

/** Timeline (Figma 61) and Cards (Figma 63): one panel per lesson. */
export const LessonListView: React.FC<LessonListViewProps> = ({ lessons, variant, onOpenLesson, onClearFilters }) => {
  if (lessons.length === 0) {
    return (
      <section className="myp-panel">
        <h3 className="myp-panel__title">No lessons match.</h3>
        <p className="lx-text">Try a different word, or show every lesson again.</p>
        <button type="button" className="myp-button myp-button--secondary lx-wide" onClick={onClearFilters}>
          Show all lessons
        </button>
      </section>
    );
  }

  return (
    <>
      {lessons.map((lesson) => (
        <LessonPanel key={lesson.id} lesson={lesson} variant={variant} onAction={() => onOpenLesson(lesson)} />
      ))}
    </>
  );
};
