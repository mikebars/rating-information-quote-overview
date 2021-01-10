import * as ReactTestingLibrary from '@testing-library/react'
import * as fc from 'fast-check'
import type * as React from 'react'

import { mockCreateQuote, mockCreateQuoteResponse } from 'src/api/createQuote'
import { mockUpdateQuote } from 'src/api/updateQuote'
import { App } from 'src/App/App'
import { labelText as quoteOverviewFormLabelText } from 'src/screens/QuoteOverview/QuoteOverviewForm'
import {
  FormData,
  labelText as ratingInformationFormLabelText,
} from 'src/screens/RatingInformation/RatingInformationForm'

// #region /** JEST_EXHAUSTIVE setup */

/* eslint-disable-next-line prefer-destructuring */
const JEST_EXHAUSTIVE: string | undefined = process.env.JEST_EXHAUSTIVE

const JEST_EXHAUSTIVE_TEST_TIMEOUT: number = 60 * 60 * 1000

fc.configureGlobal({
  interruptAfterTimeLimit:
    JEST_EXHAUSTIVE === undefined ? undefined : JEST_EXHAUSTIVE_TEST_TIMEOUT,
  markInterruptAsFailure: JEST_EXHAUSTIVE === undefined ? undefined : true,
})

// #endregion /** JEST_EXHAUSTIVE setup */

// #region /** fast-check arbitraries */

type FormDataArbitrary = () => fc.Arbitrary<FormData>

const formDataArbitrary: FormDataArbitrary = (): fc.Arbitrary<FormData> =>
  fc.record({
    address: fc.record({
      city: fc
        .string({ maxLength: 10, minLength: 1 })
        .filter((s: string): s is string => s.trim() !== ''),
      line1: fc
        .string({ maxLength: 10, minLength: 1 })
        .filter((s: string): s is string => s.trim() !== ''),
      line2: fc
        .string({ maxLength: 10, minLength: 1 })
        .filter((s: string): s is string => s.trim() !== ''),
      postal: fc
        .string({ maxLength: 10, minLength: 1 })
        .filter((s: string): s is string => s.trim() !== ''),
      region: fc
        .string({ maxLength: 10, minLength: 1 })
        .filter((s: string): s is string => s.trim() !== ''),
    }),
    name: fc.record({
      firstName: fc
        .string({ maxLength: 10, minLength: 1 })
        .filter((s: string): s is string => s.trim() !== ''),
      lastName: fc
        .string({ maxLength: 10, minLength: 1 })
        .filter((s: string): s is string => s.trim() !== ''),
    }),
  })

// #endregion /** fast-check arbitraries */

