import { ImageResponse } from 'next/og';
import { getToolBySlug } from '@/lib/tools';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const STATUS_LABEL: Record<string, string> = {
  live: 'Live',
  beta: 'Beta',
  building: 'Building',
  'coming-soon': 'Coming Soon',
};

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  const name = tool?.name ?? 'Tool';
  const description = tool?.description ?? '';
  const status = tool?.status ?? 'building';
  const truncatedDesc = description.length > 100 ? description.slice(0, 100) + '…' : description;

  return new ImageResponse(
    <div
      style={{
        background: '#050505',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Status badge */}
      <div style={{ display: 'flex' }}>
        <span
          style={{
            color: '#F97415',
            fontSize: '18px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
            border: '1px solid rgba(249, 116, 21, 0.4)',
            padding: '6px 14px',
          }}
        >
          {STATUS_LABEL[status] ?? status}
        </span>
      </div>

      {/* Tool name + description */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div
          style={{
            color: '#FAFAFA',
            fontSize: name.length > 12 ? '64px' : '80px',
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          {name}
        </div>
        {truncatedDesc && (
          <div
            style={{
              color: '#888',
              fontSize: '24px',
              fontFamily: 'monospace',
              maxWidth: '800px',
              lineHeight: 1.4,
            }}
          >
            {truncatedDesc}
          </div>
        )}
      </div>

      {/* Branding */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ width: '32px', height: '32px', background: '#F97415' }} />
        <span style={{ color: '#888', fontSize: '22px', letterSpacing: '-0.01em' }}>
          Modryn Studio
        </span>
        <span style={{ color: '#333', fontSize: '22px' }}>·</span>
        <span style={{ color: '#555', fontSize: '20px', fontFamily: 'monospace' }}>
          modrynstudio.com/tools
        </span>
      </div>
    </div>,
    { ...size }
  );
}
