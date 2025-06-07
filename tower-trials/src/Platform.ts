export class Platform {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public isGoal: boolean = false
  ) {}

  render(ctx: CanvasRenderingContext2D, cameraY: number) {
    ctx.fillStyle = this.isGoal ? "#FFD700" : "#888";
    ctx.fillRect(this.x, this.y - cameraY, this.width, this.height);
  }
}
