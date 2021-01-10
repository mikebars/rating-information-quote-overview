import * as React from 'react'
import * as ReactDOM from 'react-dom'

import type { CreateQuote } from 'src/api/createQuote'
import type { UpdateQuote } from 'src/api/updateQuote'
import { App } from 'src/App/App'
import { GlobalStyle } from 'src/styles/GlobalStyle'

export type Dependencies = {
  container: HTMLElement | null
  onChange: UpdateQuote
  onSubmit: CreateQuote
}

export type Main = (dependencies: Dependencies) => void

export const main: Main = (dependencies: Dependencies): void => {
  const handleChange: UpdateQuote = dependencies.onChange

  const handleSubmit: CreateQuote = dependencies.onSubmit

  const element: React.ReactElement = (
    <React.StrictMode>
      <GlobalStyle />

      <App onChange={handleChange} onSubmit={handleSubmit} />
    </React.StrictMode>
  )

  ReactDOM.render(element, dependencies.container)
}
