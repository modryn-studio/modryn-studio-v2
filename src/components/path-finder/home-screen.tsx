'use client';

import { cn } from '@/lib/utils';
import { paths, type PathId, type Mode } from '@/lib/flow-data';
import { ArrowRight } from 'lucide-react';

const pathOrder: PathId[] = ['money', 'equity', 'reputation', 'lifestyle', 'learning'];

const modeCards: { id: Mode; label: string; tagline: string; bestFor: string }[] = [
  {
    id: 'diagnostic',
    label: 'Diagnostic',
    tagline: 'Answer questions. Reveal your answer.',
    bestFor: 'Genuinely unsure — need clarity first',
  },
  {
    id: 'wizard',
    label: 'Guided Flow',
    tagline: 'One question at a time.',
    bestFor: 'Want to be led, not choose from a list',
  },
  {
    id: 'spectrum',
    label: 'Spectrum',
    tagline: 'See the trade-offs visually.',
    bestFor: 'Think in trade-offs and visual frameworks',
  },
  {
    id: 'dayinlife',
    label: 'Day in the Life',
    tagline: 'Read five Tuesdays. Pick yours.',
    bestFor: 'Make decisions by feel and imagination',
  },
];

interface HomeScreenProps {
  onSelectPath: (id: PathId) => void;
  onSelectMode: (mode: Mode) => void;
}

export function PathFinderHome({ onSelectPath, onSelectMode }: HomeScreenProps) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-14">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <p className="text-muted-foreground font-mono text-xs font-semibold tracking-widest uppercase">
          Starting point finder
        </p>
        <h2 className="text-foreground text-3xl leading-tight font-bold tracking-tight text-balance md:text-4xl">
          What are you really trying to build?
        </h2>
        <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
          Every project starts from one of five goals. Pick the one that&apos;s loudest right now.
        </p>
      </div>

      {/* 5 Paths */}
      <div className="flex flex-col">
        {pathOrder.map((id, i) => {
          const path = paths[id];
          return (
            /* intentionally raw <button> — custom list-row shape, not a shared primitive */
            <button
              key={id}
              onClick={() => onSelectPath(id)}
              className={cn(
                'group flex items-start justify-between gap-6 py-5 text-left transition-all duration-150',
                'border-border hover:bg-secondary -mx-4 border-t px-4',
                i === pathOrder.length - 1 && 'border-b'
              )}
            >
              <div className="flex min-w-0 flex-col gap-1">
                <span className="text-foreground text-base leading-snug font-semibold">
                  {path.label}
                </span>
                <span className="text-muted-foreground text-sm leading-relaxed">
                  {path.tagline}
                </span>
              </div>
              <ArrowRight
                className="text-muted-foreground group-hover:text-foreground mt-1 h-4 w-4 shrink-0 transition-all group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      {/* Divider + "Not sure?" */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-foreground text-sm font-semibold">Not sure which one fits?</p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Use one of these formats to find out. Same destination — different ways to get there.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {modeCards.map((mode) => (
            /* intentionally raw <button> — custom card shape */
            <button
              key={mode.id}
              onClick={() => onSelectMode(mode.id)}
              className={cn(
                'group border-border bg-card border px-5 py-4 text-left',
                'flex flex-col gap-1.5 transition-all duration-150',
                'hover:border-foreground hover:bg-secondary focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none'
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-foreground text-sm font-semibold">{mode.label}</span>
                <span className="text-muted-foreground group-hover:text-foreground shrink-0 text-xs transition-colors">
                  {mode.tagline}
                </span>
              </div>
              <p className="text-muted-foreground font-mono text-xs leading-relaxed">
                Best for: {mode.bestFor}
              </p>
            </button>
          ))}
        </div>
      </div>

      <p className="text-muted-foreground -mt-4 max-w-sm text-xs leading-relaxed">
        These paths are not mutually exclusive forever —{' '}
        <span className="text-foreground font-medium">right now</span>, one is louder than the
        others.
      </p>
    </div>
  );
}
