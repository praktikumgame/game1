/** Загрузить изображение, используя HTMLImageElement */
export function loadImage(link: string): Promise<HTMLImageElement> {
  return new Promise((res) => {
    const image = new Image();
    image.src = link;
    image.onload = () => res(image);
  });
}
