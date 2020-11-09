import * as React from "react"
import { useBoolean } from "@chakra-ui/hooks"

export type UseInlineEditProps = {
  isEditing?: boolean
  isHovering?: boolean
}

export type InlineEditState = ReturnType<typeof useInlineEdit>

export function useInlineEdit(props?: UseInlineEditProps) {
  const isHovering = props?.isHovering ?? false
  const isEditing = props?.isEditing ?? false

  return {
    isEditing,
    isHovering,
  }
}
