# Specification - Nano Banana Image Generation

## Overview
This track implements the first core stage of the Genie AI pipeline: high-fidelity image generation using the Nano Banana Pro (Gemini 3 Pro Image Preview) model. This stage transforms text prompts into detailed 2D visual assets that serve as the foundation for 3D world reconstruction.

## Functional Requirements
- **Model Integration:** Utilize the `gemini-3-pro-image-preview` model via the Google Gen AI SDK.
- **Prompt Handling:** Support raw user input without enforcing mandatory style wrappers.
- **Image Configuration:**
    - Default Aspect Ratio: `16:9` (Landscape).
    - Default Resolution: `2K` (High Resolution).
- **Thinking Process:** 
    - Internal reasoning steps ("Thinking") will be transparently logged to the developer console.
    - The UI will show a simplified "Loading..." state during generation.
- **State Management:**
    - The generated image data (base64 or blob) will be stored in the `zustand` store (`generatedImage` field).
    - Prompt history/state will be managed within the current session.

## Non-Functional Requirements
- **Developer Transparency:** `console.log` all thought signatures, metadata, and final response parts.
- **Latency:** Optimized for the 2K resolution response time of the Pro model.

## Acceptance Criteria
- [ ] User can enter a text prompt on the "Generate Screen".
- [ ] Clicking "Initiate Generation" triggers the Gemini 3 Pro API call.
- [ ] The API response includes valid image data in the specified 16:9/2K format.
- [ ] The generated image is stored in the app state and successfully displayed on the "Review Screen".
- [ ] Developer console shows the full thinking process and response metadata.

## Out of Scope
- Interactive "thought" visualization in the UI.
- Local persistence (IndexedDB) or server-side image storage.
- Prompt templates or predefined style categories.