describe('app', (): void => {
  it(
    'app - integration test',
    async (): Promise<void> => {
      expect.hasAssertions()

      await fc.assert(
        fc.asyncProperty(
          formDataArbitrary(),
          async (formData: FormData): Promise<boolean> => {
            const renderResult: ReactTestingLibrary.RenderResult = ReactTestingLibrary.render(
              <App onChange={mockUpdateQuote} onSubmit={mockCreateQuote} />,
            )

            // #region /** name */

            // #region /** name - firstName */

            const firstNameInputElement: HTMLInputElement = renderResult.getByLabelText(
              ratingInformationFormLabelText.name.firstName,
            ) as HTMLInputElement

            ReactTestingLibrary.fireEvent.change(firstNameInputElement, {
              target: { value: formData.name.firstName },
            })

            const firstNameUpdated: boolean =
              firstNameInputElement.value === formData.name.firstName

            expect(firstNameUpdated).toBeTrue()

            // #endregion /** name - firstName */

            // #region /** name - lastName */

            const lastNameInputElement: HTMLInputElement = renderResult.getByLabelText(
              ratingInformationFormLabelText.name.lastName,
            ) as HTMLInputElement

            ReactTestingLibrary.fireEvent.change(lastNameInputElement, {
              target: { value: formData.name.lastName },
            })

            const lastNameUpdated: boolean =
              lastNameInputElement.value === formData.name.lastName

            expect(lastNameUpdated).toBeTrue()

            // #endregion /** name - lastName */

            // #endregion /** name */

            // #region /** address */

            // #region /** address - line1 */

            const line1InputElement: HTMLInputElement = renderResult.getByLabelText(
              ratingInformationFormLabelText.address.line1,
            ) as HTMLInputElement

            ReactTestingLibrary.fireEvent.change(line1InputElement, {
              target: { value: formData.address.line1 },
            })

            const line1Updated: boolean =
              line1InputElement.value === formData.address.line1

            expect(line1Updated).toBeTrue()

            // #endregion /** address - line1 */

            // #region /** address - line2 */

            const line2InputElement: HTMLInputElement = renderResult.getByLabelText(
              ratingInformationFormLabelText.address.line2,
            ) as HTMLInputElement

            ReactTestingLibrary.fireEvent.change(line2InputElement, {
              target: { value: formData.address.line2 },
            })

            const line2Updated: boolean =
              line2InputElement.value === formData.address.line2

            expect(line2Updated).toBeTrue()

            // #endregion /** address - line2 */

            // #region /** address - city */

            const cityInputElement: HTMLInputElement = renderResult.getByLabelText(
              ratingInformationFormLabelText.address.city,
            ) as HTMLInputElement

            ReactTestingLibrary.fireEvent.change(cityInputElement, {
              target: { value: formData.address.city },
            })

            const cityUpdated: boolean =
              cityInputElement.value === formData.address.city

            expect(cityUpdated).toBeTrue()

            // #endregion /** address - city */

            // #region /** address - region */

            const regionInputElement: HTMLInputElement = renderResult.getByLabelText(
              ratingInformationFormLabelText.address.region,
            ) as HTMLInputElement

            ReactTestingLibrary.fireEvent.change(regionInputElement, {
              target: { value: formData.address.region },
            })

            const regionUpdated: boolean =
              regionInputElement.value === formData.address.region

            expect(regionUpdated).toBeTrue()

            // #endregion /** address - region */

            // #region /** address - postal */

            const postalInputElement: HTMLInputElement = renderResult.getByLabelText(
              ratingInformationFormLabelText.address.postal,
            ) as HTMLInputElement

            ReactTestingLibrary.fireEvent.change(postalInputElement, {
              target: { value: formData.address.postal },
            })

            const postalUpdated: boolean =
              postalInputElement.value === formData.address.postal

            expect(postalUpdated).toBeTrue()

            // #endregion /** address - postal */

            // #endregion /** address */

            // #region /** submit */

            const submitInputElement: HTMLInputElement = renderResult.getByTestId(
              'rating-information-form-submit-input',
            ) as HTMLInputElement

            submitInputElement.click()

            await ReactTestingLibrary.waitForElementToBeRemoved(
              submitInputElement,
            )

            // #endregion /** submit */

            // #region /** deductible */

            const deductibleSelectElement: HTMLSelectElement = renderResult.getByLabelText(
              quoteOverviewFormLabelText.deductible,
            ) as HTMLSelectElement

            const deductibleSelectSetToDefault: boolean =
              deductibleSelectElement.value ===
              String(
                mockCreateQuoteResponse.quote.variable_options.deductible
                  .values[0],
              )

            expect(deductibleSelectSetToDefault).toBeTrue()

            ReactTestingLibrary.fireEvent.change(deductibleSelectElement, {
              target: {
                value:
                  mockCreateQuoteResponse.quote.variable_options.deductible
                    .values[1],
              },
            })

            await ReactTestingLibrary.waitFor((): void => {
              expect(
                renderResult.getByLabelText(
                  quoteOverviewFormLabelText.deductible,
                ),
              ).toHaveValue(
                String(
                  mockCreateQuoteResponse.quote.variable_options.deductible
                    .values[1],
                ),
              )
            })

            const deductibleSelectUpdated: boolean =
              deductibleSelectElement.value ===
              String(
                mockCreateQuoteResponse.quote.variable_options.deductible
                  .values[1],
              )

            expect(deductibleSelectUpdated).toBeTrue()

            // #endregion /** deductible */

            // #region /** all checks passed */

            const allUpdated: boolean = [
              cityUpdated,
              deductibleSelectSetToDefault,
              deductibleSelectUpdated,
              firstNameUpdated,
              lastNameUpdated,
              line1Updated,
              line2Updated,
              postalUpdated,
              regionUpdated,
            ].every((updated: boolean): boolean => updated)

            expect(allUpdated).toBeTrue()

            // #endregion /** all checks passed */

            // #region /** cleanup */

            renderResult.unmount()

            ReactTestingLibrary.cleanup()

            // #endregion /** cleanup */

            return allUpdated
          },
        ),
        JEST_EXHAUSTIVE === undefined ? { numRuns: 10 } : undefined,
      )
    },
    JEST_EXHAUSTIVE === undefined ? undefined : JEST_EXHAUSTIVE_TEST_TIMEOUT,
  )

  it('app - snapshot test', (): void => {
    expect.hasAssertions()

    const renderResult: ReactTestingLibrary.RenderResult = ReactTestingLibrary.render(
      <App onChange={mockUpdateQuote} onSubmit={mockCreateQuote} />,
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
