import { GlobalGameState, InitParameters, RenderBody } from './types';
import { Camera } from './camera';
import { levels } from './levels';
import { Level, Levels } from './levels/types';

import { Sprites, sprites } from './sources';

import { Platform } from './platforms/platform';
import { Hero } from './hero/hero';
import { ScoreScreen } from 'components/Game/scripts/scoreScreen/scoreScreen';
import { heroInitialState } from './hero/heroInitialState';
import { HeroBody } from './hero/types';
import { store } from 'index';
import { leaderBoardApi } from 'services/api/leaderBoardApi';
import { UserInput } from './types/UserInput';
import _ from 'lodash';

enum StatusGame {
  inGame = 'IN_GAME',
  stopped = 'STOPPED',
  pause = 'PAUSE',
  gameOver = 'GAME_OVER',
}

export default class Engine {
  animationId = 0; // id, который возвращает requestAnimationFrame
  status: StatusGame = StatusGame.stopped;

  readonly initParameters: InitParameters;
  readonly gameOverScreen: ScoreScreen;
  readonly camera = new Camera();
  readonly userInput: UserInput = new UserInput();

  readonly globalGameState: GlobalGameState = {
    hero: [],
    platforms: [],
    enemies: [],
  };

  constructor(initParams: InitParameters) {
    this.initParameters = initParams;
    this.gameOverScreen = new ScoreScreen(
      this.initParameters.ctx,
      this.initParameters.width,
      this.initParameters.height,
    );
  }

  async initialize() {
    await this.loadResources();
    await this.createLevel('1');
    this.listenKeyboardEvents();
    this.start();
  }

  async createLevel(lvl: keyof Levels) {
    const currentLvl = levels[lvl as keyof Levels]; // get level config
    await this.create(currentLvl); // add level info (platforms) to global state
    await this.creator('hero', _.cloneDeep(heroInitialState)); // add player to global state
  }

  async create(lvl: Level) {
    const keys = Object.keys(lvl);
    for (const key of keys) {
      for (const obj of lvl[key as keyof Level]) {
        await this.creator(key, obj);
      }
    }
  }

  async creator(key: string, value: RenderBody | HeroBody) {
    switch (key) {
      case 'platforms': {
        const merge = Object.assign({ body: value }, this.initParameters, { camera: this.camera });
        const platform = await new Platform(merge).initialize();
        this.globalGameState.platforms.push(platform);
        break;
      }
      case 'hero': {
        const merge = Object.assign({ body: value as HeroBody }, this.initParameters, { camera: this.camera });
        const hero = await new Hero(merge).initialize();
        this.globalGameState.hero.push(hero);
        break;
      }
    }
  }

  public start() {
    this.status = StatusGame.inGame;
    this.render();
  }

  public render = () => {
    this.initParameters.ctx.clearRect(0, 0, this.initParameters.width, this.initParameters.height);
    const [hero] = this.globalGameState.hero;

    if (this.status === StatusGame.gameOver) {
      const score = Math.round(Math.abs(heroInitialState.coords.x - hero.body.coords.x));
      this.submitHighScore(score)
        .then((resp) => console.log('submitted new high score. ' + resp))
        .catch(console.error);
      this.gameOverScreen.draw(score);
      return;
    }

    if (hero.body.coords.view.lY < 0) {
      // если игрок коснулся пола
      this.status = StatusGame.gameOver;
    }

    this.globalGameState.hero[0].render(this.userInput, this.globalGameState);
    this.globalGameState.platforms.forEach((el) => el.render());

    this.animationId = requestAnimationFrame(this.render);
  };

  public stop() {
    // на серьезном проекте так грубо всё грохать канеш нельзя
    window.onkeydown = () => null;
    window.onkeyup = () => null;
    document.onkeydown = () => null;

    window.cancelAnimationFrame(this.animationId);
    this.status = StatusGame.stopped;
    // Рендер функция с очками
  }

  private listenKeyboardEvents() {
    document.onkeydown = (e) => e.preventDefault();
    const onKeyDown = (evt: KeyboardEvent) => this.userInput.updateState(evt, true);
    const onKeyUp = (evt: KeyboardEvent) => this.userInput.updateState(evt, false);

    window.onkeydown = onKeyDown;
    window.onkeyup = onKeyUp;
  }

  private async loadResources(): Promise<any> {
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
  }

  private submitHighScore(score: number): Promise<string> {
    return leaderBoardApi.newResult({
      data: {
        name: store.getState().auth.login,
        score: score,
      },
      ratingFieldName: 'score',
    });
  }
}
