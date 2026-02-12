const MARBLE_API_URL = "https://api.worldlabs.ai/marble/v1";
const API_KEY = import.meta.env.VITE_MARBLE_API_KEY;

if (!API_KEY) {
  console.warn("VITE_MARBLE_API_KEY is not defined. Marble world generation will fail.");
}

const headers = {
  "WLT-Api-Key": API_KEY,
  "Content-Type": "application/json",
};

export const marbleClient = {
  async generateWorld(base64Data: string, extension: string, model: string = "Marble 0.1-plus") {
    const response = await fetch(`${MARBLE_API_URL}/worlds:generate`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        world_prompt: {
          type: "image",
          image_prompt: {
            source: "data_base64",
            data_base64: base64Data,
            extension,
          },
        },
        model,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Generate world failed: ${errorText}`);
    }

    return await response.json();
  },

  async getOperation(operationId: string) {
    const response = await fetch(`${MARBLE_API_URL}/operations/${operationId}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Get operation failed: ${errorText}`);
    }

    return await response.json();
  },

  async getWorld(worldId: string) {
    const response = await fetch(`${MARBLE_API_URL}/worlds/${worldId}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Get world failed: ${errorText}`);
    }

    return await response.json();
  },
};
