# HANA Frontend — UI Development Guide

You are building the **frontend UI only** — pages, components, and flows with dummy data. The backend/API will be built separately. Your job is to make every screen look great, feel responsive, and be ready for API integration with minimal rework.

## Golden Rules

1. **UI only, dummy data always.** Never build real API calls. Use mock data from `src/data/` that mirrors the real API shape.
2. **ShadCN first.** Use ShadCN components for everything. Only build custom when ShadCN genuinely doesn't cover it.
3. **Responsive on every screen.** Every page must work on phones (375px), tablets (768px), and laptops (1280px+).
4. **Clean up after yourself.** Unused components, imports, variables, files — delete them immediately.
5. **Follow what's already there.** Match the existing design language, naming, folder structure, and code style.

## Tech Stack

React 18+ with Vite, TypeScript (strict), Tailwind CSS, ShadCN/UI, npm, Lucide React icons.

## Project Structure

```
src/
├── components/ui/        # ShadCN components (auto-generated, don't edit)
├── components/layout/    # Header, Sidebar, Footer, PageWrapper
├── components/shared/    # Custom shared components used by 2+ pages
├── pages/<page>/         # One folder per route, with page-specific components/
├── data/                 # Dummy data files (mock API responses)
├── hooks/                # Custom React hooks
├── types/                # TypeScript interfaces
├── lib/                  # Utilities
└── assets/public/        # Static images by category: icons/, illustrations/, avatars/, logos/
```

Page-specific components go inside that page's folder. Shared components (used by 2+ pages) go in `components/shared/`. Every folder with components should have an `index.ts` barrel export.

## Dummy Data — The Most Important Pattern

Structure dummy data to match the **real API response shape** so integration later is painless.

```typescript
// 1. Define types FIRST — src/types/patient.ts
export interface Patient {
  id: string;
  name: string;
  phone: string;
  status: "active" | "inactive" | "pending";
  lastCallDate: string;
  nextScheduledCall: string | null;
}

// 2. Create mock data — src/data/patients.ts
import type { Patient } from "@/types/patient";
export const mockPatients: Patient[] = [
  { id: "pat_001", name: "Sarah Johnson", phone: "+1 (555) 123-4567",
    status: "active", lastCallDate: "2026-04-15T10:30:00Z", nextScheduledCall: "2026-04-22T14:00:00Z" },
  // ... 5-10 entries with realistic values, edge cases (null, long names, varied statuses)
];

// 3. Access via hook — src/hooks/usePatients.ts
export function usePatients() {
  // TODO: Replace with real API call
  const [patients] = useState(mockPatients);
  const [isLoading] = useState(false);
  return { patients, isLoading };
}
```

**Rules**: Always define types first. Use realistic values. Include edge cases (null, empty, long strings). Use `id` prefixes (`pat_001`, `call_042`). Never import mock data directly in JSX — always go through a hook. Mark hooks with `// TODO: Replace with real API call`.

## ShadCN Usage

**Always prefer ShadCN for**: Button, Input, Textarea, Select, Dialog, Sheet, Popover, Table, Card, Tabs, Breadcrumb, Toast, Alert, Badge, Form (with react-hook-form + zod), Avatar, Skeleton, Separator.

```bash
npx shadcn@latest add button dialog table card
```

