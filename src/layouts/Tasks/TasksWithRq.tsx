import * as React from "react"
import { VStack, Text, Box, Flex, Badge } from "@chakra-ui/core"
import { Header } from "../../components/Header"
import { useTaskWithRq } from "./useTasksWithRq"

function Component() {
  const { isLoading, data } = useTaskWithRq()
  return (
    <>
      <Header />
      <Box pt={24}>
        {isLoading && <Text>Loading...</Text>}
        {!isLoading && (
          <VStack maxWidth="800px">
            {data.map((item) => (
              <Flex>
                <Text>{item.title}</Text>
                <Box>
                  <Badge></Badge>
                </Box>
              </Flex>
            ))}
          </VStack>
        )}
      </Box>
    </>
  )
}

export const RqTasks = React.memo(Component)
