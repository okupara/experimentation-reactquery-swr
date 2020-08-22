import * as React from "react"
import { VStack, Text, Box } from "@chakra-ui/core"
import { Header } from "../../components/Header"
import { useRqTasks } from "./useRqTasks"

function Component() {
  const { isLoading, data } = useRqTasks()
  return (
    <>
      <Header />
      <Box pt={24}>
        {isLoading && <Text>Loading...</Text>}
        {!isLoading && (
          <VStack>
            {data.map((item) => (
              <Box>{item.title}</Box>
            ))}
          </VStack>
        )}
      </Box>
    </>
  )
}

export const RqTasks = React.memo(Component)
