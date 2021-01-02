import * as React from "react"
import {
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
} from "@chakra-ui/react"
import { useRouter } from "next/router"

type Props = {
  isOpen: boolean
  children: React.ReactNode
}

function Component({ isOpen, children }: Props) {
  const router = useRouter()
  const onClose = React.useCallback(() => {
    router.push("/rq")
  }, [])
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      {/* <DrawerOverlay /> */}
      <DrawerContent pt={10} zIndex={100} maxW="30rem">
        <DrawerCloseButton />
        <DrawerBody>
          {/* <Flex flexDir="column">
            <Box>
              <Heading as="h3">{props.title}</Heading>
            </Box>
            <Box>
              <Text></Text>
            </Box>
          </Flex> */}
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export const TaskDrawer = React.memo(Component)
