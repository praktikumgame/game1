// import { InitParametrs } from '../types';
// import { ImageParameters, CoordsParametres } from '../types';

import { InitParametrs, RenderBody } from '../types';

// export interface PropsPlatform extends InitParametrs {
//   body: PlatformParameters;
// }

// export interface PlatformParameters {
//   name: string;
//   /**
//    * Все что касается изображения обьекта
//    */
//   coords: CoordsParametres;
//   images: {
//     stay: ImageParameters;
//   };
// }
export interface PlatformProps extends InitParametrs {
  body: RenderBody;
}
