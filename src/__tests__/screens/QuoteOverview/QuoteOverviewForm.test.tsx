import * as ReactTestingLibrary from '@testing-library/react'
import * as fc from 'fast-check'
import * as React from 'react'

import {
  defaultQuote,
  FormData,
  getDefaultAsteroidCollision,
  getDefaultDeductible,
  labelText,
  OnChange,
  Quote,
  QuoteOverviewForm,
} from 'src/screens/QuoteOverview/QuoteOverviewForm'

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

type QuoteArbitrary = () => fc.Arbitrary<Quote>

const quoteArbitrary: QuoteArbitrary = (): fc.Arbitrary<Quote> =>
  fc
    .record({
      policyHolder: fc.record({
        firstName: fc.string(),
        lastName: fc.string(),
      }),
      premium: fc.float(),
      quoteId: fc.string(),
      ratingAddress: fc.record({
        city: fc.string(),
        line1: fc.string(),
        line2: fc.string(),
        postal: fc.string(),
        region: fc.string(),
      }),
      variableOptions: fc.record({
        asteroidCollision: fc.record({
          default: fc.oneof(fc.integer(), fc.constant(undefined)),
          description: fc.string(),
          title: fc.string(),
          values: fc.set(fc.integer(), 2, 10), // tslint:disable-line:no-magic-numbers
        }),
        deductible: fc.record({
          default: fc.oneof(fc.integer(), fc.constant(undefined)),
          description: fc.string(),
          title: fc.string(),
          values: fc.set(fc.integer(), 2, 10), // tslint:disable-line:no-magic-numbers
        }),
      }),
      variableSelections: fc.record({
        asteroidCollision: fc.integer(),
        deductible: fc.integer(),
      }),
    })
    .filter((q: Quote): q is Quote => {
      if (
        q.variableOptions.asteroidCollision.default !== undefined &&
        q.variableOptions.deductible.default !== undefined
      ) {
        return (
          q.variableOptions.asteroidCollision.values.includes(
            q.variableOptions.asteroidCollision.default,
          ) &&
          q.variableOptions.deductible.values.includes(
            q.variableOptions.deductible.default,
          )
        )
      }

      if (q.variableOptions.asteroidCollision.default !== undefined) {
        return q.variableOptions.asteroidCollision.values.includes(
          q.variableOptions.asteroidCollision.default,
        )
      }

      if (q.variableOptions.deductible.default !== undefined) {
        return q.variableOptions.deductible.values.includes(
          q.variableOptions.deductible.default,
        )
      }

      return true
    })

// #endregion /** fast-check arbitraries */

