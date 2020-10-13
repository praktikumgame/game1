import { InitParametrs } from '../types';
import { StaticBody } from '../types/personas';

export class Plarform {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;

  constructor({ ctx, width, height }: InitParametrs) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }

  body: StaticBody = {
    name: 'platform',
    coords: {
      x: 300,
      y: 60,
      view: {
        lX: 0,
        lY: 0,
        rX: 0,
        rY: 0,
      },
    },
    image: {
      width: 0,
      height: 0,
      frameWidth: 64,
      frameHeight: 64,
      background: null,
      frame: 0,
      frameCount: 9,
      frames: 0,
    },
  };
  initialize = async () => {
    await new Promise((res) => {
      const use = new Image();
      use.src = './images/platfom.png';
      use.onload = () => {
        this.body.image.background = use;
        this.body.image.width = 64;
        this.body.image.height = 64;
        res();
      };
    });
    this.recalc();
    return this;
  };
  render = () => {
    this.draw();
  };
  recalc = () => {
    this.body.coords.view.lX = this.body.coords.x;
    this.body.coords.view.lY = this.body.coords.y + this.body.image.frameHeight;
    this.body.coords.view.rX = this.body.coords.view.lX + this.body.image.frameWidth;
    this.body.coords.view.rY = this.body.coords.y + this.body.image.frameHeight;
  };

  draw = () => {
    this.ctx.drawImage(
      this.body.image.background as CanvasImageSource,
      this.body.coords.view.lX,
      this.height - this.body.coords.y - this.body.image.frameHeight,
    );
  };
}
