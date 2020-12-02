import * as React from "react"
import { Box } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/image"
import { usePokemonContent, UsePokemonContentProps } from "./usePokemonContent"

type Props = UsePokemonContentProps

const Component = (props: Props) => {
  const { isLoading, data, isError, error } = usePokemonContent(props)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError && error) {
    return (
      <div>
        Error!!!!! {error === "404" && "There are no characters named that."}
      </div>
    )
  }

  return data ? (
    <Box>
      <Image boxSize="200px" src={data.imageUrl} />
    </Box>
  ) : null
}

export const PokemonContent = React.memo(Component)
