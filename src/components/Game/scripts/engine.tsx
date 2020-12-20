import { InitParametrs, RenderBody, GlobalGameState } from './types';
import { Camera } from './assets';
import { levels } from './levels';
import { Level, Levels } from './levels/types';

import { Sprites, sprites } from './sources';

import { Platform } from './platforms/platform';
import { Hero } from './hero/hero';
import { ScoreScreen } from 'components/Game/scripts/scoreScreen/scoreScreen';
import { heroConfig } from './hero/sourse';
import { HeroBody } from './hero/types';
import { store } from 'index';
import { leaderBoardApi } from 'services/api/leaderBoardApi';

enum StatusGame {
  inGame = 'IN_GAME',
  stopped = 'STOPPED',
  pause = 'PAUSE',
  gameOver = 'GAME_OVER',
}

export default class Engine {
  initParametrs: InitParametrs;
  gameOverScreen: ScoreScreen;
  animationId = 0;
  camera = new Camera();

  status: StatusGame = StatusGame.stopped;
  score = 0;

  globalRender: GlobalGameState = {
    hero: [],
    platforms: [],
    enemies: [],
  };

  constructor(initParametrs: InitParametrs) {
    this.initParametrs = initParametrs;
    this.gameOverScreen = new ScoreScreen(this.initParametrs.ctx, this.initParametrs.width, this.initParametrs.height);
  }

  async initialize() {
    // Здесь должна быть рендер-функция пока загружаются спрайты
    const keys = Object.keys(sprites);
    for (const key of keys) {
      for (const sprite of sprites[key as keyof Sprites]) {
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
        const merge = Object.assign({ body: value }, this.initParametrs, { camera: this.camera });
        const platform = await new Platform(merge).initialize();
        this.globalRender.platforms.push(platform);
        break;
      }
      case 'hero': {
        const merge = Object.assign({ body: value as HeroBody }, this.initParametrs, { camera: this.camera });
        const hero = await new Hero(merge).initialize();
        this.globalRender.hero.push(hero);
        break;
      }
    }
  }

  start() {
    this.status = StatusGame.inGame;
    this.render();
  }

  render = () => {
    this.initParametrs.ctx.clearRect(0, 0, this.initParametrs.width, this.initParametrs.height);
    if (this.status === StatusGame.gameOver) {
      this.gameOverScreen.draw(this.score);
      return;
    }

    const [hero] = this.globalRender.hero;
    // В будущем перепишем или нет:)
    if (hero.body.coords.view.lY < 0) {
      this.score = 100 * Math.round(Math.abs(hero.body.coords.view.lX - hero.body.coords.x));
      this.status = StatusGame.gameOver;
      leaderBoardApi
        .newResult({
          data: {
            name: store.getState().auth.login,
            score: this.score,
          },
          ratingFieldName: 'score',
        })
        .catch(console.error);
    }

    hero.render();

    const stayOnPlatform = this.globalRender.platforms.map((el) => el.render(hero)).some((el) => el);
    this.controller(stayOnPlatform);

    this.animationId = requestAnimationFrame(this.render);
  };

  controller(stayOnPlatform: boolean) {
    const [hero] = this.globalRender.hero;

    if (stayOnPlatform) {
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
    const [hero] = this.globalRender.hero;
    hero.destroy();
    window.cancelAnimationFrame(this.animationId);
    this.status = StatusGame.stopped;
    // Рендер функция с очками
  }
}
