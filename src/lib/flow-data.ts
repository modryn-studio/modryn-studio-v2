export type PathId = 'money' | 'equity' | 'learning' | 'reputation' | 'lifestyle';
export type Mode = 'diagnostic' | 'spectrum' | 'dayinlife' | 'wizard';

export interface Path {
  id: PathId;
  label: string;
  tagline: string;
  description: string;
  signals: string[];
  notFor: string;
  startingMoves: string[];
  watchOut: string;
}

// ─── SHARED PATH DEFINITIONS ─────────────────────────────────────────────────

export const paths: Record<PathId, Path> = {
  money: {
    id: 'money',
    label: 'Money Fast',
    tagline: 'Build something that pays you in weeks, not years.',
    description:
      "You're not trying to be original — you're trying to be profitable. Copy a proven product, charge from day one, keep scope tiny. The goal is cash flow, not a company.",
    signals: [
      'You have real financial pressure right now',
      "You'd rather ship something boring that pays than something cool that doesn't",
      'You can execute fast when the goal is clear',
    ],
    notFor:
      "People who need the project to be interesting or novel. Boring works here. If you can't tolerate that, pick a different path.",
    startingMoves: [
      'Find a problem people already pay to solve',
      'Build the thinnest version that delivers that outcome',
      'Put a paywall on it before you build anything else',
      'Get 3 paying customers before adding any features',
    ],
    watchOut: 'Scope creep disguised as quality. The enemy of money-fast is perfectionism.',
  },
  equity: {
    id: 'equity',
    label: 'Equity / Asset Building',
    tagline: 'Build something that grows in value — even while you sleep.',
    description:
      "Could be SaaS with recurring revenue, a content library, an audience you own. Takes longer to pay off but compounds. You're thinking like an owner, not a freelancer.",
    signals: [
      'You have 12–24 months of runway or patience',
      "You're energized by systems, not just output",
      'You want to build something you could sell someday',
    ],
    notFor:
      "People who need money in the next 3 months. Equity takes time. If you're under real financial pressure, solve that first.",
    startingMoves: [
      'Pick a niche with a proven willingness to pay',
      'Validate before you build: get pre-signups or letters of intent',
      'Design for retention, not just acquisition',
      'Think in recurring value, not one-time transactions',
    ],
    watchOut: 'Building something impressive that nobody pays for. Equity requires actual demand.',
  },
  learning: {
    id: 'learning',
    label: 'Learning a New Skill',
    tagline: 'The project is the excuse. The skill is the point.',
    description:
      'Revenue is secondary. You pick something that forces you to learn what you want to learn — a new stack, AI integration, systems design. The win is who you become, not what you ship.',
    signals: [
      "You're not under financial pressure right now",
      "You have a skill gap that's been bugging you",
      'You learn best by building real things, not tutorials',
    ],
    notFor:
      'People who need income from this project. Learning-first is powerful long-term but dangerous if you need to pay rent.',
    startingMoves: [
      "Name the specific skill you want — not 'get better at code', but 'build a real-time app with websockets'",
      'Pick a project that requires that skill to work at all',
      'Set a learning milestone, not a revenue target',
      'Build in public — teach what you learn',
    ],
    watchOut:
      "Tutorial hell with extra steps. Make sure you're actually building, not just consuming.",
  },
  reputation: {
    id: 'reputation',
    label: 'Reputation / Audience',
    tagline: 'The product is almost secondary to the signal it sends.',
    description:
      "Every project adds to a body of work. You're optimizing for being known, trusted, and sought after in a specific space. Slow burn, but the leverage is enormous long term.",
    signals: [
      'You want to be the go-to person in a specific space',
      'You care about how your work makes you look, not just what it pays',
      "You're playing a multi-year game",
    ],
    notFor:
      "People who need financial results in the near term. Reputation compounds slowly. It's a long game.",
    startingMoves: [
      'Pick a niche narrow enough to own, wide enough to matter',
      'Build in public from day one — share the process, not just the outcome',
      'Create artifacts: write-ups, demos, case studies',
      'Consistency over virality. Show up every week.',
    ],
    watchOut:
      "Chasing metrics instead of trust. Follower counts don't pay bills or build reputation — useful work does.",
  },
  lifestyle: {
    id: 'lifestyle',
    label: 'Lifestyle / Freedom',
    tagline: 'Enough revenue to be free. Minimal maintenance. No bosses.',
    description:
      "You want a project that funds your life without owning it. The metric isn't growth — it's independence. Often the most underrated goal.",
    signals: [
      "You're tired of trading time for money at someone else's direction",
      "You'd rather earn less and be free than earn more and be managed",
      "You have a clear picture of what 'enough' looks like",
    ],
    notFor:
      'People who want to build a big company or raise investment. Lifestyle businesses are intentionally small.',
    startingMoves: [
      'Define your number: what monthly revenue = freedom for you?',
      'Pick a model with low operations: info products, small tools, consulting',
      'Build for low maintenance from the start — automation first',
      "Charge enough that you don't need many customers",
    ],
    watchOut:
      "Scope creep toward 'real company' territory. Stay disciplined about what you're optimizing for.",
  },
};

