import * as React from "react"
import { Flex, Text } from "@chakra-ui/core"

type Props = {
  children?: React.ReactNode
}

export function Header({ children }: Props) {
  return (
    <Flex
      as="header"
      height="16"
      px="4"
      py="2"
      borderBottom="1px"
      borderColor="gray.500"
      justify="space-between"
      shadow="sm"
      position="fixed"
      top={0}
      left={0}
      width="100%"
      backgroundColor="pink.500"
      alignItems="center"
      zIndex={2}
      color="whitesmoke"
      // boxShadow="0 1px 0 0 rgba(66,118,146,.1), 0 2px 6px 0 rgba(66,118,146,.1)"
    >
      <Flex>
        <Text fontWeight="bold" fontSize="xl">
          Saturday.com
        </Text>
      </Flex>
    </Flex>
  )
}
