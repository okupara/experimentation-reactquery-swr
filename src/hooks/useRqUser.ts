import { useCallback } from "react"
import { useRqFetchMaster, usePrefetchMaster } from "./useRqFetchMaster"
import { JSONModel } from "../models/User"

const CACHE_KEY = "users"
const URL = "http://localhost:5001/users"

export function usePrefetchUsers() {
  return usePrefetchMaster({
    cacheKey: CACHE_KEY,
    url: URL,
    staleTime: 20000,
  })
}

export function useFetchUsers() {
  const userInfo = useRqFetchMaster<JSONModel>({
    cacheKey: CACHE_KEY,
    url: URL,
  })

  const collectUsers = useCallback(
    (ids: readonly string[]) => {
      if (!userInfo.data) return []

      return ids.reduce<readonly JSONModel[]>((p, c) => {
        const u = userInfo.getRecordById(c)
        if (!u) return p
        return [...p, u]
      }, [])
    },
    [userInfo.data],
  )

  return { ...userInfo, collectUsers }
}
