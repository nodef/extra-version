export type compareFn<T>    = (a: T, b: T) => number;
export type mapFn<T, U>     = (v: T, i: number, x: Iterable<T>) => U;
export type nextFn<T>       = (v: T, d: T) => T;
