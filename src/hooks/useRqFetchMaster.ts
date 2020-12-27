import { useCallback } from "react"
import { useQuery, queryCache } from "react-query"

type UseRqFetchMasterProps = {
  cacheKey: string
  url: string
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export function useRqFetchMaster<T extends { id: string }>(
  props: UseRqFetchMasterProps,
) {
  const { isLoading, data } = useQuery<readonly T[]>(
    props.cacheKey,
    () => delay(2000).then(() => fetch(props.url).then((r) => r.json())),
    {
      refetchOnWindowFocus: false,
    },
  )

  const idIndexMap: Record<string, number> | null = data
    ? data.reduce((p, c, i) => ({ ...p, [c.id]: i }), {})
    : null

  const getRecordById = useCallback(
    (id: string): T | null => {
      if (!data || !idIndexMap) return null
      const result = data[idIndexMap[id]]
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

type PrefetchMasterProps = UseRqFetchMasterProps & {
  staleTime?: number
}

export function prefetchMaster({ staleTime, ...props }: PrefetchMasterProps) {
  const option = typeof staleTime === "undefined" ? {} : { staleTime }
  queryCache.prefetchQuery(
    props.cacheKey,
    () => fetch(props.url).then((r) => r.json()),
    option,
  )
}
