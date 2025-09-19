// Import the game context and necessary entities
import k from "../kaplayCtx";
import { makeSonic } from "../entities/sonic";
import { makeMotobug } from "../entities/motobug";
import { makeRing } from "../entities/ring";

// Define the main game function
export default function game() {
  // Play background music for the city with a low volume and looped
  const citySfx = k.play("city", { volume: 0.2, loop: true });
  
  // Set gravity for the game environment
  k.setGravity(10000); /// ПАРАМЕЕЕЕЕТР ГРАФИТАЦИИИИ ЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ!

  // Define background pieces and their initial positions for the scrolling effect
  const bgPieceWidth = 1920;
  const bgPieces = [
    k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
    k.add([
      k.sprite("chemical-bg"),
      k.pos(bgPieceWidth, 0),
      k.scale(2),
      k.opacity(0.8),
    ]),
  ];

  // Define platforms for the player to land on, placed at specific coordinates
  const platforms = [
    k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
    k.add([k.sprite("platforms"), k.pos(384, 450), k.scale(4)]),
  ];

  // Create Sonic and assign controls and events
  const sonic = makeSonic(k.vec2(200, 745));
  sonic.setControls();
  sonic.setEvents();

  // Display control instructions on the screen
  const controlsText = k.add([
    k.text("Нажмите пробел/кликните/коснитесь, чтобы прыгать!", { font: "mania", size: 64 }),
    k.anchor("center"),
    k.pos(k.center()),
  ]);

  // Remove the control instructions when the player presses jump
  const dismissControlsAction = k.onButtonPress("jump", () => {
    k.destroy(controlsText); // Destroy instructions text
    dismissControlsAction.cancel(); // Cancel the button press event handler
  });

  // Initialize score text and variable
  const scoreText = k.add([
    k.text("СЧЁТ : 0", { font: "mania", size: 72 }),
    k.pos(20, 20),
  ]);
  let score = 0;
  let scoreMultiplier = 0;

  // Set up collision detection when Sonic collects rings
  sonic.onCollide("ring", (ring) => {
    k.play("ring", { volume: 0.5 }); // Play ring collection sound
    k.destroy(ring); // Destroy the collected ring
    score++; // Increment the score
    scoreText.text = `SCORE : ${score}`; // Update score display
    sonic.ringCollectUI.text = "+1"; // Show collected ring UI for a moment
    k.wait(1, () => {
      sonic.ringCollectUI.text = ""; // Clear the UI after 1 second
    });
  });

  // Handle Sonic colliding with enemies
  sonic.onCollide("enemy", (enemy) => {
    if (!sonic.isGrounded()) {
      // If Sonic is in the air and collides with an enemy
      k.play("destroy", { volume: 0.5 });
      k.play("hyper-ring", { volume: 0.5 });
      k.destroy(enemy); // Destroy the enemy
      sonic.play("jump"); // Play Sonic's jump animation
      sonic.jump(); // Make Sonic jump
      scoreMultiplier += 1; // Increase score multiplier
      score += 10 * scoreMultiplier; // Update the score with the multiplier
      scoreText.text = `SCORE : ${score}`; // Update the score display
      // Display the score multiplier UI
      if (scoreMultiplier === 1)
        sonic.ringCollectUI.text = `+${10 * scoreMultiplier}`;
      if (scoreMultiplier > 1) sonic.ringCollectUI.text = `x${scoreMultiplier}`;
      k.wait(1, () => {
        sonic.ringCollectUI.text = ""; // Clear multiplier UI after 1 second
      });
      return;
    }

    // If Sonic is on the ground and collides with an enemy, it’s a game over
    k.play("hurt", { volume: 0.5 });
    k.setData("current-score", score); // Store the current score
    k.go("gameover", citySfx); // Transition to the game over scene
  });

  // Increase the game speed over time to make the game more challenging
  let gameSpeed = 300;
  k.loop(1, () => {
    gameSpeed += 50; // Gradually increase the speed
  });

  // Function to spawn Motobug enemies at random intervals
  const spawnMotoBug = () => {
    const motobug = makeMotobug(k.vec2(1950, 773));
    motobug.onUpdate(() => {
      // Make Motobugs move leftwards with increasing speed
      if (gameSpeed < 3000) {
        motobug.move(-(gameSpeed + 300), 0);
        return;
      }
      motobug.move(-gameSpeed, 0);
    });

    // Destroy Motobugs when they exit the screen
    motobug.onExitScreen(() => {
      if (motobug.pos.x < 0) k.destroy(motobug);
    });

    // Randomly determine the time to spawn the next Motobug
    const waitTime = k.rand(0.5, 2.5);
    k.wait(waitTime, spawnMotoBug);
  };

  spawnMotoBug(); // Start spawning Motobugs

  // Function to spawn Rings at random intervals
  const spawnRing = () => {
    const ring = makeRing(k.vec2(1950, 745));
    ring.onUpdate(() => {
      ring.move(-gameSpeed, 0); // Move the ring leftwards
    });

    // Destroy rings when they exit the screen
    ring.onExitScreen(() => {
      if (ring.pos.x < 0) k.destroy(ring);
    });

    // Randomly determine the time to spawn the next ring
    const waitTime = k.rand(0.5, 3);
    k.wait(waitTime, spawnRing);
  };

  spawnRing(); // Start spawning rings

  // Create a static platform at the bottom of the screen
  k.add([
    k.rect(1920, 300),
    k.opacity(0),
    k.area(),
    k.pos(0, 832),
    k.body({ isStatic: true }),
    "platform",
  ]);

  // Update game elements every frame
  k.onUpdate(() => {
    // Reset the score multiplier when Sonic is grounded
    if (sonic.isGrounded()) scoreMultiplier = 0;

    // Scroll the background pieces continuously
    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
      bgPieces.push(bgPieces.shift());
    }
    bgPieces[0].move(-100, 0);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

    // Apply a parallax effect to the background based on Sonic's vertical position
    bgPieces[0].moveTo(bgPieces[0].pos.x, -sonic.pos.y / 10 - 50);
    bgPieces[1].moveTo(bgPieces[1].pos.x, -sonic.pos.y / 10 - 50);

    // Scroll platforms continuously
    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 4, 450);
      platforms.push(platforms.shift());
    }
    platforms[0].move(-gameSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450);
  });
}
