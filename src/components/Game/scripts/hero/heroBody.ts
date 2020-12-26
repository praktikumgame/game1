import { RenderBody } from '../types';

export interface HeroBody extends RenderBody {
  jump: {
    /** Высота прыжка */
    extra: number;
    /** Насколько высоко игрок уже прыгнул */
    current: number;
    /** Летит ли сейчас игрок наверх */
    fly: boolean;
    down: boolean;
  };
  move: {
    direction: 'left' | 'right';
  };
}
