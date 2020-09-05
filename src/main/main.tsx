import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { CreateQuote } from 'src/api/createQuote'
import { UpdateQuote } from 'src/api/updateQuote'
import { App } from 'src/App/App'
import { GlobalStyle } from 'src/styles/GlobalStyle'

export type Dependencies = {
  container: HTMLElement | null
  onChange: UpdateQuote
  onSubmit: CreateQuote
}

export type Main = (dependencies: Dependencies) => void

export const main: Main = (dependencies: Dependencies): void => {
  const element: React.ReactElement = (
    <React.StrictMode>
      <GlobalStyle />
      <App onChange={dependencies.onChange} onSubmit={dependencies.onSubmit} />
    </React.StrictMode>
  )

  ReactDOM.render(element, dependencies.container)
}
