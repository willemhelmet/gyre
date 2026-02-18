const API_URL = "https://api.decart.ai/v1/generate/lucy-pro-t2i";
const API_KEY = import.meta.env.VITE_DECART_API_KEY;

if (!API_KEY) {
  console.warn("VITE_DECART_API_KEY is not defined. Lucy-Pro image generation will fail.");
}

const blobToDataUrl = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const lucyProClient = {
  async generateImage(prompt: string, resolution: "480p" | "720p" = "720p"): Promise<string> {
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("resolution", resolution);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "X-API-KEY": API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Lucy-Pro generation failed (${response.status}): ${errorText}`);
    }

    const blob = await response.blob();
    return await blobToDataUrl(blob);
  },
};
