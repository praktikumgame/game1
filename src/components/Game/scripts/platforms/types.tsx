import { Camera } from '../assets';
import { InitParametrs, RenderBody } from '../types';
export interface PlatformProps extends InitParametrs {
  body: RenderBody;
  camera: Camera;
}
