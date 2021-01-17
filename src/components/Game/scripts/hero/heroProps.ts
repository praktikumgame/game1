import { InitParameters } from '../types';
import { Camera } from '../camera';
import { HeroBody } from './heroBody';

export interface HeroProps extends InitParameters {
  body: HeroBody;
  camera: Camera;
}
