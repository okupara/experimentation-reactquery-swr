import { useQuery, queryCache } from "react-query"

export function usePosts() {
  return useQuery("posts", () =>
    new Promise((res) => setTimeout(res, 1000))
      .then(() => fetch("https://jsonplaceholder.typicode.com/posts"))
      .then((r) => r.json()),
  )
}

export function usePost(id: string) {
  return useQuery(
    ["post", id],
    () =>
      new Promise((res) => setTimeout(res, 1000))
        .then(() => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`))
        .then((r) => r.json()),
    {
      initialData: () =>
        queryCache
          .getQueryData<readonly any[]>("posts")
          ?.find((post) => post.id === Number(id)),
      initialStale: true,
    },
  )
}
