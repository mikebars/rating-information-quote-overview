import * as ReactTestingLibrary from '@testing-library/react'

import { GlobalStyle } from 'src/styles/GlobalStyle'

describe('globalStyle', (): void => {
  it('globalStyle - snapshot test', (): void => {
    expect.hasAssertions()

    const renderResult: ReactTestingLibrary.RenderResult = ReactTestingLibrary.render(
      <GlobalStyle />,
    )

    expect(renderResult.asFragment()).toMatchInlineSnapshot(
      `<DocumentFragment />`,
    )
  })
})
