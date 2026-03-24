'use client';

import { useState } from 'react';
import { paths, type PathId, type Mode } from '@/lib/flow-data';
import { PathFinderHome } from '@/components/path-finder/home-screen';
import { PathResult } from '@/components/path-finder/path-result';
import { DiagnosticQuiz } from '@/components/path-finder/formats/diagnostic-quiz';
import { SpectrumAxis } from '@/components/path-finder/formats/spectrum-axis';
import { DayInLife } from '@/components/path-finder/formats/day-in-life';
import { WizardFlow } from '@/components/path-finder/formats/wizard-flow';

type View = 'home' | 'result' | Mode;

export function PathFinder() {
  const [view, setView] = useState<View>('home');
  const [selectedPath, setSelectedPath] = useState<PathId | null>(null);

  function goHome() {
    setView('home');
    setSelectedPath(null);
  }

  function handleSelectPath(id: PathId) {
    setSelectedPath(id);
    setView('result');
  }

  function handleSelectMode(mode: Mode) {
    setView(mode);
  }

  if (view === 'result' && selectedPath) {
    return <PathResult path={paths[selectedPath]} onRestart={goHome} />;
  }

  if (view === 'diagnostic') return <DiagnosticQuiz onRestart={goHome} />;
  if (view === 'spectrum') return <SpectrumAxis onRestart={goHome} />;
  if (view === 'dayinlife') return <DayInLife onRestart={goHome} />;
  if (view === 'wizard') return <WizardFlow onRestart={goHome} />;

  return <PathFinderHome onSelectPath={handleSelectPath} onSelectMode={handleSelectMode} />;
}
