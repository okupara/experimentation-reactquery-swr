import * as React from "react"
// import { useClickable, UseClickableProps } from "@chakra-ui/clickable"
import { chakra } from "@chakra-ui/system"
// import { SafeMerge } from "@chakra-ui/utils"

// export type ClickableProps = SafeMerge<
//   UseClickableProps,
//   PropsWithAs<typeof chakra.button, {}>
// >
// const Clickable: React.FC<ClickableProps> = forwardRef((props, ref) => {
//   const clickable = useClickable({ ...props, ref })
//   return <chakra.button display="inline-flex" {...clickable} />
// })

type Props = {
  onClick?: () => void
}

const Component: React.FC<Props> = (props) => {
  const { onClick } = props
  return (
    <chakra.div
      onClick={onClick}
      cursor="pointer"
      overflow="hidden"
      w="100%"
      h="100%"
    >
      {props.children}
    </chakra.div>
  )
}

export const Clickable = React.memo(Component) as typeof Component
