export function clampNonNegativeNumber(
  rawValue: number,
  min: number = 0,
): number {
  return Number.isNaN(rawValue) ? min : Math.max(min, rawValue);
}
