'use client';

import { useState } from 'react';
import { type Question } from '@/lib/flow-data';
import { cn } from '@/lib/utils';

interface QuestionStepProps {
  question: Question;
  onSelect: (leadsTo: string) => void;
}

export function QuestionStep({ question, onSelect }: QuestionStepProps) {
  const [selected, setSelected] = useState<string | null>(null);

  function handleClick(leadsTo: string) {
    if (selected) return;
    setSelected(leadsTo);
    setTimeout(() => onSelect(leadsTo), 220);
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 flex flex-col gap-10 duration-300">
      <div className="flex flex-col gap-3">
        <p className="text-foreground text-2xl leading-snug font-semibold tracking-tight text-balance md:text-3xl">
          {question.prompt}
        </p>
        {question.subprompt && (
          <p className="text-muted-foreground text-sm leading-relaxed">{question.subprompt}</p>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        {question.choices.map((choice, i) => (
          /* intentionally raw <button> — custom choice card */
          <button
            key={i}
            onClick={() => handleClick(choice.leadsTo)}
            disabled={!!selected && selected !== choice.leadsTo}
            className={cn(
              'group relative border px-5 py-4 text-left transition-all duration-200',
              'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
              selected === choice.leadsTo
                ? 'border-foreground bg-foreground text-background'
                : selected
                  ? 'border-border bg-background cursor-not-allowed opacity-30'
                  : 'border-border bg-background hover:border-foreground hover:bg-secondary cursor-pointer'
            )}
          >
            <span
              className={cn(
                'block text-sm leading-snug font-medium transition-colors',
                selected === choice.leadsTo ? 'text-background' : 'text-foreground'
              )}
            >
              {choice.label}
            </span>
            {choice.sublabel && (
              <span
                className={cn(
                  'mt-0.5 block text-xs leading-relaxed transition-colors',
                  selected === choice.leadsTo ? 'text-background/70' : 'text-muted-foreground'
                )}
              >
                {choice.sublabel}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
