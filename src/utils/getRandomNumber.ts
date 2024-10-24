/**
 * Generates a pseudo-random number between a specified minimum and maximum value (inclusive).
 * The function uses the current time as a seed for the random number generation.
 * 
 * @param {number} min - The minimum value for the random number (inclusive).
 * @param {number} max - The maximum value for the random number (inclusive).
 * @returns {number} - A pseudo-random number between `min` and `max` (inclusive).
 */
export function getRandomNumber(min: number, max: number): number {
  const seed = new Date().getTime(); // Use the current time as a seed
  let random = Math.sin(seed) * 10000; // Apply a simple pseudo-random generator using sine
  random = random - Math.floor(random); // Keep only the fractional part
  return Math.floor(random * (max - min + 1)) + min; // Scale and shift the random value to the desired range
}