Compose ShadCN primitives into domain components:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function PatientCard({ patient }: { patient: Patient }) {
  return (
    <Card>
      <CardHeader><CardTitle>{patient.name}</CardTitle></CardHeader>
      <CardContent>
        <Badge variant={patient.status === "active" ? "default" : "secondary"}>
          {patient.status}
        </Badge>
      </CardContent>
    </Card>
  );
}
```

## Responsive Design

Mobile-first always. Use Tailwind responsive prefixes: default (phone), `md:` (tablet 768px+), `lg:` (laptop 1280px+).

```tsx
{/* Grid: 1→2→3 columns */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{/* Stack: vertical on mobile, horizontal on desktop */}
<div className="flex flex-col md:flex-row gap-4">
{/* Sidebar: hidden on mobile */}
<aside className="hidden md:block w-64">
{/* Full-width button on mobile, auto on desktop */}
<Button className="w-full md:w-auto">
```

**Rules**: Touch targets min 44px on mobile. No horizontal scroll on any device. Tables become cards on mobile. Navigation becomes hamburger/bottom nav on mobile. Text and padding scale up with `md:` and `lg:`.

## Component Rules

- **Named exports only** — `export function X`, never `export default`
- **Props interface always** — even for simple components
- **PascalCase** files: `PatientCard.tsx`. **camelCase** hooks: `usePatients.ts`
- **Max 150 lines** per component — break it up if longer
- **Loading states** — every data component handles `isLoading` with `Skeleton`
- **Empty states** — every list/table shows a friendly message when data is empty
- **No business logic in components** — keep them as pure UI renderers
- **No inline styles** — Tailwind classes only
- **No `any` type** — always define proper TypeScript types

## Cleanup Checklist (Run After Every Task)

When you finish building or modifying anything:
- [ ] Delete unused component files
- [ ] Remove from barrel `index.ts` exports
- [ ] Remove all dead imports
- [ ] Remove unused variables and console.log
- [ ] Remove commented-out code
- [ ] Delete empty folders

## Images

All in `src/assets/public/<category>/`: `icons/`, `illustrations/`, `avatars/`, `logos/`, `backgrounds/`. Use descriptive names (`patient-empty-state.png` not `img1.png`). Prefer Lucide React over image files for icons. Always include `alt` text. Use `loading="lazy"` for below-the-fold images.

## Laws to Live By [ALWAYS FOLLOW THIS]
1. **Think Before Coding**
  Don't assume. Don't hide confusion. Surface tradeoffs.
  Before implementing:
  State your assumptions explicitly. If uncertain, ask.
  If multiple interpretations exist, present them - don't pick silently.
  If a simpler approach exists, say so. Push back when warranted.
  If something is unclear, stop. Name what's confusing. Ask.
2. **Simplicity First**
  Minimum code that solves the problem. Nothing speculative.

  No features beyond what was asked.
  No abstractions for single-use code.
  No "flexibility" or "configurability" that wasn't requested.
  No error handling for impossible scenarios.
  If you write 200 lines and it could be 50, rewrite it.
  Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

3. **Surgical Changes**
  Touch only what you must. Clean up only your own mess.

  When editing existing code:

  Don't "improve" adjacent code, comments, or formatting.
  Don't refactor things that aren't broken.
  Match existing style, even if you'd do it differently.
  If you notice unrelated dead code, mention it - don't delete it.
  When your changes create orphans:

  Remove imports/variables/functions that YOUR changes made unused.
  Don't remove pre-existing dead code unless asked.
  The test: Every changed line should trace directly to the user's request.

4. **Goal-Driven Execution**
  Define success criteria. Loop until verified.

  Transform tasks into verifiable goals:

  "Add validation" → "Write tests for invalid inputs, then make them pass"
  "Fix the bug" → "Write a test that reproduces it, then make it pass"
  "Refactor X" → "Ensure tests pass before and after"
  For multi-step tasks, state a brief plan:

  1. [Step] → verify: [check]
  2. [Step] → verify: [check]
  3. [Step] → verify: [check]
  Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

  These guidelines are working if: fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

## What NOT to Do

- Don't build API calls, auth, or backend logic
- Don't install packages if ShadCN or Tailwind covers it
- Don't use inline styles, `any` type, or `export default`
- Don't skip responsive — every component must work on mobile
- Don't leave dead code — if it's not used, delete it
- Don't deviate from the existing design language

## Workflow

1. Look at existing pages — match their patterns
2. Define types in `src/types/`
3. Create dummy data in `src/data/`
4. Build mobile-first with ShadCN
5. Add `md:` and `lg:` breakpoints
6. Add loading + empty states
7. Clean up unused files and imports
8. Mentally verify at 375px, 768px, 1280px
