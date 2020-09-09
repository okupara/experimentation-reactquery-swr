import { ChakraProvider } from "@chakra-ui/core"
import theme from "@chakra-ui/theme"
function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
