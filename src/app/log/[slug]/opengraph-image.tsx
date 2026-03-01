import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/log';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? 'Build Log';
  const tag = post?.tag ?? 'build';
  const date = post?.date ?? '';

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
      {/* Tag + date */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span
          style={{
            color: '#F97415',
            fontSize: '20px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
            fontWeight: 700,
          }}
        >
          [{tag}]
        </span>
        {date && (
          <span style={{ color: '#555', fontSize: '18px', fontFamily: 'monospace' }}>{date}</span>
        )}
      </div>

      {/* Title */}
      <div
        style={{
          color: '#FAFAFA',
          fontSize: title.length > 55 ? '56px' : '68px',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          maxWidth: '1000px',
        }}
      >
        {title}
      </div>

      {/* Branding */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ width: '32px', height: '32px', background: '#F97415' }} />
        <span style={{ color: '#888', fontSize: '22px', letterSpacing: '-0.01em' }}>
          Modryn Studio
        </span>
        <span style={{ color: '#333', fontSize: '22px' }}>·</span>
        <span style={{ color: '#555', fontSize: '20px', fontFamily: 'monospace' }}>
          modrynstudio.com/log
        </span>
      </div>
    </div>,
    { ...size }
  );
}
