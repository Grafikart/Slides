export function addNumbers (a: number, b: number): number {
  return a + b
}

const input = document.querySelector('input')
if (input) {
    addNumbers(2, parseInt(input.value, 10))
}
