'use client';

import { useRef } from 'react';
import type { ToolAudioExample } from '@/lib/tools';
import { analytics } from '@/lib/analytics';

type Side = 'gemini' | 'songforme';

type Props = {
  toolSlug: string;
  gemini: ToolAudioExample;
  songforme: ToolAudioExample;
};

export function GeminiComparison({ toolSlug, gemini, songforme }: Props) {
  const heardRef = useRef<{ gemini: boolean; songforme: boolean; first: Side | null }>({
    gemini: false,
    songforme: false,
    first: null,
  });

  function onPlay(side: Side, clip: ToolAudioExample) {
    if (heardRef.current[side]) return;

    heardRef.current[side] = true;
    if (!heardRef.current.first) heardRef.current.first = side;

    analytics.track('comparison_clip_play', {
      toolSlug,
      side,
      clipName: clip.subtitle,
      genre: clip.genre,
    });

    if (heardRef.current.gemini && heardRef.current.songforme) {
      analytics.track('comparison_pair_heard', {
        toolSlug,
        person: songforme.name,
        firstPlayed: heardRef.current.first ?? side,
      });
    }
  }

  return (
    <section className="border-border mt-10 border p-5">
      <p className="text-amber font-mono text-xs tracking-widest uppercase">Objection Check</p>
      <h2 className="font-heading mt-2 text-xl font-semibold tracking-tight md:text-2xl">
        Gemini vs. songfor.me
      </h2>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        Same person. Same details. Listen in order.
      </p>
      <p className="text-muted-foreground mt-1 font-mono text-xs">
        Person: {songforme.name} | Genre: {songforme.genre}
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <article className="border-border bg-card border p-4">
          <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
            1. Hear Gemini
          </p>
          <p className="mt-2 font-mono text-sm font-semibold">{gemini.subtitle}</p>
          <p className="text-muted-foreground mt-1 font-mono text-xs">~30-second clip</p>
          <div className="log-audio-wrap mt-3">
            <audio
              className="log-audio w-full"
              controls
              preload="metadata"
              src={gemini.audioUrl}
              onPlay={() => onPlay('gemini', gemini)}
            />
          </div>
        </article>

        <article className="border-border bg-card border p-4">
          <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
            2. Hear songfor.me
          </p>
          <p className="mt-2 font-mono text-sm font-semibold">{songforme.subtitle}</p>
          <p className="text-muted-foreground mt-1 font-mono text-xs">Full production track</p>
          <div className="log-audio-wrap mt-3">
            <audio
              className="log-audio w-full"
              controls
              preload="metadata"
              src={songforme.audioUrl}
              onPlay={() => onPlay('songforme', songforme)}
            />
          </div>
        </article>
      </div>
    </section>
  );
}
