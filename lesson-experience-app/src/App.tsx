import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CLASSES_DATA } from './data/curriculumData';
import { ClassData, CriterionType, Lesson } from './types/curriculum';
import {
  LessonFilter,
  LIST_VIEWS,
  ListView,
  View,
  VIEW_TITLES,
  currentTheme,
  isView,
  matchesLesson,
  workspaceFor,
} from './lib';
import { ClassPanel } from './components/ClassPanel';
import { LessonFinder } from './components/LessonFinder';
import { LessonListView } from './components/LessonListView';
import { LessonPanel } from './components/LessonPanel';
import { CurriculumBlueprintView } from './components/CurriculumBlueprintView';
import { ResourceLockerView } from './components/ResourceLockerView';
import { ProjectorPresentationModal } from './components/ProjectorPresentationModal';
import { DesignQuoteDialog } from './components/DesignQuoteDialog';
import { StrandDetailDialog } from './components/StrandDetailDialog';

const DEFAULT_CLASS = 'myp2a';

interface RouteState {
  classId: string;
  view: View;
  lessonId: string | null;
}

// ?class=myp2a&view=cards&lesson=myp2a-3 — so a bookmark or a shared link opens the same place.
// ?theme= is left alone: assets/theme.js owns it.
function readURL(): RouteState {
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(window.location.search);
  } catch (e) {
    return { classId: DEFAULT_CLASS, view: 'timeline', lessonId: null };
  }
  const c = params.get('class');
  const classId = c && CLASSES_DATA[c] ? c : DEFAULT_CLASS;
  const v = params.get('view');
  let view: View = isView(v) ? v : 'timeline';
  let lessonId = params.get('lesson');
  if (view === 'lesson' && !CLASSES_DATA[classId].lessons.some((l) => l.id === lessonId)) view = 'timeline';
  if (view !== 'lesson') lessonId = null;
  return { classId, view, lessonId };
}

function writeURL(s: RouteState, push: boolean) {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('class', s.classId);
    if (s.view === 'timeline') url.searchParams.delete('view');
    else url.searchParams.set('view', s.view);
    if (s.view === 'lesson' && s.lessonId) url.searchParams.set('lesson', s.lessonId);
    else url.searchParams.delete('lesson');
    const next = url.pathname + url.search + url.hash;
    if (push) window.history.pushState({ lx: true }, '', next);
    else window.history.replaceState(window.history.state, '', next);
  } catch (e) {
    // history can be blocked in some embedded browsers; the app still works without it
  }
}

function isListView(v: View): v is ListView {
  return v !== 'lesson' && v !== 'today';
}

