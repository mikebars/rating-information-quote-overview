import * as fc from 'fast-check'

import {
  mockUpdateQuote,
  mockUpdateQuoteResponse,
  quoteToUpdateQuoteRequest,
  UpdateQuoteRequest,
  UpdateQuoteResponse,
  updateQuoteResponseToQuote,
} from 'src/api/updateQuote'
import type { Quote } from 'src/screens/QuoteOverview/QuoteOverviewForm'

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

type QuoteArbitrary = () => fc.Arbitrary<Quote>

const quoteArbitrary: QuoteArbitrary = (): fc.Arbitrary<Quote> =>
  fc.record({
    policyHolder: fc.record({
      firstName: fc.string(),
      lastName: fc.string(),
    }),
    premium: fc.float(),
    quoteId: fc.string(),
    ratingAddress: fc.record({
      city: fc.string(),
      line1: fc.string(),
      line2: fc.oneof(fc.string(), fc.constant('')),
      postal: fc.string(),
      region: fc.string(),
    }),
    variableOptions: fc.record({
      asteroidCollision: fc.record({
        default: fc.integer(),
        description: fc.string(),
        title: fc.string(),
        values: fc.set(fc.integer(), {
          maxLength: 10,
          minLength: 2,
        }) as fc.Arbitrary<Array<number> & { 0: number; 1: number }>,
      }),
      deductible: fc.record({
        default: fc.integer(),
        description: fc.string(),
        title: fc.string(),
        values: fc.set(fc.integer(), {
          maxLength: 10,
          minLength: 2,
        }) as fc.Arbitrary<Array<number> & { 0: number; 1: number }>,
      }),
    }),
    variableSelections: fc.record({
      asteroidCollision: fc.integer(),
      deductible: fc.integer(),
    }),
  })

type UpdateQuoteResponseArbitrary = () => fc.Arbitrary<UpdateQuoteResponse>

const updateQuoteResponseArbitrary: UpdateQuoteResponseArbitrary = (): fc.Arbitrary<UpdateQuoteResponse> =>
  fc.record({
    quote: fc.record({
      policy_holder: fc.record({
        first_name: fc.string(),
        last_name: fc.string(),
      }),
      premium: fc.float(),
      quoteId: fc.string(),
      rating_address: fc.record({
        city: fc.string(),
        line_1: fc.string(),
        line_2: fc.oneof(fc.string(), fc.constant(null)),
        postal: fc.string(),
        region: fc.string(),
      }),
      variable_options: fc.record({
        asteroid_collision: fc.record({
          default: fc.integer(),
          description: fc.string(),
          title: fc.string(),
          values: fc.set(fc.integer()),
        }),
        deductible: fc.record({
          default: fc.integer(),
          description: fc.string(),
          title: fc.string(),
          values: fc.set(fc.integer()),
        }),
      }),
      variable_selections: fc.record({
        asteroid_collision: fc.integer(),
        deductible: fc.integer(),
      }),
    }),
  })

// #endregion /** fast-check arbitraries */

