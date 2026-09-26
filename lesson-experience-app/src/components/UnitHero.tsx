import React, { useState } from 'react';
import { ClassData } from '../types/curriculum';
import { BookOpen, Layers, Compass, HelpCircle, ChevronDown, ChevronUp, Printer, Share2, Sparkles } from 'lucide-react';

interface UnitHeroProps {
  currentClass: ClassData;
}

export const UnitHero: React.FC<UnitHeroProps> = ({ currentClass }) => {
  const [showFrameDetails, setShowFrameDetails] = useState(false);

  return (
    <div className="bg-white dark:bg-[#162831] border border-[#d3e0e5] dark:border-[#243c48] rounded-2xl overflow-hidden shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Main Content Area */}
        <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="font-mono text-xs font-semibold tracking-widest uppercase text-[#b05a1c] dark:text-[#e2803b]">
                {currentClass.kicker || 'Lesson Experience'}
              </span>
              <span className="text-[#d3e0e5] dark:text-[#243c48]">·</span>
              <span className="font-mono text-xs text-[#5a727b] dark:text-[#90a8b2]">
                {currentClass.grade} {currentClass.section}
              </span>
            </div>

            <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#14303c] dark:text-[#ecf3f6] tracking-tight leading-tight mb-3">
              {currentClass.title}
            </h1>

            <p className="text-base text-[#5a727b] dark:text-[#90a8b2] leading-relaxed max-w-2xl mb-6">
              {currentClass.intro}
            </p>
          </div>

          {/* Facts grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-[#e7eef0] dark:border-[#243c48]">
            {currentClass.facts.map((fact, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#5a727b] dark:text-[#8ba2ad] mb-0.5">
                  {fact.label}
                </span>
                <span className="font-mono text-xs sm:text-sm font-semibold text-[#14303c] dark:text-[#ecf3f6] truncate">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual / Unit Frame Side Panel */}
        <div className="lg:col-span-4 bg-[#f8fafb] dark:bg-[#1a2d36] border-t lg:border-t-0 lg:border-l border-[#d3e0e5] dark:border-[#243c48] p-6 flex flex-col justify-between relative overflow-hidden">
          {currentClass.bannerImage && (
            <div className="mb-4 rounded-xl overflow-hidden border border-[#d3e0e5] dark:border-[#243c48] h-32 relative group">
              <img
                src={currentClass.bannerImage}
                alt={`${currentClass.unitTitle} visual prototype`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-xs font-mono font-medium drop-shadow-xs">
                  {currentClass.unitTitle}
                </span>
              </div>
            </div>
          )}

          {/* Statement of Inquiry or Unit Highlight */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#12707f] dark:text-[#43a8b8] font-semibold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                Inquiry Blueprint
              </span>
              <button
                type="button"
                onClick={() => setShowFrameDetails(!showFrameDetails)}
                className="text-xs text-[#5a727b] dark:text-[#90a8b2] hover:text-[#14303c] dark:hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {showFrameDetails ? 'Less' : 'Details'}
                {showFrameDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {currentClass.unitFrame?.quote ? (
              <blockquote className="text-xs italic text-[#5a727b] dark:text-[#a0b5bf] border-l-2 border-[#b05a1c] pl-3 py-1 bg-white/70 dark:bg-[#15232a] rounded-r-lg">
                &ldquo;{currentClass.unitFrame.quote.replace(/^Statement of Inquiry:\s*/i, '')}&rdquo;
              </blockquote>
            ) : (
              <p className="text-xs text-[#5a727b] dark:text-[#a0b5bf] italic border-l-2 border-[#12707f] pl-3 py-1">
                An inquiry into physical-digital interfaces, sensor feedback loops, and iterative prototyping.
              </p>
            )}

            {/* Quick Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-1.5 px-3 text-xs font-medium text-[#14303c] dark:text-[#ecf3f6] bg-white dark:bg-[#20343e] hover:bg-[#eef3f5] dark:hover:bg-[#28424e] border border-[#d3e0e5] dark:border-[#243c48] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-[#5a727b]" />
                <span>Print Log</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Unit Framework Section */}
      {showFrameDetails && currentClass.unitFrame && (
        <div className="border-t border-[#d3e0e5] dark:border-[#243c48] bg-[#f8fafb] dark:bg-[#14232a] p-6 sm:p-8 animate-fadeIn">
          <div className="max-w-4xl">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#b05a1c] dark:text-[#e2803b] mb-4 flex items-center gap-2 font-semibold">
              <BookOpen className="w-4 h-4" />
              IB MYP Curriculum Framework: {currentClass.unitTitle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {currentClass.unitFrame.items.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-[#1a2d36] p-3 rounded-lg border border-[#e7eef0] dark:border-[#243c48]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#5a727b] dark:text-[#8ba2ad] block mb-1">
                    {item.label}
                  </span>
                  <p className="text-xs font-medium text-[#14303c] dark:text-[#ecf3f6]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {currentClass.unitFrame.note && (
              <p className="text-xs text-[#5a727b] dark:text-[#8ba2ad] italic">
                Note: {currentClass.unitFrame.note}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
