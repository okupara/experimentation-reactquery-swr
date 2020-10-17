import * as React from "react"
import { useTaskDetail } from "./useTaskDetail"
import { Box, Text, VStack, Flex } from "@chakra-ui/core"
import { BadgeBox } from "../../components/BadgeBox"
import { Button } from "@chakra-ui/button"

type Props = {
  id: string
}

function Component({ id }: Props) {
  const { data, isLoading } = useTaskDetail(id)
  if (!data || isLoading) {
    return <Box>Loading...</Box>
  }

  return (
    <VStack>
      {data.status && (
        <Flex w="100%" justifyContent="space-between">
          <Box>
            <BadgeBox w={32} py={2} colorScheme={data.status?.color}>
              {data.status?.title}
            </BadgeBox>
          </Box>
          <Box>
            <Button>Edit</Button>
          </Box>
        </Flex>
      )}
      <Box pt={5}>
        <Text fontSize="xl" fontWeight="bold">
          {data.title}
        </Text>
      </Box>
      <Box pt={4}>
        <Text>{data.description}</Text>
      </Box>
    </VStack>
  )
}

export const TaskDetail = React.memo(Component)
