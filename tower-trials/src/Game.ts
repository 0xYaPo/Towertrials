import { Player } from './Player';
import { Platform } from './Platform';

export class Game {
  player: Player;
  platforms: Platform[] = [];

  constructor(public canvas: HTMLCanvasElement, public ctx: CanvasRenderingContext2D) {
    this.player = new Player(100, 100);

    // Initial platform
    this.platforms.push(new Platform(0, canvas.height - 50, canvas.width, 50));
  }

  update() {
    this.player.update(this.platforms);
  }

  render() {
    // Background
    this.ctx.fillStyle = '#1e1e1e';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Platforms
    for (const p of this.platforms) {
      p.render(this.ctx);
    }

    // Player
    this.player.render(this.ctx);
  }
}
