import { useFetchTasks } from "../../hooks/useRqTasks"
import { useFetchStatuses } from "../../hooks/useRqStatuses"
import { useFetchUsers } from "../../hooks/useRqUser"
import { useMemoIf } from "../../hooks/useMemoIf"
import * as Status from "../../models/Status"
import * as User from "../../models/User"
import * as Task from "../../models/Task"

type TaskStatus = Pick<Status.Model, "id" | "title">
type TaskUser = Pick<User.Model, "id" | "name">
export type TaskModel = Omit<Task.Model<TaskUser, TaskStatus>, "description">

export type ReturnUseTasksWithRq = ReturnType<typeof useTaskWithRq>
export function useTaskWithRq() {
  const { isLoading: isTasksLoading, data: tasks } = useFetchTasks()
  const {
    isLoading: isStatusesLoading,
    data: statuses,
    getRecordById: getStatusById,
  } = useFetchStatuses()
  const {
    isLoading: isUserLoading,
    data: users,
    getRecordById: getUserById,
  } = useFetchUsers()

  // To use Promise.All and cache them in one place would be better, but you know, it's a experimentation.
  const isLoading = isTasksLoading || isStatusesLoading || isUserLoading

  const mergedData = useMemoIf<ReadonlyArray<TaskModel>>(isLoading === false, () =>
    tasks.map<TaskModel>((item) => {
      const status = getStatusById(item.status)
      return {
        id: Task.Id(item.id),
        title: item.title,
        assignees: item.assignees.map((id) => {
          const user = getUserById(id)
          return {
            id: User.Id(user.id),
            name: user.name,
          }
        }),
        status: { id: Status.Id(status.id), title: status.title },
      }
    }),
  )

  return {
    isLoading,
    data: mergedData,
  }
}
function taskStatusFromJson(json: Status.JSONModel): TaskStatus {
  const { id, ...rest } = json
  return {
    id: Status.Id(id),
    ...rest,
  }
}

function taskUserFromJson(json: User.JSONModel): TaskUser {
  const { id, ...rest } = json
  return {
    id: User.Id(id),
    ...rest,
  }
}
