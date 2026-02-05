# Specification - Community Worlds Framework

## Overview
This track introduces a "Community Worlds" template system. Users can select from a curated list of pre-generated 3D environments, bypassing the image generation and splat reconstruction stages. Selecting a template will directly materialize the 3D scene and activate the Decart Realtime polish using a pre-defined style prompt.

## Functional Requirements
- **Data Structure (`templates.ts`):**
    - Define a `WorldTemplate` type with: `id` (Marble World ID), `name`, `thumbnailUrl`, and `defaultPrompt`.
    - Create a static registry of at least 3-5 high-quality community worlds.
- **Hero Screen Update:**
    - Refactor the "Hero Screen" to clearly separate the "Create Your Own" (AI Generation) path from the "Community Templates" section.
    - Implement a scrollable or grid-based gallery for templates.
- **Template Materialization Path:**
    - Upon selecting a template:
        1. Fetch world details using the Marble `get world` API based on the template's `world_id`.
        2. Extract the Gaussian Splat (SPZ) URL from the response.
        3. Update the `zustand` store with the `sceneUrl` and the template's `defaultPrompt`.
        4. Set the game status to `intro` (to show the "Click to Begin" overlay) and navigate directly to `/world`.
- **API Integration:**
    - Use the existing `marbleClient.getWorld` method to populate the scene details dynamically from the Marble backend.

## Non-Functional Requirements
- **Performance:** Ensure direct entry from the Hero screen feels significantly faster than the generation pipeline.
- **Developer Transparency:** `console.log` the fetched world data and the transition to the 3D scene.

## Acceptance Criteria
- [ ] The Hero screen displays a distinct section for "Community Worlds".
- [ ] Clicking a template card triggers a loading state and calls the `get world` API.
- [ ] The application successfully transitions to the `/world` route without going through the Generate or Review screens.
- [ ] The 3D scene loads the correct splat and Decart style prompt associated with the template.

## Out of Scope
- Search or filtering functionality for templates.
- User-submitted worlds (community templates are currently hardcoded/curated).
