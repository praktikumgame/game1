import { Camera } from '../camera';
import { RenderBody } from '../types';
import { PlatformProps } from './types';
import { loadImage } from '../heplers/loadImage';

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
    const stateImages = Object.values(this.body.images);
    for (const stateImage of stateImages) {
      await loadImage(stateImage.link).then((image) => (stateImage.background = image));
    }

    this.recalcViewCoordinates();
    return this;
  }

  /** Обновить координаты, отрисовать, проверить на пересечение */
  public render() {
    this.recalcViewCoordinates();
    this.draw();
  }

  /** Обновить view-координаты (?) */
  private recalcViewCoordinates() {
    const { coords, images } = this.body;
    coords.view.lX = coords.x + this.camera.x;
    coords.view.lY = coords.y + images[this.currentImage].frameHeight + this.camera.y;
    coords.view.rX = coords.x + images[this.currentImage].frameWidth + this.camera.x;
    coords.view.rY = coords.y + images[this.currentImage].frameHeight + this.camera.y;
  }

  private draw = () => {
    this.ctx.drawImage(
      this.body.images[this.currentImage].background as CanvasImageSource,
      this.body.coords.view.lX,
      this.height - this.body.coords.view.lY,
    );
  };
}
