export class Beaver {
  width = 32;
  height = 32;
  vx: number = 1;
  alive = true;

  constructor(
  public x: number,
  public y: number,
  public patrolRightX: number,
  public vx: number = 1
) {
  this.vx = vx;
}

  update() {
    if (!this.alive) return;
    this.x += this.vx;
    if (this.x <= 0 || this.x >= this.patrolRightX - this.width) {
      this.vx *= -1;
    }
  }

  render(ctx: CanvasRenderingContext2D, cameraY: number) {
    if (!this.alive) return;
    ctx.fillStyle = "#A0522D";
    ctx.fillRect(this.x, this.y - cameraY, this.width, this.height);
    ctx.fillStyle = "white";
    ctx.fillRect(this.x + 8, this.y - cameraY + 8, 5, 5);
    ctx.fillRect(this.x + 18, this.y - cameraY + 8, 5, 5);
  }

  // General collision check
  collidesWith(px: number, py: number, pw: number, ph: number): boolean {
    return (
      this.alive &&
      px < this.x + this.width &&
      px + pw > this.x &&
      py < this.y + this.height &&
      py + ph > this.y
    );
  }

  // Special check for stomping from above
  wasStomped(px: number, py: number, pw: number, ph: number, vy: number): boolean {
    const hit = this.collidesWith(px, py, pw, ph);
    return hit && vy > 0 && py + ph <= this.y + 10; // coming from above
  }
}
