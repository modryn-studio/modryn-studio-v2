'use client';

import { useState } from 'react';
import { wizardQuestions, paths, type PathId } from '@/lib/flow-data';
import { QuestionStep } from '@/components/path-finder/question-step';
import { PathResult } from '@/components/path-finder/path-result';

interface WizardFlowProps {
  onRestart: () => void;
}

const PATH_IDS: PathId[] = ['money', 'equity', 'learning', 'reputation', 'lifestyle'];

function isPathId(value: string): value is PathId {
  return (PATH_IDS as string[]).includes(value);
}

export function WizardFlow({ onRestart }: WizardFlowProps) {
  const [history, setHistory] = useState<string[]>(['q1']);
  const [result, setResult] = useState<PathId | null>(null);

  const currentId = history[history.length - 1];
  const currentQuestion = wizardQuestions[currentId] ?? null;
  const totalQuestions = history.length + (result ? 0 : 1);
  const progress = result ? 100 : Math.round((history.length / (history.length + 1)) * 100);

  if (!result && !currentQuestion) return null;

  function handleSelect(leadsTo: string) {
    if (isPathId(leadsTo)) {
      setResult(leadsTo);
    } else {
      setHistory((prev) => [...prev, leadsTo]);
    }
  }

  function handleBack() {
    if (result) {
      setResult(null);
    } else if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1));
    }
  }

  if (result) {
    return <PathResult path={paths[result]} onRestart={onRestart} />;
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-8">
      {/* Progress bar */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground font-mono text-xs">
            {history.length} of {totalQuestions}
          </span>
          {history.length > 1 && (
            /* intentionally raw <button> — tiny text action */
            <button
              onClick={handleBack}
              className="text-muted-foreground hover:text-foreground text-xs transition-colors"
            >
              Back
            </button>
          )}
        </div>
        <div className="bg-border h-px w-full overflow-hidden">
          <div
            className="bg-foreground h-px transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <QuestionStep key={currentId} question={currentQuestion!} onSelect={handleSelect} />
    </div>
  );
}
