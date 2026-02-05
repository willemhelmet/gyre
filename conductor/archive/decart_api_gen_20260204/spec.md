# Specification - Decart Realtime API Integration

## Overview
This track implements the final visual polish stage of the Genie pipeline using the Decart Realtime API. The interactive 3D scene rendered by Three.js will be captured as a real-time video stream, sent to the Decart API, and replaced by a style-transformed video feed (using the "Mirage" model) that the user views while interacting with the underlying 3D world.

## Functional Requirements
- **Video Capture:**
    - Capture the Three.js `<Canvas>` as a `MediaStream` using `canvas.captureStream()`.
    - Ensure the stream adheres to Decart's model requirements: **1280x704 resolution** at **25 FPS**.
    - If the user's screen aspect ratio differs, center-crop or letterbox the canvas to match the required 16:9 (1280x704) ratio before streaming.
- **Decart Integration:**
    - Initialize the `@decartai/sdk` client with the API key.
    - Connect to the `mirage_v2` model using the captured canvas stream.
    - Receive the transformed remote stream and render it in a full-screen `<video>` element that sits *on top* of the Three.js canvas.
- **Interaction Model:**
    - The original Three.js canvas must remain active but visually hidden (or obscured by the video) to capture mouse/keyboard inputs.
    - User inputs driving the "invisible" 3D scene will update the canvas, which updates the stream, which updates the Decart video feed (mirrored interaction).
- **Prompt Management:**
    - Use the user's initial text prompt (from the "Generate" or "Upload" stage) to seed the Decart style transformation.
    - Provide a simple UI overlay to update the style prompt on the fly.

## Non-Functional Requirements
- **Latency:** Optimize for minimal delay between input and visual response.
- **Resolution Compliance:** Strictly enforce 1280x704 for the streaming source to avoid API errors.
- **Resource Management:** Properly disconnect the Decart client and stop media streams when leaving the "World" view.

## Acceptance Criteria
- [ ] The Three.js canvas resizes or crops to 1280x704 (or a compatible 16:9 aspect ratio) when "Polish" mode is active.
- [ ] The canvas stream is successfully sent to the Decart API.
- [ ] A returned video stream replaces the raw 3D view.
- [ ] Controlling the character/camera updates the video feed in real-time.
- [ ] Changing the text prompt updates the visual style of the feed.

## Out of Scope
- Audio processing (avatar animation).
- "Lucy" object editing features (focus is on "Mirage" style transformation).
