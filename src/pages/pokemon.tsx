import * as React from "react"
import { PokemonContent, PokemonSearchForm } from "../layouts/Pokemon"
import { Box, Flex, Text } from "@chakra-ui/react"

const Hello = () => {
  const [searchWord, setSearchWord] = React.useState("")

  return (
    <Flex p={8} direction="column">
      <Box>
        <PokemonSearchForm onClickSearch={setSearchWord} />
      </Box>
      <Box pt={6}>
        {searchWord !== "" && <PokemonContent searchWord={searchWord} />}
        {searchWord === "" && <Text>Let's search pokemon!!!</Text>}
      </Box>
    </Flex>
  )
}
export default Hello
