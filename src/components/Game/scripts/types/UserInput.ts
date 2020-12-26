export class UserInput {
  moveLeft = false;
  moveRight = false;
  jump = false;

  constructor() {
  }

  /** Нажата ли хоть одна кнопка */
  public get keyPressed() {
    return this.moveLeft || this.moveRight || this.jump;
  }

  /**
   * Обновить внутренний state
   * @param evt Событие
   * @param keyPressed Кнопка нажата или отпущена
   */
  public updateState(evt: KeyboardEvent, keyPressed: boolean) {
    switch (evt.code) {
      case 'ArrowUp':
        this.jump = keyPressed;
        break;
      case 'ArrowRight':
        this.moveRight = keyPressed;
        break;
      case 'ArrowLeft':
        this.moveLeft = keyPressed;
        break;
    }
  }
}
