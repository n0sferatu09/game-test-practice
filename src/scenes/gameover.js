// Import the game context
import k from "../kaplayCtx";

// Define the Game Over scene
export default function gameover(citySfx) {
  // Pause the background music for the city
  citySfx.paused = true;

  // Retrieve the best score and current score from the game's stored data
  let bestScore = k.getData("best-score");
  const currentScore = k.getData("current-score");

  // Define the ranking grades and their corresponding score thresholds
  //ТУТ НАПИСАНЫ УРОВНИ РАНГА ПРОХОЖДЕНИЯ ЗА ОЧКИ
  const rankGrades = ["НОВИЧОК", "Ефрейтор", "ДЕЦЛ", "ФАНАТ САМСУНГА", "11Б КЛАСС", "ЧИТИНСКИЕ КЛЮЧИ", "СИГМА"];
  const rankValues = [50, 80, 100, 200, 300, 400, 500];

  // Initialize ranks for the current and best scores
  let currentRank = "НОВИЧОК";
  let bestRank = "НОВИЧОК";

  // Determine the rank for the current and best scores
  for (let i = 0; i < rankValues.length; i++) {
    if (rankValues[i] < currentScore) {
      currentRank = rankGrades[i];
    }
    if (rankValues[i] < bestScore) {
      bestRank = rankGrades[i];
    }
  }

  // Update the best score and rank if the current score is higher
  if (bestScore < currentScore) {
    k.setData("best-score", currentScore);
    bestScore = currentScore;
    bestRank = currentRank;
  }

  // Display the "GAME OVER" title
  k.add([
    k.text("ИГРА ОКОНЧЕНА", { font: "mania", size: 96 }),
    k.anchor("center"), // Center the text
    k.pos(k.center().x, k.center().y - 300), // Position near the top-center
  ]);

  // Display the best score
  k.add([
    k.text(`ЛУЧШИЙ РЕКОРД : ${bestScore}`, {
      font: "mania",
      size: 64,
    }),
    k.anchor("center"), // Center the text
    k.pos(k.center().x - 400, k.center().y - 200), // Position to the left
  ]);

  // Display the current score
  k.add([
    k.text(`ТЕКУЩИЙ РЕКОРД : ${currentScore}`, {
      font: "mania",
      size: 64,
    }),
    k.anchor("center"), // Center the text
    k.pos(k.center().x + 400, k.center().y - 200), // Position to the right
  ]);

  // Create a box to display the best rank
  const bestRankBox = k.add([
    k.rect(400, 400, { radius: 4 }), // Rounded rectangle
    k.color(0, 0, 0), // Black background
    k.area(), // Add an area for interactivity (if needed)
    k.anchor("center"), // Center the box
    k.outline(6, k.Color.fromArray([255, 255, 255])), // White outline
    k.pos(k.center().x - 400, k.center().y + 50), // Position to the left
  ]);

  // Add the best rank text to the box
  bestRankBox.add([
    k.text(bestRank, { font: "mania", size: 100 }),
    k.anchor("center"), // Center the text within the box
  ]);

  // Create a box to display the current rank
  const currentRankBox = k.add([
    k.rect(400, 400, { radius: 4 }), // Rounded rectangle
    k.color(0, 0, 0), // Black background
    k.area(), // Add an area for interactivity (if needed)
    k.anchor("center"), // Center the box
    k.outline(6, k.Color.fromArray([255, 255, 255])), // White outline
    k.pos(k.center().x + 400, k.center().y + 50), // Position to the right
  ]);

  // Add the current rank text to the box
  currentRankBox.add([
    k.text(currentRank, { font: "mania", size: 100 }),
    k.anchor("center"), // Center the text within the box
  ]);

  // Wait for 1 second before showing the replay instructions
  k.wait(1, () => {
    // Display instructions to restart the game
    k.add([
      k.text("Нажмите пробел/кликните/коснитесь, чтобы начать снова", {
        font: "mania",
        size: 64,
      }),
      k.anchor("center"), // Center the text
      k.pos(k.center().x, k.center().y + 350), // Position near the bottom-center
    ]);

    // Set up the action to restart the game on button press
    k.onButtonPress("jump", () => k.go("game"));
  });
}
