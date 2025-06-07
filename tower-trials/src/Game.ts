import { Player } from "./Player";
import { Platform } from "./Platform";
import { PlatformGenerator } from "./PlatformGenerator";
import { Beaver } from './Beaver';


const LEVEL_HEIGHT = 3000;

export class Game {
  player: Player;
  platforms: Platform[];
  cameraY = 0;
  gameOver = false;
  win = false;
  score = 0;
  maxClimbY = 0;
  enemies: Beaver[] = [];


  constructor(public canvas: HTMLCanvasElement, public ctx: CanvasRenderingContext2D, public: difficulty: 'easy' | 'hard') {
    this.platforms = PlatformGenerator.generate(3000, canvas.width);
    const startPlatform = this.platforms[this.platforms.length - 2];
    this.player = new Player(startPlatform.x + 10, startPlatform.y - 32);
    this.maxClimbY = this.player.y;
    this.enemySpeed = this.difficulty === 'hard' ? 2 : 1;
    
    // Add 3 beavers on random platforms (excluding top/bottom)
const usablePlatforms = this.platforms.filter(p => !p.isGoal && p.y < 2900 && p.y > 200);
for (let i = 0; i < 3; i++) {
  const p = usablePlatforms[Math.floor(Math.random() * usablePlatforms.length)];
  this.enemies.push(new Beaver(p.x + 20, p.y - 32, p.x + p.width));
}
  }

  update() {
    if (this.gameOver || this.win) return;

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
    this.gameOver = true;
  }
}


    // Win detection
    for (const p of this.platforms) {
      if (p.isGoal &&
          this.player.x + this.player.width > p.x &&
          this.player.x < p.x + p.width &&
          this.player.y + this.player.height > p.y &&
          this.player.y < p.y + p.height) {
        this.win = true;
      }
    }

    // Fall death
    if (this.player.y > 3100) {
      this.gameOver = true;
    }
  }

  render() {
    this.ctx.fillStyle = "#1e1e1e";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.platforms.forEach(p => p.render(this.ctx, this.cameraY));
    this.player.render(this.ctx, this.cameraY);

    for (const enemy of this.enemies) {
  enemy.render(this.ctx, this.cameraY);
}

    // Score
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "18px monospace";
    this.ctx.fillText(`Score: ${this.score}`, 20, 30);

    if (this.win) {
      this.ctx.fillText("🎉 You reached the top! 🎉", 200, 60);
    } else if (this.gameOver) {
      this.ctx.fillText("💀 You fell off the tower! 💀", 200, 60);
    }
  }

  isOver(): boolean {
    return this.win || this.gameOver;
  }
}

