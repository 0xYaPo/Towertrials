import { Platform } from "./Platform";

export class PlatformGenerator {
  static generate(levelHeight: number, canvasWidth: number): Platform[] {
    const platforms: Platform[] = [];

    const platformCount = Math.floor(levelHeight / 100);
    let y = levelHeight - 100;

    for (let i = 0; i < platformCount; i++) {
      const width = 100 + Math.random() * 150;
      const x = Math.random() * (canvasWidth - width);
      platforms.push(new Platform(x, y, width, 20));
      y -= 100 + Math.random() * 30;
    }

    // Ground platform
    platforms.push(new Platform(0, levelHeight, canvasWidth, 50));

    // Goal platform at top
    platforms.push(new Platform(canvasWidth / 2 - 50, 0, 100, 20, true)); // goal flag set

    return platforms;
  }
}
