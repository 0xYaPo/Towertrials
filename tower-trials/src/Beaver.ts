export class Beaver {
  static sprite: HTMLImageElement;
  static loadSprite() {
    this.sprite = new Image();
    this.sprite.src = 'assets/sprites/beaver.png';
  }

  ...
  render(ctx: CanvasRenderingContext2D, cameraY: number) {
    if (!this.alive) return;

    if (Beaver.sprite?.complete) {
      ctx.drawImage(Beaver.sprite, this.x, this.y - cameraY, this.width, this.height);
    } else {
      ctx.fillStyle = "#A0522D";
      ctx.fillRect(this.x, this.y - cameraY, this.width, this.height);
    }
  }
}


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

    if (Beaver.sprite?.complete) {
      ctx.drawImage(Beaver.sprite, this.x, this.y - cameraY, this.width, this.height);
    } else {
      ctx.fillStyle = "#A0522D";
      ctx.fillRect(this.x, this.y - cameraY, this.width, this.height);
    }
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
