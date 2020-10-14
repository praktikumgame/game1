import { HeroBody, HeroProps } from './types';

export class Hero {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  body: HeroBody;
  currentImage = 'default';

  constructor({ width, height, ctx, body }: HeroProps) {
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

    const trueMove = this.move.bind(this, true);
    const falseMove = this.move.bind(this, false);

    window.addEventListener('keydown', trueMove);
    window.addEventListener('keyup', falseMove);
    document.onkeydown = (e) => e.preventDefault();
    return this;
  }
  recalc = () => {
    // Левые и правые координаты хит-линии в декартовой системе
    this.body.coords.view.lX = this.body.coords.x;
    this.body.coords.view.lY = this.body.coords.y;
    this.body.coords.view.rX = this.body.coords.x + this.body.images[this.currentImage].frameWidth;
    this.body.coords.view.rY = this.body.coords.y;
  };
  render = () => {
    const current = this.body.images[this.currentImage];
    if (!current.perfomance) {
      current.perfomance = performance.now();
    }

    if (current.frame === current.frameCount) {
      current.frame = 1;
    } else {
      const shift = performance.now() - current.perfomance;
      if (shift > 200) {
        current.perfomance = performance.now();
        current.frame += 1;
      }
    }
    this.jump();
    this.draw();
    this.recalc();
  };
  draw() {
    const current = this.body.images[this.currentImage];
    this.ctx.drawImage(
      current.background as CanvasImageSource,
      current.frameWidth * current.frame,
      0,
      current.frameWidth,
      current.frameHeight,
      this.body.coords.x,
      this.height - current.frameHeight - this.body.coords.y,
      current.frameWidth,
      current.frameHeight,
    );
  }
  jump = () => {
    if (this.body.arrows.left) {
      this.body.coords.x -= 1;
    }
    if (this.body.arrows.right) {
      this.body.coords.x += 1;
    }
    if (this.body.arrows.bottom) {
      this.body.coords.y -= 1;
    }
    if (this.body.jump.down && !this.body.jump.fly) {
      this.body.coords.y -= 1;
      return;
    }
    if (this.body.jump.fly) {
      if (this.body.jump.type === 'up') {
        if (this.body.jump.current < this.body.jump.extra) {
          this.body.coords.y += 1;
          this.body.jump.current += 1;
        } else {
          this.body.jump.type = 'down';
        }
      } else {
        if (this.body.jump.current > 0) {
          this.body.coords.y -= 1;
          this.body.jump.current -= 1;
        } else {
          this.body.jump.type = 'up';
          this.body.jump.fly = false;
        }
      }
    }
  };
  move = (bool: boolean, e: KeyboardEvent) => {
    if (e.code === 'ArrowUp' && bool && !this.body.jump.fly) {
      this.body.jump.current = 0;
      this.body.jump.fly = true;
      return;
    }
    switch (e.code) {
      case 'ArrowRight': {
        this.body.arrows.right = bool;
        break;
      }
      case 'ArrowLeft': {
        this.body.arrows.left = bool;
        break;
      }
      case 'ArrowDown': {
        this.body.arrows.bottom = bool;
        break;
      }
    }
  };
}
