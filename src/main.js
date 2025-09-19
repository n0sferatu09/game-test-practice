// Import the game context and scenes
import k from "./kaplayCtx";
import disclaimer from "./scenes/disclaimer";
import game from "./scenes/game";
import gameover from "./scenes/gameover";
import mainMenu from "./scenes/mainMenu";

// Load background sprite for the Chemical Plant Zone
k.loadSprite("chemical-bg", "graphics/chemical-bg.png");

// Load platform sprite for ground and objects
k.loadSprite("platforms", "graphics/platforms.png");

// Load Sonic's sprite with animations for running and jumping
k.loadSprite("sonic", "graphics/sonic.png", {
  sliceX: 8, // Number of frames in the X-axis
  sliceY: 2, // Number of frames in the Y-axis
  anims: {
    run: { from: 0, to: 7, loop: true, speed: 10 }, // СКРОРОСТЬ СМЕНЫ АНИМАЦИИ БЕГА и СКОРОСТЬ САМОГО БЕГА ыыы
    jump: { from: 8, to: 15, loop: true, speed: 5 }, // СКОРОСТЬ СМЕНЫ АНИМАЦИИ ПРЫЖКА и СКОРОСТЬ САМОЙ ПРЫЖКИ ыыы
  },
});

// Load ring sprite with spinning animation
k.loadSprite("ring", "graphics/ring.png", {
  sliceX: 16, // Number of frames in the X-axis
  sliceY: 1,  // Single row of frames
  anims: {
    spin: { from: 0, to: 15, loop: true, speed: 30 }, // Spinning animation
  },
});

// Load enemy sprite (Motobug) with running animation
k.loadSprite("motobug", "graphics/motobug.png", {
  sliceX: 5, // Number of frames in the X-axis
  sliceY: 1, // Single row of frames
  anims: {
    run: { from: 0, to: 4, loop: true, speed: 8 }, // Enemy movement animation
  },
});

// Load a custom font for the game
k.loadFont("mania", "fonts/mania.ttf");

// Load sound effects for various actions
k.loadSound("destroy", "sounds/Destroy.wav"); // Sound when an enemy is destroyed
k.loadSound("hurt", "sounds/Hurt.wav");       // Sound when Sonic gets hurt
k.loadSound("hyper-ring", "sounds/HyperRing.wav"); // Special ring sound effect
k.loadSound("jump", "sounds/Jump.wav");       // Sound for jumping
k.loadSound("ring", "sounds/Ring.wav");       // Sound for collecting rings
k.loadSound("city", "sounds/city.mp3");       // Background music for the city scene

// Define game scenes
k.scene("disclaimer", disclaimer); // Initial disclaimer screen
k.scene("main-menu", mainMenu);    // Main menu scene
k.scene("game", game);             // Main gameplay scene
k.scene("gameover", gameover);     // Game over screen

// Start the game at the disclaimer scene
k.go("disclaimer");
