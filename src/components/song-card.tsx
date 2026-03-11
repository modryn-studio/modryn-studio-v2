'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Play, Pause, ThumbsUp } from 'lucide-react';
import { analytics } from '@/lib/analytics';
import type { ToolAudioExample } from '@/lib/tools';

interface Props {
  example: ToolAudioExample;
  toolSlug?: string;
  autoPlayNextInList?: boolean;
}

export function SongCard({ example, toolSlug = 'unknown', autoPlayNextInList = false }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const hasTrackedPlay = useRef(false);

  // Persist like state in localStorage keyed by audioUrl
  const likeKey = `like:${example.audioUrl}`;
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    setLiked(localStorage.getItem(likeKey) === '1');
  }, [likeKey]);

  const toggleLike = useCallback(() => {
    const next = !liked;
    setLiked(next);
    localStorage.setItem(likeKey, next ? '1' : '0');
    if (next) {
      analytics.audioLike({ toolSlug, exampleName: example.name, genre: example.genre });
      fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'feedback',
          message: `Song liked: ${example.name}${example.genre ? ` (${example.genre})` : ''}`,
          page: `tools/${toolSlug}`,
        }),
      }).catch(() => {});
    }
  }, [liked, likeKey, toolSlug, example.name, example.genre]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => {
      setPlaying(true);
      if (!hasTrackedPlay.current) {
        hasTrackedPlay.current = true;
        analytics.audioPlay({ toolSlug, exampleName: example.name, genre: example.genre });
      }
    };
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
      analytics.audioComplete({ toolSlug, exampleName: example.name, genre: example.genre });

      if (!autoPlayNextInList) return;

      const currentCard = audio.closest('[data-song-card]');
      const nextCard = currentCard?.nextElementSibling as HTMLElement | null;
      const nextAudio = nextCard?.querySelector('audio') as HTMLAudioElement | null;
      if (!nextAudio) return;

      nextAudio.play().catch(() => {
        // Ignore browser autoplay restrictions and keep manual controls available.
      });
    };
    const onTimeUpdate = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [toolSlug, example.name, example.genre, autoPlayNextInList]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
  }

  function seek(clientX: number) {
    const bar = progressBarRef.current;
    const audio = audioRef.current;
    if (!bar || !audio || !audio.duration) return;
    const rect = bar.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    audio.currentTime = fraction * audio.duration;
    setProgress(fraction);
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    isDragging.current = true;
    setSeeking(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    seek(e.clientX);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging.current) return;
    seek(e.clientX);
  }

  function onPointerUp() {
    isDragging.current = false;
    setSeeking(false);
  }

  return (
    <div
      data-song-card
      className={`relative overflow-hidden border p-3 transition-colors ${
        playing ? 'border-amber' : 'border-border'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Cover + play button */}
        <button
          onClick={toggle}
          aria-label={playing ? `Pause ${example.subtitle}` : `Play ${example.subtitle}`}
          className="bg-surface focus-visible:outline-amber relative h-14 w-14 shrink-0 overflow-hidden focus-visible:outline-2"
        >
          {example.coverUrl && (
            <Image src={example.coverUrl} alt="" fill className="object-cover" sizes="56px" />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity hover:bg-black/40">
            {playing ? (
              <Pause className="h-5 w-5 fill-white text-white" />
            ) : (
              <Play className="h-5 w-5 fill-white text-white" />
            )}
          </div>
        </button>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-sm font-semibold">{example.name}</p>
          <p className="text-muted-foreground truncate font-mono text-xs">{example.subtitle}</p>
        </div>

        {/* Genre badge */}
        <span className="border-border text-muted-foreground shrink-0 border px-2 py-0.5 font-mono text-xs">
          {example.genre}
        </span>

        {/* Thumbs up */}
        <button
          onClick={toggleLike}
          aria-label={liked ? 'Unlike' : 'Like this song'}
          className={`shrink-0 p-1 transition-colors ${
            liked ? 'text-amber' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <ThumbsUp className={`h-4 w-4 ${liked ? 'fill-amber' : ''}`} />
        </button>
      </div>

      {/* Context line */}
      {example.context && (
        <p className="text-muted-foreground mt-2 pl-17 font-mono text-xs leading-relaxed">
          {example.context}
        </p>
      )}

      {/* Seekable progress bar — tall pointer target, thin visual */}
      <div
        ref={progressBarRef}
        className="absolute right-0 bottom-0 left-0 h-4 cursor-pointer"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div
          className={`bg-amber absolute bottom-0 left-0 h-0.5 ${seeking ? '' : 'transition-[width]'}`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <audio ref={audioRef} src={example.audioUrl} preload="metadata" />
    </div>
  );
}
