export function demo (a: unknown) {
  if (typeof a === 'number') {
    return a * 3
  }
  return 0
}
