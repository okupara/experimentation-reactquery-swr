import { useQuery } from "react-query"
import * as PokemonModel from "./model"

export type UsePokemonContentProps = {
  searchWord: string
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const usePokemonContent = ({ searchWord }: UsePokemonContentProps) => {
  const { isLoading, isError, data, error } = useQuery(
    ["pokemonContent", searchWord],
    () =>
      delay(2000)
        .then(() => fetch(`https://pokeapi.co/api/v2/pokemon/${searchWord}`))
        .then((res) => {
          if (!res.ok) {
            throw `${res.status}`
          }
          return res.json()
        })
        .then((json) => PokemonModel.fromJson(json)),
    {
      retry: 0,
      //   cacheTime: 0, // cacheなし
    },
  )
  console.log("debug", data)

  return {
    isLoading,
    isError,
    data,
    error,
  }
}
