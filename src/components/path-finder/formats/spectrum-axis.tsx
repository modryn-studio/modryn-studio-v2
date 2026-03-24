'use client';

import { useState } from 'react';
import { spectrumPoints, paths, type PathId } from '@/lib/flow-data';
import { PathResult } from '@/components/path-finder/path-result';
import { cn } from '@/lib/utils';

interface SpectrumAxisProps {
  onRestart: () => void;
}

export function SpectrumAxis({ onRestart }: SpectrumAxisProps) {
  const [hovered, setHovered] = useState<PathId | null>(null);
  const [selected, setSelected] = useState<PathId | null>(null);

  if (selected) {
    return <PathResult path={paths[selected]} onRestart={onRestart} />;
  }

  const active = hovered;

  return (
    <div className="animate-in fade-in mx-auto flex w-full max-w-2xl flex-col gap-8 duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <p className="text-muted-foreground font-mono text-xs font-semibold tracking-widest uppercase">
            Spectrum
          </p>
          <h2 className="text-foreground text-2xl font-bold tracking-tight text-balance md:text-3xl">
            Every choice costs something. Where do you land?
          </h2>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            Hover a dot to learn the trade-off. Click to choose your path.
          </p>
        </div>
        {/* intentionally raw <button> — tiny text action */}
        <button
          onClick={onRestart}
          className="text-muted-foreground hover:text-foreground mt-1 shrink-0 text-xs transition-colors"
        >
          Change format
        </button>
      </div>

      {/* 2x2 Plot */}
      <div className="relative w-full" style={{ paddingBottom: '75%' }}>
        <div className="border-border bg-card absolute inset-0 border">
          {/* Grid lines */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="bg-border/60 h-px w-full" />
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="bg-border/60 h-full w-px" />
          </div>

          {/* Axis labels */}
          <span className="text-muted-foreground absolute bottom-2 left-3 font-mono text-[10px]">
            slow return
          </span>
          <span className="text-muted-foreground absolute right-3 bottom-2 font-mono text-[10px]">
            fast return
          </span>
          <span
            className="text-muted-foreground absolute top-1/2 left-1 font-mono text-[10px]"
            style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
          >
            low leverage
          </span>
          <span
            className="text-muted-foreground absolute top-3 left-1 font-mono text-[10px]"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            high leverage
          </span>

          {/* Dots */}
          {spectrumPoints.map((pt) => {
            const isActive = active === pt.id;
            return (
              /* intentionally raw <button> — circular dot, non-standard shape */
              <button
                key={pt.id}
                onMouseEnter={() => setHovered(pt.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(pt.id)}
                className="focus-visible:ring-ring absolute rounded-full focus-visible:ring-2 focus-visible:outline-none"
                style={{
                  left: `${pt.x}%`,
                  top: `${95 - pt.y * 0.85}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                aria-label={`${pt.label} — ${pt.tagline}`}
              >
                <span
                  className={cn(
                    'flex items-center justify-center rounded-full border-2 transition-all duration-200',
                    isActive
                      ? 'bg-foreground border-foreground h-5 w-5'
                      : 'bg-background border-foreground/40 hover:border-foreground h-3.5 w-3.5 hover:h-5 hover:w-5'
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Info panel */}
      <div className="min-h-24">
        {active ? (
          <div className="animate-in fade-in border-border bg-card flex flex-col gap-3 border px-5 py-4 duration-150">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-foreground text-base font-semibold">
                {spectrumPoints.find((p) => p.id === active)?.label}
              </p>
              <p className="text-muted-foreground text-xs">
                {spectrumPoints.find((p) => p.id === active)?.tagline}
              </p>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {paths[active].description}
            </p>
            {/* intentionally raw <button> — small inline action */}
            <button
              onClick={() => setSelected(active)}
              className="text-foreground border-foreground hover:bg-foreground hover:text-background mt-1 self-start border px-3 py-1.5 text-xs font-medium transition-all duration-150"
            >
              This is my path
            </button>
          </div>
        ) : (
          <div className="border-border flex h-full items-center justify-center border border-dashed px-5 py-8">
            <p className="text-muted-foreground text-center text-xs">
              Hover a dot to see the trade-offs
            </p>
          </div>
        )}
      </div>

      {/* Legend list */}
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {spectrumPoints.map((pt) => (
          /* intentionally raw <button> — legend dot + label, non-standard shape */
          <button
            key={pt.id}
            onMouseEnter={() => setHovered(pt.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelected(pt.id)}
            className={cn(
              'flex items-center gap-2 text-xs transition-colors',
              hovered === pt.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <span
              className={cn(
                'border-foreground/40 h-2 w-2 rounded-full border transition-colors',
                hovered === pt.id ? 'bg-foreground' : 'bg-transparent'
              )}
            />
            {pt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
