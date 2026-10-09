import React, { useId } from 'react';
import { Search, X } from 'lucide-react';

export interface FinderOption<T extends string> {
  id: T;
  label: string;
}

interface LessonFinderProps<T extends string> {
  label: string;
  placeholder: string;
  query: string;
  onQuery: (q: string) => void;
  options: FinderOption<T>[];
  filter: T;
  onFilter: (f: T) => void;
  filterLabel: string;
  count: string;
}

/** Search field and filter buttons above the timeline, cards and resource locker. */
export function LessonFinder<T extends string>({
  label,
  placeholder,
  query,
  onQuery,
  options,
  filter,
  onFilter,
  filterLabel,
  count,
}: LessonFinderProps<T>) {
  const inputId = useId();
  return (
    <div className="lx-find" role="search">
      <label className="myp-input lx-find__search" htmlFor={inputId}>
        <span className="myp-input__label">{label}</span>
        <span className="myp-input__row">
          <Search size={20} strokeWidth={1.8} aria-hidden="true" />
          <input
            id={inputId}
            type="search"
            autoComplete="off"
            placeholder={placeholder}
            value={query}
            onChange={(e) => onQuery(e.target.value)}
          />
          {query && (
            <button type="button" className="lx-iconbtn" onClick={() => onQuery('')} aria-label="Clear search">
              <X size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
          )}
        </span>
      </label>
      <div className="lx-seg" role="group" aria-label={filterLabel}>
        {options.map((o) => (
          <button key={o.id} type="button" aria-pressed={filter === o.id} onClick={() => onFilter(o.id)}>
            {o.label}
          </button>
        ))}
      </div>
      <p className="lx-count" aria-live="polite">{count}</p>
    </div>
  );
}
