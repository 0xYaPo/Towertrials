import { Platform } from "./Platform";

export class Player {
  static sprite: HTMLImageElement;

  static loadSprite() {
    this.sprite = new Image();
    this.sprite.src = 'assets/sprites/player.png';
  }


  private keys: Record<string, boolean> = {};

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    window.addEventListener('keydown', (e) => (this.keys[e.code] = true));
    window.addEventListener('keyup', (e) => (this.keys[e.code] = false));
  }

  update(platforms: Platform[]) {
    this.vx = 0;
    if (this.keys['ArrowLeft']) this.vx = -this.speed;
    if (this.keys['ArrowRight']) this.vx = this.speed;
    if (this.keys['Space'] && this.grounded) {
      this.vy = -10;
      this.grounded = false;
    }

    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    this.grounded = false;
    for (const p of platforms) {
      if (
        this.x + this.width > p.x &&
        this.x < p.x + p.width &&
        this.y + this.height > p.y &&
        this.y + this.height < p.y + p.height &&
        this.vy >= 0
      ) {
        this.y = p.y - this.height;
        this.vy = 0;
        this.grounded = true;
      }
    }
  }

  render(ctx: CanvasRenderingContext2D, cameraY: number) {
    if (Player.sprite?.complete) {
      ctx.drawImage(Player.sprite, this.x, this.y - cameraY, this.width, this.height);
    } else {
      ctx.fillStyle = "#00ff00";
      ctx.fillRect(this.x, this.y - cameraY, this.width, this.height);
    }
  }
}
