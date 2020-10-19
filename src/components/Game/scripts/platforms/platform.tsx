import { Camera } from '../assets';
import { Hero } from '../hero/hero';
import { RenderBody } from '../types';
import { PlatformProps } from './types';
export class Platform {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  body: RenderBody;
  camera: Camera;
  currentImage = 'default';

  constructor({ width, height, ctx, body, camera }: PlatformProps) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.body = body;
    this.camera = camera;
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
    coords.view.lX = coords.x + this.camera.x;
    coords.view.lY = coords.y + images[this.currentImage].frameHeight + this.camera.y;
    coords.view.rX = coords.x + images[this.currentImage].frameWidth + this.camera.x;
    coords.view.rY = coords.y + images[this.currentImage].frameHeight + this.camera.y;
  }
  render(hero: Hero) {
    this.recalc();
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
      this.height - this.body.coords.view.lY,
    );
  };
}
