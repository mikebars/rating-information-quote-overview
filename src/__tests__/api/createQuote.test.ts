import * as fc from 'fast-check'

import {
  CreateQuoteRequest,
  CreateQuoteResponse,
  createQuoteResponseToQuote,
  formDataToCreateQuoteRequest,
  mockCreateQuote,
  mockCreateQuoteResponse,
} from 'src/api/createQuote'
import { Quote } from 'src/screens/QuoteOverview/QuoteOverviewForm'
import { FormData } from 'src/screens/RatingInformation/RatingInformationForm'

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

type CreateQuoteResponseArbitrary = () => fc.Arbitrary<CreateQuoteResponse>

const createQuoteResponseArbitrary: CreateQuoteResponseArbitrary = (): fc.Arbitrary<
  CreateQuoteResponse
> =>
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
        line_2: fc.oneof(fc.string(), fc.constant(null)), // tslint:disable-line:no-null-keyword
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

type FormDataArbitrary = () => fc.Arbitrary<FormData>

const formDataArbitrary: FormDataArbitrary = (): fc.Arbitrary<FormData> =>
  fc.record({
    address: fc.record({
      city: fc.string(),
      line1: fc.string(),
      line2: fc.oneof(fc.string(), fc.constant('')),
      postal: fc.string(),
      region: fc.string(),
    }),
    name: fc.record({
      firstName: fc.string(),
      lastName: fc.string(),
    }),
  })

// #endregion /** fast-check arbitraries */

describe('createQuote', (): void => {
  it(
    'createQuote - createQuoteResponseToQuote test',
    (): void => {
      expect.hasAssertions()

      fc.assert(
        fc.property(
          createQuoteResponseArbitrary(),
          (createQuoteResponse: CreateQuoteResponse): boolean => {
            const quote: Quote = createQuoteResponseToQuote(createQuoteResponse)

            const policyHolderMatches: boolean =
              quote.policyHolder.firstName ===
                createQuoteResponse.quote.policy_holder.first_name &&
              quote.policyHolder.lastName ===
                createQuoteResponse.quote.policy_holder.last_name

            expect(policyHolderMatches).toBe(true)

            const premiumMatches: boolean =
              quote.premium === createQuoteResponse.quote.premium

            expect(premiumMatches).toBe(true)

            const quoteIdMatches: boolean =
              quote.quoteId === createQuoteResponse.quote.quoteId

            expect(quoteIdMatches).toBe(true)

            const ratingAddressMatches: boolean =
              quote.ratingAddress.city ===
                createQuoteResponse.quote.rating_address.city &&
              quote.ratingAddress.line1 ===
                createQuoteResponse.quote.rating_address.line_1 &&
              ((quote.ratingAddress.line2 === '' &&
                createQuoteResponse.quote.rating_address.line_2 === null) ||
                quote.ratingAddress.line2 ===
                  createQuoteResponse.quote.rating_address.line_2) &&
              quote.ratingAddress.postal ===
                createQuoteResponse.quote.rating_address.postal &&
              quote.ratingAddress.region ===
                createQuoteResponse.quote.rating_address.region

            expect(ratingAddressMatches).toBe(true)

            /* tslint:disable:strict-comparisons */
            const variableOptionsMatches: boolean =
              quote.variableOptions.asteroidCollision.default ===
                createQuoteResponse.quote.variable_options.asteroid_collision
                  .default &&
              quote.variableOptions.asteroidCollision.description ===
                createQuoteResponse.quote.variable_options.asteroid_collision
                  .description &&
              quote.variableOptions.asteroidCollision.title ===
                createQuoteResponse.quote.variable_options.asteroid_collision
                  .title &&
              quote.variableOptions.asteroidCollision.values ===
                createQuoteResponse.quote.variable_options.asteroid_collision
                  .values &&
              quote.variableOptions.deductible.default ===
                createQuoteResponse.quote.variable_options.deductible.default &&
              quote.variableOptions.deductible.description ===
                createQuoteResponse.quote.variable_options.deductible
                  .description &&
              quote.variableOptions.deductible.title ===
                createQuoteResponse.quote.variable_options.deductible.title &&
              quote.variableOptions.deductible.values ===
                createQuoteResponse.quote.variable_options.deductible.values
            /* tslint:enable:strict-comparisons */

            expect(variableOptionsMatches).toBe(true)

            const variableSelectionsMatches: boolean =
              quote.variableSelections.asteroidCollision ===
                createQuoteResponse.quote.variable_selections
                  .asteroid_collision &&
              quote.variableSelections.deductible ===
                createQuoteResponse.quote.variable_selections.deductible

            expect(variableSelectionsMatches).toBe(true)

            const allMatches: boolean = [
              policyHolderMatches,
              premiumMatches,
              quoteIdMatches,
              ratingAddressMatches,
              variableOptionsMatches,
              variableSelectionsMatches,
            ].every((matches: boolean): boolean => matches)

            expect(allMatches).toBe(true)

            return allMatches
          },
        ),
        JEST_EXHAUSTIVE === undefined ? { numRuns: 10 } : undefined,
      )
    },
    JEST_EXHAUSTIVE === undefined ? undefined : JEST_EXHAUSTIVE_TEST_TIMEOUT,
  )

  it(
    'createQuote - formDataToCreateQuoteRequest test',
    (): void => {
      expect.hasAssertions()

      fc.assert(
        fc.property(formDataArbitrary(), (formData: FormData): boolean => {
          const createQuoteRequest: CreateQuoteRequest = formDataToCreateQuoteRequest(
            formData,
          )

          const firstNameMatches: boolean =
            createQuoteRequest.first_name === formData.name.firstName

          expect(firstNameMatches).toBe(true)

          const lastNameMatches: boolean =
            createQuoteRequest.last_name === formData.name.lastName

          expect(lastNameMatches).toBe(true)

          const addressMatches: boolean =
            createQuoteRequest.address.city === formData.address.city &&
            createQuoteRequest.address.line_1 === formData.address.line1 &&
            ((createQuoteRequest.address.line_2 === null &&
              formData.address.line2 === '') ||
              createQuoteRequest.address.line_2 === formData.address.line2) &&
            createQuoteRequest.address.postal === formData.address.postal &&
            createQuoteRequest.address.region === formData.address.region

          expect(addressMatches).toBe(true)

          const allMatches: boolean = [
            firstNameMatches,
            lastNameMatches,
            addressMatches,
          ].every((matches: boolean): boolean => matches)

          expect(allMatches).toBe(true)

          return allMatches
        }),
        JEST_EXHAUSTIVE === undefined ? { numRuns: 10 } : undefined,
      )
    },
    JEST_EXHAUSTIVE === undefined ? undefined : JEST_EXHAUSTIVE_TEST_TIMEOUT,
  )

  it(
    'createQuote - mockCreateQuote test',
    async (): Promise<void> => {
      expect.hasAssertions()

      await fc.assert(
        fc.asyncProperty(
          formDataArbitrary(),
          async (formData: FormData): Promise<boolean> => {
            const createQuoteRequest: CreateQuoteRequest = formDataToCreateQuoteRequest(
              formData,
            )

            const createQuoteResponse: CreateQuoteResponse = await mockCreateQuote(
              createQuoteRequest,
            )

            expect(createQuoteResponse).toStrictEqual(mockCreateQuoteResponse)

            return true
          },
        ),
        JEST_EXHAUSTIVE === undefined ? { numRuns: 10 } : undefined,
      )
    },
    JEST_EXHAUSTIVE === undefined ? undefined : JEST_EXHAUSTIVE_TEST_TIMEOUT,
  )
})
