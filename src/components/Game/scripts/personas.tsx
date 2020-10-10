import { InitParametrs } from './types';
import { body, ExitBus } from './types/personas';
export class Chel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  exitBus: ExitBus = [];

  constructor({ ctx, width, height }: InitParametrs) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }

  body: body = {
    x: 0,
    y: 0,
    jump: {
      extra: 100,
      current: undefined,
      type: 'up',
      fly: false,
    },
    state: {
      left: false,
      right: false,
      top: false,
      bottom: false,
    },
    width: 0,
    height: 0,
    background: null,
    frame: 0,
    frameCount: 9,
    frames: 0,
  };

  async initialize() {
    await new Promise((res) => {
      const use = new Image();
      use.src = './images/chelRight.png';
      use.onload = () => {
        this.body.background = use;
        this.body.width = 300;
        this.body.height = 246;
        res();
      };
    });
    window.addEventListener('keydown', this.move.bind(this, true));
    window.addEventListener('keyup', this.move.bind(this, false));
    return this;
  }

  render = () => {
    this.body.frames++;
    if (this.body.frame >= this.body.frameCount) {
      this.body.frame = 1;
    } else {
      if (this.body.frames % 30 === 0) {
        this.body.frame += 1;
      }
    }
    if (this.body.frames % 100) {
      this.jump();
    }
    this.draw();
  };

  jump = () => {
    if (this.body.state.left) {
      this.body.x -= 1;
    }
    if (this.body.state.right) {
      this.body.x += 1;
    }
    if (this.body.state.bottom) {
      this.body.y += 1;
    }
    if (this.body.jump.current !== undefined) {
      if (this.body.jump.type === 'up') {
        if (this.body.jump.current !== 0) {
          this.body.y -= 1;
          this.body.jump.current -= 1;
        } else {
          this.body.jump.type = 'down';
        }
      }
      if (this.body.jump.type === 'down') {
        if (this.body.jump.extra !== this.body.jump.current) {
          this.body.y += 1;
          this.body.jump.current += 1;
        } else {
          this.body.jump.type = 'up';
          this.body.jump.current = undefined;
          this.body.jump.fly = false;
        }
      }
    }
  };

  draw = () => {
    this.ctx.drawImage(
      this.body.background as CanvasImageSource,
      50 * this.body.frame,
      0,
      50,
      80,
      this.body.x,
      this.body.y,
      50,
      80,
    );
  };
  move(bool: boolean, e: KeyboardEvent) {
    if (e.code === 'ArrowUp' && bool && !this.body.jump.fly) {
      this.body.jump.current = this.body.jump.extra;
      this.body.jump.fly = true;
      return;
    }
    const keys: Record<string, 'left' | 'right' | 'bottom'> = {
      ArrowLeft: 'left',
      ArrowRight: 'right',
      ArrowDown: 'bottom',
    };
    if (!this.body.state[keys[e.code]] === undefined) {
      return null;
    }
    this.body.state[keys[e.code]] = bool;
  }
}
