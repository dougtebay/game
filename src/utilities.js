export const range = (start, end) => {
  const items = end - start + 1;

  return Array.from(Array(items), (item, index) => index + start);
}

export const combinations = (arrayA, arrayB) => {
  return arrayA.flatMap((arrayAItem) => arrayB.map((arrayBItem) => [arrayAItem, arrayBItem]));
}
