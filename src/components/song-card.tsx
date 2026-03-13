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
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
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
      setCurrentTime(0);
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
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [toolSlug, example.name, example.genre, autoPlayNextInList]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        // Ignore browser autoplay restrictions.
      });
    }
  }

  function onSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    const val = Number(e.target.value);
    audio.currentTime = val;
    setCurrentTime(val);
  }

  function fmt(s: number): string {
    if (!isFinite(s) || s < 0) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      data-song-card
      className={`border p-3 transition-colors ${playing ? 'border-amber' : 'border-border'}`}
    >
      <div className="flex items-center gap-3">
        {/* Cover + play button */}
        <button
          onClick={toggle}
          aria-label={playing ? `Pause ${example.subtitle}` : `Play ${example.subtitle}`}
          className="bg-card focus-visible:outline-amber relative h-14 w-14 shrink-0 overflow-hidden focus-visible:outline-2"
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

      {/* Seek row */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-muted-foreground w-9 shrink-0 font-mono text-xs tabular-nums">
          {fmt(currentTime)}
        </span>
        <input
          type="range"
          className="song-seek flex-1"
          style={{ '--song-seek-pct': `${pct}%` } as React.CSSProperties}
          min={0}
          max={duration > 0 ? duration : 100}
          step={0.1}
          value={currentTime}
          onChange={onSeek}
          aria-label="Seek"
        />
        <span className="text-muted-foreground w-9 shrink-0 text-right font-mono text-xs tabular-nums">
          {fmt(duration)}
        </span>
      </div>

      {/* Context line */}
      {example.context && (
        <p className="text-muted-foreground mt-1 pl-11 font-mono text-xs leading-relaxed">
          {example.context}
        </p>
      )}

      <audio ref={audioRef} src={example.audioUrl} preload="metadata" />
    </div>
  );
}
