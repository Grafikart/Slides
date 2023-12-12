export function times<T = number>(n: number, cb: (k: number) => T = (k) => k as T): T[] {
    return new Array(n).fill(0).map((_, k) => cb(k))
}
