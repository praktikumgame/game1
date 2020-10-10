type currentJump = {
  /**
   * Текущая координата прыжка
   */
  current: number | undefined;
  /**
   * Высота прыжка
   */
  extra: number;
  /**
   * Направление движения в прыжке
   */
  type: 'up' | 'down';
  /**
   * Состояние полета
   */
  fly: boolean;
};
export interface body {
  /**
   * Координата X начала отрисовки персонажа
   */
  x: number;
  /**
   * Координата Y начала отрисовки персонажа
   */
  y: number;
  /**
   * Состояние прыжка
   */
  jump: currentJump;
  /**
   * Cтейт с нажатыми клавишами
   */
  state: {
    top: boolean;
    left: boolean;
    bottom: boolean;
    right: boolean;
  };
  /**
   * Ширина спрайта персонажа
   */
  width: number;
  /**
   * Высота спрайта персонажа
   */
  height: number;
  /**
   * Ссылка на скачанное в кеш/оперативную память (я просто хз) изображение
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
   * Фремы из RequestAnimationFrame (прибавлять при каждом обороте функции)
   */
  frames: number;
}

export type ExitBus = [() => string, () => void] | [];
