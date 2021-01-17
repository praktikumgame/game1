import { Camera } from '../camera';
import { InitParameters, RenderBody } from '../types';

export interface PlatformProps extends InitParameters {
  body: RenderBody;
  camera: Camera;
}
