import * as React from "react"
import { useQuery, QueryClient, useQueryClient } from "react-query"
import * as Task from "../../models/Task"
import * as User from "../../models/User"
import * as Status from "../../models/Status"
import { useFetchUsers, usePrefetchUsers } from "../../hooks/useRqUser"
import { useFetchStatuses, usePrefetchStatuses } from "../../hooks/useRqStatuses"

export type TaskDetailUser = Pick<User.Model, "id" | "name">
export type TaskDetail = Task.Model<TaskDetailUser, Status.Model>

const createFetchTaskDetail = (id: string) => ({
  key: ["task", id],
  fetcher: () =>
    fetch(`http://localhost:5001/tasks/${id}`).then<Task.JSONModel>((r) => r.json()),
})

export function useTaskDetail(id: string) {
  const {
    getRecordById: getUserById,
    data: userData,
    collectUsers,
  } = useFetchUsers()
  const { getRecordById: getStatusById, data: statusData } = useFetchStatuses()

  const taskQueryInfo = useQuery(["task", id], () =>
    new Promise((res) => setTimeout(res, 1000))
      .then(() => fetch(`http://localhost:5001/tasks/${id}`))
      .then<Task.JSONModel>((r) => r.json()),
  )

  const taskDetail = React.useMemo<TaskDetail | null>(() => {
    const { data } = taskQueryInfo
    if (!data || !userData || !statusData) {
      return null
    }

    const status = getStatusById(data.status)
    const assignees = collectUsers(data.assignees)

    return {
      id: Task.Id(data.id),
      title: data.title,
      description: data.description,
      status: status ? { ...status, id: Status.Id(status.id) } : null,
      assignees: assignees.map((u) => ({ ...u, id: User.Id(u.id) })),
    }
  }, [taskQueryInfo.data, userData, statusData])

  return { ...taskQueryInfo, taskDetail }
}

export const usePrefetch = () => {
  const client = useQueryClient()
  const { prefetch: prefetchUsers } = usePrefetchUsers()
  const { prefetch: prefetchStatuses } = usePrefetchStatuses()

  const prefetch = React.useCallback((id: string) => {
    prefetchUsers()
    prefetchStatuses()
    const taskDetail = createFetchTaskDetail(id)
    client.prefetchQuery(taskDetail.key, taskDetail.fetcher)
  }, [])
  return { prefetch }
}
