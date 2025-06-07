import { Player } from "./Player";
import { Platform } from "./Platform";
import { PlatformGenerator } from "./PlatformGenerator";

const LEVEL_HEIGHT = 3000;

export class Game {
  player: Player;
  platforms: Platform[];
  cameraY = 0;
  gameOver = false;
  win = false;

  constructor(public canvas: HTMLCanvasElement, public ctx: CanvasRenderingContext2D) {
    this.platforms = PlatformGenerator.generate(LEVEL_HEIGHT, canvas.width);
    const startPlatform = this.platforms[this.platforms.length - 2];
    this.player = new Player(startPlatform.x + 10, startPlatform.y - 32);
  }

  update() {
    if (this.gameOver || this.win) return;

    this.player.update(this.platforms);

    // Adjust camera position
    this.cameraY = Math.max(0, this.player.y - this.canvas.height / 2);

    // Win condition
    for (const p of this.platforms) {
      if (p.isGoal &&
          this.player.x + this.player.width > p.x &&
          this.player.x < p.x + p.width &&
          this.player.y + this.player.height > p.y &&
          this.player.y < p.y + p.height) {
        this.win = true;
      }
    }

    // Fall-death condition
    if (this.player.y > LEVEL_HEIGHT + 100) {
      this.gameOver = true;
    }
  }

  render() {
    this.ctx.fillStyle = "#1e1e1e";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Platforms
    for (const p of this.platforms) {
      p.render(this.ctx, this.cameraY);
    }

    // Player
    this.player.render(this.ctx, this.cameraY);

    // UI
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "20px monospace";
    if (this.win) {
      this.ctx.fillText("🎉 You reached the top! 🎉", 200, 50);
    } else if (this.gameOver) {
      this.ctx.fillText("💀 You fell off the tower! 💀", 200, 50);
    }
  }
}
