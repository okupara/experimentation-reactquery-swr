import * as React from "react"

type Props = {
  condition: boolean
  children: JSX.Element
}
export function If(props: Props) {
  return props.condition ? props.children : null
}
