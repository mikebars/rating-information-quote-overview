import * as React from 'react'
import { default as styled, StyledComponent } from 'styled-components/macro'

import {
  OnChange,
  Quote,
  QuoteOverviewForm,
} from 'src/screens/QuoteOverview/QuoteOverviewForm'

type Props = {
  onChange: OnChange
  quote: Quote
}

export const QuoteOverview: React.FC<Props> = (
  props: Props,
): React.ReactElement => {
  return (
    <Container>
      <Header>Quote Overview</Header>

      <QuoteOverviewForm onChange={props.onChange} quote={props.quote} />

      <Premium>Premium: ${props.quote.premium.toFixed(2)}</Premium>
    </Container>
  )
}

/** Styled Components */

const Container: StyledComponent<'div', Record<string, unknown>> = styled.div`
  height: 100%;
  width: 100%;
`

const Header: StyledComponent<
  'header',
  Record<string, unknown>
> = styled.header`
  font-size: 2rem;
  padding: 2rem;
  text-align: center;
`

const Premium: StyledComponent<'div', Record<string, unknown>> = styled.div`
  padding: 0.5rem;
  text-align: center;
`
