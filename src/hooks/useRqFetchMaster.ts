import { useCallback } from "react"
import { useQuery } from "react-query"

type UseRqFetchMasterProps = {
  cacheKey: string
  url: string
}

export function useRqFetchMaster<T extends { id: string }>(
  props: UseRqFetchMasterProps,
) {
  const { isLoading, data } = useQuery<ReadonlyArray<T>>(props.cacheKey, () =>
    fetch(props.url).then((r) => r.json()),
  )

  const IdIndexMap = data
    ? data.reduce((p, c, i) => ({ ...p, [c.id]: i }), {})
    : null

  const getRecordById = useCallback(
    (id: string): T => {
      if (!data) return null
      const result = data[IdIndexMap[id]]
      return result ? result : null
    },
    [data],
  )

  return {
    isLoading,
    data,
    getRecordById,
  }
}
