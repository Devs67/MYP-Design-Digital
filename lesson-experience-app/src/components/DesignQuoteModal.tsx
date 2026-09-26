import React, { useState } from 'react';
import { DESIGN_QUOTES } from '../data/curriculumData';
import { X, Sparkles, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface DesignQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignQuoteModal: React.FC<DesignQuoteModalProps> = ({ isOpen, onClose }) => {
  const [index, setIndex] = useState(0);

  if (!isOpen) return null;

  const quote = DESIGN_QUOTES[index];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#162831] border border-[#d3e0e5] dark:border-[#243c48] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-scaleUp">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-[#5a727b] hover:text-[#14303c] dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#12707f] dark:text-[#43a8b8] mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Design Philosophy of the Day</span>
        </div>

        <Quote className="w-8 h-8 text-[#b05a1c]/20 dark:text-[#e2803b]/20 mb-3" />

        <blockquote className="font-display text-xl sm:text-2xl text-[#14303c] dark:text-[#ecf3f6] font-semibold leading-snug mb-6">
          &ldquo;{quote.quote}&rdquo;
        </blockquote>

        <div className="border-t border-[#e7eef0] dark:border-[#243c48] pt-4 mb-6">
          <h4 className="font-bold text-sm text-[#14303c] dark:text-[#ecf3f6]">
            {quote.author}
          </h4>
          <p className="text-xs text-[#5a727b] dark:text-[#90a8b2]">
            {quote.role} · <span className="italic">{quote.context}</span>
          </p>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {DESIGN_QUOTES.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === index ? 'bg-[#b05a1c] w-5' : 'bg-[#d3e0e5] dark:bg-[#243c48]'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIndex((prev) => (prev > 0 ? prev - 1 : DESIGN_QUOTES.length - 1))}
              className="p-1.5 rounded-lg border border-[#d3e0e5] dark:border-[#243c48] text-[#5a727b] hover:text-[#14303c] dark:hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIndex((prev) => (prev < DESIGN_QUOTES.length - 1 ? prev + 1 : 0))}
              className="p-1.5 rounded-lg border border-[#d3e0e5] dark:border-[#243c48] text-[#5a727b] hover:text-[#14303c] dark:hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
