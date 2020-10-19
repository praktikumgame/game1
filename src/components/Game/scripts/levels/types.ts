import { RenderBody } from '../types';

export interface Level {
  platforms: RenderBody[];
  enemies: RenderBody[];
}
export interface Levels {
  [key: string]: Level;
}
