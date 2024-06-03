export function getRandomNumber(min: number, max: number): number {
  const seed = new Date().getTime();
  let random = Math.sin(seed) * 10000;
  random = random - Math.floor(random);
  return Math.floor(random * (max - min + 1)) + min;
}
