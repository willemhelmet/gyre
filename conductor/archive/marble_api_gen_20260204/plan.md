# Implementation Plan - Marble API Gaussian Splat Generation

## Phase 1: Backend API Bridge
- [ ] Task: Create Node.js service for Marble API interactions (prepare_upload, generate_world, poll_operation).
- [ ] Task: Implement endpoint to generate signed upload URLs for the frontend.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Backend API Bridge' (Protocol in workflow.md)

## Phase 2: Frontend Pipeline & Polling
- [ ] Task: Implement direct media asset upload logic in `aiPipeline.ts`.
- [ ] Task: Implement `pollOperation` logic with interval checking.
- [ ] Task: Update `ReviewScreen.tsx` to include the Mini/Plus model toggle and trigger the full Marble sequence.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Frontend Pipeline & Polling' (Protocol in workflow.md)

## Phase 3: 3D Integration & Polish
- [ ] Task: Update `Scene.tsx` or the splat renderer to accept the generated SPZ URL from state.
- [ ] Task: Final pass on console logging for developer transparency.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: 3D Integration & Polish' (Protocol in workflow.md)
