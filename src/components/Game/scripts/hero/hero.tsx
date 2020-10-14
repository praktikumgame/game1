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
  check = () => {
    // const res = this.accessory(
    //   (this.globalContext[0].body as StaticBody).coords.view,
    //   (this.globalContext[1].body as StaticBody).coords.view,
    // );
    // const res2 = this.accessory(
    //   (this.globalContext[0].body as StaticBody).coords.view,
    //   (this.globalContext[2].body as StaticBody).coords.view,
    // );
    // const res3 = this.accessory(
    //   (this.globalContext[0].body as StaticBody).coords.view,
    //   (this.globalContext[3].body as StaticBody).coords.view,
    // );
    // if (res || res2 || res3) {
    //   this.body.jump.down = false;
    //   if (this.body.jump.current) {
    //     this.body.jump.fly = false;
    //     this.body.jump.current = 0;
    //     this.body.jump.type = 'up';
    //   }
    // } else {
    //   this.body.jump.down = true;
    // }
  };

  accessory = (
    a: { lX: number; lY: number; rX: number; rY: number },
    b: { lX: number; lY: number; rX: number; rY: number },
  ) => {
    return (
      (b.lX <= a.lX && a.lX <= b.rX && b.lY <= a.lY && a.lY <= b.rY) ||
      (b.lX <= a.rX && a.rX <= b.rX && b.lY <= a.rY && a.rY <= b.rY)
    );
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

// import { InitParametrs } from '../types';
// import { body, StaticBody } from '../types/personas';
// //
// import { renderArr } from '../engine';
// export class Chel {
//   width: number;
//   height: number;
//   ctx: CanvasRenderingContext2D;
//   globalContext: renderArr = [];

//   constructor({ ctx, width, height }: InitParametrs) {
//     this.width = width;
//     this.height = height;
//     this.ctx = ctx;
//   }

//   body: body = {
//     name: 'chel',
//     coords: {
//       x: 220,
//       y: 95,
//       view: {
//         lX: 0,
//         lY: 0,
//         rX: 0,
//         rY: 0,
//       },
//     },
//     image: {
//       width: 0,
//       height: 0,
//       background: null,
//       frame: 0,
//       frameCount: 10,
//       frameWidth: 50,
//       frameHeight: 80,
//       // frames: 0,
//       speed: 2000,
//     },
//     jump: {
//       extra: 100,
//       current: 0,
//       type: 'up',
//       fly: false,
//       down: false,
//     },
//     arrows: {
//       left: false,
//       right: false,
//       top: false,
//       bottom: false,
//     },
//   };

//   initialize = async () => {
//     await new Promise((res) => {
//       const use = new Image();
//       use.src = './images/chelRight.png';
//       use.onload = () => {
//         this.body.image.background = use;
//         this.body.image.width = 500;
//         this.body.image.height = 80;
//         res();
//       };
//     });

//     const trueMove = this.move.bind(this, true);
//     const falseMove = this.move.bind(this, false);

//     window.addEventListener('keydown', trueMove);
//     window.addEventListener('keyup', falseMove);

//     document.onkeydown = (e) => e.preventDefault();
//     // setTimeout(() => {
//     //   window.removeEventListener('keydown', trueMove);
//     //   window.removeEventListener('keyup', falseMove);
//     // document.onkeydown = () => null;
//     // }, 5000);
//     return this;
//   };

//   render = () => {
//     if (!this.body.image.perfomance) {
//       this.body.image.perfomance = performance.now();
//     }

//     if (this.body.image.frame === this.body.image.frameCount) {
//       this.body.image.frame = 1;
//     } else {
//       const shift = performance.now() - this.body.image.perfomance;
//       if (shift > 200) {
//         this.body.image.perfomance = performance.now();
//         this.body.image.frame += 1;
//       }
//     }
//     this.jump();
//     this.draw();
//     this.recalc();
//     this.check();
//   };

//   recalc = () => {
//     // Левые и правые координаты хит-линии в декартовой системе
//     this.body.coords.view.lX = this.body.coords.x;
//     this.body.coords.view.lY = this.body.coords.y;
//     this.body.coords.view.rX = this.body.coords.x + this.body.image.frameWidth;
//     this.body.coords.view.rY = this.body.coords.y;
//   };

//   draw = () => {
//     this.ctx.drawImage(
//       this.body.image.background as CanvasImageSource,
//       this.body.image.frameWidth * this.body.image.frame,
//       0,
//       this.body.image.frameWidth,
//       this.body.image.frameHeight,
//       this.body.coords.x,
//       this.height - this.body.image.frameHeight - this.body.coords.y,
//       this.body.image.frameWidth,
//       this.body.image.frameHeight,
//     );
//   };
//   jump = () => {
//     if (this.body.arrows.left) {
//       this.body.coords.x -= 1;
//     }
//     if (this.body.arrows.right) {
//       this.body.coords.x += 1;
//     }
//     if (this.body.arrows.bottom) {
//       this.body.coords.y -= 1;
//     }
//     if (this.body.jump.down && !this.body.jump.fly) {
//       this.body.coords.y -= 1;
//       return;
//     }
//     if (this.body.jump.fly) {
//       if (this.body.jump.type === 'up') {
//         if (this.body.jump.current < this.body.jump.extra) {
//           this.body.coords.y += 1;
//           this.body.jump.current += 1;
//         } else {
//           this.body.jump.type = 'down';
//         }
//       } else {
//         if (this.body.jump.current > 0) {
//           this.body.coords.y -= 1;
//           this.body.jump.current -= 1;
//         } else {
//           this.body.jump.type = 'up';
//           this.body.jump.fly = false;
//         }
//       }
//     }
//   };
//   check = () => {
//     const res = this.accessory(
//       (this.globalContext[0].body as StaticBody).coords.view,
//       (this.globalContext[1].body as StaticBody).coords.view,
//     );
//     const res2 = this.accessory(
//       (this.globalContext[0].body as StaticBody).coords.view,
//       (this.globalContext[2].body as StaticBody).coords.view,
//     );
//     const res3 = this.accessory(
//       (this.globalContext[0].body as StaticBody).coords.view,
//       (this.globalContext[3].body as StaticBody).coords.view,
//     );
//     if (res || res2 || res3) {
//       this.body.jump.down = false;
//       if (this.body.jump.current) {
//         this.body.jump.fly = false;
//         this.body.jump.current = 0;
//         this.body.jump.type = 'up';
//       }
//     } else {
//       this.body.jump.down = true;
//     }
//   };

//   accessory = (
//     a: { lX: number; lY: number; rX: number; rY: number },
//     b: { lX: number; lY: number; rX: number; rY: number },
//   ) => {
//     return (
//       (b.lX <= a.lX && a.lX <= b.rX && b.lY <= a.lY && a.lY <= b.rY) ||
//       (b.lX <= a.rX && a.rX <= b.rX && b.lY <= a.rY && a.rY <= b.rY)
//     );
//   };
//   move = (bool: boolean, e: KeyboardEvent) => {
//     if (e.code === 'ArrowUp' && bool && !this.body.jump.fly) {
//       this.body.jump.current = 0;
//       this.body.jump.fly = true;
//       return;
//     }
//     switch (e.code) {
//       case 'ArrowRight': {
//         this.body.arrows.right = bool;
//         break;
//       }
//       case 'ArrowLeft': {
//         this.body.arrows.left = bool;
//         break;
//       }
//     }
//   };
//   setGlobalContext = (e: renderArr) => {
//     this.globalContext = e;
//   };
// }
