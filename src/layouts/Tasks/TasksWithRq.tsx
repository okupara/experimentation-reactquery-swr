import * as React from "react"
import { VStack, Text, Box, Flex, Badge } from "@chakra-ui/core"
import { Header } from "../../components/Header"
import { useTaskWithRq, UseTaskWithRQProps } from "./useTasksWithRq"
import { preFetch } from "./useTaskDetail"
import { BadgeBox } from "../../components/BadgeBox"
import { TaskDrawer } from "../../layouts/Tasks/TaskDrawer"
import { TaskDetail } from "../../layouts/Tasks/TaskDetail"
import { useRouter } from "next/router"

function Component(props: UseTaskWithRQProps) {
  const { isLoading, data, isDetailOpen, selectedId } = useTaskWithRq(props)

  return (
    <>
      <Header />
      <Box pt={24}>
        {isLoading && <Text>Loading...</Text>}
        {!isLoading && (
          <VStack maxWidth="800px" alignItems="flex-start" m="0 auto" w="80%">
            {data?.map((item) => (
              <Flex key={item.id.value} w="100%" justifyContent="space-between">
                <Row id={item.id.value}>
                  <Text
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                  >
                    {item.title}
                  </Text>
                </Row>
                <Box>
                  {item.status && (
                    <BadgeBox colorScheme={item.status.color} w={32} py={2}>
                      {item.status.title}
                    </BadgeBox>
                  )}
                </Box>
              </Flex>
            ))}
          </VStack>
        )}
      </Box>
      <TaskDrawer isOpen={isDetailOpen}>
        {selectedId && <TaskDetail id={selectedId as string} />}
      </TaskDrawer>
    </>
  )
}

type ClickableFlexProps = {
  onClick?: () => void
  onMouseEnter?: () => void
}

const ClickableFlex: React.FC<ClickableFlexProps> = ({
  children,
  onClick,
  onMouseEnter,
}) => (
  <Flex
    alignItems="center"
    overflow="hidden"
    width="100%"
    cursor="pointer"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
  >
    {children}
  </Flex>
)

type RowProps = {
  id: string
}
const Row: React.FC<RowProps> = ({ id, children }) => {
  const router = useRouter()
  const onClick = React.useCallback(() => {
    router.push(`/rq/?id=${id}`)
  }, [])
  const onMouseEnter = React.useCallback(() => {
    preFetch(id)
  }, [])
  return (
    <ClickableFlex onMouseEnter={onMouseEnter} onClick={onClick}>
      {children}
    </ClickableFlex>
  )
}

export const RqTasks = React.memo(Component)
