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
