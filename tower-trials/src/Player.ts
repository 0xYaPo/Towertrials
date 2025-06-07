import { Platform } from './Platform';

export class Player {
  width = 32;
  height = 32;
  x: number;
  y: number;
  vx = 0;
  vy = 0;
  speed = 3;
  gravity = 0.5;
  grounded = false;

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

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
