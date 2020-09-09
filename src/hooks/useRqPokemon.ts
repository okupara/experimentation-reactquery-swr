import { useQuery } from "react-query"

type UseRqProps = {
  cacheKey: string
}
export function useRqPokemon(props: UseRqProps) {
  const queryInfo = useQuery<any, Error>(
    props.cacheKey,
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // if (true) {
      //   throw new Error("error")
      // }
      return fetch("https://pokeapi.co/api/v2/pokemon")
        .then((r) => r.json())
        .then((r) => r.results)
        .catch((err) => console.error(err))
    },
    // {
    //   refetchOnWindowFocus: false,
    // },
    // {
    //   staleTime: 8000,
    // },
    // {
    //   cacheTime: 0,
    // },
  )
  return queryInfo
}

export function useRqBerries(props: UseRqProps) {
  return useQuery<any, Error>(props.cacheKey, async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return fetch("https://pokeapi.co/api/v2/berry")
      .then((r) => r.json())
      .then((r) => r.results)
      .catch((err) => console.error(err))
  })
}

type UseSearchPokemonProps = { pokemon: string }
export function useSearchPokemon({ pokemon }: UseSearchPokemonProps) {
  const r = useQuery<any, Error>(
    ["search-pokemon", pokemon],
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    () => cancelableFetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`),
    {
      enabled: pokemon,
      retry: 2,
      retryDelay: 1000,
    },
  )
  console.log("test", r)
  return r
}

type FetchType = typeof fetch
interface ReactQueryPromise extends Promise<Response> {
  cancel?: () => void
}
export const cancelableFetch: FetchType = <T extends any>(url, option) => {
  const controller = new AbortController()
  const signal = controller.signal
  const newOption: typeof option = { ...option, signal }
  const promise = new Promise((res) => setTimeout(res, 1000))
    .then(() => fetch(url, newOption))
    .then<T>((r) => r.json()) as ReactQueryPromise
  promise.cancel = () => {
    console.log("cancel")
    controller.abort()
  }
  return promise as Promise<T>
}
