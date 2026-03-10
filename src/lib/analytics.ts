// analytics.ts — event tracking stub
// Vercel Analytics (<Analytics /> in layout.tsx) handles pageviews automatically.
// Named methods are kept so call sites stay typed — swap in a provider here when needed.

type EventProps = Record<string, string | number | boolean | undefined>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function track(_eventName: string, _props?: EventProps): void {
  // no-op
}

// Add project-specific named methods below.
// Pattern: namedAction: (props: { ... }) => track('event_name', props)
export const analytics = {
  track,
  newsletterSignup: (props?: { source?: string }) => track('newsletter_signup', props),
  feedbackSubmit: () => track('feedback_submit'),
  toolClick: (props: { name: string; slug: string }) => track('tool_click', props),
  shareClick: (props: { platform: string; slug: string }) => track('share_click', props),
  briefingViewed: (props: { date: string }) => track('briefing_viewed', props),
  briefingReadComplete: (props: { date: string }) => track('briefing_read_complete', props),
  audioPlay: (props: { toolSlug: string; exampleName: string; genre: string }) =>
    track('audio_play', props),
  audioComplete: (props: { toolSlug: string; exampleName: string; genre: string }) =>
    track('audio_complete', props),
  audioLike: (props: { toolSlug: string; exampleName: string; genre: string }) =>
    track('audio_like', props),
  toolCta: (props: { name: string; slug: string; status: string }) =>
    track('tool_cta_click', props),
  toolPageViewed: (props: { name: string; slug: string; status: string }) =>
    track('tool_page_viewed', props),
  logPostViewed: (props: { slug: string; title: string }) => track('log_post_viewed', props),
  logPostReadComplete: (props: { slug: string; title: string }) =>
    track('log_post_read_complete', props),
};
