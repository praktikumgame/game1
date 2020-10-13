export interface body {
  /**
   * Имя обьекта
   */
  name: string;
  /**
   * Массив с координатами обьекта
   */
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
  image: {
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
    // frames: number;
    perfomance?: number;
    speed: number;
  };
  /**
   * Состояние прыжка
   */
  jump: {
    /**
     * Текущая координата прыжка
     */
    current: number;
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
    down: boolean;
  };
  /**
   * Cтейт с нажатыми клавишами
   */
  arrows: {
    top: boolean;
    left: boolean;
    bottom: boolean;
    right: boolean;
  };
}
export interface StaticBody {
  /**
   * Имя обьекта
   */
  name: string;
  coords: {
    /**
     * Координата X начала отрисовки персонажа
     */
    x: number;
    /**
     * Координата Y начала отрисовки персонажа
     */
    y: number;
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
  image: {
    frameWidth: number;
    frameHeight: number;
    background: HTMLImageElement | null | CanvasImageSource;
    frame: number;
    frameCount: number;
    frames: number;
    width: number;
    height: number;
  };
}

export type Exit = [() => string] | undefined;
