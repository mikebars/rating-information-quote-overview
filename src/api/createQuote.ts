import type { Quote } from 'src/screens/QuoteOverview/QuoteOverviewForm'
import type { FormData } from 'src/screens/RatingInformation/RatingInformationForm'

export type CreateQuoteRequest = {
  address: {
    city: string
    line_1: string
    line_2: string | null
    postal: string
    region: string
  }
  first_name: string
  last_name: string
}

export const mockCreateQuoteRequest: CreateQuoteRequest = {
  address: {
    city: 'Brooklyn',
    line_1: '123 Mulberry Lane',
    line_2: '3B',
    postal: '11211',
    region: 'NY',
  },
  first_name: 'Prairie',
  last_name: 'Johnson',
}

export type CreateQuoteResponse = {
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

export const mockCreateQuoteResponse: CreateQuoteResponse = {
  quote: {
    policy_holder: {
      first_name: 'Prairie',
      last_name: 'Prairie',
    },
    premium: 6000,
    quoteId: 'UP5413263',
    rating_address: {
      city: 'Brooklyn',
      line_1: '123 Mulberry Lane',
      line_2: '3B',
      postal: '11211',
      region: 'NY',
    },
    variable_options: {
      asteroid_collision: {
        description:
          'The maximum amount covered for damages caused by asteroid collisions.',
        title: 'Asteroid Collision Limit',
        values: [100000, 300000, 500000, 1000000],
      },
      deductible: {
        description:
          'The amount of money you will pay in an insurance claim before the insurance coverage kicks in.',
        title: 'Deductible',
        values: [500, 1000, 2000],
      },
    },
    variable_selections: {
      asteroid_collision: 100000,
      deductible: 500,
    },
  },
}

export type Dependencies = {
  fetchClient: typeof fetch
  getUrl: () => string
}

export type CreateQuote = (
  request: CreateQuoteRequest,
) => Promise<CreateQuoteResponse>

export type GenerateCreateQuote = (dependencies: Dependencies) => CreateQuote

export const generateCreateQuote: GenerateCreateQuote = (
  dependencies: Dependencies,
): CreateQuote => async (
  request: CreateQuoteRequest,
): Promise<CreateQuoteResponse> => {
  const response: Response = await dependencies.fetchClient(
    dependencies.getUrl(),
    {
      body: JSON.stringify(request),
      method: 'POST',
    },
  )

  const json: CreateQuoteResponse = (await response.json()) as CreateQuoteResponse

  return json
}

export const mockCreateQuote: CreateQuote = generateCreateQuote({
  fetchClient: async (): Promise<Response> => {
    const responseLike: Pick<Response, 'json'> = {
      json: async (): Promise<CreateQuoteResponse> => {
        const json: CreateQuoteResponse = await Promise.resolve(
          mockCreateQuoteResponse,
        )

        return json
      },
    }

    const response: Response = await Promise.resolve(responseLike as Response)

    return response
  },
  getUrl: (): string => '',
})

export type FormDataToCreateQuoteRequest = (
  formData: FormData,
) => CreateQuoteRequest

export const formDataToCreateQuoteRequest: FormDataToCreateQuoteRequest = (
  formData: FormData,
): CreateQuoteRequest => ({
  address: {
    city: formData.address.city,
    line_1: formData.address.line1,
    line_2: formData.address.line2 === '' ? null : formData.address.line2,
    postal: formData.address.postal,
    region: formData.address.region,
  },
  first_name: formData.name.firstName,
  last_name: formData.name.lastName,
})

export type CreateQuoteResponseToQuote = (
  createQuoteResponse: CreateQuoteResponse,
) => Quote

export const createQuoteResponseToQuote: CreateQuoteResponseToQuote = (
  createQuoteResponse: CreateQuoteResponse,
): Quote => ({
  policyHolder: {
    firstName: createQuoteResponse.quote.policy_holder.first_name,
    lastName: createQuoteResponse.quote.policy_holder.last_name,
  },
  premium: createQuoteResponse.quote.premium,
  quoteId: createQuoteResponse.quote.quoteId,
  ratingAddress: {
    city: createQuoteResponse.quote.rating_address.city,
    line1: createQuoteResponse.quote.rating_address.line_1,
    line2:
      createQuoteResponse.quote.rating_address.line_2 === null
        ? ''
        : createQuoteResponse.quote.rating_address.line_2,
    postal: createQuoteResponse.quote.rating_address.postal,
    region: createQuoteResponse.quote.rating_address.region,
  },
  variableOptions: {
    asteroidCollision: createQuoteResponse.quote.variable_options
      .asteroid_collision as Quote['variableOptions']['asteroidCollision'] & {
      values: Array<number> & { 0: number; 1: number }
    },
    deductible: createQuoteResponse.quote.variable_options
      .deductible as Quote['variableOptions']['deductible'] & {
      values: Array<number> & { 0: number; 1: number }
    },
  },
  variableSelections: {
    asteroidCollision:
      createQuoteResponse.quote.variable_selections.asteroid_collision,
    deductible: createQuoteResponse.quote.variable_selections.deductible,
  },
})
