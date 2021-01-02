import * as React from "react"
import { Badge } from "@chakra-ui/react"
import { Model } from "../../models/Status"

type Props = Pick<Model, "color" | "title">

export function StatusBadge({ color, title }: Props) {
  return <Badge color={color}>{title}</Badge>
}
