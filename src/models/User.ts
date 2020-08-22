import type { Id } from "./Id"
export type Model = {
  id: Id<"user", string>
  name: string
  email: string
}
