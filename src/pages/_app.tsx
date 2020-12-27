import { useRef } from "react"
import { ChakraProvider } from "@chakra-ui/core"
import theme from "@chakra-ui/theme"
import { ReactQueryDevtools } from "react-query-devtools"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"

function App({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }
  console.log("console", queryClientRef)
  return (
    <ChakraProvider theme={theme} resetCSS>
      <QueryClientProvider client={new QueryClient()}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
