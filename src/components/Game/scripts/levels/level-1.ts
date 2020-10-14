import { Level } from './types';
import { defaultPlatform } from './sources';
export const level1: Level = {
  platforms: [
    {
      coords: {
        x: 110,
        y: 0,
        view: {
          lX: 0,
          lY: 0,
          rX: 0,
          rY: 0,
        },
      },
      image: 'default',
      images: {
        default: defaultPlatform,
      },
    },
    {
      coords: {
        x: 200,
        y: 30,
        view: {
          lX: 0,
          lY: 0,
          rX: 0,
          rY: 0,
        },
      },
      image: 'default',
      images: {
        default: defaultPlatform,
      },
    },
    {
      coords: {
        x: 250,
        y: 130,
        view: {
          lX: 0,
          lY: 0,
          rX: 0,
          rY: 0,
        },
      },
      image: 'default',
      images: {
        default: defaultPlatform,
      },
    },
  ],
  enemies: [],
};
