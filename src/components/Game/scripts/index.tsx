import Engine from './engine';
function setParameters(ctx: CanvasRenderingContext2D) {
  return {
    width: ctx.canvas.clientWidth,
    height: ctx.canvas.clientHeight,
    ctx,
  };
}

export const Init = () => {
  const ctx = (document.querySelector('.canvas') as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
  if (!ctx) {
    throw new Error('asd');
  }

  let parametrs = setParameters(ctx);
  window.addEventListener('resize', () => {
    parametrs = setParameters(ctx);
  });

  const engine = new Engine(parametrs);

  engine.initialize();

  setTimeout(() => {
    console.log(engine);
    engine.start();
  }, 2000);
  // return engine.stop();
};
