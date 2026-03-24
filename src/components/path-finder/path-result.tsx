'use client';

import { type Path } from '@/lib/flow-data';
import { Check, X, AlertTriangle, RotateCcw } from 'lucide-react';

interface PathResultProps {
  path: Path;
  onRestart: () => void;
}

export function PathResult({ path, onRestart }: PathResultProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 mx-auto flex w-full max-w-lg flex-col gap-8 duration-300">
      {/* Header */}
      <div className="border-border flex flex-col gap-2 border-b pb-7">
        <p className="text-muted-foreground font-mono text-xs font-semibold tracking-widest uppercase">
          Your starting point
        </p>
        <h2 className="text-foreground text-3xl leading-tight font-bold tracking-tight text-balance md:text-4xl">
          {path.label}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{path.tagline}</p>
      </div>

      {/* Description */}
      <p className="text-foreground text-sm leading-relaxed">{path.description}</p>

      {/* Signals */}
      <div className="flex flex-col gap-3">
        <p className="text-muted-foreground font-mono text-xs font-semibold tracking-widest uppercase">
          This fits if
        </p>
        <ul className="flex flex-col gap-2">
          {path.signals.map((signal, i) => (
            <li key={i} className="text-foreground flex items-start gap-3 text-sm leading-relaxed">
              <Check
                className="text-foreground mt-0.5 h-3.5 w-3.5 shrink-0"
                aria-hidden="true"
                strokeWidth={2.5}
              />
              <span>{signal}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Not for */}
      <div className="bg-secondary border-border flex flex-col gap-2 border p-4">
        <div className="flex items-center gap-2">
          <X
            className="text-muted-foreground h-3.5 w-3.5 shrink-0"
            aria-hidden="true"
            strokeWidth={2.5}
          />
          <p className="text-muted-foreground font-mono text-xs font-semibold tracking-widest uppercase">
            Not for you if
          </p>
        </div>
        <p className="text-foreground text-sm leading-relaxed">{path.notFor}</p>
      </div>

      {/* Starting moves */}
      <div className="flex flex-col gap-3">
        <p className="text-muted-foreground font-mono text-xs font-semibold tracking-widest uppercase">
          Where to start
        </p>
        <ol className="flex flex-col gap-3">
          {path.startingMoves.map((move, i) => (
            <li key={i} className="text-foreground flex items-start gap-4 text-sm leading-relaxed">
              <span
                className="border-foreground text-foreground mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border font-mono text-xs font-bold"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span>{move}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Watch out */}
      <div className="border-border flex flex-col gap-2 border p-4">
        <div className="flex items-center gap-2">
          <AlertTriangle
            className="text-muted-foreground h-3.5 w-3.5 shrink-0"
            aria-hidden="true"
          />
          <p className="text-muted-foreground font-mono text-xs font-semibold tracking-widest uppercase">
            Watch out for
          </p>
        </div>
        <p className="text-foreground text-sm leading-relaxed">{path.watchOut}</p>
      </div>

      {/* Restart — intentionally raw <button>, small text action */}
      <div className="pt-1">
        <button
          onClick={onRestart}
          className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs transition-colors"
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
          Start over
        </button>
      </div>
    </div>
  );
}
