'use client';

import { useState, useCallback, useEffect } from 'react';
import { ToolScreenshot } from '@/components/tool-screenshot';

interface Props {
  lightUrl?: string;
  darkUrl?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function ScreenshotLightbox({ lightUrl, darkUrl, alt, width, height, className }: Props) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  return (
    <>
      {/* Thumbnail — cursor signals clickability */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full cursor-zoom-in text-left"
        aria-label={`Expand ${alt}`}
      >
        <ToolScreenshot
          lightUrl={lightUrl}
          darkUrl={darkUrl}
          alt={alt}
          width={width}
          height={height}
          className={className}
        />
      </button>

      {/* Lightbox */}
      {open && (
        // Backdrop — click outside to close
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={close}
        >
          {/* Image container — stop propagation so clicking image doesn't close */}
          <div
            className="relative max-h-full max-w-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <ToolScreenshot
              lightUrl={lightUrl}
              darkUrl={darkUrl}
              alt={alt}
              width={1800}
              height={1012}
              className="max-h-[90vh] w-auto cursor-zoom-out object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
