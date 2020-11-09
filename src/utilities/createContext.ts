import * as React from "react"

type CreateContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>]

export function createContext<ContextType>() {
  const Context = React.createContext<ContextType | undefined>(undefined)

  function useContext() {
    const context = React.useContext(Context)
    return context
  }

  return [Context.Provider, useContext, Context] as CreateContextReturn<ContextType>
}
