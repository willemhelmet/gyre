export interface WorldTemplate {
  id: string; // Marble World ID
  name: string;
  thumbnailUrl: string;
  defaultPrompt: string;
}

export const communityTemplates: WorldTemplate[] = [
  {
    id: "c05d038d-2719-4c5b-8c3a-faa484719408", // Real example ID from user prompt
    name: "Enchanted Forest Fairy Haven",
    thumbnailUrl:
      "https://cdn.marble.worldlabs.ai/c05d038d-2719-4c5b-8c3a-faa484719408/63eec02a-8718-4df2-aab0-fc5cd092baf0_sand_mpi/thumbnail.webp",
    defaultPrompt:
      "The scene is a magical forest landscape, rendered in a whimsical painting style, evoking a serene and enchanting mood. The atmosphere is vibrant with lush greenery and soft, glowing light, suggesting a hidden realm untouched by the mundane. A charming, intricately carved wooden bridge gracefully spans a crystal-clear stream that winds through the heart of the forest. The bridge's railings are adorned with decorative patterns, including crescent moons and stylized animal figures, carved into the rich, dark wood. Towering, ancient trees with thick, moss-covered trunks and gnarled roots dominate the landscape, their canopy filtering sunlight to create dappled patterns on the forest floor. Numerous luminous fairies, depicted with delicate wings and emanating soft glows of blue, green, and golden light, flit amongst the trees and over the stream, adding to the magical ambiance. A winding cobblestone path leads up to the bridge, disappearing into the dense foliage on either side. The stream, flowing over rocks and pebbles, creates small cascades, its water shimmering with reflections of the ambient light. Wildflowers in shades of purple, yellow, and blue bloom along the banks of the stream and at the base of the trees, enhancing the forest's ethereal beauty. The dense foliage of the trees extends beyond the immediate view, suggesting a vast and ancient woodland. The 360 scene is faultless.",
  },
  {
    id: "889876e2-da58-4248-b451-42fe69d06b42",
    name: "Zen Garden",
    thumbnailUrl:
      "https://cdn.marble.worldlabs.ai/889876e2-da58-4248-b451-42fe69d06b42/0241d8fa-1811-4517-99a9-05829f2f9a36_dust_mpi/thumbnail.webp",
    defaultPrompt:
      "The scene is a meticulously maintained Japanese garden, captured in a realistic photographic style, conveying a serene and contemplative atmosphere. The overall tone is peaceful and inviting, characterized by lush greenery and traditional architectural elements. A wide, light-colored stone path, composed of rectangular pavers, spans the foreground, leading towards a small, traditional wooden pavilion on the left side of the path, which houses a shrine with ornate details and softly glowing lanterns. To the right of the stone path, a winding gravel path extends deeper into the garden, bordered by manicured evergreen trees, flowering azaleas, and bamboos. A small, arched wooden bridge gracefully crosses over a tranquil pond filled with water lilies and bordered by vibrant green foliage. Numerous stone lanterns are strategically placed along the paths and beside the pond, emitting a warm, inviting glow. A tall, sturdy bamboo grove stands prominently in the background, providing a sense of depth and natural enclosure to the garden. The garden walls, constructed of light-colored plaster with dark capping, delineate the space, with a traditional wooden gate serving as an entrance or exit point further back along the gravel path. The pavilion, with its dark wooden roof and golden interior, is positioned centrally on the stone patio, flanked by stone lanterns. The gravel path meanders from the right edge of the stone patio, leading towards the wooden bridge over the pond, and further into the bamboo grove.",
  },
  {
    id: "f213180d-1aa3-459e-ba06-1891d94ff492",
    name: "Abandoned Industrial Hallway",
    thumbnailUrl:
      "https://cdn.marble.worldlabs.ai/f213180d-1aa3-459e-ba06-1891d94ff492/03139f97-49fb-4b29-8f02-f56477553e6e_sand_mpi/thumbnail.webp",
    defaultPrompt:
      "The scene is an abandoned industrial hallway, rendered with a realistic style, evoking a desolate and melancholic tone through its decaying concrete and natural overgrowth. The hallway extends forward, leading to a distant opening, suggesting further structures or open air beyond. Along both sides of the hallway, a series of identical concrete alcoves are recessed into the walls, each resembling small rooms or storage units, some with closed, weathered doors. Above these alcoves, horizontal concrete beams stretch across the space, supporting what appear to be old, rusty pipes and conduits that run parallel to the length of the hall. Patches of vibrant green moss adhere to the concrete walls and floor, contrasting with the muted gray tones of the industrial structure and indicating prolonged exposure to moisture and nature. Scattered across the floor, white patches of snow mingle with the moss and dirt, suggesting the area is exposed to the elements or experiences cold temperatures. The ceiling above is high and appears to be made of concrete slabs, with visible structural elements and possibly openings to the outside, allowing light to filter down into the passage. The alcoves are evenly spaced along the walls, creating a repetitive pattern that emphasizes the hallway's length. The concrete beams are positioned consistently above each alcove, supporting the network of pipes that snake along their undersides. The moss grows in irregular formations, clinging to the vertical surfaces of the walls and spreading across the uneven floor where snow has settled.",
  },
];
