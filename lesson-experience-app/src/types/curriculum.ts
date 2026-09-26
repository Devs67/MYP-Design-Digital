export type CriterionType = 'a' | 'b' | 'c' | 'd';

export interface DateBadge {
  day?: string;
  mon?: string;
  sub?: string;
}

export interface ResourceLink {
  href: string;
  label: string;
  text: string;
  type?: 'slides' | 'tool' | 'folder' | 'document' | 'video';
}

export interface LessonNote {
  label: string;
  text: string;
}

export interface LessonQuote {
  label: string;
  text: string;
}

export interface KeyValueField {
  label: string;
  value: string;
}

export interface LessonMetaItem {
  label: string;
  value: string;
  isPositive?: boolean;
}

export interface LessonMetaBlock {
  title: string;
  items: LessonMetaItem[];
}

export interface Lesson {
  id: string;
  sessionNumber: number;
  date: DateBadge;
  title: string;
  criterion: CriterionType;
  critLabel: string;
  isLatest?: boolean;
  isPlanned?: boolean;
  strands: string[];
  paragraphs: string[];
  listItems?: string[];
  fields?: KeyValueField[];
  meta?: LessonMetaBlock | null;
  note?: LessonNote | null;
  quote?: LessonQuote | null;
  resources: ResourceLink[];
  hasNoResource?: boolean;
  extraNote?: string;
  type: 'lesson' | 'formative' | 'summative';
}

export interface UnitFact {
  label: string;
  value: string;
}

export interface UnitFrame {
  title: string;
  items: KeyValueField[];
  quote?: string;
  note?: string;
}

export interface ClassData {
  id: string;
  name: string;
  grade: string;
  section: string;
  unitTitle: string;
  status: 'Live' | 'Soon';
  kicker: string;
  title: string;
  intro: string;
  bannerImage?: string;
  facts: UnitFact[];
  unitFrame?: UnitFrame | null;
  lessons: Lesson[];
}

export interface DesignQuote {
  id: number;
  quote: string;
  author: string;
  role: string;
  context: string;
}

export interface StrandDescriptor {
  strand: string;
  criterion: CriterionType;
  title: string;
  description: string;
}
