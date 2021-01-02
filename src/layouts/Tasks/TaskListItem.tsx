import * as React from "react"
import { useQueryClient } from "react-query"
import { Text, Flex } from "@chakra-ui/react"
import { BadgeBox } from "../../components/BadgeBox"
import { useRouter } from "next/router"

type TitleComponentProps = {
  title: string
}
function TitleComponent({ title }: TitleComponentProps) {
  return (
    <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
      {title}
    </Text>
  )
}
export const Title = React.memo(TitleComponent)

type StatusComponentProps = {
  color: string
  title: string
}
function StatusComponent({ color, title }: StatusComponentProps) {
  return (
    <BadgeBox colorScheme={color} w={23} py={2}>
      {title}
    </BadgeBox>
  )
}

export const Status = React.memo(StatusComponent)

type InteractiveAreaComponentProps = {
  id: string
  children: React.ReactNode
}
function ClickableComponent({ id, children }: InteractiveAreaComponentProps) {
  const router = useRouter()
  const onClick = React.useCallback(() => {
    router.push(`/rq/?id=${id}`)
  }, [])
  const onMouseEnter = React.useCallback(() => {}, [])
  return (
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
}

export const Clickable = React.memo(ClickableComponent)
