import * as React from "react"
import { VStack, Text, Box, Flex, Badge } from "@chakra-ui/core"
import { Header } from "../../components/Header"
import { useTaskWithRq } from "./useTasksWithRq"
import { BadgeBox } from "../../components/BadgeBox"
import { Clickable } from "../../components/Clickable"

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
              <Flex key={item.id.value} w="100%" justifyContent="space-between">
                <ClickableFlex
                  onClick={() => {
                    console.log(item.id.value)
                  }}
                >
                  <Text
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                  >
                    {item.title}
                  </Text>
                </ClickableFlex>
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

type ClickableFlexProps = { onClick?: () => void }
const ClickableFlex: React.FC<ClickableFlexProps> = ({ children, onClick }) => (
  <Flex
    alignItems="center"
    overflow="hidden"
    width="100%"
    cursor="pointer"
    onClick={onClick}
  >
    {children}
  </Flex>
)

export const RqTasks = React.memo(Component)
