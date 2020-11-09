import * as React from "react"
import { VStack, Text, Box, Flex, Badge } from "@chakra-ui/core"
import { Header } from "../../components/Header"
import { useTaskWithRq, UseTaskWithRQProps } from "./useTasksWithRq"
import { preFetch } from "./useTaskDetail"
import { BadgeBox } from "../../components/BadgeBox"
import { TaskDrawer } from "../../layouts/Tasks/TaskDrawer"
import { TaskDetail } from "../../layouts/Tasks/TaskDetail"
import { useRouter } from "next/router"
import * as Item from "./TaskListItem"
import {
  InlineEdit,
  InlineEditUneditable,
  InlineEditHoverArea,
  InlineEditEditable,
  InlineEditHovering,
} from "../../components/InlineEdit"

function Component(props: UseTaskWithRQProps) {
  const { isLoading, data, isDetailOpen, selectedId, editingState } = useTaskWithRq(
    props,
  )

  return (
    <>
      <Header />
      <Box pt={24}>
        {isLoading && <Text>Loading...</Text>}
        {!isLoading && (
          <VStack maxWidth="800px" alignItems="flex-start" m="0 auto" w="80%">
            {data?.map((item) => (
              <Flex key={item.id.value} w="100%" justifyContent="space-between">
                <InlineEdit>
                  <InlineEditUneditable>
                    <React.Fragment>
                      <Item.Clickable id={item.id.value}>
                        <Item.Title title={item.title} />
                      </Item.Clickable>
                      <InlineEditHovering>
                        <div>hoger</div>
                      </InlineEditHovering>
                      <Box>
                        {item.status && (
                          <Item.Status
                            title={item.status.title}
                            color={item.status.color}
                          />
                        )}
                      </Box>
                    </React.Fragment>
                  </InlineEditUneditable>
                  <InlineEditEditable>
                    <Item.Clickable id={item.id.value}>
                      <Item.Title title={item.title} />
                    </Item.Clickable>
                    <Box>
                      {item.status && (
                        <Item.Status
                          title={item.status.title}
                          color={item.status.color}
                        />
                      )}
                    </Box>
                  </InlineEditEditable>
                </InlineEdit>
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

// type ClickableFlexProps = {
//   onClick?: () => void
//   onMouseEnter?: () => void
// }

// const ClickableFlex: React.FC<ClickableFlexProps> = ({
//   children,
//   onClick,
//   onMouseEnter,
// }) => (
//   <Flex
//     alignItems="center"
//     overflow="hidden"
//     width="100%"
//     cursor="pointer"
//     onClick={onClick}
//     onMouseEnter={onMouseEnter}
//   >
//     {children}
//   </Flex>
// )

// type RowProps = {
//   id: string
// }
// const Row: React.FC<RowProps> = ({ id, children }) => {
//   const router = useRouter()
//   const onClick = React.useCallback(() => {
//     router.push(`/rq/?id=${id}`)
//   }, [])
//   const onMouseEnter = React.useCallback(() => {
//     preFetch(id)
//   }, [])
//   return (
//     <ClickableFlex onMouseEnter={onMouseEnter} onClick={onClick}>
//       {children}
//     </ClickableFlex>
//   )
// }

export const RqTasks = React.memo(Component)
