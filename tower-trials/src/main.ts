import { Game } from "./Game";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const restartBtn = document.getElementById("restartBtn") as HTMLButtonElement;

let game = new Game(canvas, ctx);

restartBtn.onclick = () => {
  game = new Game(canvas, ctx); // re-initialize
  restartBtn.style.display = "none"; // hide button
};

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.update();
  game.render();

  if (game.isOver()) {
    restartBtn.style.display = "block";
  }

  requestAnimationFrame(loop);
}

loop();
