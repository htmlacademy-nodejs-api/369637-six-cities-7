import { ClassConstructor, plainToInstance } from 'class-transformer';

export function generateRandomValue(
  min: number,
  max: number,
  numAfterDigit = 0
) {
  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
}

function shuffle<T>(array: T[]) {
  for (let i = 0; i < array.length; i++) {
    const randomIndex = generateRandomValue(0, array.length - 1);
    [array[randomIndex], array[i]] = [array[i], array[randomIndex]];
  }
  return array;
}

export function getRandomItems<T>(items: T[], count?: number): T[] {
  if (count) {
    return shuffle(items).slice(0, count);
  }
  return shuffle(items).slice(0, generateRandomValue(0, items.length - 1));
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
  });
}

export function createErrorObject(message: string) {
  return {
    error: message,
  };
}
