import { HeroBody } from './types';
import { playerConstants } from '../constants';

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
  image: 'default',
  images: {
    default: {
      link: './images/chelRight.png',
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
};
