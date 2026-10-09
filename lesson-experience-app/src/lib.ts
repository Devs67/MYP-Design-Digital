import { ClassData, DateBadge, Lesson, ResourceLink, StrandDescriptor } from './types/curriculum';
import { STRAND_DESCRIPTORS } from './data/curriculumData';

export type ListView = 'timeline' | 'cards' | 'blueprint' | 'resources';
export type View = ListView | 'lesson' | 'today';
export type LessonFilter = 'all' | 'a' | 'b' | 'formative';

export const LIST_VIEWS: { id: ListView; label: string }[] = [
  { id: 'timeline', label: 'Timeline' },
  { id: 'cards', label: 'Cards' },
  { id: 'blueprint', label: 'Blueprint' },
  { id: 'resources', label: 'Resources' },
];

export const VIEW_TITLES: Record<View, string> = {
  timeline: 'Your lesson experience.',
  cards: 'Browse lesson cards.',
  blueprint: 'See the whole learning journey.',
  resources: 'Your resource locker.',
  lesson: 'Inside this lesson.',
  today: 'Today’s design lesson.',
};

export function isView(v: string | null): v is View {
  return v === 'timeline' || v === 'cards' || v === 'blueprint' || v === 'resources' || v === 'lesson' || v === 'today';
}

/** "08 Sep · 10:15", "Oct · Scheduled" */
export function formatDate(d: DateBadge): string {
  const parts: string[] = [];
  if (d.day && d.day !== '--') parts.push(`${d.day} ${d.mon || ''}`.trim());
  else if (d.mon) parts.push(d.mon);
  if (d.sub) parts.push(d.sub);
  return parts.join(' · ');
}

/** Labels in the data sometimes carry their own colon ("Follow-up:"). */
export function cleanLabel(label: string): string {
  return label.replace(/\s*[:·]\s*$/, '');
}

export function resourceTitle(r: ResourceLink): string {
  const label = cleanLabel(r.label);
  return label ? `${label} · ${r.text}` : r.text;
}

export function lessonMeta(l: Lesson): string {
  return l.strands.length ? `${l.critLabel} · ${l.strands.join(' / ')}` : l.critLabel;
}

/**
 * Strand numerals named in a lesson's strand label: "Strands i & ii" → ['i', 'ii'],
 * "Strand iii → complete" → ['iii']. Whole words only, so Strand iii is not also Strand i.
 */
export function strandNumerals(label: string): string[] {
  const lower = label.toLowerCase();
  const at = lower.indexOf('strand');
  if (at === -1) return [];
  const found = lower.slice(at + 6).match(/\b(iv|iii|ii|i)\b/g);
  return found ? Array.from(new Set(found)) : [];
}

export function lessonCoversStrand(l: Lesson, d: StrandDescriptor): boolean {
  if (l.criterion !== d.criterion) return false;
  const want = d.strand.toLowerCase().replace('strand ', '');
  return l.strands.some((s) => strandNumerals(s).includes(want));
}

export function descriptorFor(label: string | null, criterion: string): StrandDescriptor | undefined {
  if (!label) return undefined;
  const n = strandNumerals(label)[0];
  if (!n) return undefined;
  return STRAND_DESCRIPTORS.find((d) => d.criterion === criterion && d.strand.toLowerCase() === `strand ${n}`);
}

export function hasStrandDetails(criterion: string): boolean {
  return STRAND_DESCRIPTORS.some((d) => d.criterion === criterion);
}

export type ResourceKind = 'slides' | 'tool' | 'folder' | 'other';

export function resourceKind(r: ResourceLink): ResourceKind {
  const label = r.label.toLowerCase();
  if (label.includes('tool') || r.href.includes('circuito') || r.href.includes('shapesapp')) return 'tool';
  if (label.includes('ppt') || r.href.includes('presentation')) return 'slides';
  if (label.includes('folder') || r.href.includes('drive')) return 'folder';
  return 'other';
}

export function matchesLesson(l: Lesson, filter: LessonFilter, query: string): boolean {
  if (filter === 'formative' && l.type !== 'formative') return false;
  if ((filter === 'a' || filter === 'b') && l.criterion !== filter) return false;
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const text = [
    l.title,
    ...l.paragraphs,
    ...l.strands,
    ...(l.listItems || []),
    ...l.resources.map((r) => r.text),
    l.note ? l.note.text : '',
  ].join(' ').toLowerCase();
  return text.includes(q);
}

/** Which site workspace a class belongs to: MYP 1 and 2 share one, as do 4 and 5. */
export function workspaceFor(c: ClassData): string {
  if (c.grade === 'MYP 3') return 'myp3';
  if (c.grade === 'MYP 4' || c.grade === 'MYP 5') return 'myp4-5';
  return 'myp1-2';
}

export function currentTheme(): 'dark' | 'light' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}
