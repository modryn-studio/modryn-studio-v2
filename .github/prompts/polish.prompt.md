---
name: polish
description: 'UI consistency sweep: audits all components, ensures shared primitives exist, migrates raw elements, fixes responsive gaps, keyboard safety, and touch targets — then verifies with lint + tsc.'
agent: agent
---

You are running a full UI consistency pass on this Next.js project. Work through every phase in order. Do not summarize or stop early — complete all phases.

---

## Phase 1: Ensure Primitives Exist

Check for `src/components/ui/button.tsx`, `input.tsx`, and `textarea.tsx`.

If any are missing, create them now using these exact patterns:

**button.tsx:**

```tsx
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white hover:opacity-90 disabled:opacity-50',
  secondary:
    'border-border bg-surface text-text border hover:border-accent hover:text-accent disabled:opacity-50',
  ghost: 'text-muted hover:text-text disabled:opacity-50',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'focus-visible:ring-accent/30 rounded-full font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
```

**input.tsx:**

```tsx
import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        'border-border bg-surface placeholder:text-muted focus:border-accent focus-visible:ring-accent/20 w-full rounded-full border px-4 py-3 text-sm transition-colors outline-none focus-visible:ring-2',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';
```

**textarea.tsx:**

```tsx
import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        'border-border bg-surface placeholder:text-muted focus:border-accent focus-visible:ring-accent/20 w-full resize-none rounded-2xl border px-4 py-3 text-sm transition-colors outline-none focus-visible:ring-2',
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';
```

---

## Phase 2: Audit Components

Read every file in `src/components/` and every `page.tsx` / `page-content.tsx` under `src/app/`.

For each file, check ALL of the following:

### Interactive Elements

- [ ] Raw `<button>` elements that should use `<Button>` from `@/components/ui/button`
      **Exception:** buttons with intentionally non-standard shapes (circular icon-only, custom media controls) — leave these raw, add a `{/* custom shape — intentionally raw <button> */}` comment
- [ ] Raw `<input type="text|email|tel|search|url|password">` that should use `<Input>` from `@/components/ui/input`
- [ ] Raw `<textarea>` that should use `<Textarea>` from `@/components/ui/textarea`

### Brand Token Usage

- [ ] Any `[var(--color-*)]` arbitrary values — replace with `(--color-*)` shorthand or named utility (`bg-accent`, `border-border`, etc.)
- [ ] Any hardcoded hex values that should reference a brand token

### Responsive Spacing

- [ ] Any `px-6` or `px-8` on page/section wrappers that should be `px-4 sm:px-6`
- [ ] Any vertical padding without a smaller mobile breakpoint variant
- [ ] Any dense body copy blocks using `text-base` alone, missing a `text-[15px] sm:text-base` density step

### Mobile Keyboard Safety

- [ ] Any `fixed` or `sticky` bottom container that includes a text input — check for `visualViewport` keyboard offset tracking. If missing: HIGH priority fix.

### Touch Targets

- [ ] Any interactive element with height < 44px — look for `py-1`, `py-1.5`, `h-8`, `h-9` on buttons/links in mobile-visible UI

---

## Phase 3: Fix

Apply all changes found in Phase 2. For each file edited:

1. Add necessary imports (`import { Button } from '@/components/ui/button'` etc.)
2. Replace raw elements with primitives, preserving any per-element className overrides
3. Fix `[var(--color-*)]` → named utilities
4. Fix responsive spacing
5. Add `visualViewport` keyboard offset tracking where needed (use the pattern from `.github/instructions/design-system.instructions.md`)
6. Increase touch targets where too small

For anything ambiguous (complex custom shapes, intentional design choices), leave a `// TODO: CHECK — [reason]` comment instead of guessing.

---

## Phase 4: Verify

Run:

```
npm run lint
```

Then:

```
npx tsc --noEmit
```

If errors remain from your changes, fix them before proceeding.

---

## Phase 5: Report

Output this exact format:

```
## Polish Report

### Primitives
- button.tsx: [created / already existed]
- input.tsx: [created / already existed]
- textarea.tsx: [created / already existed]

### Migrations Applied
- [component] — [what changed]

### Responsive Fixes
- [component] — [what changed]

### Keyboard Safety Fixes
- [component] — [what was added]

### Touch Target Fixes
- [component] — [what changed]

### Left for Manual Review
- [anything flagged with TODO: CHECK]

### TypeCheck: PASS / FAIL
### Lint: PASS / FAIL
```

Do not commit. Luke reviews the diff and commits manually.
