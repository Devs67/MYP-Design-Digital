import React, { useState } from 'react';
import { Lesson, ResourceLink } from '../types/curriculum';
import { ExternalLink, Search, Folder, Presentation, Wrench, FileCode, CheckCircle2 } from 'lucide-react';

interface ResourceLockerViewProps {
  lessons: Lesson[];
}

export const ResourceLockerView: React.FC<ResourceLockerViewProps> = ({ lessons }) => {
  const [filterType, setFilterType] = useState<'all' | 'tool' | 'slides' | 'folder'>('all');
  const [search, setSearch] = useState('');

  // Extract all resources with their source lesson
  const allResources: { resource: ResourceLink; lesson: Lesson }[] = [];
  lessons.forEach((lesson) => {
    lesson.resources.forEach((res) => {
      allResources.push({ resource: res, lesson });
    });
  });

  const filtered = allResources.filter(({ resource, lesson }) => {
    const matchesSearch =
      resource.text.toLowerCase().includes(search.toLowerCase()) ||
      resource.label.toLowerCase().includes(search.toLowerCase()) ||
      lesson.title.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'all') return true;
    if (filterType === 'tool') return resource.label.toLowerCase().includes('tool') || resource.href.includes('circuito') || resource.href.includes('shapesapp');
    if (filterType === 'slides') return resource.label.toLowerCase().includes('ppt') || resource.href.includes('presentation');
    if (filterType === 'folder') return resource.label.toLowerCase().includes('folder') || resource.href.includes('drive');
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#162831] border border-[#d3e0e5] dark:border-[#243c48] rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-base font-display font-bold text-[#14303c] dark:text-[#ecf3f6]">
              Digital Learning Locker & Tools
            </h2>
            <p className="text-xs text-[#5a727b] dark:text-[#90a8b2]">
              Instant access to all teacher presentations, interactive web tools, and CAD tutorials across this unit.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#5a727b] dark:text-[#8ba2ad]">
              {allResources.length} Artifacts Linked
            </span>
          </div>
        </div>

        {/* Filter and search bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#5a727b] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search tools, slides, topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#f8fafb] dark:bg-[#121c22] border border-[#d3e0e5] dark:border-[#243c48] rounded-xl text-[#14303c] dark:text-[#ecf3f6] focus:outline-none focus:border-[#b05a1c]"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#f2f5f6] dark:bg-[#121c22] p-1 rounded-xl border border-[#d3e0e5] dark:border-[#243c48]">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                filterType === 'all'
                  ? 'bg-white dark:bg-[#1e2f38] text-[#14303c] dark:text-[#ecf3f6] font-medium shadow-2xs'
                  : 'text-[#5a727b] hover:text-[#14303c] dark:hover:text-[#ecf3f6]'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilterType('slides')}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                filterType === 'slides'
                  ? 'bg-white dark:bg-[#1e2f38] text-[#14303c] dark:text-[#ecf3f6] font-medium shadow-2xs'
                  : 'text-[#5a727b] hover:text-[#14303c] dark:hover:text-[#ecf3f6]'
              }`}
            >
              Presentations
            </button>
            <button
              type="button"
              onClick={() => setFilterType('tool')}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                filterType === 'tool'
                  ? 'bg-white dark:bg-[#1e2f38] text-[#14303c] dark:text-[#ecf3f6] font-medium shadow-2xs'
                  : 'text-[#5a727b] hover:text-[#14303c] dark:hover:text-[#ecf3f6]'
              }`}
            >
              Interactive Tools
            </button>
            <button
              type="button"
              onClick={() => setFilterType('folder')}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                filterType === 'folder'
                  ? 'bg-white dark:bg-[#1e2f38] text-[#14303c] dark:text-[#ecf3f6] font-medium shadow-2xs'
                  : 'text-[#5a727b] hover:text-[#14303c] dark:hover:text-[#ecf3f6]'
              }`}
            >
              Drive Folders
            </button>
          </div>
        </div>
      </div>

      {/* Grid of resources */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-[#162831] border border-[#d3e0e5] dark:border-[#243c48] rounded-2xl">
          <p className="text-sm text-[#5a727b] dark:text-[#8ba2ad]">No matching resources found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(({ resource, lesson }, idx) => {
            const isTool = resource.label.toLowerCase().includes('tool') || resource.href.includes('circuito') || resource.href.includes('shapesapp');
            const isFolder = resource.label.toLowerCase().includes('folder') || resource.href.includes('drive');
            const isSlides = resource.label.toLowerCase().includes('ppt') || resource.href.includes('presentation');

            return (
              <a
                key={idx}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-5 bg-white dark:bg-[#162831] border border-[#d3e0e5] dark:border-[#243c48] hover:border-[#b05a1c] dark:hover:border-[#e2803b] rounded-2xl transition-all shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider font-semibold text-[#b05a1c] dark:text-[#e2803b]">
                      {isTool && <Wrench className="w-3.5 h-3.5" />}
                      {isSlides && <Presentation className="w-3.5 h-3.5" />}
                      {isFolder && <Folder className="w-3.5 h-3.5" />}
                      {!isTool && !isSlides && !isFolder && <FileCode className="w-3.5 h-3.5" />}
                      {resource.label}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#5a727b] group-hover:text-[#b05a1c] transition-colors" />
                  </div>

                  <h3 className="font-display font-bold text-base text-[#14303c] dark:text-[#ecf3f6] group-hover:text-[#b05a1c] dark:group-hover:text-[#e2803b] transition-colors mb-2">
                    {resource.text}
                  </h3>
                </div>

                <div className="pt-3 border-t border-[#e7eef0] dark:border-[#243c48] flex items-center justify-between text-xs text-[#5a727b] dark:text-[#8ba2ad]">
                  <span className="truncate max-w-[200px]">
                    Session {lesson.sessionNumber}: {lesson.title}
                  </span>
                  <span className="font-mono text-[10px] shrink-0">
                    {lesson.date.day} {lesson.date.mon}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};
