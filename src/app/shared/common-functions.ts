export function totalInSeconds(houres: number, minutes: number, seconds: number): number {
  return houres * 60 * 60 + minutes * 60 + seconds;
}
