import { useRqFetchMaster } from "./useRqFetchMaster"
import { JSONModel } from "../models/Task"

export function useFetchTasks() {
  return useRqFetchMaster<JSONModel>({
    cacheKey: "tasks",
    url: "http://localhost:5001/tasks",
  })
}
