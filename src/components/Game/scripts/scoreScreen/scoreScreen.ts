import { getCenteredCoordinates } from 'components/Game/scripts/heplers/getCenteredCoordinates';

export class ScoreScreen {
  coords = getCenteredCoordinates({ width: this.width, height: this.height }, { width: 200, height: 30 });

  constructor(private ctx: CanvasRenderingContext2D, private readonly width: number, private readonly height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  public text(score: number) {
    const { x, y } = this.coords;

    this.ctx.font = '30px Caveat';
    this.ctx.fillText('Вы проиграли:(', x, y);
    this.ctx.fillText(`Очков набранно: ${score}`, x, y + 30);
  }

  public draw(score: number) {
    this.text(score);
  }
}
