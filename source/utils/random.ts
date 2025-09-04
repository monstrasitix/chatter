export function randomString(): string {
  return Math.random().toString(16).slice(2);
}

export function randomUUID(): string {
  return `${randomString()}-${randomString()}-${randomString()}`;
}

export function randomInteger(max: number, min = 0): number {
  return Math.floor(Math.random() * (max - min));
}

export function randomElement<T>(array: T[]): T | undefined {
  return array[randomInteger(array.length)];
}
