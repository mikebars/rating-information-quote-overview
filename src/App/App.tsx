import * as React from 'react'

import {
  CreateQuote,
  CreateQuoteResponse,
  createQuoteResponseToQuote,
  formDataToCreateQuoteRequest,
} from 'src/api/createQuote'
import {
  quoteToUpdateQuoteRequest,
  UpdateQuote,
  UpdateQuoteResponse,
  updateQuoteResponseToQuote,
} from 'src/api/updateQuote'
import { QuoteOverview } from 'src/screens/QuoteOverview/QuoteOverview'
import { OnChange, Quote } from 'src/screens/QuoteOverview/QuoteOverviewForm'
import { RatingInformation } from 'src/screens/RatingInformation/RatingInformation'
import { OnSubmit } from 'src/screens/RatingInformation/RatingInformationForm'

type Props = {
  onChange: UpdateQuote
  onSubmit: CreateQuote
}

type State = {
  quote?: Quote
}

export const App: React.FC<Props> = (props: Props): React.ReactElement => {
  const [quote, setQuote]: [
    State['quote'],
    React.Dispatch<React.SetStateAction<State['quote']>>,
  ] = React.useState<Quote | undefined>()

  const onChange: (...params: Parameters<OnChange>) => Promise<void> = async (
    ...params: Parameters<OnChange>
  ): Promise<void> => {
    /* istanbul ignore if */
    if (quote === undefined) {
      return
    }

    const [formData]: Parameters<OnChange> = params

    if (
      quote.variableSelections.asteroidCollision ===
        formData.asteroidCollision &&
      quote.variableSelections.deductible === formData.deductible
    ) {
      return
    }

    const updateQuoteResponse: UpdateQuoteResponse = await props.onChange(
      quoteToUpdateQuoteRequest({
        ...quote,
        variableOptions: {
          ...quote.variableOptions,
          asteroidCollision: {
            ...quote.variableOptions.asteroidCollision,
            default: formData.asteroidCollision,
          },
          deductible: {
            ...quote.variableOptions.deductible,
            default: formData.deductible,
          },
        },
        variableSelections: formData,
      }),
    )

    const updatedQuote: Quote = updateQuoteResponseToQuote(updateQuoteResponse)

    setQuote(updatedQuote)
  }

  const onSubmit: (...params: Parameters<OnSubmit>) => Promise<void> = async (
    ...params: Parameters<OnSubmit>
  ): Promise<void> => {
    const [formData]: Parameters<OnSubmit> = params

    const createQuoteResponse: CreateQuoteResponse = await props.onSubmit(
      formDataToCreateQuoteRequest(formData),
    )

    const newQuote: Quote = createQuoteResponseToQuote(createQuoteResponse)

    setQuote(newQuote)
  }

  return (
    <React.Fragment>
      {quote === undefined ? (
        <RatingInformation onSubmit={onSubmit} />
      ) : (
        <QuoteOverview onChange={onChange} quote={quote} />
      )}
    </React.Fragment>
  )
}
