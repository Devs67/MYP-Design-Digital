import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Lesson } from '../types/curriculum';
import { resourceKind, resourceTitle, ResourceKind } from '../lib';
import { LessonFinder } from './LessonFinder';

type KindFilter = 'all' | Exclude<ResourceKind, 'other'>;

interface ResourceLockerViewProps {
  lessons: Lesson[];
}

/** Figma 66: one panel per lesson that has links, with a search and a type filter above. */
export const ResourceLockerView: React.FC<ResourceLockerViewProps> = ({ lessons }) => {
  const [kind, setKind] = useState<KindFilter>('all');
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const groups = lessons
    .map((lesson) => ({
      lesson,
      resources: lesson.resources.filter((r) => {
        if (kind !== 'all' && resourceKind(r) !== kind) return false;
        if (!q) return true;
        return (r.text + ' ' + r.label + ' ' + lesson.title).toLowerCase().includes(q);
      }),
    }))
    .filter((g) => g.resources.length > 0);

  const total = lessons.reduce((n, l) => n + l.resources.length, 0);
  const shown = groups.reduce((n, g) => n + g.resources.length, 0);

  return (
    <>
      <LessonFinder<KindFilter>
        label="Search resources"
        placeholder="Tools, slides, topics…"
        query={query}
        onQuery={setQuery}
        options={[
          { id: 'all', label: 'All' },
          { id: 'slides', label: 'Presentations' },
          { id: 'tool', label: 'Tools' },
          { id: 'folder', label: 'Folders' },
        ]}
        filter={kind}
        onFilter={setKind}
        filterLabel="Resource type"
        count={shown === total ? `${total} ${total === 1 ? 'link' : 'links'}` : `${shown} of ${total} links`}
      />

      {groups.length === 0 ? (
        <section className="myp-panel">
          <h2 className="myp-panel__title">No matching resources.</h2>
          <button
            type="button"
            className="myp-button myp-button--secondary lx-wide"
            onClick={() => {
              setKind('all');
              setQuery('');
            }}
          >
            Show all resources
          </button>
        </section>
      ) : (
        groups.map(({ lesson, resources }) => (
          <section key={lesson.id} className="myp-panel" aria-label={lesson.title}>
            <h2 className="myp-panel__title">{lesson.title}</h2>
            <ul className="myp-list lx-resources">
              {resources.map((r, i) => (
                <li key={i}>
                  <a className="myp-row myp-row--nolead" href={r.href} target="_blank" rel="noopener noreferrer">
                    <span className="myp-row__text">
                      <span className="myp-row__title">{resourceTitle(r)}</span>
                      <span className="myp-row__detail">Session {lesson.sessionNumber}</span>
                    </span>
                    <span className="myp-row__go">
                      <ExternalLink size={18} strokeWidth={1.8} aria-hidden="true" />
                      <span className="lx-sr">(opens in a new tab)</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </>
  );
};
