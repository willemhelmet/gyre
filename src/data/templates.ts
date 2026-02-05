export interface WorldTemplate {
  id: string; // Marble World ID
  name: string;
  thumbnailUrl: string;
  defaultPrompt: string;
  description: string;
}

export const communityTemplates: WorldTemplate[] = [
  {
    id: "c05d038d-2719-4c5b-8c3a-faa484719408", // Real example ID from user prompt
    name: "Enchanted Forest",
    thumbnailUrl: "https://storage.googleapis.com/generativeai-downloads/images/Nano%20Banana%20Pro%20outputs%20for%20docs/05-output.jpg", 
    defaultPrompt: "Mystical forest, glowing mushrooms, fireflies, high fidelity, 8k",
    description: "A magical forest teeming with life and bioluminescent flora."
  },
  {
    id: "template_city_placeholder", 
    name: "Cyberpunk City",
    thumbnailUrl: "https://storage.googleapis.com/generativeai-downloads/images/Nano%20Banana%20Pro%20outputs%20for%20docs/03-make-a-photo-that-is-perfectly-isometric-it-is-not.jpg",
    defaultPrompt: "Cyberpunk city, neon lights, rain, reflections, futuristic, cinematic",
    description: "A sprawling metropolis of neon and steel."
  },
  {
    id: "template_desert_placeholder", 
    name: "Mars Outpost",
    thumbnailUrl: "https://storage.googleapis.com/generativeai-downloads/images/Nano%20Banana%20Pro%20outputs%20for%20docs/02-a-photo-of-an-everyday-scene-at-a-busy-cafe-servin.jpg",
    defaultPrompt: "Red desert, mars colony, sci-fi, dusty, sunset, 8k",
    description: "A lonely outpost on the red planet."
  }
];
