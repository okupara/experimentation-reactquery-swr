import * as React from "react"
import { useSearchPokemon } from "../../hooks/useRqPokemon"
import { Input } from "@chakra-ui/input"
import { chakra } from "@chakra-ui/system"
import { ReactQueryDevtools } from "react-query-devtools"

export function RqSearchPokemon() {
  const [pokemon, setPokemon] = React.useState("")
  const queryInfo = useSearchPokemon({ pokemon })
  console.log(queryInfo)

  return (
    <chakra.div p={4}>
      <Input onChange={(e) => setPokemon(e.target.value)} />
      {queryInfo.data?.sprites?.front_default ? (
        <img src={queryInfo.data.sprites.front_default} />
      ) : queryInfo.isLoading ? (
        "Loading..."
      ) : (
        `${pokemon} not found`
      )}
      <ReactQueryDevtools />
    </chakra.div>
  )
}
