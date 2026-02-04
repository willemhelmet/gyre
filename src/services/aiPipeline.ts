import { ai } from "./geminiClient";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

// AI Pipeline Service

export const generateImage = async (prompt: string): Promise<string> => {
  console.log(`[Nano Banana] Generating image for prompt: "${prompt}"...`);
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: prompt,
      config: {
        responseModalities: ["IMAGE"],
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "2K",
        },
      },
    });

    console.log("[Nano Banana] API Response received:", response);

    // Log thoughts if present
    response.candidates?.[0]?.content?.parts?.forEach((part, index) => {
      if (part.thought) {
        console.log(`[Nano Banana] Thought Part ${index}:`, part.text || "Thought Image/Data");
      }
    });

    // Look for image data in the parts
    const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    
    if (part?.inlineData?.data) {
      const base64Data = part.inlineData.data;
      const mimeType = part.inlineData.mimeType || "image/png";
      const dataUrl = `data:${mimeType};base64,${base64Data}`;
      
      console.log(`[Nano Banana] Image generated successfully.`);
      return dataUrl;
    } else {
      throw new Error("No image data found in response");
    }
  } catch (error) {
    console.error("[Nano Banana] Generation failed:", error);
    throw error;
  }
};

const dataURLtoBlob = (dataurl: string) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
}

const uploadMediaAsset = async (dataUrl: string): Promise<string> => {
  console.log("[Marble] Preparing upload...");
  const blob = dataURLtoBlob(dataUrl);
  
  // 1. Prepare Upload
  const prepareRes = await fetch(`${SERVER_URL}/api/marble/prepare-upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: "generated_image.png",
      extension: "png",
      kind: "image"
    })
  });
  
  if (!prepareRes.ok) {
      const text = await prepareRes.text();
      throw new Error(`Failed to prepare upload: ${text}`);
  }
  const { upload_info, media_asset } = await prepareRes.json();

  // 2. Upload File
  console.log("[Marble] Uploading to signed URL...");
  const uploadRes = await fetch(upload_info.upload_url, {
    method: "PUT",
    headers: {
      "Content-Type": "image/png",
      // ...upload_info.required_headers 
    },
    body: blob
  });

  if (!uploadRes.ok) throw new Error("Failed to upload file to Marble");
  console.log("[Marble] Upload complete.");

  return media_asset.media_asset_id;
};

const fetchWorldAssets = async (worldId: string): Promise<string> => {
    const res = await fetch(`${SERVER_URL}/api/marble/worlds/${worldId}`);
    if (!res.ok) throw new Error("Failed to get world");
    const world = await res.json();
    
    // Extract SPZ URL
    const spzUrls = world.assets?.splats?.spz_urls;
    if (!spzUrls) throw new Error("No Gaussian Splat assets found");
    
    const firstKey = Object.keys(spzUrls)[0];
    return spzUrls[firstKey];
}

const pollOperation = async (operationId: string): Promise<string> => {
  console.log("[Marble] Polling operation status...");
  
  while (true) {
    const res = await fetch(`${SERVER_URL}/api/marble/operations/${operationId}`);
    if (!res.ok) throw new Error("Failed to poll operation");
    
    const data = await res.json();
    console.log(`[Marble] Status: ${data.done ? "DONE" : "IN_PROGRESS"}`);

    if (data.done) {
        if (data.error) throw new Error(`Operation failed: ${data.error.message}`);
        
        const world = data.response;
        if (!world) throw new Error("No world data in operation response");
        
        console.log(`[Marble] World Generated: ${world.world_id}`);
        
        // Try to get asset from response, fallback to fetch
        const spzUrls = world.assets?.splats?.spz_urls;
        if (spzUrls) {
             const firstKey = Object.keys(spzUrls)[0];
             return spzUrls[firstKey];
        }

        return await fetchWorldAssets(world.world_id);
    }

    await new Promise(r => setTimeout(r, 2000)); // Poll every 2s
  }
};

export const convertToSplat = async (imageUrl: string, model: "Marble 0.1-mini" | "Marble 0.1-plus" = "Marble 0.1-plus"): Promise<string> => {
  console.log(`[Marble World Labs] Starting conversion pipeline with model: ${model}...`);
  
  // 1. Upload Asset
  const mediaAssetId = await uploadMediaAsset(imageUrl);
  console.log(`[Marble] Media Asset ID: ${mediaAssetId}`);

  // 2. Generate World
  console.log("[Marble] Requesting world generation...");
  const genRes = await fetch(`${SERVER_URL}/api/marble/generate-world`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mediaAssetId, model })
  });
  
  if (!genRes.ok) {
      const text = await genRes.text();
      throw new Error(`Failed to start generation: ${text}`);
  }
  const { operation_id } = await genRes.json();
  console.log(`[Marble] Operation ID: ${operation_id}`);

  // 3. Poll Operation
  return await pollOperation(operation_id);
};

export const polishEnvironment = async (splatData: string): Promise<string> => {
  console.log(`[Decart Realtime] Polishing environment...`);
  // Mock delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(`[Decart Realtime] Polish complete.`);
  return splatData; // Return the same data for now, or enhanced version
};
