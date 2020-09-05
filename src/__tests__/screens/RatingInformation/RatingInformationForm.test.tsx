import * as ReactTestingLibrary from '@testing-library/react'
import * as fc from 'fast-check'
import * as React from 'react'

import {
  FormData,
  labelText,
  OnSubmit,
  RatingInformationForm,
} from 'src/screens/RatingInformation/RatingInformationForm'

// #region /** JEST_EXHAUSTIVE setup */

const JEST_EXHAUSTIVE: string | undefined = process.env.JEST_EXHAUSTIVE

/* tslint:disable-next-line:no-magic-numbers */
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
      city: fc.string(),
      line1: fc.string(),
      line2: fc.string(),
      postal: fc.string(),
      region: fc.string(),
    }),
    name: fc.record({
      firstName: fc.string(),
      lastName: fc.string(),
    }),
  })

// #endregion /** fast-check arbitraries */

describe('ratingInformationForm', (): void => {
  it(
    'ratingInformationForm - integration test',
    (): void => {
      expect.hasAssertions()

      fc.assert(
        fc.property(formDataArbitrary(), (formData: FormData): boolean => {
          const results: Array<unknown> = []

          const onSubmit: OnSubmit = (fd: FormData): void => {
            results.push(fd)
          }

          const renderResult: ReactTestingLibrary.RenderResult = ReactTestingLibrary.render(
            <RatingInformationForm onSubmit={onSubmit} />,
          )

          // #region /** name */

          // #region /** name - firstName */

          const firstNameInputElement: HTMLInputElement = renderResult.getByLabelText(
            labelText.name.firstName,
          ) as HTMLInputElement

          ReactTestingLibrary.fireEvent.change(firstNameInputElement, {
            target: { value: formData.name.firstName },
          })

          const firstNameUpdated: boolean =
            firstNameInputElement.value === formData.name.firstName

          expect(firstNameUpdated).toBe(true)

          // #endregion /** name - firstName */

          // #region /** name - lastName */

          const lastNameInputElement: HTMLInputElement = renderResult.getByLabelText(
            labelText.name.lastName,
          ) as HTMLInputElement

          ReactTestingLibrary.fireEvent.change(lastNameInputElement, {
            target: { value: formData.name.lastName },
          })

          const lastNameUpdated: boolean =
            lastNameInputElement.value === formData.name.lastName

          expect(lastNameUpdated).toBe(true)

          // #endregion /** name - lastName */

          // #endregion /** name */

          // #region /** address */

          // #region /** address - line1 */

          const line1InputElement: HTMLInputElement = renderResult.getByLabelText(
            labelText.address.line1,
          ) as HTMLInputElement

          ReactTestingLibrary.fireEvent.change(line1InputElement, {
            target: { value: formData.address.line1 },
          })

          const line1Updated: boolean =
            line1InputElement.value === formData.address.line1

          expect(line1Updated).toBe(true)

          // #endregion /** address - line1 */

          // #region /** address - line2 */

          const line2InputElement: HTMLInputElement = renderResult.getByLabelText(
            labelText.address.line2,
          ) as HTMLInputElement

          ReactTestingLibrary.fireEvent.change(line2InputElement, {
            target: { value: formData.address.line2 },
          })

          const line2Updated: boolean =
            line2InputElement.value === formData.address.line2

          expect(line2Updated).toBe(true)

          // #endregion /** address - line2 */

          // #region /** address - city */

          const cityInputElement: HTMLInputElement = renderResult.getByLabelText(
            labelText.address.city,
          ) as HTMLInputElement

          ReactTestingLibrary.fireEvent.change(cityInputElement, {
            target: { value: formData.address.city },
          })

          const cityUpdated: boolean =
            cityInputElement.value === formData.address.city

          expect(cityUpdated).toBe(true)

          // #endregion /** address - city */

          // #region /** address - region */

          const regionInputElement: HTMLInputElement = renderResult.getByLabelText(
            labelText.address.region,
          ) as HTMLInputElement

          ReactTestingLibrary.fireEvent.change(regionInputElement, {
            target: { value: formData.address.region },
          })

          const regionUpdated: boolean =
            regionInputElement.value === formData.address.region

          expect(regionUpdated).toBe(true)

          // #endregion /** address - region */

          // #region /** address - postal */

          const postalInputElement: HTMLInputElement = renderResult.getByLabelText(
            labelText.address.postal,
          ) as HTMLInputElement

          ReactTestingLibrary.fireEvent.change(postalInputElement, {
            target: { value: formData.address.postal },
          })

          const postalUpdated: boolean =
            postalInputElement.value === formData.address.postal

          expect(postalUpdated).toBe(true)

          // #endregion /** address - postal */

          // #endregion /** address */

          // #region /** submit */

          const submitInputElement: HTMLInputElement = renderResult.getByTestId(
            'rating-information-form-submit-input',
          ) as HTMLInputElement

          submitInputElement.click()

          expect(results).toStrictEqual([formData])

          // #endregion /** submit */

          // #region /** all checks passed */

          const allUpdated: boolean = [
            cityUpdated,
            firstNameUpdated,
            lastNameUpdated,
            line1Updated,
            line2Updated,
            postalUpdated,
            regionUpdated,
          ].every((updated: boolean): boolean => updated)

          expect(allUpdated).toBe(true)

          // #endregion /** all checks passed */

          // #region /** cleanup */

          renderResult.unmount()

          ReactTestingLibrary.cleanup()

          // #endregion /** cleanup */

          return allUpdated
        }),
        JEST_EXHAUSTIVE === undefined ? { numRuns: 10 } : undefined,
      )
    },
    JEST_EXHAUSTIVE === undefined ? undefined : JEST_EXHAUSTIVE_TEST_TIMEOUT,
  )

  it('ratingInformationForm - snapshot test', (): void => {
    expect.hasAssertions()

    const renderResult: ReactTestingLibrary.RenderResult = ReactTestingLibrary.render(
      <RatingInformationForm onSubmit={(): void => undefined} />,
    )

    /* eslint-disable jest/no-large-snapshots */
    expect(renderResult.asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        .c1 {
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

      .c8 {
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
      }

      .c7 {
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
      }

      .c6 {
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .c3 {
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
      }

      .c2 {
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .c0 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
      }

      .c5 {
        border: none;
        outline: 1px solid;
      }

      .c4 {
        display: inline-block;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        padding: 0 1rem;
      }

      <form
          class="c0"
          data-testid="rating-information-form"
          id="rating-information-form"
        >
          <div
            class="c1 c2"
            data-testid="rating-information-form-name"
            id="rating-information-form-name"
          >
            <div
              class="c1 c3"
              data-testid="rating-information-form-name-header"
              id="rating-information-form-name-header"
            >
              <label
                class="c4"
                data-testid="rating-information-form-name-header-label"
                id="rating-information-form-name-header-label"
              >
                Name:
              </label>
            </div>
            <div
              class="c1"
              data-testid="rating-information-form-name-first-name"
              id="rating-information-form-name-first-name"
            >
              <label
                class="c4"
                data-testid="rating-information-form-name-first-name-label"
                for="rating-information-form-name-first-name-input"
                id="rating-information-form-name-first-name-label"
              >
                First name: (required)
              </label>
              <input
                class="c5"
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
              class="c1"
              data-testid="rating-information-form-name-last-name"
              id="rating-information-form-name-last-name"
            >
              <label
                class="c4"
                data-testid="rating-information-form-name-last-name-label"
                for="rating-information-form-name-last-name-input"
                id="rating-information-form-name-last-name-label"
              >
                Last name: (required)
              </label>
              <input
                class="c5"
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
            class="c1 c6"
            data-testid="rating-information-form-address"
            id="rating-information-form-address"
          >
            <div
              class="c1 c7"
              data-testid="rating-information-form-address-header"
              id="rating-information-form-address-header"
            >
              <label
                class="c4"
                data-testid="rating-information-form-address-header-label"
                id="rating-information-form-address-header-label"
              >
                Address:
              </label>
            </div>
            <div
              class="c1"
              data-testid="rating-information-form-address-line-1"
              id="rating-information-form-address-line-1"
            >
              <label
                class="c4"
                data-testid="rating-information-form-address-line-1-label"
                for="rating-information-form-address-line-1-input"
                id="rating-information-form-address-line-1-label"
              >
                Line 1: (required)
              </label>
              <input
                class="c5"
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
              class="c1"
              data-testid="rating-information-form-address-line-2"
              id="rating-information-form-address-line-2"
            >
              <label
                class="c4"
                data-testid="rating-information-form-address-line-2-label"
                for="rating-information-form-address-line-2-input"
                id="rating-information-form-address-line-2-label"
              >
                Line 2:
              </label>
              <input
                class="c5"
                data-testid="rating-information-form-address-line-2-input"
                id="rating-information-form-address-line-2-input"
                name="rating-information-form-address-line-2-input"
                title="Address Line 2 (Optional) e.g. Apt 23"
                type="text"
                value=""
              />
            </div>
            <div
              class="c1"
              data-testid="rating-information-form-address-city"
              id="rating-information-form-address-city"
            >
              <label
                class="c4"
                data-testid="rating-information-form-address-city-label"
                for="rating-information-form-address-city-input"
                id="rating-information-form-address-city-label"
              >
                City: (required)
              </label>
              <input
                class="c5"
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
              class="c1"
              data-testid="rating-information-form-address-region"
              id="rating-information-form-address-region"
            >
              <label
                class="c4"
                data-testid="rating-information-form-address-region-label"
                for="rating-information-form-address-region-input"
                id="rating-information-form-address-region-label"
              >
                State: (required)
              </label>
              <input
                class="c5"
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
              class="c1"
              data-testid="rating-information-form-address-postal"
              id="rating-information-form-address-postal"
            >
              <label
                class="c4"
                data-testid="rating-information-form-address-postal-label"
                for="rating-information-form-address-postal-input"
                id="rating-information-form-address-postal-label"
              >
                ZIP Code: (required)
              </label>
              <input
                class="c5"
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
            class="c1 c8"
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
      </DocumentFragment>
    `)
    /* eslint-enable jest/no-large-snapshots */
  })
})
