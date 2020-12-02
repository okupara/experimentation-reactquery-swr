import * as React from "react"

export type UsePokemonSearchFormProps = {
  onClickSearch: (word: string) => void
}

export const usePokemonSearchForm = (props: UsePokemonSearchFormProps) => {
  const [word, setWord] = React.useState("")

  const onClickSearch = () => {
    props.onClickSearch(word)
  }

  return {
    word,
    setWord,
    onClickSearch,
  }
}
