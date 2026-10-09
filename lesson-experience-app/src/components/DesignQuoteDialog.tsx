import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { DESIGN_QUOTES } from '../data/curriculumData';
import { Dialog } from './Dialog';

interface DesignQuoteDialogProps {
  onClose: () => void;
}

/** Figma 79–83: one quote per frame, stepped through with Previous and Next. */
export const DesignQuoteDialog: React.FC<DesignQuoteDialogProps> = ({ onClose }) => {
  const [index, setIndex] = useState(0);
  const total = DESIGN_QUOTES.length;
  const quote = DESIGN_QUOTES[index];

  return (
    <Dialog title="Design Philosophy of the Day" onClose={onClose}>
      <blockquote className="lx-quote" aria-live="polite">&ldquo;{quote.quote}&rdquo;</blockquote>
      <p className="lx-quote__who">{quote.author}</p>
      <p className="lx-quote__role">{quote.role} &middot; {quote.context}</p>
      <p className="lx-quote__count">{index + 1} / {total}</p>
      <div className="myp-dialog__stack">
        <button
          type="button"
          className="myp-button myp-button--secondary"
          onClick={() => setIndex((i) => (i > 0 ? i - 1 : total - 1))}
        >
          <ArrowLeft size={20} strokeWidth={1.8} aria-hidden="true" />
          Previous
        </button>
        <button
          type="button"
          className="myp-button myp-button--secondary"
          onClick={() => setIndex((i) => (i < total - 1 ? i + 1 : 0))}
        >
          Next
          <ArrowRight size={20} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
    </Dialog>
  );
};
