import * as React from 'react'
import styled, { StyledComponent } from 'styled-components/macro'

export type Coverage = 'asteroidCollision' | 'deductible'

export type Quote = {
  policyHolder: {
    firstName: string
    lastName: string
  }
  premium: number
  quoteId: string
  ratingAddress: {
    city: string
    line1: string
    line2: string
    postal: string
    region: string
  }
  variableOptions: Record<
    Coverage,
    {
      default?: number
      description: string
      title: string
      values: Array<number> & { 0: number; 1: number }
    }
  >
  variableSelections: Record<Coverage, number>
}

export type FormData = Quote['variableSelections']

export type OnChange = (formData: FormData) => void

type Props = {
  onChange: OnChange
  quote: Quote
}

export const QuoteOverviewForm: React.FC<Props> = (
  props: Props,
): React.ReactElement => {
  /* eslint-disable-next-line react/destructuring-assignment */
  const { onChange }: Props = props

  /** `deductible` */
  const defaultDeductible: FormData['deductible'] = getDefaultDeductible(
    props.quote,
  )

  const [deductible, setDeductible]: [
    FormData['deductible'],
    React.Dispatch<React.SetStateAction<FormData['deductible']>>,
  ] = React.useState<FormData['deductible']>(defaultDeductible)

  /** `asteroidCollision` */
  const defaultAsteroidCollision: FormData['asteroidCollision'] = getDefaultAsteroidCollision(
    props.quote,
  )

  const [asteroidCollision, setAsteroidCollision]: [
    FormData['asteroidCollision'],
    React.Dispatch<React.SetStateAction<FormData['asteroidCollision']>>,
  ] = React.useState<FormData['asteroidCollision']>(defaultAsteroidCollision)

  /** `onChange` */
  React.useEffect((): void => {
    onChange({ asteroidCollision, deductible })
  }, [asteroidCollision, deductible, onChange])

  return (
    <Form data-testid="quote-overview-form" id="quote-overview-form">
      <Field
        data-testid="quote-overview-form-deductible-header"
        id="quote-overview-form-deductible-header"
      >
        <Label
          data-testid="quote-overview-form-deductible-header-label"
          id="quote-overview-form-deductible-header-label"
        >
          {headerText.deductible}
        </Label>
      </Field>

      <Field
        data-testid="quote-overview-form-deductible"
        id="quote-overview-form-deductible"
      >
        <Label
          data-testid="quote-overview-form-deductible-label"
          htmlFor="quote-overview-form-deductible-select"
          id="quote-overview-form-deductible-label"
        >
          {labelText.deductible}
        </Label>

        <Select
          data-testid="quote-overview-form-deductible-select"
          id="quote-overview-form-deductible-select"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
            setDeductible(Number(event.target.value))
          }}
          value={deductible}
        >
          {props.quote.variableOptions.deductible.values.map(
            (value: number, index: number): React.ReactElement => (
              <Option
                data-testid={`quote-overview-form-deductible-option-${value}`}
                id={`quote-overview-form-deductible-option-${value}`}
                /* eslint-disable-next-line react/no-array-index-key */
                key={`${value}-${index}`}
                value={value}
              >
                {value}
              </Option>
            ),
          )}
        </Select>
      </Field>

      <Field
        data-testid="quote-overview-form-asteroidCollision-header"
        id="quote-overview-form-asteroidCollision-header"
      >
        <Label
          data-testid="quote-overview-form-asteroidCollision-header-label"
          id="quote-overview-form-asteroidCollision-header-label"
        >
          {headerText.asteroidCollision}
        </Label>
      </Field>

      <Field
        data-testid="quote-overview-form-asteroidCollision"
        id="quote-overview-form-asteroidCollision"
      >
        <Label
          data-testid="quote-overview-form-asteroidCollision-label"
          htmlFor="quote-overview-form-asteroidCollision-select"
          id="quote-overview-form-asteroidCollision-label"
        >
          {labelText.asteroidCollision}
        </Label>

        <Select
          data-testid="quote-overview-form-asteroidCollision-select"
          id="quote-overview-form-asteroidCollision-select"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
            setAsteroidCollision(Number(event.target.value))
          }}
          value={asteroidCollision}
        >
          {props.quote.variableOptions.asteroidCollision.values.map(
            (value: number, index: number): React.ReactElement => (
              <Option
                data-testid={`quote-overview-form-asteroidCollision-option-${value}`}
                id={`quote-overview-form-asteroidCollision-option-${value}`}
                /* eslint-disable-next-line react/no-array-index-key */
                key={`${value}-${index}`}
                value={value}
              >
                {value}
              </Option>
            ),
          )}
        </Select>
      </Field>
    </Form>
  )
}

// #region /** Helpers */

export const defaultQuote: Quote = {
  policyHolder: {
    firstName: 'Prairie',
    lastName: 'Prairie',
  },
  premium: 6000,
  quoteId: 'UP5413263',
  ratingAddress: {
    city: 'Brooklyn',
    line1: '123 Mulberry Lane',
    line2: '3B',
    postal: '11211',
    region: 'NY',
  },
  variableOptions: {
    asteroidCollision: {
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
  variableSelections: {
    asteroidCollision: 100000,
    deductible: 500,
  },
}

export type GetDefaultAsteroidCollision = (
  quote: Quote,
) => FormData['asteroidCollision']

export const getDefaultAsteroidCollision: GetDefaultAsteroidCollision = (
  quote: Quote,
): FormData['asteroidCollision'] => {
  const {
    asteroidCollision: asteroidCollisionOptions,
  }: Quote['variableOptions'] = quote.variableOptions

  if (
    asteroidCollisionOptions.default !== undefined &&
    asteroidCollisionOptions.values.includes(asteroidCollisionOptions.default)
  ) {
    return asteroidCollisionOptions.default
  }

  return asteroidCollisionOptions.values[0]
}

export type GetDefaultDeductible = (quote: Quote) => FormData['deductible']

export const getDefaultDeductible: GetDefaultDeductible = (
  quote: Quote,
): FormData['deductible'] => {
  const {
    deductible: deductibleOptions,
  }: Quote['variableOptions'] = quote.variableOptions

  if (
    deductibleOptions.default !== undefined &&
    deductibleOptions.values.includes(deductibleOptions.default)
  ) {
    return deductibleOptions.default
  }

  return deductibleOptions.values[0]
}

type HeaderText = Record<keyof FormData, string>

export const headerText: HeaderText = {
  asteroidCollision: 'Asteroid Collision:',
  deductible: 'Deductible:',
}

type LabelText = Record<keyof FormData, string>

export const labelText: LabelText = {
  asteroidCollision: 'Select asteroid collision amount:',
  deductible: 'Select deductible amount:',
}

// #endregion /** Helpers */

// #region /** Styled Components */

const Field: StyledComponent<'div', Record<string, unknown>> = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 0;
`

const Form: StyledComponent<'form', Record<string, unknown>> = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Label: StyledComponent<'label', Record<string, unknown>> = styled.label`
  padding: 0 1rem;
`

const Option: StyledComponent<
  'option',
  Record<string, unknown>
> = styled.option``

const Select: StyledComponent<
  'select',
  Record<string, unknown>
> = styled.select`
  border: none;
  outline: 1px solid;
`

// #endregion /** Styled Components */
