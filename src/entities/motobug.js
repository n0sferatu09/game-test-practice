import k from "../kaplayCtx"; // Import the Kaplay game context

// Function to create and return a Motobug (enemy) entity at a given position
export function makeMotobug(pos) {
  // Create the Motobug entity with necessary properties
  return k.add([
    k.sprite("motobug", { anim: "run" }), // Add the Motobug sprite with a running animation
    k.area({ shape: new k.Rect(k.vec2(-5, 0), 32, 32) }), // Define a custom collision area for the Motobug
    k.scale(4), // Scale the Motobug by a factor of 4
    k.anchor("center"), // Set the anchor point of the Motobug to the center of the sprite
    k.pos(pos), // Set the position of the Motobug to the provided argument (pos)
    k.offscreen(), // Ensure the Motobug is offscreen when it's created (useful for cleanup)
    "enemy", // Tag the entity as an "enemy" (for collision and behavior handling)
  ]);
}
