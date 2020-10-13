import { InitParametrs } from './types';
import { Chel } from './personas/personas';
import { Plarform } from './platforms/platform';
import { Plarform as Platform2 } from './platforms/platformV2';
import { Plarform as Platform3 } from './platforms/platformV3';
type Objects = Chel | Plarform;
export type renderArr = Objects[];
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
  async initialize () {
    const chel = await new Chel({ ctx: this.ctx, width: this.width, height: this.height }).initialize();
    const platform = await new Plarform({ ctx: this.ctx, width: this.width, height: this.height }).initialize();
    const platform2 = await new Platform2({ ctx: this.ctx, width: this.width, height: this.height }).initialize();
    const platform3 = await new Platform3({ ctx: this.ctx, width: this.width, height: this.height }).initialize();
    this.renderArr.push(chel);
    this.renderArr.push(platform);
    this.renderArr.push(platform2);
    this.renderArr.push(platform3);
    chel.setGlobalContext(this.renderArr);
  }
  start () {
    this.render();
  }
  render = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.renderArr.forEach((el) => el.render());
    requestAnimationFrame(this.render);
  };
}
