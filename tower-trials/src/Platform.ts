export class Platform {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  render(ctx: CanvasRenderingContext2D, cameraY: number) {
    ctx.fillStyle = "#888";
    ctx.fillRect(this.x, this.y - cameraY, this.width, this.height);
  }
}
