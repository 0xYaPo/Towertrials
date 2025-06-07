import { Game } from './Game';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const game = new Game(canvas, ctx);

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.update();
  game.render();
  requestAnimationFrame(loop);
}

loop();
