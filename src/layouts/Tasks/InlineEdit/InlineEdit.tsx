import * as React from "react"
import { createContext } from "../../../utilities/createContext"
import { useInlineEdit, InlineEditState } from "./useInlineEdit"

const [InlineEditProvider, useInlineEditContext, Context] = createContext<
  InlineEditState
>()

const ccc = React.createContext(undefined)
type Props = {
  children: React.ReactNode
}

export function InlineEdit({ children }: Props) {
  const inlineEditValue = useInlineEdit()
  return <InlineEditProvider value={inlineEditValue}>{children}</InlineEditProvider>
}

export function Hovering(props: any) {
  const contextValue = useInlineEditContext()
  if (contextValue.isEditing || !contextValue.isHovering) {
    return null
  }
}

export function Editable() {
  const contextValue = useInlineEditContext()
  if (!contextValue.isEditing) {
    return null
  }
}

export function UnEditable() {
  const contextValue = useInlineEditContext()
  if (contextValue.isEditing) {
    return null
  }
}
