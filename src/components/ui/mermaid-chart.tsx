'use client';

import { useEffect, useId, useRef } from 'react';

interface MermaidChartProps {
  chart: string;
}

export function MermaidChart({ chart }: MermaidChartProps) {
  const id = useId().replace(/:/g, '');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    let cancelled = false;

    import('mermaid').then(({ default: mermaid }) => {
      if (cancelled) return;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        darkMode: true,
        themeVariables: {
          background: '#050505',
          primaryColor: '#1a1a1a',
          primaryTextColor: '#e5e5e5',
          lineColor: '#444444',
          edgeLabelBackground: '#111111',
          fontSize: '14px',
          fontFamily: 'var(--font-mono, monospace)',
        },
      });
      mermaid.render(`mermaid-${id}`, chart.trim()).then(({ svg }) => {
        if (cancelled || !ref.current) return;
        ref.current.innerHTML = svg;
      });
    });

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return (
    <div ref={ref} className="border-border my-6 overflow-x-auto border p-4" aria-label="Diagram" />
  );
}
