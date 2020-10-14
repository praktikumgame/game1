import { InitParametrs, RenderBody, globalRender } from './types';

import { levels } from './levels';
import { Level, Levels } from './levels/types';

import { sprites } from './sources';

import { Platform } from './platforms/platform';
import { Hero } from './hero/hero';
import { heroConfig } from './hero/sourse';
import { HeroBody } from './hero/types';

export default class Engine {
  initParametrs: InitParametrs;
  animationId = 0;

  globalRender: globalRender = {
    hero: [],
    platforms: [],
    enemies: [],
  };

  constructor(initParametrs: InitParametrs) {
    this.initParametrs = initParametrs;
  }

  async initialize() {
    // Здесь должна быть рендер-функция пока загружаются спрайты
    for (const sprite of sprites) {
      try {
        await new Promise((res) => {
          const use = new Image();
          use.src = sprite;
          use.onload = () => res();
        });
      } catch (err) {
        console.log(err);
      }
    }
    // здесь рендер-функция выбора уровня
    this.setLevel('1');
  }

  async setLevel(lvl: keyof Levels) {
    const currentLvl = levels[lvl as keyof Levels];
    await this.creator('hero', heroConfig);
    this.create(currentLvl);
  }
  async create(lvl: Level) {
    const keys = Object.keys(lvl);
    for (const key of keys) {
      for (const obj of lvl[key as keyof Level]) {
        await this.creator(key, obj);
      }
    }
    this.start();
  }
  async creator(key: string, value: RenderBody | HeroBody) {
    switch (key) {
      case 'platforms': {
        const merge = Object.assign({ body: value }, this.initParametrs);
        const platform = await new Platform(merge).initialize();
        this.globalRender.platforms.push(platform);
        break;
      }
      case 'hero': {
        const merge = Object.assign({ body: value as HeroBody }, this.initParametrs);
        const hero = await new Hero(merge).initialize();
        this.globalRender.hero.push(hero);
        break;
      }
    }
  }
  start() {
    this.render();
  }
  render = () => {
    this.initParametrs.ctx.clearRect(0, 0, this.initParametrs.width, this.initParametrs.height);
    const hero = this.globalRender.hero[0];

    hero.render();

    const stayOnPlatform = this.globalRender.platforms.map((el) => el.render(hero)).some((el) => el);

    this.controller(stayOnPlatform);

    this.animationId = requestAnimationFrame(this.render);
  };
  controller(bool: boolean) {
    const hero = this.globalRender.hero[0];

    if (bool) {
      hero.body.jump.down = false;
      if (hero.body.jump.current) {
        hero.body.jump.fly = false;
        hero.body.jump.current = 0;
        hero.body.jump.type = 'up';
      }
    } else {
      hero.body.jump.down = true;
    }
  }
  stop() {
    // Сюда передаем ид из стейта
    window.cancelAnimationFrame(this.animationId);
    // Рендер функция с очками
  }
}
