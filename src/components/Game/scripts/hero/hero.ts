import { Camera } from '../camera';
import { HeroBody } from './heroBody';
import { UserInput } from '../types/UserInput';
import { loadImage } from '../heplers/loadImage';
import { GlobalGameState } from '../types';
import { playerConstants } from '../constants';
import { isPlayerOnPlatform } from '../heplers/intersects';
import { HeroProps } from './heroProps';
import { heroAnimations } from './heroInitialState';

export class Hero {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  body: HeroBody;
  camera: Camera;

  constructor({ width, height, ctx, body, camera }: HeroProps) {
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

    return this;
  }

  public render(userInput: UserInput, gameState: GlobalGameState) {
    this.updateAnimationFrame();
    this.updateHeroState(userInput, gameState);
    this.recalcViewCoordinates();
    this.draw();
  }

  updateHeroState(userInput: UserInput, gameState: GlobalGameState) {
    const playerOnPlatform = gameState.platforms.some(
      (platform) =>
        isPlayerOnPlatform(this.body.coords.view, platform.body.coords.view, playerConstants.fallSpeed).intersects,
    );

    if (playerOnPlatform) {
      this.body.jump.down = false;
      if (this.body.jump.current) {
        this.body.jump.fly = false;
        this.body.jump.current = 0;
      }
    } else {
      this.body.jump.down = true;
    }

    if (userInput.jump && !this.body.jump.fly && !this.body.jump.down) {
      this.body.jump.current = 0;
      this.body.jump.fly = true;
      return;
    }

    if (userInput.moveLeft) {
      this.body.coords.x -= playerConstants.runSpeed;
      this.body.move.direction = 'left';
    }
    if (userInput.moveRight) {
      this.body.coords.x += playerConstants.runSpeed;
      this.body.move.direction = 'right';
    }

    if (this.body.jump.down && !this.body.jump.fly) {
      this.body.coords.y -= playerConstants.fallSpeed;
      return;
    }
    if (this.body.jump.fly) {
      if (this.body.jump.current < this.body.jump.extra) {
        this.body.coords.y += playerConstants.jumpSpeed;
        this.body.jump.current += playerConstants.jumpSpeed;
      } else {
        this.body.jump.current = 0;
        this.body.jump.down = true;
        this.body.jump.fly = false;
      }
    }
  }

  private recalcViewCoordinates = () => {
    const { coords, images } = this.body;

    if (coords.view.rX < 150) {
      this.camera.incX();
    }
    if (coords.view.lX > 610) {
      this.camera.decX();
    }
    if (coords.view.lY > 280) {
      this.camera.decY();
    }
    if (coords.view.lY < 100) {
      this.camera.incY();
    }
    // Левые и правые координаты хит-линии в декартовой системе
    coords.view.lX = coords.x + this.camera.x;
    coords.view.lY = coords.y + this.camera.y;
    coords.view.rX = coords.x + images[this.body.image].frameWidth + this.camera.x;
    coords.view.rY = coords.y + this.camera.y;
  };

  private draw() {
    const current = this.body.images[this.body.image];
    this.ctx.drawImage(
      current.background as CanvasImageSource,
      current.frameWidth * current.frame,
      0,
      current.frameWidth,
      current.frameHeight,
      this.body.coords.view.lX,
      this.height - current.frameHeight - this.body.coords.view.lY,
      current.frameWidth,
      current.frameHeight,
    );
  }

  private updateAnimationFrame() {
    // не будет работать с анимациями, у которых разное количество кадров.
    // придется палить переход и обнулять количество фреймов
    switch (this.body.move.direction) {
      case 'left':
        this.body.image = heroAnimations.runLeft;
        break;
      case 'right':
        this.body.image = heroAnimations.runRight;
        break;
    }
    const current = this.body.images[this.body.image];
    if (!current.perfomance) {
      current.perfomance = performance.now();
    }

    if (current.frame === current.frameCount) {
      current.frame = 1;
    } else {
      const shift = performance.now() - current.perfomance;
      if (shift > playerConstants.animationStepMs) {
        current.perfomance = performance.now();
        current.frame += 1;
      }
    }
  }
}
