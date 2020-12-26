import { HeroBody } from './heroBody';
import { playerConstants } from '../constants';
import { spritesLinks } from '../resourcesLinks';

export const heroAnimations = {
  runLeft: 'runLeft',
  runRight: 'runRight',
};

export const heroInitialState: HeroBody = {
  coords: {
    x: 120,
    y: 200,
    view: {
      lX: 0,
      lY: 0,
      rX: 0,
      rY: 0,
    },
  },
  image: heroAnimations.runLeft, // дефолтный image
  images: {
    runRight: {
      link: spritesLinks.hero.runRight,
      width: 0,
      height: 0,
      background: null,
      frame: 1,
      frameCount: 9,
      frameWidth: 50,
      frameHeight: 80,
      perfomance: 0,
      speed: 2000,
    },
    runLeft: {
      link: spritesLinks.hero.runLeft,
      width: 0,
      height: 0,
      background: null,
      frame: 1,
      frameCount: 9,
      frameWidth: 50,
      frameHeight: 80,
      perfomance: 0,
      speed: 2000,
    },
  },
  jump: {
    extra: playerConstants.jumpHeight, // высота прыжка
    current: 0,
    fly: false,
    down: false,
  },
  move: {
    direction: 'right',
  },
};
