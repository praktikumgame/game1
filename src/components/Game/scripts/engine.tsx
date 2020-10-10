import { InitParametrs } from './types';
import { Chel } from './personas';
type renderArr = Chel[];
export default interface Engine extends InitParametrs {
  renderArr: renderArr;
}
export default class Engine {
  constructor({ width, height, ctx }: InitParametrs) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.renderArr = [];
  }
  async initialize() {
    const chel = await new Chel({ ctx: this.ctx, width: this.width, height: this.height }).initialize();
    this.renderArr.push(chel);
  }
  start() {
    this.render();
  }
  render = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.renderArr.forEach((el) => el.render());
    requestAnimationFrame(this.render);
  };
}
