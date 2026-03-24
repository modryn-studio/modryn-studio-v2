'use client';

import { useState } from 'react';
import { diagnosticQuestions, paths, scoreToPath, type PathId } from '@/lib/flow-data';
import { PathResult } from '@/components/path-finder/path-result';
import { cn } from '@/lib/utils';

interface DiagnosticQuizProps {
  onRestart: () => void;
}

export function DiagnosticQuiz({ onRestart }: DiagnosticQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Partial<Record<PathId, number>>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<PathId | null>(null);

  const total = diagnosticQuestions.length;
  const question = diagnosticQuestions[currentIndex];
  const progress = result ? 100 : (currentIndex / total) * 100;

  function handleSelect(choiceIndex: number) {
    if (selected !== null) return;
    setSelected(choiceIndex);

    const choice = question.choices[choiceIndex];
    const newScores = { ...scores };
    for (const [pathId, pts] of Object.entries(choice.scores) as [PathId, number][]) {
      newScores[pathId] = (newScores[pathId] ?? 0) + pts;
    }

    setTimeout(() => {
      if (currentIndex + 1 < total) {
        setScores(newScores);
        setCurrentIndex((i) => i + 1);
        setSelected(null);
      } else {
        setResult(scoreToPath(newScores));
      }
    }, 260);
  }

  if (result) {
    return <PathResult path={paths[result]} onRestart={onRestart} />;
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-8">
      {/* Progress */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground font-mono text-xs">
            {currentIndex + 1} / {total}
          </span>
          {/* intentionally raw <button> — tiny text action */}
          <button
            onClick={onRestart}
            className="text-muted-foreground hover:text-foreground text-xs transition-colors"
          >
            Change format
          </button>
        </div>
        <div
          className="bg-border h-px w-full overflow-hidden"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Quiz progress"
        >
          <div
            className="bg-foreground h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div
        key={question.id}
        className="animate-in fade-in slide-in-from-bottom-3 flex flex-col gap-10 duration-300"
      >
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
              onClick={() => handleSelect(i)}
              disabled={selected !== null && selected !== i}
              className={cn(
                'border px-5 py-4 text-left transition-all duration-200',
                'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
                selected === i
                  ? 'border-foreground bg-foreground text-background'
                  : selected !== null
                    ? 'border-border bg-background cursor-not-allowed opacity-30'
                    : 'border-border bg-background hover:border-foreground hover:bg-secondary cursor-pointer'
              )}
            >
              <span
                className={cn(
                  'block text-sm leading-snug font-medium',
                  selected === i ? 'text-background' : 'text-foreground'
                )}
              >
                {choice.label}
              </span>
              {choice.sublabel && (
                <span
                  className={cn(
                    'mt-0.5 block text-xs leading-relaxed',
                    selected === i ? 'text-background/70' : 'text-muted-foreground'
                  )}
                >
                  {choice.sublabel}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
