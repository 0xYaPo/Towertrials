export class Platform {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#888';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
