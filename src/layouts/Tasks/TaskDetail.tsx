import * as React from "react"
import { useTaskDetail } from "./useTaskDetail"
import { Box } from "@chakra-ui/core"

type Props = {
  id: string
}

function Component({ id }: Props) {
  const { data, isLoading } = useTaskDetail(id)
  if (!data || isLoading) {
    return <Box>Loading...</Box>
  }

  return <Box>{data.title}</Box>
}

export const TaskDetail = React.memo(Component)
