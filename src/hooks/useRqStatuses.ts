import { useRqFetchMaster, usePrefetchMaster } from "./useRqFetchMaster"
import type { JSONModel, Model } from "../models/Status"
import { useMemoIf } from "../hooks/useMemoIf"

const CACHE_KEY = "statuses"
const URL = "http://localhost:5001/statuses"

export function usePrefetchStatuses() {
  return usePrefetchMaster({
    cacheKey: CACHE_KEY,
    url: URL,
    staleTime: 10000,
  })
}

export function useFetchStatuses() {
  const statusInfo = useRqFetchMaster<JSONModel>({
    cacheKey: "statuses",
    url: "http://localhost:5001/statuses",
  })

  const defaultStatus = useMemoIf(!!statusInfo.data, () => statusInfo.data![0])

  return { ...statusInfo, defaultStatus, isReady: defaultStatus && statusInfo.data }
}
