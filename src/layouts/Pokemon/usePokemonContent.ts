import { useQuery } from "react-query"
import * as PokemonModel from "./model"

export type UsePokemonContentProps = {
  searchWord: string
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const usePokemonContent = ({ searchWord }: UsePokemonContentProps) => {
  const { isLoading, isError, data, error } = useQuery(
    ["pokemonContent", searchWord],
    async () => {
      await delay(2000)
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchWord}`)
      if (!res.ok) {
        throw `${res.status}`
      }
      const jsonObj = await res.json()
      return PokemonModel.fromJson(jsonObj)
    },
    {
      //   staleTime: 1000,
      //   cacheTime: 3000,
      retry: 0,
      //   refetchOnWindowFocus: true,
      //   staleTime: Infinity,
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
