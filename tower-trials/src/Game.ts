type GameState = 'start' | 'playing' | 'won' | 'dead';


import { Player } from "./Player";
import { Platform } from "./Platform";
import { PlatformGenerator } from "./PlatformGenerator";
import { Beaver } from './Beaver';


const LEVEL_HEIGHT = 3000;

export class Game {
  player: Player;
  platforms: Platform[];
  state: GameState = 'start';
  cameraY = 0;
  gameOver = false;
  win = false;
  score = 0;
  maxClimbY = 0;
  enemies: Beaver[] = [];
  enemySpeed: number;


  constructor(public canvas: HTMLCanvasElement, public ctx: CanvasRenderingContext2D, public difficulty: 'easy' | 'hard') {
    this.platforms = PlatformGenerator.generate(3000, canvas.width);
    const startPlatform = this.platforms[this.platforms.length - 2];
    this.player = new Player(startPlatform.x + 10, startPlatform.y - 32);
    this.maxClimbY = this.player.y;
    this.enemySpeed = this.difficulty === 'hard' ? 2 : 1;
    
    // Add 3 beavers on random platforms (excluding top/bottom)
const usablePlatforms = this.platforms.filter(p => !p.isGoal && p.y < 2900 && p.y > 200);
for (let i = 0; i < 3; i++) {
  const p = usablePlatforms[Math.floor(Math.random() * usablePlatforms.length)];
  this.enemies.push(new Beaver(p.x + 20, p.y - 32, p.x + p.width, this.enemySpeed));
}
  }

  update() {
    if (this.state !== 'playing') return;

    this.player.update(this.platforms);

    // Update camera
    this.cameraY = Math.max(0, this.player.y - this.canvas.height / 2);

    // Update score
    if (this.player.y < this.maxClimbY) {
      this.maxClimbY = this.player.y;
      this.score = Math.floor((this.platforms[this.platforms.length - 2].y - this.maxClimbY) / 10);
    }
    //Collision check
    for (const enemy of this.enemies) {
  enemy.update();

  if (!enemy.alive) continue;

  if (enemy.wasStomped(this.player.x, this.player.y, this.player.width, this.player.height, this.player.vy)) {
    enemy.alive = false;
    this.player.vy = -8; // bounce up
    this.score += 50;    // bonus score
  } else if (enemy.collidesWith(this.player.x, this.player.y, this.player.width, this.player.height)) {
    this.state = 'dead';
  }
 }

    for (const p of this.platforms) {
      if (
        p.isGoal &&
        this.player.x + this.player.width > p.x &&
        this.player.x < p.x + p.width &&
        this.player.y + this.player.height > p.y &&
        this.player.y < p.y + p.height
      ) {
        this.state = 'won';
      }
    }



  if (this.player.y > 3100) {
    this.state = 'dead';
  }
}

  render() {
  this.ctx.fillStyle = "#1e1e1e";
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  this.platforms.forEach(p => p.render(this.ctx, this.cameraY));
  this.enemies.forEach(e => e.render(this.ctx, this.cameraY));
  this.player.render(this.ctx, this.cameraY);

  this.ctx.fillStyle = "#fff";
  this.ctx.font = "18px monospace";
  this.ctx.fillText(`Score: ${this.score}`, 20, 30);

  if (this.state === 'start') {
    this.drawCenterText("Press ENTER to start", 32);
  } else if (this.state === 'dead') {
    this.drawCenterText("💀 You fell or got hit! Press R to restart", 32);
  } else if (this.state === 'won') {
    this.drawCenterText("🎉 You won! Press R to play again", 32);
  }
}

drawCenterText(text: string, fontSize: number) {
  this.ctx.fillStyle = "#fff";
  this.ctx.font = `${fontSize}px monospace`;
  const textWidth = this.ctx.measureText(text).width;
  this.ctx.fillText(text, (this.canvas.width - textWidth) / 2, this.canvas.height / 2);
}

}

