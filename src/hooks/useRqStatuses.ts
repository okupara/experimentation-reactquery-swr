import { useRqFetchMaster } from "./useRqFetchMaster"
import { JSONModel } from "../models/Status"

export function useFetchStatuses() {
  return useRqFetchMaster<JSONModel>({
    cacheKey: "statuses",
    url: "http://localhost:5001/statuses",
  })
}
