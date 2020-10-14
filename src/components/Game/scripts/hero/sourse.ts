import { HeroBody } from './types';
export const heroConfig: HeroBody = {
  coords: {
    x: 120,
    y: 120,
    view: {
      lX: 0,
      lY: 0,
      rX: 0,
      rY: 0,
    },
  },
  image: 'default',
  images: {
    default: {
      link: './images/chelRight.png',
      width: 0,
      height: 0,
      background: null,
      frame: 0,
      frameCount: 10,
      frameWidth: 50,
      frameHeight: 80,
      perfomance: 0,
      speed: 2000,
    },
  },
  jump: {
    extra: 100,
    current: 0,
    type: 'up',
    fly: false,
    down: false,
  },
  arrows: {
    left: false,
    right: false,
    top: false,
    bottom: false,
  },
};
