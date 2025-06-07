import { Game } from "./Game";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const restartBtn = document.getElementById("restartBtn") as HTMLButtonElement;
const settingsBtn = document.getElementById("settingsBtn")!;
const settingsMenu = document.getElementById("settingsMenu")!;
const difficultySelect = document.getElementById("difficultySelect") as HTMLSelectElement;
const restartFromMenu = document.getElementById("restartFromMenu")!;

let difficulty: 'easy' | 'hard' = 'easy';
let game = new Game(canvas, ctx, difficulty);

function restartGame() {
  game = new Game(canvas, ctx, difficulty);
  restartBtn.style.display = "none";
  settingsMenu.style.display = "none";
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Enter" && game.state === "start") {
    game.state = "playing";
  }

  if (e.code === "KeyR" && (game.state === "dead" || game.state === "won")) {
    game = new Game(canvas, ctx, difficulty);
    game.state = "playing";
    restartBtn.style.display = "none";
  }
});

restartBtn.onclick = restartGame;
restartFromMenu.onclick = restartGame;

settingsBtn.onclick = () => {
  settingsMenu.style.display = settingsMenu.style.display === "none" ? "block" : "none";
};

difficultySelect.onchange = () => {
  difficulty = difficultySelect.value as 'easy' | 'hard';
};
