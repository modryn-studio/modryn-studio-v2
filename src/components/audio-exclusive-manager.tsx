'use client';

import { useEffect } from 'react';

/**
 * Listens for any `play` event on the document and pauses all other audio elements.
 * Attached once in the root layout — fixes simultaneous playback everywhere on the site
 * including raw <audio> tags in MDX log posts.
 */
export function AudioExclusiveManager() {
  useEffect(() => {
    const stop = (e: Event) => {
      document.querySelectorAll<HTMLAudioElement>('audio').forEach((a) => {
        if (a !== e.target) a.pause();
      });
    };
    document.addEventListener('play', stop, true);
    return () => document.removeEventListener('play', stop, true);
  }, []);

  return null;
}
