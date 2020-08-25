import { useRqFetchMaster } from "./useRqFetchMaster"
import { JSONModel } from "../models/User"

export function useFetchUsers() {
  return useRqFetchMaster<JSONModel>({
    cacheKey: "users",
    url: "http://localhost:5001/users",
  })
}
