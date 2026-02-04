# Implementation Plan - Nano Banana Image Generation

## Phase 1: SDK Integration & API Client
- [ ] Task: Install `@google/generative-ai` SDK and configure environment variables.
- [ ] Task: Create a dedicated Gemini API client in `src/services/geminiClient.ts`.
- [ ] Task: Implement the `generateImage` function in `src/services/aiPipeline.ts` using the real SDK instead of the mock.
    - [ ] Configure `gemini-3-pro-image-preview` model.
    - [ ] Set `response_modalities` to `['IMAGE']`.
    - [ ] Set `aspect_ratio` to `16:9` and `image_size` to `2K`.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: SDK Integration & API Client' (Protocol in workflow.md)

## Phase 2: UI & State Integration
- [ ] Task: Update `GenerateScreen.tsx` to handle the real API response and potential errors.
- [ ] Task: Implement the developer transparency layer (`console.log`) for thoughts and metadata.
- [ ] Task: Ensure `ReviewScreen.tsx` correctly renders the base64/blob data from the store.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: UI & State Integration' (Protocol in workflow.md)

## Phase 3: Polish & Error Handling
- [ ] Task: Refine the "Loading..." state during the "Thinking" process.
- [ ] Task: Implement basic error recovery (e.g., re-enabling the button on failure).
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Polish & Error Handling' (Protocol in workflow.md)
