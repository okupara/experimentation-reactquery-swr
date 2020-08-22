import { useQuery } from "react-query"
import type { Model } from "../../models/Task"

export type ReturnUseRqTasks = ReturnType<typeof useRqTasks>
export function useRqTasks() {
  const { isLoading, data } = useQuery<ReadonlyArray<Model>>("rqTasks", () =>
    fetch("http://localhost:5001/tasks").then((res) => res.json()),
  )

  return {
    isLoading,
    data,
  }
}
