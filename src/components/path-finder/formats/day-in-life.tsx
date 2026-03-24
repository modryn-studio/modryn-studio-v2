'use client';

import { useState } from 'react';
import { dayScenarios, paths, type PathId } from '@/lib/flow-data';
import { PathResult } from '@/components/path-finder/path-result';
import { cn } from '@/lib/utils';

interface DayInLifeProps {
  onRestart: () => void;
}

export function DayInLife({ onRestart }: DayInLifeProps) {
  const [selected, setSelected] = useState<PathId | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed && selected) {
    return <PathResult path={paths[selected]} onRestart={onRestart} />;
  }

  return (
    <div className="animate-in fade-in mx-auto flex w-full max-w-2xl flex-col gap-8 duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <p className="text-muted-foreground font-mono text-xs font-semibold tracking-widest uppercase">
            Day in the life
          </p>
          <h2 className="text-foreground text-2xl font-bold tracking-tight text-balance md:text-3xl">
            It&apos;s Tuesday, one year from now.
          </h2>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            Which day do you actually want? Read all five, then pick the one that pulls at you.
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

      {/* Scenario cards */}
      <div className="flex flex-col gap-3">
        {dayScenarios.map((scenario) => {
          const isSelected = selected === scenario.id;
          return (
            /* intentionally raw <button> — expandable card, non-standard shape */
            <button
              key={scenario.id}
              onClick={() => setSelected(isSelected ? null : scenario.id)}
              className={cn(
                'group border text-left transition-all duration-200',
                'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
                isSelected
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-card hover:border-foreground hover:bg-secondary'
              )}
            >
              {/* Card header — always visible */}
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="flex flex-col gap-0.5">
                  <span
                    className={cn(
                      'font-mono text-xs',
                      isSelected ? 'text-background/60' : 'text-muted-foreground'
                    )}
                  >
                    {scenario.time}
                  </span>
                  <span
                    className={cn(
                      'text-sm leading-snug font-semibold',
                      isSelected ? 'text-background' : 'text-foreground'
                    )}
                  >
                    {scenario.scene}
                  </span>
                </div>
                <span
                  className={cn(
                    'shrink-0 text-xs font-medium',
                    isSelected ? 'text-background/70' : 'text-muted-foreground'
                  )}
                >
                  {scenario.label}
                </span>
              </div>

              {/* Expanded content */}
              {isSelected && (
                <div className="animate-in fade-in slide-in-from-top-1 flex flex-col gap-4 px-5 pb-5 duration-200">
                  <div className="bg-background/20 h-px" />
                  <ul className="flex flex-col gap-2">
                    {scenario.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-background/40 mt-0.5 shrink-0 font-mono text-xs">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-background/90 text-sm leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-background/70 border-background/20 border-l-2 pl-4 text-sm leading-relaxed italic">
                    {scenario.feeling}
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Confirm CTA */}
      {selected && (
        <div className="animate-in fade-in slide-in-from-bottom-2 flex items-center gap-4 duration-200">
          {/* intentionally raw <button> — custom bordered action */}
          <button
            onClick={() => setConfirmed(true)}
            className="text-foreground border-foreground hover:bg-foreground hover:text-background border px-5 py-2.5 text-sm font-semibold transition-all duration-150"
          >
            This is my Tuesday — show me the path
          </button>
          <button
            onClick={() => setSelected(null)}
            className="text-muted-foreground hover:text-foreground text-xs transition-colors"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
