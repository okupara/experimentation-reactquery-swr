import { useCallback } from "react"
import { useRqFetchMaster } from "./useRqFetchMaster"
import { JSONModel } from "../models/User"

export function useFetchUsers() {
  const userInfo = useRqFetchMaster<JSONModel>({
    cacheKey: "users",
    url: "http://localhost:5001/users",
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
