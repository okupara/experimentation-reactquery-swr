import * as React from "react"
import { Header } from "../../components/Header"

function Component() {
  return <Header />
}

export const Home = React.memo(Component)
