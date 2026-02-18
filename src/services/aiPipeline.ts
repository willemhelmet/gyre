import { lucyProClient } from "./lucyProClient";
import { marbleClient } from "./marbleClient";

// AI Pipeline Service

export const generateImage = async (prompt: string): Promise<string> => {
  console.log(`[Lucy-Pro] Generating image for prompt: "${prompt}"...`);

  try {
    const dataUrl = await lucyProClient.generateImage(prompt, "720p");
    console.log(`[Lucy-Pro] Image generated successfully.`);
    return dataUrl;
  } catch (error) {
    console.error("[Lucy-Pro] Generation failed:", error);
    throw error;
  }
};

const extractBase64FromDataUrl = (dataUrl: string): { base64: string; extension: string } => {
  const [header, base64] = dataUrl.split(',');
  const mimeMatch = header.match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';
  const extension = mime.split('/')[1] || 'png';
  return { base64, extension };
};

const pollOperation = async (operationId: string): Promise<string> => {
  console.log("[Marble] Polling operation status...");
  
  while (true) {
    const data = await marbleClient.getOperation(operationId);
    console.log(`[Marble] Status: ${data.done ? "DONE" : "IN_PROGRESS"}`);

    if (data.done) {
        if (data.error) throw new Error(`Operation failed: ${data.error.message}`);
        
        const world = data.response;
        if (!world) throw new Error("No world data in operation response");
        
        console.log(`[Marble] World Generated: ${world.world_id}`);
        
        const spzUrls = world.assets?.splats?.spz_urls;
        if (spzUrls) {
             const firstKey = Object.keys(spzUrls)[0];
             return spzUrls[firstKey];
        }

        // Fallback to fetching world details
        const worldDetails = await marbleClient.getWorld(world.world_id);
        const detailSpzUrls = worldDetails.assets?.splats?.spz_urls;
        if (!detailSpzUrls) throw new Error("No Gaussian Splat assets found");
        
        const firstDetailKey = Object.keys(detailSpzUrls)[0];
        return detailSpzUrls[firstDetailKey];
    }

    await new Promise(r => setTimeout(r, 2000));
  }
};

export const convertToSplat = async (imageUrl: string, model: "Marble 0.1-mini" | "Marble 0.1-plus" = "Marble 0.1-plus"): Promise<string> => {
  console.log(`[Marble World Labs] Starting conversion pipeline with model: ${model}...`);

  const { base64, extension } = extractBase64FromDataUrl(imageUrl);
  console.log(`[Marble] Extracted base64 (${Math.round(base64.length / 1024)}KB), extension: ${extension}`);

  console.log("[Marble] Requesting world generation with inline base64...");
  const { operation_id } = await marbleClient.generateWorld(base64, extension, model);
  console.log(`[Marble] Operation ID: ${operation_id}`);

  return await pollOperation(operation_id);
};

export const polishEnvironment = async (splatData: string): Promise<string> => {
  console.log(`[Decart Realtime] Polishing environment...`);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(`[Decart Realtime] Polish complete.`);
  return splatData;
};

export const loadTemplateWorld = async (worldId: string): Promise<string> => {
  console.log(`[Community] Loading template world: ${worldId}...`);
  
  const worldDetails = await marbleClient.getWorld(worldId);
  const detailSpzUrls = worldDetails.assets?.splats?.spz_urls;
  
  if (!detailSpzUrls) throw new Error("No Gaussian Splat assets found in template");
  
  const firstDetailKey = Object.keys(detailSpzUrls)[0];
  console.log(`[Community] Template loaded. Asset: ${detailSpzUrls[firstDetailKey]}`);
  
  return detailSpzUrls[firstDetailKey];
};