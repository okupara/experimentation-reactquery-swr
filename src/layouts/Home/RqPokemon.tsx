import * as React from "react"
import { VStack } from "@chakra-ui/core"
import { chakra } from "@chakra-ui/system"
import { Button } from "@chakra-ui/button"
import { Input } from "@chakra-ui/input"
import { ReactQueryDevtools } from "react-query-devtools"
import {
  useRqPokemon,
  useRqBerries,
  useSearchPokemon,
} from "../../hooks/useRqPokemon"

type Props = { cacheKey: string }
function RqPokemonList(props: Props) {
  const queryInfo = useRqPokemon({ cacheKey: props.cacheKey })

  console.log(queryInfo)
  return queryInfo.isLoading ? (
    <chakra.div>Loading...</chakra.div>
  ) : queryInfo.isError ? (
    <chakra.div>{queryInfo.error.message}</chakra.div>
  ) : (
    <VStack>
      {queryInfo.data.map((item) => (
        <chakra.div key={item.name}>{item.name}</chakra.div>
      ))}
      {queryInfo.isFetching && <chakra.div>fetching...</chakra.div>}
    </VStack>
  )
}

function RqBerries(props: Props) {
  const queryInfo = useRqBerries({ cacheKey: props.cacheKey })
  return queryInfo.isLoading ? (
    <chakra.div>Loading...</chakra.div>
  ) : queryInfo.isError ? (
    <chakra.div>{queryInfo.error.message}</chakra.div>
  ) : (
    <VStack>
      {queryInfo.data.map((item) => (
        <chakra.div key={item.name}>{item.name}</chakra.div>
      ))}
      {queryInfo.isFetching && <chakra.div>fetching...</chakra.div>}
    </VStack>
  )
}

function PokemonCount(props: Props) {
  const queryInfo = useRqPokemon({ cacheKey: props.cacheKey })

  return <chakra.div>You are looking at {queryInfo.data?.length} pokemon</chakra.div>
}

export function RqPokemonApp() {
  const [show, dispatchFlag] = React.useReducer((flag) => !flag, true)

  return (
    <chakra.div px={4} py={6}>
      <chakra.div my={4}>
        <Button onClick={dispatchFlag}>{show ? "hide" : "show"}</Button>
      </chakra.div>
      {show && (
        <>
          <PokemonCount cacheKey="pokemon1" />
          <RqPokemonList cacheKey="pokemon1" />
          {/* <RqBerries cacheKey="berries1" /> */}
          {/* <RqPokemonList cacheKey="pokemon1" /> */}
        </>
      )}
      <ReactQueryDevtools />
    </chakra.div>
  )
}
