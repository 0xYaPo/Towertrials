import { Player } from "./Player";
import { Platform } from "./Platform";
import { PlatformGenerator } from "./PlatformGenerator";

const LEVEL_HEIGHT = 600;

export class Game {
  player: Player;
  platforms: Platform[];

  constructor(public canvas: HTMLCanvasElement, public ctx: CanvasRenderingContext2D) {
    this.platforms = PlatformGenerator.generate(LEVEL_HEIGHT, canvas.width);
    const spawnPlatform = this.platforms[this.platforms.length - 2]; // near top
    this.player = new Player(spawnPlatform.x + 10, spawnPlatform.y - 32);
  }

  update() {
    this.player.update(this.platforms);
  }

  render() {
    this.ctx.fillStyle = "#1e1e1e";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.platforms.forEach(p => p.render(this.ctx));
    this.player.render(this.ctx);
  }
}
