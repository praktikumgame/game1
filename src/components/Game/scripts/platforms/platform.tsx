import { Hero } from '../hero/hero';
import { RenderBody } from '../types';
import { PlatformProps } from './types';
export class Platform {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  body: RenderBody;
  currentImage = 'default';

  constructor({ width, height, ctx, body }: PlatformProps) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.body = body;
  }

  async initialize() {
    const keys = Object.keys(this.body.images);
    for (const imageType of keys) {
      await new Promise(async (res) => {
        const image = new Image();
        const stateImage = this.body.images[imageType];
        image.src = stateImage.link;
        image.onload = () => res((stateImage.background = image));
      });
    }
    this.recalc();
    return this;
  }
  recalc() {
    const { coords, images } = this.body;
    coords.view.lX = coords.x;
    coords.view.lY = coords.y + images[this.currentImage].frameHeight;
    coords.view.rX = coords.view.lX + images[this.currentImage].frameWidth;
    coords.view.rY = coords.y + images[this.currentImage].frameHeight;
  }
  render(hero: Hero) {
    this.draw();
    // Проверяет пересечение хит-линий между моделькой персонажа и конкретным препятсвием
    return this.accessory(hero.body.coords.view, this.body.coords.view);
  }
  accessory = (
    a: { lX: number; lY: number; rX: number; rY: number },
    b: { lX: number; lY: number; rX: number; rY: number },
  ) => {
    return (
      (b.lX <= a.lX && a.lX <= b.rX && b.lY <= a.lY && a.lY <= b.rY) ||
      (b.lX <= a.rX && a.rX <= b.rX && b.lY <= a.rY && a.rY <= b.rY)
    );
  };

  draw = () => {
    this.ctx.drawImage(
      this.body.images[this.currentImage].background as CanvasImageSource,
      this.body.coords.view.lX,
      this.height - this.body.coords.y - this.body.images[this.currentImage].frameHeight,
    );
  };
}
