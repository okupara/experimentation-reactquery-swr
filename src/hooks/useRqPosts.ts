import * as React from "react"
import { useQuery, queryCache } from "react-query"

const CacheKeyPosts = "posts"
const CacheKeyPost = "post"

//----pushing type cache
export function usePosts() {
  return useQuery(CacheKeyPosts, async () => {
    await new Promise((res) => setTimeout(res, 1000))
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const json: any[] = await response.json()
    json.forEach((item) => queryCache.setQueryData([CacheKeyPost, item.id], item))
    return json
  })
}

async function fetchPost(id: string) {
  await new Promise((res) => setTimeout(res, 1000))
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const json = await response.json()
  return json
}

export function usePost(id: string) {
  const [count, increment] = React.useReducer((s) => s + 1, 0)
  const cachedFetch = React.useCallback(() => fetchPost(id), [id])

  const info = useQuery([CacheKeyPost, Number(id)], cachedFetch, {
    refetchInterval: 8000,
    refetchIntervalInBackground: true,
    onSuccess: () => increment(),
    onError: (err) => console.error(err),
  })
  return { ...info, count }
}

//---- pulling type cache
// export function usePosts() {
//   return useQuery("posts", () =>
//     new Promise((res) => setTimeout(res, 1000))
//       .then(() => fetch("https://jsonplaceholder.typicode.com/posts"))
//       .then((r) => r.json()),
//   )
// }

// export function usePost(id: string) {
//   return useQuery(
//     ["post", id],
//     () =>
//       new Promise((res) => setTimeout(res, 1000))
//         .then(() => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`))
//         .then((r) => r.json()),
//     {
//       initialData: () =>
//         queryCache
//           .getQueryData<readonly any[]>("posts")
//           ?.find((post) => post.id === Number(id)),
//       initialStale: true,
//     },
//   )
// }
