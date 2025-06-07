export class Beaver {
  width = 32;
  height = 32;
  vx: number = 1;

  constructor(public x: number, public y: number, public patrolWidth: number) {}

  update() {
    this.x += this.vx;

    // Reverse direction when reaching patrol edges
    if (this.x <= 0 || this.x >= this.patrolWidth - this.width) {
      this.vx *= -1;
    }
  }

  render(ctx: CanvasRenderingContext2D, cameraY: number) {
    ctx.fillStyle = "#A0522D"; // brown beaver
    ctx.fillRect(this.x, this.y - cameraY, this.width, this.height);

    // Eyes
    ctx.fillStyle = "white";
    ctx.fillRect(this.x + 8, this.y - cameraY + 8, 5, 5);
    ctx.fillRect(this.x + 18, this.y - cameraY + 8, 5, 5);
  }

  collidesWith(px: number, py: number, pw: number, ph: number): boolean {
    return (
      px < this.x + this.width &&
      px + pw > this.x &&
      py < this.y + this.height &&
      py + ph > this.y
    );
  }
}
