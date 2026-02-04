const MARBLE_API_URL = "https://api.worldlabs.ai/marble/v1";

export class MarbleService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  get headers() {
    return {
      "WLT-Api-Key": this.apiKey,
      "Content-Type": "application/json",
    };
  }

  async prepareUpload(filename, extension, kind) {
    const response = await fetch(`${MARBLE_API_URL}/media-assets:prepare_upload`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        file_name: filename,
        extension: extension,
        kind: kind,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Prepare upload failed: ${errorText}`);
    }

    return await response.json();
  }

  async generateWorld(mediaAssetId, model = "Marble 0.1-plus") {
    const response = await fetch(`${MARBLE_API_URL}/worlds:generate`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        world_prompt: {
          type: "image",
          image_prompt: {
            source: "media_asset",
            media_asset_id: mediaAssetId,
          },
        },
        model: model,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Generate world failed: ${errorText}`);
    }

    return await response.json();
  }

  async getOperation(operationId) {
    const response = await fetch(`${MARBLE_API_URL}/operations/${operationId}`, {
      method: "GET",
      headers: this.headers,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Get operation failed: ${errorText}`);
    }

    return await response.json();
  }

  async getWorld(worldId) {
    const response = await fetch(`${MARBLE_API_URL}/worlds/${worldId}`, {
      method: "GET",
      headers: this.headers,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Get world failed: ${errorText}`);
    }

    return await response.json();
  }
}
