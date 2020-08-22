import type { Id } from "./Id"
import type { Model as UserModel } from "./User"
import type { Model as StatusModel } from "./Status"

export type Model = {
  id: Id<"task", string>
  title: string
  description: string
  // status: StatusModel["id"]
  // assignees: ReadonlyArray<UserModel>
}
