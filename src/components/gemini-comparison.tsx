import { SongCard } from '@/components/song-card';
import type { ToolAudioExample } from '@/lib/tools';

type Props = {
  genericai: ToolAudioExample;
  songforme: ToolAudioExample;
};

export function GeminiComparison({ genericai, songforme }: Props) {
  return (
    <section className="border-border mt-10 border p-5">
      <p className="text-amber font-mono text-xs tracking-widest uppercase">Objection Check</p>
      <h2 className="font-heading mt-2 text-xl font-semibold tracking-tight md:text-2xl">
        Generic AI vs. songfor.me
      </h2>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        Same person. Same details. Second plays when the first finishes.
      </p>

      <div className="mt-5 space-y-2">
        <SongCard example={genericai} toolSlug="songfor-me" autoPlayNextInList />
        <SongCard example={songforme} toolSlug="songfor-me" />
      </div>
    </section>
  );
}
