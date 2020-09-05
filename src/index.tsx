/* istanbul ignore file */
import {
  generateCreateQuote,
  // mockCreateQuote,
} from 'src/api/createQuote'
import {
  generateUpdateQuote,
  // mockUpdateQuote,
} from 'src/api/updateQuote'
import { Dependencies, main } from 'src/main/main'

const dependencies: Dependencies = {
  container: document.getElementById('container'),
  // onChange: mockUpdateQuote,
  onChange: generateUpdateQuote({
    fetchClient: window.fetch.bind(window),
    getUrl: (quoteId: string): string =>
      `https://fed-challenge-api.sure.now.sh/api/v1/quotes/${quoteId}`,
  }),
  // onSubmit: mockCreateQuote,
  onSubmit: generateCreateQuote({
    fetchClient: window.fetch.bind(window),
    getUrl: (): string => 'https://fed-challenge-api.sure.now.sh/api/v1/quotes',
  }),
}

main(dependencies)
