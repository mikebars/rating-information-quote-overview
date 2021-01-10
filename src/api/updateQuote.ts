import type { Quote } from 'src/screens/QuoteOverview/QuoteOverviewForm'

export type UpdateQuoteRequest = {
  quote: {
    policy_holder: {
      first_name: string
      last_name: string
    }
    premium?: number
    quoteId: string
    rating_address: {
      city: string
      line_1: string
      line_2: string | null
      postal: string
      region: string
    }
    variable_options?: Record<
      'asteroid_collision' | 'deductible',
      {
        default?: number
        description: string
        title: string
        values: Array<number>
      }
    >
    variable_selections: Record<'asteroid_collision' | 'deductible', number>
  }
}

export const mockUpdateQuoteRequest: UpdateQuoteRequest = {
  quote: {
    policy_holder: {
      first_name: 'Prairie',
      last_name: 'Johnson',
    },
    quoteId: 'UP4561034',
    rating_address: {
      city: 'Brooklyn',
      line_1: '123 Mulberry Lane',
      line_2: '3B',
      postal: '11211',
      region: 'NY',
    },
    variable_selections: {
      asteroid_collision: 1000000,
      deductible: 2000,
    },
  },
}

export type UpdateQuoteResponse = {
  quote: {
    policy_holder: {
      first_name: string
      last_name: string
    }
    premium: number
    quoteId: string
    rating_address: {
      city: string
      line_1: string
      line_2: string | null
      postal: string
      region: string
    }
    variable_options: Record<
      'asteroid_collision' | 'deductible',
      {
        default?: number
        description: string
        title: string
        values: Array<number>
      }
    >
    variable_selections: Record<'asteroid_collision' | 'deductible', number>
  }
}

export const mockUpdateQuoteResponse: UpdateQuoteResponse = {
  quote: {
    policy_holder: {
      first_name: 'Prairie',
      last_name: 'Johnson',
    },
    premium: 8939.38,
    quoteId: 'UP4561034',
    rating_address: {
      city: 'Brooklyn',
      line_1: '123 Mulberry Lane',
      line_2: '3B',
      postal: '11211',
      region: 'NY',
    },
    variable_options: {
      asteroid_collision: {
        default: 100000,
        description:
          'The maximum amount covered for damages caused by asteroid collisions.',
        title: 'Asteroid Collision Limit',
        values: [100000, 300000, 500000, 1000000],
      },
      deductible: {
        default: 500,
        description:
          'The amount of money you will pay in an insurance claim before the insurance coverage kicks in.',
        title: 'Deductible',
        values: [500, 1000, 2000],
      },
    },
    variable_selections: {
      asteroid_collision: 1000000,
      deductible: 2000,
    },
  },
}

export type Dependencies = {
  fetchClient: typeof fetch
  getUrl: (quoteId: Quote['quoteId']) => string
}

export type UpdateQuote = (
  request: UpdateQuoteRequest,
) => Promise<UpdateQuoteResponse>

export type GenerateUpdateQuote = (dependencies: Dependencies) => UpdateQuote

export const generateUpdateQuote: GenerateUpdateQuote = (
  dependencies: Dependencies,
): UpdateQuote => async (
  request: UpdateQuoteRequest,
): Promise<UpdateQuoteResponse> => {
  const response: Response = await dependencies.fetchClient(
    dependencies.getUrl(request.quote.quoteId),
    {
      body: JSON.stringify(request),
      method: 'PUT',
    },
  )

  const json: UpdateQuoteResponse = (await response.json()) as UpdateQuoteResponse

  return json
}

export const mockUpdateQuote: UpdateQuote = async (
  request: UpdateQuoteRequest,
): Promise<UpdateQuoteResponse> => {
  const updateQuoteResponse: UpdateQuoteResponse = await generateUpdateQuote({
    fetchClient: async (): Promise<Response> => {
      const responseLike: Pick<Response, 'json'> = {
        json: async (): Promise<UpdateQuoteResponse> => {
          const json: UpdateQuoteResponse = await Promise.resolve({
            ...mockUpdateQuoteResponse,
            quote: {
              ...mockUpdateQuoteResponse.quote,
              variable_options: {
                ...mockUpdateQuoteResponse.quote.variable_options,
                asteroid_collision: {
                  ...mockUpdateQuoteResponse.quote.variable_options
                    .asteroid_collision,
                  default: request.quote.variable_selections.asteroid_collision,
                },
                deductible: {
                  ...mockUpdateQuoteResponse.quote.variable_options.deductible,
                  default: request.quote.variable_selections.deductible,
                },
              },
              variable_selections: {
                asteroid_collision:
                  request.quote.variable_selections.asteroid_collision,
                deductible: request.quote.variable_selections.deductible,
              },
            },
          })

          return json
        },
      }

      const response: Response = await Promise.resolve(responseLike as Response)

      return response
    },
    getUrl: (): string => '',
  })(request)

  return updateQuoteResponse
}

export type QuoteToUpdateQuoteRequest = (quote: Quote) => UpdateQuoteRequest

export const quoteToUpdateQuoteRequest: QuoteToUpdateQuoteRequest = (
  quote: Quote,
): UpdateQuoteRequest => ({
  quote: {
    policy_holder: {
      first_name: quote.policyHolder.firstName,
      last_name: quote.policyHolder.lastName,
    },
    premium: quote.premium,
    quoteId: quote.quoteId,
    rating_address: {
      city: quote.ratingAddress.city,
      line_1: quote.ratingAddress.line1,
      line_2:
        quote.ratingAddress.line2 === '' ? null : quote.ratingAddress.line2,
      postal: quote.ratingAddress.postal,
      region: quote.ratingAddress.region,
    },
    variable_options: {
      asteroid_collision: quote.variableOptions.asteroidCollision,
      deductible: quote.variableOptions.deductible,
    },
    variable_selections: {
      asteroid_collision: quote.variableSelections.asteroidCollision,
      deductible: quote.variableSelections.deductible,
    },
  },
})

export type UpdateQuoteResponseToQuote = (
  updateQuoteResponse: UpdateQuoteResponse,
) => Quote

export const updateQuoteResponseToQuote: UpdateQuoteResponseToQuote = (
  updateQuoteResponse: UpdateQuoteResponse,
): Quote => ({
  policyHolder: {
    firstName: updateQuoteResponse.quote.policy_holder.first_name,
    lastName: updateQuoteResponse.quote.policy_holder.last_name,
  },
  premium: updateQuoteResponse.quote.premium,
  quoteId: updateQuoteResponse.quote.quoteId,
  ratingAddress: {
    city: updateQuoteResponse.quote.rating_address.city,
    line1: updateQuoteResponse.quote.rating_address.line_1,
    line2:
      updateQuoteResponse.quote.rating_address.line_2 === null
        ? ''
        : updateQuoteResponse.quote.rating_address.line_2,
    postal: updateQuoteResponse.quote.rating_address.postal,
    region: updateQuoteResponse.quote.rating_address.region,
  },
  variableOptions: {
    asteroidCollision: updateQuoteResponse.quote.variable_options
      .asteroid_collision as Quote['variableOptions']['asteroidCollision'] & {
      values: Array<number> & { 0: number; 1: number }
    },
    deductible: updateQuoteResponse.quote.variable_options
      .deductible as Quote['variableOptions']['deductible'] & {
      values: Array<number> & { 0: number; 1: number }
    },
  },
  variableSelections: {
    asteroidCollision:
      updateQuoteResponse.quote.variable_selections.asteroid_collision,
    deductible: updateQuoteResponse.quote.variable_selections.deductible,
  },
})
