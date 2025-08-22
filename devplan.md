# HIIT Timer React – Development Plan

This plan tracks the migration of `index_old.html` into a modern, responsive React app using Tailwind and shadcn/ui.

## Goals

- [ ] Recreate the interval timer with markdown routine parsing, repeat support, and last-3s beep.
- [ ] Beautiful, accessible, responsive UI with shadcn/ui.
- [ ] Keep editor visible on desktop; compact mobile UX.

## Current Findings

- Old features in `index_old.html`:
  - Routine input (markdown-like) with optional repeat blocks `(Repeat Nx)`.
  - Controls: Start, Pause/Resume, Skip, Reset.
  - Beep last 3s, show Next phase, large mm:ss timer, urgency colors.
- Project setup:
  - Vite + React + TS + Tailwind (`@tailwindcss/vite`).
  - shadcn/ui present (`components.json` and `./components/ui/button`).
  - Add audio file to `public/media/StartBeeps.wav`.

## shadcn/ui Components

- [x] Layout: card, separator, tabs, sheet.
- [x] Inputs: textarea, label, switch, slider.
- [x] Actions: button, dropdown-menu.
- [x] Feedback: progress, badge, tooltip, alert-dialog, sonner.
- [x] Optional: dialog, scroll-area.

## Architecture

- [x] `src/lib/workout.ts`
  - [x] `parseMarkdownWorkout(text: string): Phase[]` – port from old HTML.
  - [x] `type Phase = { label: string; duration: number }`.
- [x] `src/hooks/useIntervalTimer.ts`
  - [x] State: `idle | running | paused | complete`.
  - [x] Expose: `phases`, `index`, `timeLeft`, `currentPhase`, `nextPhase`, `start()`, `pause()`, `resume()`, `skip()`, `reset()`.
  - [x] Last-3s next label + beep; cleanup intervals.
- [ ] Components
  - [x] `src/components/RoutineEditor.tsx` – textarea with example, help tooltip.
  - [x] `src/components/TimerDisplay.tsx` – big mm:ss, label, badge, progress, background color.
  - [ ] `src/components/Controls.tsx` – Start/Pause/Resume/Skip/Reset, beep switch, volume slider, reset confirm.
  - [ ] `src/components/NextPhase.tsx` – show when `timeLeft <= 3`.
  - [ ] `src/components/Layout.tsx` (optional) – desktop grid, mobile tabs/sheet.
- [ ] Assets
  - [x] `public/media/StartBeeps.wav` – preload for beeps.
- [x] Persistence
  - [x] `localStorage` for routine and settings.
- [ ] Accessibility
  - [ ] ARIA live regions for timer/next phase; keyboard shortcuts.

## Implementation Steps

- [ ] Install shadcn/ui components
  - [x] `textarea label switch slider card progress badge tooltip alert-dialog sheet separator tabs sonner dropdown-menu`
  - [x] Command (example):
    - [x] `npx shadcn@latest add textarea label switch slider card progress badge tooltip alert-dialog sheet separator tabs sonner dropdown-menu`
- [ ] Port parser
  - [x] Move logic from `index_old.html` to `src/lib/workout.ts`.
  - [x] Keep repeat blocks and flattening.
  - [ ] Add minimal unit tests or manual samples.
- [ ] Create `useIntervalTimer` hook
  - [x] Implement start/pause/resume/skip/reset.
  - [x] Handle next-phase preview and last-3s beeps with preloaded audio.
- [x] Add audio asset
  - [x] Place `StartBeeps.wav` in `public/media/`.
- [ ] Build UI components
  - [ ] RoutineEditor, TimerDisplay, Controls, NextPhase.
  - [x] Hook up to hook + parser.
- [ ] Compose layout in `src/App.tsx`
  - [x] Desktop: 2-col grid (Editor | Timer).
  - [x] Mobile: Tabs for the editor; default to Timer when running. (Sheet optional)
- [ ] Persistence
  - [x] Save/load routine + beep toggle to `localStorage`.
- [ ] Polish
  - [ ] Animations, a11y, focus states, color theming, toasts for parse errors.

## Optional Enhancements

- [ ] Presets from `workouts/` via dropdown menu.
- [ ] Import/Export routine; shareable URLs via query params.
- [ ] Haptics on transitions (mobile), and PWA support.

## Acceptance Criteria

- [ ] Controls function correctly; accurate timing/phase transitions.
- [ ] Next-phase shown in last 3s; audio plays reliably.
- [ ] Responsive layout; editor tucked away on small screens while running.
- [ ] Settings and routine persist between reloads.

## Open Decisions

- Mobile UX: Tabs vs sliding Sheet for the editor.
- Volume control for beeps (if included).
