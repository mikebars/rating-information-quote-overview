import * as ReactTestingLibrary from '@testing-library/react'
import * as ReactDOM from 'react-dom'

import { mockCreateQuote } from 'src/api/createQuote'
import { mockUpdateQuote } from 'src/api/updateQuote'
import { Dependencies, main } from 'src/main/main'

describe('main', (): void => {
  it('main - integration test', (): void => {
    expect.hasAssertions()

    ReactTestingLibrary.act((): void => {
      const dependencies: Dependencies = {
        container: document.createElement('div'),
        onChange: mockUpdateQuote,
        onSubmit: mockCreateQuote,
      }

      expect((): void => {
        main(dependencies)
      }).not.toThrow()

      if (dependencies.container !== null) {
        ReactDOM.unmountComponentAtNode(dependencies.container)
      }
    })
  })
})
