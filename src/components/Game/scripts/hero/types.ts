import { InitParametrs, RenderBody } from '../types';

export interface HeroBody extends RenderBody {
  jump: {
    extra: number;
    current: number;
    type: 'up' | 'down';
    fly: boolean;
    down: boolean;
  };
  arrows: {
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
  };
}

export interface HeroProps extends InitParametrs {
  body: HeroBody;
}
