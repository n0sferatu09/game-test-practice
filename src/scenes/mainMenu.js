// Import the game context and Sonic entity
import k from "../kaplayCtx";
import { makeSonic } from "../entities/sonic";

// Main menu scene definition
export default function mainMenu() {
  // Initialize the best score if it doesn't exist in the game data
  if (!k.getData("best-score")) k.setData("best-score", 0);

  // Set up an action to start the game when the jump button is pressed
  k.onButtonPress("jump", () => k.go("game"));

  // Define the width of the background image for seamless scrolling
  const bgPieceWidth = 1920;

  // Create two background pieces for continuous scrolling
  const bgPieces = [
    k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.scale(2), k.opacity(0.8)]), // First background piece
    k.add([k.sprite("chemical-bg"), k.pos(1920, 0), k.scale(2), k.opacity(0.8)]), // Second background piece
  ];

  // Create two platform pieces for continuous scrolling
  const platforms = [
    k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]), // First platform
    k.add([k.sprite("platforms"), k.pos(384, 450), k.scale(4)]), // Second platform
  ];

  // Add the main menu title
  k.add([
    k.text("Не соник мчит в ЧТОТИБ", { font: "mania", size: 96 }),
    k.anchor("center"), // Center the text
    k.pos(k.center().x, 200), // Position it in the top-center
  ]);

  // Add instructions to start the game
  k.add([
    k.text("Нажмите пробел/кликните/коснитесь, чтобы играть йоу!", { font: "mania", size: 32 }),
    k.anchor("center"), // Center the text
    k.pos(k.center().x, k.center().y - 200), // Position it near the center
  ]);

  // Add Sonic to the main menu (for visual effect)
  makeSonic(k.vec2(200, 745)); // Place Sonic on the screen

  // Define the speed of the platforms for scrolling
  const gameSpeed = 4000;

  // Update the scene continuously for scrolling backgrounds and platforms
  k.onUpdate(() => {
    // Handle background scrolling
    if (bgPieces[1].pos.x < 0) {
      // Move the first background to the end of the second one
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
      bgPieces.push(bgPieces.shift()); // Rearrange background pieces
    }
    bgPieces[0].move(-100, 0); // Scroll the first background to the left
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0); // Align the second background

    // Handle platform scrolling
    if (platforms[1].pos.x < 0) {
      // Move the first platform to the end of the second one
      platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 4, 450);
      platforms.push(platforms.shift()); // Rearrange platform pieces
    }
    platforms[0].move(-gameSpeed, 0); // Scroll the first platform to the left
    platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450); // Align the second platform
  });
}
