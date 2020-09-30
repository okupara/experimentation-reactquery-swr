import type { IdType, StringIdType } from "./Id"
import type { Model as User } from "./User"
import type { Model as Status } from "./Status"

type BasicUser = { id: User["id"] }
type BasicStatus = { id: Status["id"] }

export type Id = IdType<"task", string>
export function Id(value: string): Id {
  return { type: "task", value }
}

export type Model<U extends BasicUser, S extends BasicStatus | null> = {
  id: Id
  title: string
  description: string
  status: S | null
  assignees: ReadonlyArray<U>
}

export type JSONModel = Omit<
  Model<BasicUser, BasicStatus>,
  "id" | "statuses" | "assignees"
> &
  StringIdType & {
    status: string
    assignees: ReadonlyArray<string>
  }
