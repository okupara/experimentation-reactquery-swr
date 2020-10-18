import * as React from "react"
import { useTaskDetail } from "./useTaskDetail"
import { Box, Text, VStack, Flex } from "@chakra-ui/core"
import { BadgeBox } from "../../components/BadgeBox"
import { Button } from "@chakra-ui/button"

type Props = {
  id: string
}

function Component({ id }: Props) {
  const { taskDetail, isLoading } = useTaskDetail(id)
  if (!taskDetail || isLoading) {
    return <Box>Loading...</Box>
  }

  return (
    <VStack>
      {taskDetail.status && (
        <Flex w="100%" justifyContent="space-between">
          <Box>
            <BadgeBox w={32} py={2} colorScheme={taskDetail.status?.color}>
              {taskDetail.status?.title}
            </BadgeBox>
          </Box>
          <Box>
            <Button>Edit</Button>
          </Box>
        </Flex>
      )}
      <Box pt={5}>
        <Text fontSize="xl" fontWeight="bold">
          {taskDetail.title}
        </Text>
      </Box>
      <Box pt={4}>
        <Text>{taskDetail.description}</Text>
      </Box>
    </VStack>
  )
}

export const TaskDetail = React.memo(Component)
