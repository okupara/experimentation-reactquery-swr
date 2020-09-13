import { useMemo, useRef } from "react"

export function useMemoIf<T>(condition: boolean, fn: () => T): T | undefined {
  const refValue = useRef<T>()

  return useMemo(() => {
    if (condition === false) {
      return refValue.current
    }
    const value = fn()
    refValue.current = value
    return value
  }, [condition])
}
