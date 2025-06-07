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
      y -= 100 + Math.random() * 30; // Vary vertical spacing
    }

    // Ground/platform at the bottom
    platforms.push(new Platform(0, levelHeight, canvasWidth, 50));

    return platforms;
  }
}
