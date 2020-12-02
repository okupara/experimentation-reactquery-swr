import * as React from "react"
import { Flex, Box } from "@chakra-ui/layout"
import { Input } from "@chakra-ui/input"
import { Button } from "@chakra-ui/button"
import {
  usePokemonSearchForm,
  UsePokemonSearchFormProps,
} from "./usePokemonSearchForm"

type Props = UsePokemonSearchFormProps
const Component = (props: Props) => {
  const { word, setWord, onClickSearch } = usePokemonSearchForm(props)
  return (
    <Flex>
      <Box>
        <Input
          w="md"
          value={word}
          onChange={(e) => setWord(e.currentTarget.value)}
          placeholder="Put a name of pokemon"
        />
      </Box>
      <Box pl={3}>
        <Button onClick={onClickSearch}>Search</Button>
      </Box>
    </Flex>
  )
}

export const PokemonSearchForm = React.memo(Component)
