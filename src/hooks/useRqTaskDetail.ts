import * as React from "react"
import * as Nullable from "../utilities/Nullable"
import { useQuery } from "react-query"
import { useFetchUsers } from "./useRqUser"
import { useFetchStatuses } from "./useRqStatuses"
import * as Task from "../models/Task"
import * as Status from "../models/Status"
import * as User from "../models/User"

type TaskModel = Task.Model<User.Model, Status.Model>

export function useRqTaskDetail(id: string) {
  const { getRecordById: getUserById, ...userInfo } = useFetchUsers()
  const { getRecordById: getStatusById, ...statusInfo } = useFetchStatuses()

  const taskDetailInfo = useQuery(["task", id], () =>
    fetch(`/task/${id}`).then<Task.JSONModel>((r) => r.json()),
  )

  React.useMemo<TaskModel | null>(() => {
    if (!userInfo.data || !taskDetailInfo.data || !statusInfo.data) {
      return null
    }
    const { data: taskData } = taskDetailInfo
    const assignees = taskDetailInfo.data.assignees.reduce<readonly User.Model[]>(
      (p, c) => {
        const userJSON = getUserById(c)
        if (!userJSON) return p
        const user: User.Model = {
          id: User.Id(userJSON.id),
          email: userJSON.email,
          name: userJSON.name,
        }
        return [...p, user]
      },
      [],
    )

    const status = Nullable.map<Status.JSONModel, Status.Model>(
      getStatusById(taskDetailInfo.data.status),
      (json) => ({
        id: Status.Id(json.id),
        title: json.title,
        color: json.color,
      }),
    )

    return {
      id: Task.Id(taskData.id),
      title: taskData.title,
      description: taskData.description,
      status,
      assignees,
    }
  }, [userInfo.data, taskDetailInfo.data])
}
