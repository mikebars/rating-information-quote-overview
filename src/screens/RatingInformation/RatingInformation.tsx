import type * as React from 'react'
import styled, { StyledComponent } from 'styled-components/macro'

import {
  OnSubmit,
  RatingInformationForm,
} from 'src/screens/RatingInformation/RatingInformationForm'

type Props = {
  onSubmit: OnSubmit
}

export const RatingInformation: React.FC<Props> = (
  props: Props,
): React.ReactElement => {
  return (
    <Container>
      <Header>Rating Information</Header>

      <RatingInformationForm onSubmit={props.onSubmit} />
    </Container>
  )
}

/** Styled Components */

const Container: StyledComponent<'div', Record<string, unknown>> = styled.div`
  width: 100%;
  height: 100%;
`

const Header: StyledComponent<
  'header',
  Record<string, unknown>
> = styled.header`
  padding: 2rem;
  font-size: 2rem;
  text-align: center;
`
