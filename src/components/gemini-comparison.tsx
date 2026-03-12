'use client';

import { useRef } from 'react';
import Image from 'next/image';
import type { ToolAudioExample } from '@/lib/tools';

type Side = 'gemini' | 'songforme';

type Props = {
  gemini: ToolAudioExample;
  songforme: ToolAudioExample;
};

export function GeminiComparison({ gemini, songforme }: Props) {
  const geminiAudioRef = useRef<HTMLAudioElement>(null);
  const songformeAudioRef = useRef<HTMLAudioElement>(null);
  const heardRef = useRef<{ gemini: boolean; songforme: boolean; first: Side | null }>({
    gemini: false,
    songforme: false,
    first: null,
  });

  function onPlay(side: Side) {
    if (heardRef.current[side]) return;

    heardRef.current[side] = true;
    if (!heardRef.current.first) heardRef.current.first = side;

    if (heardRef.current.gemini && heardRef.current.songforme) {
      return;
    }
  }

  async function onGeminiEnded() {
    const nextAudio = songformeAudioRef.current;
    if (!nextAudio) return;

    try {
      await nextAudio.play();
    } catch {
      // Ignore browser autoplay restrictions and keep manual controls available.
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
              ref={geminiAudioRef}
              className="log-audio w-full"
              controls
              preload="metadata"
              src={gemini.audioUrl}
              onPlay={() => onPlay('gemini')}
              onEnded={onGeminiEnded}
            />
          </div>
        </article>

        <article className="border-border bg-card border p-4">
          <p className="text-muted-foreground mb-2 font-mono text-xs tracking-widest uppercase">
            2. Hear songfor.me
          </p>
          <div className="border-border bg-background border p-3">
            <div className="flex items-center gap-3">
              <div className="bg-card relative h-14 w-14 shrink-0 overflow-hidden">
                {songforme.coverUrl && (
                  <Image
                    src={songforme.coverUrl}
                    alt={`${songforme.name} cover image`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-sm font-semibold">{songforme.name}</p>
                <p className="text-muted-foreground truncate font-mono text-xs">
                  {songforme.subtitle}
                </p>
              </div>
              <span className="border-border text-muted-foreground shrink-0 border px-2 py-0.5 font-mono text-xs">
                {songforme.genre}
              </span>
            </div>

            <p className="text-muted-foreground mt-3 font-mono text-xs">Full production track</p>

            <div className="log-audio-wrap mt-2">
              <audio
                ref={songformeAudioRef}
                className="log-audio w-full"
                controls
                preload="metadata"
                src={songforme.audioUrl}
                onPlay={() => onPlay('songforme')}
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
