import { useFetchTasks } from "../../hooks/useRqTasks"
import { useFetchStatuses } from "../../hooks/useRqStatuses"
import { useFetchUsers } from "../../hooks/useRqUser"
import { useMemoIf } from "../../hooks/useMemoIf"
import * as Status from "../../models/Status"
import * as User from "../../models/User"
import * as Task from "../../models/Task"

type TaskStatus = Pick<Status.Model, "id" | "title" | "color">
type TaskUser = Pick<User.Model, "id" | "name">
export type TaskModel = Omit<Task.Model<TaskUser, TaskStatus>, "description">

export type ReturnUseTasksWithRq = ReturnType<typeof useTaskWithRq>
export function useTaskWithRq() {
  const { isLoading: isTasksLoading, data: tasks } = useFetchTasks()
  const {
    isLoading: isStatusesLoading,
    getRecordById: getStatusById,
    defaultStatus,
    isReady: isStatusReady,
  } = useFetchStatuses()
  const { isLoading: isUserLoading, getRecordById: getUserById } = useFetchUsers()

  // To use Promise.All and cache them in one place would be better, but you know, it's a experimentation.
  const isLoading =
    isTasksLoading || isStatusesLoading || isUserLoading || !isStatusReady

  const mergedData = useMemoIf<ReadonlyArray<TaskModel> | null>(
    isLoading === false,
    () => {
      if (!tasks) return null
      return tasks.map<TaskModel>((item) => {
        const status = getStatusById(item.status) ?? defaultStatus! // for sure
        return {
          id: Task.Id(item.id),
          title: item.title,
          assignees: item.assignees.reduce<readonly TaskUser[]>((p, c) => {
            const user = getUserById(c)
            if (!user) return p
            return [
              ...p,
              {
                id: User.Id(user.id),
                name: user.name,
              },
            ]
          }, [] as readonly TaskUser[]),
          status: {
            id: Status.Id(status.id),
            title: status.title,
            color: status.color,
          },
        }
      })
    },
  )

  return {
    isLoading,
    data: mergedData,
  }
}

type DetermineStatusParams = {
  target: Status.JSONModel | null
  defaultStatus: Status.JSONModel
}
