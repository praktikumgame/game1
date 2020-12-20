interface IParent {
  width: number;
  height: number;
}

interface IChild {
  width: number;
  height: number;
}

interface ICoordinates {
  x: number;
  y: number;
}

export const getCenteredCoordinates = (parent: IParent, child: IChild): ICoordinates => {
  const x = (parent.width - child.width) / 2;
  const y = (parent.height - child.height) / 2;

  return { x, y };
};
