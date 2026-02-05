# Implementation Plan - Community Worlds Framework

## Phase 1: Data & Service Extension
- [ ] Task: Create `src/data/templates.ts` and define the `WorldTemplate` interface and initial data.
- [ ] Task: Extend `src/services/aiPipeline.ts` or create a new helper to handle the "Quick Entry" logic (fetch world -> update state -> navigate).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Data & Service Extension' (Protocol in workflow.md)

## Phase 2: Hero Screen Gallery
- [ ] Task: Refactor `MainMenu.tsx` to include the "Community Templates" gallery section.
- [ ] Task: Implement template card components with thumbnails and "Join World" actions.
- [ ] Task: Add a global "Loading..." overlay for the transition between template selection and the 3D scene.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Hero Screen Gallery' (Protocol in workflow.md)

## Phase 3: Direct Integration & Polish
- [ ] Task: Wire up the template selection to the "Quick Entry" logic.
- [ ] Task: Ensure the `DecartStream` correctly initializes with the template's `defaultPrompt`.
- [ ] Task: Final pass on UI alignment and high-contrast digital aesthetic.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Direct Integration & Polish' (Protocol in workflow.md)