/* eslint-disable-next-line sonarjs/cognitive-complexity */
describe('updateQuote', (): void => {
  it(
    'updateQuote - mockUpdateQuote test',
    async (): Promise<void> => {
      expect.hasAssertions()

      await fc.assert(
        fc.asyncProperty(
          quoteArbitrary(),
          async (quote: Quote): Promise<boolean> => {
            const updateQuoteRequest: UpdateQuoteRequest = quoteToUpdateQuoteRequest(
              quote,
            )

            const updateQuoteResponse: UpdateQuoteResponse = await mockUpdateQuote(
              updateQuoteRequest,
            )

            expect(updateQuoteResponse).toStrictEqual({
              ...mockUpdateQuoteResponse,
              quote: {
                ...mockUpdateQuoteResponse.quote,
                variable_options: {
                  ...mockUpdateQuoteResponse.quote.variable_options,
                  asteroid_collision: {
                    ...mockUpdateQuoteResponse.quote.variable_options
                      .asteroid_collision,
                    default: quote.variableSelections.asteroidCollision,
                  },
                  deductible: {
                    ...mockUpdateQuoteResponse.quote.variable_options
                      .deductible,
                    default: quote.variableSelections.deductible,
                  },
                },
                variable_selections: {
                  ...mockUpdateQuoteResponse.quote.variable_selections,
                  asteroid_collision:
                    quote.variableSelections.asteroidCollision,
                  deductible: quote.variableSelections.deductible,
                },
              },
            })

            return true
          },
        ),
        JEST_EXHAUSTIVE === undefined ? { numRuns: 10 } : undefined,
      )
    },
    JEST_EXHAUSTIVE === undefined ? undefined : JEST_EXHAUSTIVE_TEST_TIMEOUT,
  )

  it(
    'updateQuote - quoteToUpdateQuoteRequest test',
    (): void => {
      expect.hasAssertions()

      fc.assert(
        fc.property(quoteArbitrary(), (quote: Quote): boolean => {
          const updateQuoteRequest: UpdateQuoteRequest = quoteToUpdateQuoteRequest(
            quote,
          )

          const firstNameMatches: boolean =
            updateQuoteRequest.quote.policy_holder.first_name ===
            quote.policyHolder.firstName

          expect(firstNameMatches).toBeTrue()

          const lastNameMatches: boolean =
            updateQuoteRequest.quote.policy_holder.last_name ===
            quote.policyHolder.lastName

          expect(lastNameMatches).toBeTrue()

          const addressMatches: boolean =
            updateQuoteRequest.quote.rating_address.city ===
              quote.ratingAddress.city &&
            updateQuoteRequest.quote.rating_address.line_1 ===
              quote.ratingAddress.line1 &&
            ((updateQuoteRequest.quote.rating_address.line_2 === null &&
              quote.ratingAddress.line2 === '') ||
              updateQuoteRequest.quote.rating_address.line_2 ===
                quote.ratingAddress.line2) &&
            updateQuoteRequest.quote.rating_address.postal ===
              quote.ratingAddress.postal &&
            updateQuoteRequest.quote.rating_address.region ===
              quote.ratingAddress.region

          expect(addressMatches).toBeTrue()

          const allMatches: boolean = [
            firstNameMatches,
            lastNameMatches,
            addressMatches,
          ].every((matches: boolean): boolean => matches)

          expect(allMatches).toBeTrue()

          return allMatches
        }),
        JEST_EXHAUSTIVE === undefined ? { numRuns: 10 } : undefined,
      )
    },
    JEST_EXHAUSTIVE === undefined ? undefined : JEST_EXHAUSTIVE_TEST_TIMEOUT,
  )

  it(
    'updateQuote - updateQuoteResponseToQuote test',
    (): void => {
      expect.hasAssertions()

      fc.assert(
        fc.property(
          updateQuoteResponseArbitrary(),
          (updateQuoteResponse: UpdateQuoteResponse): boolean => {
            const quote: Quote = updateQuoteResponseToQuote(updateQuoteResponse)

            const policyHolderMatches: boolean =
              quote.policyHolder.firstName ===
                updateQuoteResponse.quote.policy_holder.first_name &&
              quote.policyHolder.lastName ===
                updateQuoteResponse.quote.policy_holder.last_name

            expect(policyHolderMatches).toBeTrue()

            const premiumMatches: boolean =
              quote.premium === updateQuoteResponse.quote.premium

            expect(premiumMatches).toBeTrue()

            const quoteIdMatches: boolean =
              quote.quoteId === updateQuoteResponse.quote.quoteId

            expect(quoteIdMatches).toBeTrue()

            const ratingAddressMatches: boolean =
              quote.ratingAddress.city ===
                updateQuoteResponse.quote.rating_address.city &&
              quote.ratingAddress.line1 ===
                updateQuoteResponse.quote.rating_address.line_1 &&
              ((quote.ratingAddress.line2 === '' &&
                updateQuoteResponse.quote.rating_address.line_2 === null) ||
                quote.ratingAddress.line2 ===
                  updateQuoteResponse.quote.rating_address.line_2) &&
              quote.ratingAddress.postal ===
                updateQuoteResponse.quote.rating_address.postal &&
              quote.ratingAddress.region ===
                updateQuoteResponse.quote.rating_address.region

            expect(ratingAddressMatches).toBeTrue()

            /* tslint:disable:strict-comparisons */
            const variableOptionsMatches: boolean =
              quote.variableOptions.asteroidCollision.default ===
                updateQuoteResponse.quote.variable_options.asteroid_collision
                  .default &&
              quote.variableOptions.asteroidCollision.description ===
                updateQuoteResponse.quote.variable_options.asteroid_collision
                  .description &&
              quote.variableOptions.asteroidCollision.title ===
                updateQuoteResponse.quote.variable_options.asteroid_collision
                  .title &&
              quote.variableOptions.asteroidCollision.values ===
                updateQuoteResponse.quote.variable_options.asteroid_collision
                  .values &&
              quote.variableOptions.deductible.default ===
                updateQuoteResponse.quote.variable_options.deductible.default &&
              quote.variableOptions.deductible.description ===
                updateQuoteResponse.quote.variable_options.deductible
                  .description &&
              quote.variableOptions.deductible.title ===
                updateQuoteResponse.quote.variable_options.deductible.title &&
              quote.variableOptions.deductible.values ===
                updateQuoteResponse.quote.variable_options.deductible.values
            /* tslint:enable:strict-comparisons */

            expect(variableOptionsMatches).toBeTrue()

            const variableSelectionsMatches: boolean =
              quote.variableSelections.asteroidCollision ===
                updateQuoteResponse.quote.variable_selections
                  .asteroid_collision &&
              quote.variableSelections.deductible ===
                updateQuoteResponse.quote.variable_selections.deductible

            expect(variableSelectionsMatches).toBeTrue()

            const allMatches: boolean = [
              policyHolderMatches,
              premiumMatches,
              quoteIdMatches,
              ratingAddressMatches,
              variableOptionsMatches,
              variableSelectionsMatches,
            ].every((matches: boolean): boolean => matches)

            expect(allMatches).toBeTrue()

            return allMatches
          },
        ),
        JEST_EXHAUSTIVE === undefined ? { numRuns: 10 } : undefined,
      )
    },
    JEST_EXHAUSTIVE === undefined ? undefined : JEST_EXHAUSTIVE_TEST_TIMEOUT,
  )
})
