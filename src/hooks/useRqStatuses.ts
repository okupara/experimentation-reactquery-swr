import { useRqFetchMaster } from "./useRqFetchMaster"
import type { JSONModel, Model } from "../models/Status"
import { useMemoIf } from "../hooks/useMemoIf"

export function useFetchStatuses() {
  const statusInfo = useRqFetchMaster<JSONModel>({
    cacheKey: "statuses",
    url: "http://localhost:5001/statuses",
  })

  const defaultStatus = useMemoIf(!!statusInfo.data, () => statusInfo.data![0])

  return { ...statusInfo, defaultStatus, isReady: defaultStatus && statusInfo.data }
}