export default function App() {
  const [route, setRoute] = useState<RouteState>(readURL);
  const [listView, setListView] = useState<ListView>(() => (isListView(route.view) ? route.view : 'timeline'));
  const [filter, setFilter] = useState<LessonFilter>('all');
  const [query, setQuery] = useState('');
  const [projectorOpen, setProjectorOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [strandDialog, setStrandDialog] = useState<{ strand: string | null; criterion: CriterionType } | null>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  // set when a lesson or today's lesson was opened with pushState, so "Back to lessons" can use history.back()
  const pushedRef = useRef(false);
  // the lesson panel to scroll back to after returning to a list
  const scrollToRef = useRef<string | null>(null);
  const focusTitleRef = useRef(false);

  const currentClass: ClassData = CLASSES_DATA[route.classId] || CLASSES_DATA[DEFAULT_CLASS];
  const lessons = currentClass.lessons;

  const go = useCallback((next: RouteState, push: boolean) => {
    setRoute(next);
    if (isListView(next.view)) setListView(next.view);
    writeURL(next, push);
  }, []);

  useEffect(() => {
    try {
      window.history.scrollRestoration = 'manual';
    } catch (e) {
      // not supported: the browser keeps its own scroll handling
    }
    const onPop = () => {
      pushedRef.current = false;
      const next = readURL();
      setRoute(next);
      if (isListView(next.view)) setListView(next.view);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // After a view change: scroll back to the lesson we came from, or move focus to the new heading.
  useEffect(() => {
    if (isListView(route.view) && scrollToRef.current) {
      const el = document.getElementById(`lesson-${scrollToRef.current}`);
      scrollToRef.current = null;
      if (el) {
        el.scrollIntoView({ block: 'start' });
        return;
      }
    }
    if (focusTitleRef.current && titleRef.current) {
      focusTitleRef.current = false;
      titleRef.current.focus({ preventScroll: true });
    }
  }, [route]);

  // The shared header and tools bar live outside React (index.html); point them at this class's year.
  useEffect(() => {
    const ws = workspaceFor(currentClass);
    const back = document.getElementById('backToWorkspace');
    if (back) back.setAttribute('href', `../../${ws}/index.html?theme=${currentTheme()}`);
    const tabs = document.querySelectorAll('.topbar__grades a');
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle('on', tabs[i].getAttribute('data-g') === ws);
    }
  }, [currentClass]);

  useEffect(() => {
    document.title = `${VIEW_TITLES[route.view].replace(/\.$/, '')} — ${currentClass.name} — MYP Digital Design`;
  }, [route.view, currentClass]);

  const selectClass = (classId: string) => {
    setFilter('all');
    setQuery('');
    go({ classId, view: isListView(route.view) ? route.view : listView, lessonId: null }, false);
  };

  const selectView = (view: ListView) => {
    pushedRef.current = false;
    go({ classId: route.classId, view, lessonId: null }, false);
  };

  const openLesson = (lesson: Lesson) => {
    scrollToRef.current = null;
    pushedRef.current = true;
    focusTitleRef.current = true;
    go({ classId: route.classId, view: 'lesson', lessonId: lesson.id }, true);
    window.scrollTo(0, 0);
  };

  const openToday = () => {
    pushedRef.current = true;
    focusTitleRef.current = true;
    go({ classId: route.classId, view: 'today', lessonId: null }, true);
    window.scrollTo(0, 0);
  };

  const backToLessons = () => {
    scrollToRef.current = route.lessonId;
    if (pushedRef.current) {
      window.history.back();
      return;
    }
    go({ classId: route.classId, view: listView, lessonId: null }, false);
  };

  const filteredLessons = useMemo(
    () => lessons.filter((l) => matchesLesson(l, filter, query)),
    [lessons, filter, query],
  );

  const counts = {
    a: lessons.filter((l) => l.criterion === 'a').length,
    b: lessons.filter((l) => l.criterion === 'b').length,
    formative: lessons.filter((l) => l.type === 'formative').length,
  };
  const filterOptions: { id: LessonFilter; label: string }[] = [{ id: 'all', label: `All (${lessons.length})` }];
  if (counts.a) filterOptions.push({ id: 'a', label: `Criterion A (${counts.a})` });
  if (counts.b) filterOptions.push({ id: 'b', label: `Criterion B (${counts.b})` });
  if (counts.formative) filterOptions.push({ id: 'formative', label: `Formatives (${counts.formative})` });

  const openStrand = (strand: string | null, criterion: CriterionType) => setStrandDialog({ strand, criterion });

  const detailLesson =
    route.view === 'lesson'
      ? lessons.find((l) => l.id === route.lessonId)
      : route.view === 'today'
        ? lessons.find((l) => l.isLatest)
        : undefined;

  return (
    <>
      <header className="myp-hero">
        <p className="myp-eyebrow">Lesson experience</p>
        <h1 className="myp-title" ref={titleRef} tabIndex={-1}>{VIEW_TITLES[route.view]}</h1>
        {route.view === 'timeline' && <p className="myp-lede">{currentClass.intro}</p>}
      </header>

      <nav className="lx-tabs" aria-label="Lesson views">
        {/* the selection pill: assets/glide.js moves it to the current view */}
        <span className="myp-glide__pill" aria-hidden="true" />
        {LIST_VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            className="lx-tab"
            aria-current={route.view === v.id ? 'page' : undefined}
            onClick={() => selectView(v.id)}
          >
            {v.label}
          </button>
        ))}
      </nav>

      {route.view === 'timeline' && (
        <ClassPanel
          classes={CLASSES_DATA}
          currentClass={currentClass}
          onSelectClass={selectClass}
          onOpenToday={openToday}
          onOpenProjector={() => setProjectorOpen(true)}
          onOpenQuote={() => setQuoteOpen(true)}
        />
      )}

      {(route.view === 'timeline' || route.view === 'cards') && (
        <>
          <LessonFinder<LessonFilter>
            label="Search lessons"
            placeholder="Lessons, tools, skills…"
            query={query}
            onQuery={setQuery}
            options={filterOptions}
            filter={filter}
            onFilter={setFilter}
            filterLabel="Show lessons"
            count={
              filteredLessons.length === lessons.length
                ? `${lessons.length} ${lessons.length === 1 ? 'lesson' : 'lessons'}`
                : `${filteredLessons.length} of ${lessons.length} lessons`
            }
          />
          <LessonListView
            lessons={filteredLessons}
            variant={route.view === 'timeline' ? 'timeline' : 'card'}
            onOpenLesson={openLesson}
            onClearFilters={() => {
              setFilter('all');
              setQuery('');
            }}
          />
        </>
      )}

      {route.view === 'blueprint' && (
        <CurriculumBlueprintView lessons={lessons} onOpenLesson={openLesson} onOpenStrand={openStrand} />
      )}

      {route.view === 'resources' && <ResourceLockerView key={currentClass.id} lessons={lessons} />}

      {(route.view === 'lesson' || route.view === 'today') &&
        (detailLesson ? (
          <LessonPanel
            lesson={detailLesson}
            variant="detail"
            onAction={backToLessons}
            onOpenStrand={(s) => openStrand(s, detailLesson.criterion)}
          />
        ) : (
          <section className="myp-panel">
            <h2 className="myp-panel__title">No lesson is marked as today&rsquo;s yet.</h2>
            <p className="lx-text">{currentClass.name} has no session marked as the latest one.</p>
            <button type="button" className="myp-button myp-button--secondary lx-wide" onClick={backToLessons}>
              Back to lessons
            </button>
          </section>
        ))}

      {projectorOpen && (
        <ProjectorPresentationModal
          key={currentClass.id}
          onClose={() => setProjectorOpen(false)}
          lessons={lessons}
          unitTitle={currentClass.unitTitle}
        />
      )}
      {quoteOpen && <DesignQuoteDialog onClose={() => setQuoteOpen(false)} />}
      {strandDialog && (
        <StrandDetailDialog
          criterion={strandDialog.criterion}
          selectedStrand={strandDialog.strand}
          onClose={() => setStrandDialog(null)}
        />
      )}
    </>
  );
}