// ─── FORMAT 0: WIZARD / FLOW ──────────────────────────────────────────────────
// Branching question tree — each answer shapes the next question.

export interface Choice {
  label: string;
  sublabel?: string;
  leadsTo: PathId | string; // PathId = terminal result, string = next question id
}

export interface Question {
  id: string;
  prompt: string;
  subprompt?: string;
  choices: Choice[];
}

export const wizardQuestions: Record<string, Question> = {
  q1: {
    id: 'q1',
    prompt: 'What does success feel like 12 months from now?',
    subprompt: 'Pick the one that lands, not the one that sounds best.',
    choices: [
      { label: "I'm making real money", sublabel: 'Revenue is flowing in', leadsTo: 'q2_money' },
      {
        label: "I'm known for something",
        sublabel: 'People seek me out in my space',
        leadsTo: 'reputation',
      },
      {
        label: "I'm genuinely free",
        sublabel: 'No boss, no clock, no permission needed',
        leadsTo: 'lifestyle',
      },
      {
        label: 'I became someone better',
        sublabel: 'New skills, new thinking, new doors',
        leadsTo: 'learning',
      },
    ],
  },
  q2_money: {
    id: 'q2_money',
    prompt: 'How fast do you actually need the money?',
    subprompt: 'Be honest — this is the fork in the road.',
    choices: [
      {
        label: 'Weeks to months — real pressure right now',
        sublabel: 'I need cash flow, not a long game',
        leadsTo: 'money',
      },
      {
        label: '6–18 months is fine if it compounds',
        sublabel: "I have some runway and I'm playing smart",
        leadsTo: 'q3_equity',
      },
    ],
  },
  q3_equity: {
    id: 'q3_equity',
    prompt: 'What kind of thing would you build?',
    subprompt: "Think about what you'd actually enjoy maintaining.",
    choices: [
      {
        label: 'A product or tool people subscribe to',
        sublabel: 'SaaS, recurring revenue, scalable',
        leadsTo: 'equity',
      },
      {
        label: 'Something I run mostly by myself',
        sublabel: "Small, profitable, mine — I don't want to manage people",
        leadsTo: 'lifestyle',
      },
    ],
  },
};

// ─── FORMAT 1: DIAGNOSTIC QUIZ ───────────────────────────────────────────────
// Indirect questions whose answers surface the goal — never asking directly.

export interface DiagnosticChoice {
  label: string;
  sublabel?: string;
  scores: Partial<Record<PathId, number>>;
}

export interface DiagnosticQuestion {
  id: string;
  prompt: string;
  subprompt?: string;
  choices: DiagnosticChoice[];
}

export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: 'q1',
    prompt:
      'If this project made $500/month in 6 months, would you feel satisfied or disappointed?',
    subprompt: "Be honest. There's no aspirational answer here.",
    choices: [
      {
        label: 'Satisfied — that would change things',
        sublabel: "That's real money, and real proof it works",
        scores: { money: 2, lifestyle: 2 },
      },
      {
        label: "It's a start, but I'd be building toward something bigger",
        sublabel: 'Nice milestone, not the destination',
        scores: { equity: 2, reputation: 1 },
      },
      {
        label: "Honestly, revenue isn't the main point",
        sublabel: "I'd measure success differently",
        scores: { learning: 3, reputation: 2 },
      },
    ],
  },
  {
    id: 'q2',
    prompt: "Imagine you had to stop working on the project for 3 months. What's your first worry?",
    subprompt: 'Not what you think you should worry about — what actually hits first.',
    choices: [
      {
        label: 'The revenue dries up',
        sublabel: 'I need that income flowing',
        scores: { money: 3, lifestyle: 1 },
      },
      {
        label: 'The asset loses value or falls behind',
        sublabel: 'Competitors move, momentum fades',
        scores: { equity: 3 },
      },
      {
        label: 'I lose the habit and fall behind on the skill',
        sublabel: 'The growth stops',
        scores: { learning: 3 },
      },
      {
        label: 'My audience forgets me',
        sublabel: 'Out of sight, out of mind',
        scores: { reputation: 3 },
      },
      {
        label: 'Honestly, nothing — that sounds like a vacation',
        sublabel: 'I want this to run without me',
        scores: { lifestyle: 3 },
      },
    ],
  },
  {
    id: 'q3',
    prompt:
      "You get a DM from someone saying they love what you're building. What do you hope they say next?",
    subprompt: 'The compliment that would actually land.',
    choices: [
      {
        label: '"I want to pay for this"',
        sublabel: 'Cash in hand is the signal I want',
        scores: { money: 3, lifestyle: 1 },
      },
      {
        label: '"I want to invest or partner with you"',
        sublabel: 'Someone sees the bigger picture',
        scores: { equity: 3 },
      },
      {
        label: '"How did you build this? I want to learn from you"',
        sublabel: 'The respect of someone who gets it',
        scores: { reputation: 2, learning: 2 },
      },
      {
        label: '"This inspired me to start my own thing"',
        sublabel: 'The ripple effect matters more than the revenue',
        scores: { reputation: 3, learning: 1 },
      },
      {
        label: '"I can\'t believe one person built this"',
        sublabel: 'The independence is the flex',
        scores: { lifestyle: 3 },
      },
    ],
  },
  {
    id: 'q4',
    prompt: 'How much financial pressure are you under right now?',
    subprompt: 'Honest answer changes everything about what makes sense.',
    choices: [
      {
        label: 'Real pressure — weeks or months, not years',
        sublabel: 'I need income, not a long game',
        scores: { money: 4 },
      },
      {
        label: "Some — I have runway but I can't waste it",
        sublabel: '12 months maybe, then it needs to work',
        scores: { equity: 2, lifestyle: 2 },
      },
      {
        label: 'None right now — I have breathing room',
        sublabel: 'I can afford to play a longer game',
        scores: { learning: 2, reputation: 2, equity: 1 },
      },
    ],
  },
];