describe('quoteOverviewForm', (): void => {
  it('quoteOverviewForm - getDefaultAsteroidCollision test - no default', (): void => {
    expect.hasAssertions()

    fc.assert(
      fc.property(
        quoteArbitrary().filter(
          (q: Quote): q is Quote =>
            q.variableOptions.asteroidCollision.default === undefined,
        ),
        (quote: Quote): boolean => {
          const defaultAsteroidCollision: FormData['asteroidCollision'] = getDefaultAsteroidCollision(
            quote,
          )

          const defaultSetCorrectly: boolean =
            defaultAsteroidCollision ===
            quote.variableOptions.asteroidCollision.values[0]

          expect(defaultSetCorrectly).toBe(true)

          return defaultSetCorrectly
        },
      ),
    )
  })

  it(
    'quoteOverviewForm - getDefaultAsteroidCollision test - default',
    (): void => {
      expect.hasAssertions()

      fc.assert(
        fc.property(
          quoteArbitrary().filter(
            (q: Quote): q is Quote =>
              q.variableOptions.asteroidCollision.default !== undefined,
          ),
          (quote: Quote): boolean => {
            const defaultAsteroidCollision: FormData['asteroidCollision'] = getDefaultAsteroidCollision(
              quote,
            )

            const defaultSetCorrectly: boolean =
              defaultAsteroidCollision ===
              quote.variableOptions.asteroidCollision.default

            expect(defaultSetCorrectly).toBe(true)

            return defaultSetCorrectly
          },
        ),
        JEST_EXHAUSTIVE === undefined ? { numRuns: 10 } : undefined,
      )
    },
    JEST_EXHAUSTIVE === undefined ? undefined : JEST_EXHAUSTIVE_TEST_TIMEOUT,
  )

  it(
    'quoteOverviewForm - getDefaultDeductible test - no default',
    (): void => {
      expect.hasAssertions()

      fc.assert(
        fc.property(
          quoteArbitrary().filter(
            (q: Quote): q is Quote =>
              q.variableOptions.deductible.default === undefined,
          ),
          (quote: Quote): boolean => {
            const defaultDeductible: FormData['deductible'] = getDefaultDeductible(
              quote,
            )

            const defaultSetCorrectly: boolean =
              defaultDeductible === quote.variableOptions.deductible.values[0]

            expect(defaultSetCorrectly).toBe(true)

            return defaultSetCorrectly
          },
        ),
        JEST_EXHAUSTIVE === undefined ? { numRuns: 10 } : undefined,
      )
    },
    JEST_EXHAUSTIVE === undefined ? undefined : JEST_EXHAUSTIVE_TEST_TIMEOUT,
  )

  it(
    'quoteOverviewForm - getDefaultDeductible test - default',
    (): void => {
      expect.hasAssertions()

      fc.assert(
        fc.property(
          quoteArbitrary().filter(
            (q: Quote): q is Quote =>
              q.variableOptions.deductible.default !== undefined,
          ),
          (quote: Quote): boolean => {
            const defaultDeductible: FormData['deductible'] = getDefaultDeductible(
              quote,
            )

            const defaultSetCorrectly: boolean =
              defaultDeductible === quote.variableOptions.deductible.default

            expect(defaultSetCorrectly).toBe(true)

            return defaultSetCorrectly
          },
        ),
        JEST_EXHAUSTIVE === undefined ? { numRuns: 10 } : undefined,
      )
    },
    JEST_EXHAUSTIVE === undefined ? undefined : JEST_EXHAUSTIVE_TEST_TIMEOUT,
  )

  it(
    'quoteOverviewForm - integration test',
    (): void => {
      expect.hasAssertions()

      fc.assert(
        fc.property(quoteArbitrary(), (quote: Quote): boolean => {
          // #region /** defaults */

          const defaultAsteroidCollision: FormData['asteroidCollision'] = getDefaultAsteroidCollision(
            quote,
          )

          const asteroidCollision: FormData['asteroidCollision'] =
            defaultAsteroidCollision ===
            quote.variableOptions.asteroidCollision.values[1]
              ? quote.variableOptions.asteroidCollision.values[0]
              : quote.variableOptions.asteroidCollision.values[1]

          const defaultDeductible: FormData['deductible'] = getDefaultDeductible(
            quote,
          )

          const deductible: FormData['deductible'] =
            defaultDeductible === quote.variableOptions.deductible.values[1]
              ? quote.variableOptions.deductible.values[0]
              : quote.variableOptions.deductible.values[1]

          // #endregion /** defaults */

          const results: Array<unknown> = []

          const onChange: OnChange = (fd: FormData): void => {
            results.push(fd)
          }

          const renderResult: ReactTestingLibrary.RenderResult = ReactTestingLibrary.render(
            <QuoteOverviewForm onChange={onChange} quote={quote} />,
          )

          expect(results).toStrictEqual([
            {
              asteroidCollision: defaultAsteroidCollision,
              deductible: defaultDeductible,
            },
          ])

          // #region /** deductible */

          const deductibleSelectElement: HTMLSelectElement = renderResult.getByLabelText(
            labelText.deductible,
          ) as HTMLSelectElement

          const deductibleSelectSetToDefault: boolean =
            deductibleSelectElement.value === String(defaultDeductible)

          expect(deductibleSelectSetToDefault).toBe(true)

          ReactTestingLibrary.fireEvent.change(deductibleSelectElement, {
            target: { value: deductible },
          })

          const deductibleSelectUpdated: boolean =
            deductibleSelectElement.value === String(deductible)

          expect(deductibleSelectUpdated).toBe(true)

          expect(results).toStrictEqual([
            {
              asteroidCollision: defaultAsteroidCollision,
              deductible: defaultDeductible,
            },
            { asteroidCollision: defaultAsteroidCollision, deductible },
          ])

          // #endregion /** deductible */

          // #region /** asteroidCollision */

          const asteroidCollisionSelectElement: HTMLSelectElement = renderResult.getByLabelText(
            labelText.asteroidCollision,
          ) as HTMLSelectElement

          const asteroidCollisionSelectSetToDefault: boolean =
            asteroidCollisionSelectElement.value ===
            String(defaultAsteroidCollision)

          expect(asteroidCollisionSelectSetToDefault).toBe(true)

          ReactTestingLibrary.fireEvent.change(asteroidCollisionSelectElement, {
            target: { value: asteroidCollision },
          })

          const asteroidCollisionSelectUpdated: boolean =
            asteroidCollisionSelectElement.value === String(asteroidCollision)

          expect(asteroidCollisionSelectUpdated).toBe(true)

          expect(results).toStrictEqual([
            {
              asteroidCollision: defaultAsteroidCollision,
              deductible: defaultDeductible,
            },
            { asteroidCollision: defaultAsteroidCollision, deductible },
            { asteroidCollision, deductible },
          ])

          // #endregion /** asteroidCollision */

          // #region /** all checks passed */

          const allUpdated: boolean = [
            deductibleSelectSetToDefault,
            deductibleSelectUpdated,
            asteroidCollisionSelectSetToDefault,
            asteroidCollisionSelectUpdated,
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

  it('quoteOverviewForm - snapshot test', (): void => {
    expect.hasAssertions()

    const renderResult: ReactTestingLibrary.RenderResult = ReactTestingLibrary.render(
      <QuoteOverviewForm
        onChange={(): void => undefined}
        quote={defaultQuote}
      />,
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

      .c2 {
        padding: 0 1rem;
      }

      .c3 {
        border: none;
        outline: 1px solid;
      }

      <form
          class="c0"
          data-testid="quote-overview-form"
          id="quote-overview-form"
        >
          <div
            class="c1"
            data-testid="quote-overview-form-deductible-header"
            id="quote-overview-form-deductible-header"
          >
            <label
              class="c2"
              data-testid="quote-overview-form-deductible-header-label"
              id="quote-overview-form-deductible-header-label"
            >
              Deductible:
            </label>
          </div>
          <div
            class="c1"
            data-testid="quote-overview-form-deductible"
            id="quote-overview-form-deductible"
          >
            <label
              class="c2"
              data-testid="quote-overview-form-deductible-label"
              for="quote-overview-form-deductible-select"
              id="quote-overview-form-deductible-label"
            >
              Select deductible amount:
            </label>
            <select
              class="c3"
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
            class="c1"
            data-testid="quote-overview-form-asteroidCollision-header"
            id="quote-overview-form-asteroidCollision-header"
          >
            <label
              class="c2"
              data-testid="quote-overview-form-asteroidCollision-header-label"
              id="quote-overview-form-asteroidCollision-header-label"
            >
              Asteroid Collision:
            </label>
          </div>
          <div
            class="c1"
            data-testid="quote-overview-form-asteroidCollision"
            id="quote-overview-form-asteroidCollision"
          >
            <label
              class="c2"
              data-testid="quote-overview-form-asteroidCollision-label"
              for="quote-overview-form-asteroidCollision-select"
              id="quote-overview-form-asteroidCollision-label"
            >
              Select asteroid collision amount:
            </label>
            <select
              class="c3"
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
      </DocumentFragment>
    `)
    /* eslint-enable jest/no-large-snapshots */
  })
})
