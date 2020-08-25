import { IdType } from "./Id"

export type Model = {
  id: Id
  title: string
}
export type Id = IdType<"status", string>
export function Id(value: string): Id {
  return { type: "status", value }
}

export type JSONModel = Omit<Model, "id"> & { id: string }

export function fromJSON(responseObj: JSONModel): Model {
  const { id, ...rest } = responseObj
  return {
    id: { type: "status", value: id },
    ...rest,
  }
}
