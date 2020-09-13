import * as React from "react"
import { VStack, Text, Box, Flex, Badge } from "@chakra-ui/core"
import { Header } from "../../components/Header"
import { useTaskWithRq } from "./useTasksWithRq"
import { BadgeBox } from "../../components/BadgeBox"

function Component() {
  const { isLoading, data } = useTaskWithRq()
  console.log(data)
  return (
    <>
      <Header />
      <Box pt={24}>
        {isLoading && <Text>Loading...</Text>}
        {!isLoading && (
          <VStack maxWidth="800px" alignItems="flex-start" m="0 auto" w="80%">
            {data?.map((item) => (
              <Flex
                key={item.id.value}
                w="100%"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
                  {item.title}
                </Text>
                <Box>
                  <BadgeBox colorScheme={item.status.color} w={32} py={2}>
                    {item.status.title}
                  </BadgeBox>
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
