import { useQuery } from "react-query"
import * as Task from "../../models/Task"
import * as User from "../../models/User"
import * as Status from "../../models/Status"
import { useFetchUsers } from "../../hooks/useRqUser"
import { useFetchStatuses } from "../../hooks/useRqStatuses"

export type TaskDetailUser = Pick<User.Model, "id" | "name">
export type TaskDetail = Task.Model<TaskDetailUser, Status.Model>

export function useTaskDetail(id: string) {
  const { getRecordById: getUserById, collectUsers } = useFetchUsers()
  const { getRecordById: getStatusById } = useFetchStatuses()

  const taskQueryInfo = useQuery(["task", id], () =>
    new Promise((res) => setTimeout(res, 1000))
      .then(() => fetch(`http://localhost:5001/tasks/${id}`))
      .then<Task.JSONModel>((r) => r.json())
      .then<TaskDetail>((data) => {
        const status = getStatusById(data.status)
        const assignees = collectUsers(data.assignees)

        return {
          id: Task.Id(data.id),
          title: data.title,
          description: data.description,
          status: status ? { ...status, id: Status.Id(status.id) } : null,
          assignees: assignees.map((u) => ({ ...u, id: User.Id(u.id) })),
        }
      }),
  )
  return taskQueryInfo
}
