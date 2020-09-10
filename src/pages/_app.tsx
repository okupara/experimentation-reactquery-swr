import { ChakraProvider } from "@chakra-ui/core"
import theme from "@chakra-ui/theme"
import { ReactQueryDevtools } from "react-query-devtools"
import type { AppProps } from "next/app"

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </ChakraProvider>
  )
}

export default App
