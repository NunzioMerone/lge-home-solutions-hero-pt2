export function getLoopOffset(index: number, selected: number, count: number): number {
  if (count === 0) return 0
  const offset = (index - selected + count) % count
  return offset > count / 2 ? offset - count : offset
}
