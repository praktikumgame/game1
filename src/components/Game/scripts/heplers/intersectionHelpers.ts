/**
 * Проверка что игрок стоит на платформе
 * @param player Координаты игрока
 * @param platform Координаты платформы
 * @param yThreshold Допустимая погрешность по Y
 * @return Результат проверки и расстояние до платформы
 */
export function isPlayerOnPlatform(
  player: { lX: number; lY: number; rX: number; rY: number },
  platform: { lX: number; lY: number; rX: number; rY: number },
  yThreshold = 0.1,
): { intersects: boolean; yDistance: number } {
  const intersects =
    pointOnALine({ x: player.lX, y: player.lY }, platform, yThreshold) ||
    pointOnALine({ x: player.rX, y: player.rY }, platform, yThreshold);

  return { intersects: intersects, yDistance: player.lY - platform.lY };
}

function pointOnALine(
  point: { x: number; y: number },
  line: { lX: number; lY: number; rX: number; rY: number },
  yThreshold: number,
): boolean {
  return point.x >= line.lX && point.x <= line.rX && Math.abs(point.y - line.lY) < yThreshold;
}
