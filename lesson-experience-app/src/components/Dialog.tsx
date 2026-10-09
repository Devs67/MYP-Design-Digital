import React, { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

interface DialogProps {
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * A Blue Glass dialog (glass.css .myp-dialog--form): title, optional description,
 * a full-width Close button, then the content. Escape and the backdrop close it,
 * Tab stays inside it, and focus returns to whatever opened it.
 */
export const Dialog: React.FC<DialogProps> = ({ title, description, onClose, children }) => {
  const titleId = useId();
  const descId = useId();
  const boxRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    document.body.classList.add('myp-noscroll');
    if (closeRef.current) closeRef.current.focus();
    return () => {
      document.body.classList.remove('myp-noscroll');
      if (opener && typeof opener.focus === 'function') opener.focus();
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== 'Tab' || !boxRef.current) return;
    const f = boxRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input, select');
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="myp-dialog-backdrop myp-dialog-backdrop--center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={onKeyDown}
    >
      <div
        ref={boxRef}
        className="myp-dialog myp-dialog--form lx-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
      >
        <h2 className="myp-dialog__title" id={titleId}>{title}</h2>
        {description && <p className="myp-dialog__desc" id={descId}>{description}</p>}
        <button ref={closeRef} type="button" className="myp-button myp-button--secondary lx-wide" onClick={onClose}>
          <X size={20} strokeWidth={1.8} aria-hidden="true" />
          Close
        </button>
        {children}
      </div>
    </div>
  );
};
