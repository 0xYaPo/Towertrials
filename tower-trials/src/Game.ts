import { Player } from "./Player";
import { Platform } from "./Platform";
import { PlatformGenerator } from "./PlatformGenerator";

const LEVEL_HEIGHT = 3000;

export class Game {
  player: Player;
  platforms: Platform[];
  cameraY = 0;

  constructor(public canvas: HTMLCanvasElement, public ctx: CanvasRenderingContext2D) {
    this.platforms = PlatformGenerator.generate(LEVEL_HEIGHT, canvas.width);
    const startPlatform = this.platforms[this.platforms.length - 2]; // near top
    this.player = new Player(startPlatform.x + 10, startPlatform.y - 32);
  }

  update() {
    this.player.update(this.platforms);

    // Adjust cameraY so player is roughly centered vertically
    const midScreen = this.canvas.height / 2;
    this.cameraY = Math.max(0, this.player.y - midScreen);
  }

  render() {
    // Background
    this.ctx.fillStyle = "#1e1e1e";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Render platforms
    for (const platform of this.platforms) {
      platform.render(this.ctx, this.cameraY);
    }

    // Render player
    this.player.render(this.ctx, this.cameraY);
  }
}
