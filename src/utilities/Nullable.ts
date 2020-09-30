export const map = <A, B>(a: A | null, mapFn: (a: A) => B): B | null => {
  if (a === null) {
    return null
  }
  return mapFn(a)
}
