/**
 * Convert string in camelCase
 */
export function toCamelCase(str: string): string {
  if (str === '') return '';

  return str
    .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '')
    .split(/[^a-zA-Z0-9]/)
    .map((word, index) => {
      if (index > 0) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        word = word.charAt(0).toLowerCase() + word.slice(1);
      }
      return word
    }).join('')
}
