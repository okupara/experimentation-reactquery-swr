import { useCallback } from "react"
import { useQuery, useQueryClient } from "react-query"

type UseRqFetchMasterProps = {
  cacheKey: string
  url: string
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

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

export function usePrefetchMaster({ staleTime, ...props }: PrefetchMasterProps) {
  const option = typeof staleTime === "undefined" ? {} : { staleTime }
  const client = useQueryClient()

  const prefetch = useCallback(() => {
    client.prefetchQuery(props.cacheKey, () =>
      fetch(props.url).then((r) => r.json()),
    )
  }, [props.cacheKey])

  return { prefetch }
}
