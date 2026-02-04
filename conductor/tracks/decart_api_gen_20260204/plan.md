# Implementation Plan - Decart Realtime API Integration

## Phase 1: Stream Capture & Constraints
- [ ] Task: Update `World.tsx` to force the canvas parent container to exactly 1280x704 pixels to satisfy Decart constraints.
    - [ ] Wrap `<Canvas>` in a `div` with `style={{ width: "1280px", height: "704px" }}`.
    - [ ] Ensure the parent container is centered or appropriately positioned in the viewport.
- [ ] Task: Implement a helper to capture the canvas stream at 25 FPS using `canvas.captureStream(25)`.
- [ ] Task: Create a `DecartService` to manage the SDK client initialization.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Stream Capture & Constraints' (Protocol in workflow.md)

## Phase 2: Decart Connection & Rendering
- [ ] Task: Create a `DecartStream.tsx` overlay component.
- [ ] Task: Implement the `connect` logic in `DecartService` using `mirage_v2`.
- [ ] Task: Wire up the captured canvas stream to the Decart service and render the output video.
- [ ] Task: Ensure the overlay video blocks the raw canvas but passes pointer events (or the canvas captures them globally).
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Decart Connection & Rendering' (Protocol in workflow.md)

## Phase 3: Prompting & Polish
- [ ] Task: Connect the `userPrompt` from the store to the Decart client's `initialState`.
- [ ] Task: Add a simple UI input to `DecartStream.tsx` to update the style prompt in real-time.
- [ ] Task: Handle cleanup (disconnect) when unmounting the World component.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Prompting & Polish' (Protocol in workflow.md)