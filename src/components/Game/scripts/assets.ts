export interface Camera {
  x: number;
  y: number;
}

export class Camera {
  x = 0;
  y = 0;
  incX = () => {
    this.x += 0.2;
    return this.x;
  };
  incY = () => {
    this.y += 0.2;
    return this.y;
  };
  decX = () => {
    this.x -= 0.2;
    return this.x;
  };
  decY = () => {
    this.y -= 0.2;
    return this.y;
  };
}
