import { createDecartClient, models } from "@decartai/sdk";

const API_KEY = import.meta.env.VITE_DECART_API_KEY;

if (!API_KEY) {
  console.warn("VITE_DECART_API_KEY is not defined. Decart polish will fail.");
}

export const decartService = {
  client: createDecartClient({
    apiKey: API_KEY || "dummy", // Prevent crash on init if key missing, will fail on connect
  }),

  async connect(
    stream: MediaStream, 
    onRemoteStream: (stream: MediaStream) => void,
    initialPrompt: string = "Cinematic lighting, high fidelity, 8k"
  ) {
    const model = models.realtime("mirage_v2");

    console.log("[Decart] Connecting to Mirage model...");
    
    const realtimeClient = await this.client.realtime.connect(stream, {
      model,
      onRemoteStream: (transformedStream) => {
        console.log("[Decart] Received remote stream");
        onRemoteStream(transformedStream);
      },
      initialState: {
        prompt: { text: initialPrompt, enhance: true }
      }
    });

    return realtimeClient;
  },
};

export const captureCanvasStream = (canvasElement: HTMLCanvasElement, fps: number = 25): MediaStream => {
    return canvasElement.captureStream(fps);
};
