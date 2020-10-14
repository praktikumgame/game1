import Engine from './engine';

export const init = async () => {
  const ctx = (document.querySelector('.canvas') as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;

  const engine = new Engine({
    width: ctx.canvas.clientWidth,
    height: ctx.canvas.clientHeight,
    ctx,
  });

  await engine.initialize();
  return engine;
};
