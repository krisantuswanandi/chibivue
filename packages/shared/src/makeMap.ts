/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
export function makeMap(str: string): (key: string) => boolean {
  const map: Record<string, boolean> = Object.create(null);
  const list: Array<string> = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return (val) => !!map[val];
}
