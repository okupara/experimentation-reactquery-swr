import type { IdType, StringIdType } from "./Id"

export type Id = IdType<"user", string>
export function Id(value: string): Id {
  return { type: "user", value }
}

export type Model = {
  id: Id
  name: string
  email: string
}

export type JSONModel = Omit<Model, "id"> & StringIdType
