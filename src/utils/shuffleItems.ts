export function shuffleItems<T>(items: T[]): T[] {
  const result: T[] = [...items];

  for (let index = items.length - 1; index > 0; index--) {
    const newIndex = Math.floor(Math.random() * (index + 1));

    [result[index], result[newIndex]] = [result[newIndex], result[index]];
  }

  return result;
}
