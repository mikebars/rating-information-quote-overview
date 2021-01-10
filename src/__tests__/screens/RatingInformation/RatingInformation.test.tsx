import * as ReactTestingLibrary from '@testing-library/react'
import type * as React from 'react'

import { RatingInformation } from 'src/screens/RatingInformation/RatingInformation'

describe('ratingInformation', (): void => {
  it('ratingInformation - snapshot test', (): void => {
    expect.hasAssertions()

    const renderResult: ReactTestingLibrary.RenderResult = ReactTestingLibrary.render(
      <RatingInformation onSubmit={(): void => undefined} />,
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

      .c10 {
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
      }

      .c9 {
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
      }

      .c8 {
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .c5 {
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
      }

      .c4 {
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
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

      .c7 {
        border: none;
        outline: 1px solid;
      }

      .c6 {
        display: inline-block;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        padding: 0 1rem;
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

      <div
          class="c0"
        >
          <header
            class="c1"
          >
            Rating Information
          </header>
          <form
            class="c2"
            data-testid="rating-information-form"
            id="rating-information-form"
          >
            <div
              class="c3 c4"
              data-testid="rating-information-form-name"
              id="rating-information-form-name"
            >
              <div
                class="c3 c5"
                data-testid="rating-information-form-name-header"
                id="rating-information-form-name-header"
              >
                <label
                  class="c6"
                  data-testid="rating-information-form-name-header-label"
                  id="rating-information-form-name-header-label"
                >
                  Name:
                </label>
              </div>
              <div
                class="c3"
                data-testid="rating-information-form-name-first-name"
                id="rating-information-form-name-first-name"
              >
                <label
                  class="c6"
                  data-testid="rating-information-form-name-first-name-label"
                  for="rating-information-form-name-first-name-input"
                  id="rating-information-form-name-first-name-label"
                >
                  First name: (required)
                </label>
                <input
                  class="c7"
                  data-testid="rating-information-form-name-first-name-input"
                  id="rating-information-form-name-first-name-input"
                  name="rating-information-form-name-first-name-input"
                  required=""
                  title="Your Legal First Name e.g. Jane"
                  type="text"
                  value=""
                />
              </div>
              <div
                class="c3"
                data-testid="rating-information-form-name-last-name"
                id="rating-information-form-name-last-name"
              >
                <label
                  class="c6"
                  data-testid="rating-information-form-name-last-name-label"
                  for="rating-information-form-name-last-name-input"
                  id="rating-information-form-name-last-name-label"
                >
                  Last name: (required)
                </label>
                <input
                  class="c7"
                  data-testid="rating-information-form-name-last-name-input"
                  id="rating-information-form-name-last-name-input"
                  name="rating-information-form-name-last-name-input"
                  required=""
                  title="Your Legal Last Name e.g. Smith"
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div
              class="c3 c8"
              data-testid="rating-information-form-address"
              id="rating-information-form-address"
            >
              <div
                class="c3 c9"
                data-testid="rating-information-form-address-header"
                id="rating-information-form-address-header"
              >
                <label
                  class="c6"
                  data-testid="rating-information-form-address-header-label"
                  id="rating-information-form-address-header-label"
                >
                  Address:
                </label>
              </div>
              <div
                class="c3"
                data-testid="rating-information-form-address-line-1"
                id="rating-information-form-address-line-1"
              >
                <label
                  class="c6"
                  data-testid="rating-information-form-address-line-1-label"
                  for="rating-information-form-address-line-1-input"
                  id="rating-information-form-address-line-1-label"
                >
                  Line 1: (required)
                </label>
                <input
                  class="c7"
                  data-testid="rating-information-form-address-line-1-input"
                  id="rating-information-form-address-line-1-input"
                  name="rating-information-form-address-line-1-input"
                  required=""
                  title="Address Line 1 e.g. 1313 Mockingbird Lane"
                  type="text"
                  value=""
                />
              </div>
              <div
                class="c3"
                data-testid="rating-information-form-address-line-2"
                id="rating-information-form-address-line-2"
              >
                <label
                  class="c6"
                  data-testid="rating-information-form-address-line-2-label"
                  for="rating-information-form-address-line-2-input"
                  id="rating-information-form-address-line-2-label"
                >
                  Line 2:
                </label>
                <input
                  class="c7"
                  data-testid="rating-information-form-address-line-2-input"
                  id="rating-information-form-address-line-2-input"
                  name="rating-information-form-address-line-2-input"
                  title="Address Line 2 (Optional) e.g. Apt 23"
                  type="text"
                  value=""
                />
              </div>
              <div
                class="c3"
                data-testid="rating-information-form-address-city"
                id="rating-information-form-address-city"
              >
                <label
                  class="c6"
                  data-testid="rating-information-form-address-city-label"
                  for="rating-information-form-address-city-input"
                  id="rating-information-form-address-city-label"
                >
                  City: (required)
                </label>
                <input
                  class="c7"
                  data-testid="rating-information-form-address-city-input"
                  id="rating-information-form-address-city-input"
                  name="rating-information-form-address-city-input"
                  required=""
                  title="U.S. City Name e.g. Los Angeles"
                  type="text"
                  value=""
                />
              </div>
              <div
                class="c3"
                data-testid="rating-information-form-address-region"
                id="rating-information-form-address-region"
              >
                <label
                  class="c6"
                  data-testid="rating-information-form-address-region-label"
                  for="rating-information-form-address-region-input"
                  id="rating-information-form-address-region-label"
                >
                  State: (required)
                </label>
                <input
                  class="c7"
                  id="rating-information-form-address-region-input"
                  maxlength="2"
                  minlength="2"
                  name="rating-information-form-address-region-input"
                  pattern="[a-zA-Z]{2}"
                  required=""
                  title="2 Character U.S. State Abbreviation e.g. CA"
                  type="text"
                  value=""
                />
              </div>
              <div
                class="c3"
                data-testid="rating-information-form-address-postal"
                id="rating-information-form-address-postal"
              >
                <label
                  class="c6"
                  data-testid="rating-information-form-address-postal-label"
                  for="rating-information-form-address-postal-input"
                  id="rating-information-form-address-postal-label"
                >
                  ZIP Code: (required)
                </label>
                <input
                  class="c7"
                  id="rating-information-form-address-postal-input"
                  maxlength="5"
                  minlength="5"
                  name="rating-information-form-address-postal-input"
                  pattern="[0-9]{5}"
                  required=""
                  title="5 Digit ZIP Code e.g. 90210"
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div
              class="c3 c10"
              data-testid="rating-information-form-submit"
              id="rating-information-form-submit"
            >
              <input
                class="RatingInformationForm__InputSubmit-sc-12vxyzx-7"
                data-testid="rating-information-form-submit-input"
                id="rating-information-form-submit-input"
                type="submit"
              />
            </div>
          </form>
        </div>
      </DocumentFragment>
    `)
    /* eslint-enable jest/no-large-snapshots */
  })
})
