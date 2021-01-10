import * as ReactTestingLibrary from '@testing-library/react'
import type * as React from 'react'

import { QuoteOverview } from 'src/screens/QuoteOverview/QuoteOverview'
import { defaultQuote } from 'src/screens/QuoteOverview/QuoteOverviewForm'

describe('quoteOverview', (): void => {
  it('quoteOverview - snapshot test', (): void => {
    expect.hasAssertions()

    const renderResult: ReactTestingLibrary.RenderResult = ReactTestingLibrary.render(
      <QuoteOverview onChange={(): void => undefined} quote={defaultQuote} />,
    )

    /* eslint-disable jest/no-large-snapshots */
    expect(renderResult.asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        .c3 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: end;
        -webkit-justify-content: flex-end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        padding: 0.5rem 0;
      }

      .c2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
      }

      .c4 {
        padding: 0 1rem;
      }

      .c5 {
        border: none;
        outline: 1px solid;
      }

      .c0 {
        width: 100%;
        height: 100%;
      }

      .c1 {
        padding: 2rem;
        font-size: 2rem;
        text-align: center;
      }

      .c6 {
        padding: 0.5rem;
        text-align: center;
      }

      <div
          class="c0"
        >
          <header
            class="c1"
          >
            Quote Overview
          </header>
          <form
            class="c2"
            data-testid="quote-overview-form"
            id="quote-overview-form"
          >
            <div
              class="c3"
              data-testid="quote-overview-form-deductible-header"
              id="quote-overview-form-deductible-header"
            >
              <label
                class="c4"
                data-testid="quote-overview-form-deductible-header-label"
                id="quote-overview-form-deductible-header-label"
              >
                Deductible:
              </label>
            </div>
            <div
              class="c3"
              data-testid="quote-overview-form-deductible"
              id="quote-overview-form-deductible"
            >
              <label
                class="c4"
                data-testid="quote-overview-form-deductible-label"
                for="quote-overview-form-deductible-select"
                id="quote-overview-form-deductible-label"
              >
                Select deductible amount:
              </label>
              <select
                class="c5"
                data-testid="quote-overview-form-deductible-select"
                id="quote-overview-form-deductible-select"
              >
                <option
                  class="QuoteOverviewForm__Option-opasjo-3"
                  data-testid="quote-overview-form-deductible-option-500"
                  id="quote-overview-form-deductible-option-500"
                  value="500"
                >
                  500
                </option>
                <option
                  class="QuoteOverviewForm__Option-opasjo-3"
                  data-testid="quote-overview-form-deductible-option-1000"
                  id="quote-overview-form-deductible-option-1000"
                  value="1000"
                >
                  1000
                </option>
                <option
                  class="QuoteOverviewForm__Option-opasjo-3"
                  data-testid="quote-overview-form-deductible-option-2000"
                  id="quote-overview-form-deductible-option-2000"
                  value="2000"
                >
                  2000
                </option>
              </select>
            </div>
            <div
              class="c3"
              data-testid="quote-overview-form-asteroidCollision-header"
              id="quote-overview-form-asteroidCollision-header"
            >
              <label
                class="c4"
                data-testid="quote-overview-form-asteroidCollision-header-label"
                id="quote-overview-form-asteroidCollision-header-label"
              >
                Asteroid Collision:
              </label>
            </div>
            <div
              class="c3"
              data-testid="quote-overview-form-asteroidCollision"
              id="quote-overview-form-asteroidCollision"
            >
              <label
                class="c4"
                data-testid="quote-overview-form-asteroidCollision-label"
                for="quote-overview-form-asteroidCollision-select"
                id="quote-overview-form-asteroidCollision-label"
              >
                Select asteroid collision amount:
              </label>
              <select
                class="c5"
                data-testid="quote-overview-form-asteroidCollision-select"
                id="quote-overview-form-asteroidCollision-select"
              >
                <option
                  class="QuoteOverviewForm__Option-opasjo-3"
                  data-testid="quote-overview-form-asteroidCollision-option-100000"
                  id="quote-overview-form-asteroidCollision-option-100000"
                  value="100000"
                >
                  100000
                </option>
                <option
                  class="QuoteOverviewForm__Option-opasjo-3"
                  data-testid="quote-overview-form-asteroidCollision-option-300000"
                  id="quote-overview-form-asteroidCollision-option-300000"
                  value="300000"
                >
                  300000
                </option>
                <option
                  class="QuoteOverviewForm__Option-opasjo-3"
                  data-testid="quote-overview-form-asteroidCollision-option-500000"
                  id="quote-overview-form-asteroidCollision-option-500000"
                  value="500000"
                >
                  500000
                </option>
                <option
                  class="QuoteOverviewForm__Option-opasjo-3"
                  data-testid="quote-overview-form-asteroidCollision-option-1000000"
                  id="quote-overview-form-asteroidCollision-option-1000000"
                  value="1000000"
                >
                  1000000
                </option>
              </select>
            </div>
          </form>
          <div
            class="c6"
          >
            Premium: $6000.00
          </div>
        </div>
      </DocumentFragment>
    `)
    /* eslint-enable jest/no-large-snapshots */
  })
})
