import k from "../kaplayCtx"; // Import the Kaplay game context

// Function to create and return a ring entity at a given position
export function makeRing(pos) {
  // Create the ring entity with necessary properties
  return k.add([
    k.sprite("ring", { anim: "spin" }), // Add the sprite for the ring with a spinning animation
    k.area(), // Enable collision detection for the ring
    k.scale(4), // Scale the ring by a factor of 4
    k.anchor("center"), // Set the anchor point of the ring to the center of the sprite
    k.pos(pos), // Set the position of the ring to the provided argument (pos)
    k.offscreen(), // Ensure the ring is offscreen when it's created (used for cleanup)
    "ring", // Tag the ring entity with a "ring" label (useful for collision detection)
  ]);
}