export function scoreToPath(scores: Partial<Record<PathId, number>>): PathId {
  const entries = Object.entries(scores) as [PathId, number][];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

// ─── FORMAT 2: SPECTRUM / 2x2 AXIS ───────────────────────────────────────────

export interface SpectrumPoint {
  id: PathId;
  label: string;
  tagline: string;
  x: number; // Speed of Return: 0 = slow, 100 = fast
  y: number; // Personal Leverage: 0 = low, 100 = high
}

export const spectrumPoints: SpectrumPoint[] = [
  { id: 'money', label: 'Money Fast', tagline: 'Charge now, ship lean', x: 92, y: 18 },
  { id: 'lifestyle', label: 'Lifestyle', tagline: 'Enough to be free', x: 65, y: 72 },
  { id: 'equity', label: 'Asset Building', tagline: 'Compounds over time', x: 28, y: 85 },
  { id: 'reputation', label: 'Reputation', tagline: 'Long game, big doors', x: 15, y: 92 },
  { id: 'learning', label: 'Skill Building', tagline: 'You become the asset', x: 20, y: 55 },
];

// ─── FORMAT 3: DAY IN THE LIFE ────────────────────────────────────────────────

export interface DayScenario {
  id: PathId;
  label: string;
  time: string;
  scene: string;
  details: string[];
  feeling: string;
}

export const dayScenarios: DayScenario[] = [
  {
    id: 'money',
    label: 'Money Fast',
    time: 'Tuesday, 7:14am',
    scene: 'You open Stripe before coffee.',
    details: [
      'Three new customers overnight from a cold email batch you sent Monday.',
      "You spend the morning on support tickets — it's not glamorous, but it's paying.",
      'Afternoon is a sales call. You close it in 20 minutes.',
      "By 5pm you've made more today than you did in a week at your old job.",
    ],
    feeling: "The feedback loop is tight. You know exactly what's working.",
  },
  {
    id: 'equity',
    label: 'Asset Building',
    time: 'Tuesday, 9:00am',
    scene: 'You check the dashboard. MRR is up 8% this month.',
    details: [
      'You spend the morning reviewing churn data — one customer segment is dropping off and you want to know why.',
      'Afternoon is a 1-on-1 with your first hire.',
      'You write a quarterly update for your angel investors.',
      'You log off at 6pm knowing the product ran itself all day.',
    ],
    feeling: "You're building something with real weight. It existed before you woke up.",
  },
  {
    id: 'learning',
    label: 'Skill Building',
    time: 'Tuesday, 10:30am',
    scene: "You're in a coffee shop with your laptop and a blank terminal.",
    details: [
      "You've been stuck on a WebSocket bug for two days. Today you finally understand why.",
      'You ship a small demo to GitHub. Six stars by noon.',
      'You write a short post about what you figured out. It gets more traction than the demo.',
      'You close your laptop at 4pm having learned more today than in the last three months at work.',
    ],
    feeling: 'You can feel yourself getting sharper. The work is the reward.',
  },
  {
    id: 'reputation',
    label: 'Reputation / Audience',
    time: 'Tuesday, 8:45am',
    scene: 'You post a thread about what you shipped last week.',
    details: [
      'By 10am it has 400 likes. Three people DM asking to collaborate.',
      'You have a 30-min call with a founder who found you through your writing.',
      'A newsletter with 50k subscribers asks to feature your work.',
      "You didn't launch anything today — but you built more credibility than most people build in a year.",
    ],
    feeling: 'People know your name in the space that matters to you.',
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle / Freedom',
    time: 'Tuesday, 11:00am',
    scene: 'You start work — because you chose to.',
    details: [
      'There are no meetings. You set your own agenda.',
      'The product handled 40 customer interactions overnight, automatically.',
      'You work for three hours, then take a long lunch.',
      "In the afternoon you do something that has nothing to do with work. You don't feel guilty.",
    ],
    feeling: "You're not rich. You're free. Turns out that's what you actually wanted.",
  },
];
