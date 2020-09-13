import * as React from "react"
import { Box } from "@chakra-ui/core"
import { chakra, PropsOf, color } from "@chakra-ui/system"

type Props = PropsOf<typeof chakra.div> & {
  colorScheme: string
}

const Component: React.FC<Props> = (props: Props) => {
  const { colorScheme, children, ...restProps } = props
  const styles = {
    bg: `${colorScheme}.100`,
    color: `${colorScheme}.800`,
  }

  return (
    <Box {...restProps} {...styles} textAlign="center">
      <chakra.div>{children}</chakra.div>
    </Box>
  )
}

export const BadgeBox = React.memo(Component)
