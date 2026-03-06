interface Props {
  lightUrl?: string;
  darkUrl?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

/**
 * Renders a screenshot that switches between light and dark variants based on
 * the active Tailwind dark mode class (set by next-themes).
 * No client JS required — uses CSS dark: modifier on both <img> elements.
 *
 * Fallback rules:
 * - Both provided → light in light mode, dark in dark mode
 * - Dark only → dark image shown in both modes
 * - Light only → light image shown in both modes
 */
export function ToolScreenshot({ lightUrl, darkUrl, alt, width, height, className = '' }: Props) {
  // Single image — no mode switching needed
  if (!lightUrl || !darkUrl) {
    const src = lightUrl ?? darkUrl;
    if (!src) return null;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={className} width={width} height={height} />
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={lightUrl}
        alt={alt}
        className={`${className} dark:hidden`.trim()}
        width={width}
        height={height}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={darkUrl}
        alt={alt}
        className={`${className} hidden dark:block`.trim()}
        width={width}
        height={height}
      />
    </>
  );
}
