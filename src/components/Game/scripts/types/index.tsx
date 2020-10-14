import { Hero } from '../hero/hero';
import { Platform } from '../platforms/platform';

export interface InitParametrs {
  /**
   * Ширина канваса
   */
  width: number;
  /**
   * Высота канваса
   */
  height: number;
  /**
   * Контекст канваса
   */
  ctx: CanvasRenderingContext2D;
}

export interface RenderBody {
  coords: {
    /**
     * Координата X начала отрисовки персонажа
     */
    x: number;
    /**
     * Координата Y начала отрисовки персонажа
     */
    y: number;
    /**
     * Левый X начала отрисовки
     */
    view: {
      lX: number;
      /**
       * Левый Y начала отрисовки
       */
      lY: number;
      /**
       * Правый X начала отрисовки
       */
      rX: number;
      /**
       * Правый Y начала отрисовки
       */
      rY: number;
    };
  };
  image: string;
  images: {
    [key: string]: ImageParameters;
  };
}

export type ImageParameters = {
  /**
   * Ссылка на спрайт
   */
  link: string;
  /**
   * Ширина спрайта персонажа
   */
  width: number;
  /**
   * Высота спрайта персонажа
   */
  height: number;
  /**
   * Ширина фрейма персонажа
   */
  frameWidth: number;
  /**
   * Высота фрейма персонажа
   */
  frameHeight: number;
  /**
   * Ссылка на скачанное в память изображение
   */
  background: HTMLImageElement | null | CanvasImageSource;
  /**
   * Текущий фрейм анимации персонажа
   */
  frame: number;
  /**
   * Число фреймов анимации персонажа
   */
  frameCount: number;
  /**
   * Время для рассчета смены анимаций
   */
  perfomance: number;
  /**
   * Скорость при которой меняется анимация
   */
  speed: number;
};

export type GlobalGameState = {
  hero: Hero[];
  platforms: Platform[];
  enemies: [];
};
