export function capitalize(str: string): string {
  if (!str) return str;
  str = str.split('.')[0]
  return str.charAt(0).toUpperCase() + str.slice(1);
}