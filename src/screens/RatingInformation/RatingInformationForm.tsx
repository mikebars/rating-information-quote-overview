import * as Polished from 'polished'
import * as React from 'react'
import { default as styled, StyledComponent } from 'styled-components/macro'

export type FormData = {
  address: {
    city: string
    line1: string
    line2: string
    postal: string
    region: string
  }
  name: {
    firstName: string
    lastName: string
  }
}

export type OnSubmit = (formData: FormData) => void

type Props = {
  onSubmit: OnSubmit
}

export const RatingInformationForm: React.FC<Props> = (
  props: Props,
): React.ReactElement => {
  /** name */
  const [firstName, setFirstName]: [
    FormData['name']['firstName'],
    React.Dispatch<React.SetStateAction<FormData['name']['firstName']>>,
  ] = React.useState<FormData['name']['firstName']>('')

  const [lastName, setLastName]: [
    FormData['name']['lastName'],
    React.Dispatch<React.SetStateAction<FormData['name']['lastName']>>,
  ] = React.useState<FormData['name']['lastName']>('')

  /** address */
  const [line1, setLine1]: [
    FormData['address']['line1'],
    React.Dispatch<React.SetStateAction<FormData['address']['line1']>>,
  ] = React.useState<FormData['address']['line1']>('')

  const [line2, setLine2]: [
    FormData['address']['line2'],
    React.Dispatch<React.SetStateAction<FormData['address']['line2']>>,
  ] = React.useState<FormData['address']['line2']>('')

  const [city, setCity]: [
    FormData['address']['city'],
    React.Dispatch<React.SetStateAction<FormData['address']['city']>>,
  ] = React.useState<FormData['address']['city']>('')

  const [region, setRegion]: [
    FormData['address']['region'],
    React.Dispatch<React.SetStateAction<FormData['address']['region']>>,
  ] = React.useState<FormData['address']['region']>('')

  const [postal, setPostal]: [
    FormData['address']['postal'],
    React.Dispatch<React.SetStateAction<FormData['address']['postal']>>,
  ] = React.useState<FormData['address']['postal']>('')

  return (
    <Form
      data-testid="rating-information-form"
      id="rating-information-form"
      onSubmit={(event: React.FormEvent<HTMLFormElement>): void => {
        event.persist()
        event.preventDefault()
        props.onSubmit({
          address: {
            city,
            line1,
            line2,
            postal,
            region,
          },
          name: {
            firstName,
            lastName,
          },
        })
      }}
    >
      <Field
        css={`
          flex-direction: column;
        `}
        data-testid="rating-information-form-name"
        id="rating-information-form-name"
      >
        <Field
          css={`
            justify-content: center;
          `}
          data-testid="rating-information-form-name-header"
          id="rating-information-form-name-header"
        >
          <Label
            data-testid="rating-information-form-name-header-label"
            id="rating-information-form-name-header-label"
          >
            {headerText.name}
          </Label>
        </Field>

        <Field
          data-testid="rating-information-form-name-first-name"
          id="rating-information-form-name-first-name"
        >
          <Label
            data-testid="rating-information-form-name-first-name-label"
            htmlFor="rating-information-form-name-first-name-input"
            id="rating-information-form-name-first-name-label"
          >
            {labelText.name.firstName}
          </Label>
          <InputText
            data-testid="rating-information-form-name-first-name-input"
            id="rating-information-form-name-first-name-input"
            name="rating-information-form-name-first-name-input"
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setFirstName(event.target.value)
            }}
            required={true}
            title="Your Legal First Name e.g. Jane"
            value={firstName}
          />
        </Field>

        <Field
          data-testid="rating-information-form-name-last-name"
          id="rating-information-form-name-last-name"
        >
          <Label
            data-testid="rating-information-form-name-last-name-label"
            htmlFor="rating-information-form-name-last-name-input"
            id="rating-information-form-name-last-name-label"
          >
            {labelText.name.lastName}
          </Label>
          <InputText
            data-testid="rating-information-form-name-last-name-input"
            id="rating-information-form-name-last-name-input"
            name="rating-information-form-name-last-name-input"
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setLastName(event.target.value)
            }}
            required={true}
            title="Your Legal Last Name e.g. Smith"
            value={lastName}
          />
        </Field>
      </Field>

      <Field
        css={`
          flex-direction: column;
        `}
        data-testid="rating-information-form-address"
        id="rating-information-form-address"
      >
        <Field
          css={`
            justify-content: center;
          `}
          data-testid="rating-information-form-address-header"
          id="rating-information-form-address-header"
        >
          <Label
            data-testid="rating-information-form-address-header-label"
            id="rating-information-form-address-header-label"
          >
            {headerText.address}
          </Label>
        </Field>

        <Field
          data-testid="rating-information-form-address-line-1"
          id="rating-information-form-address-line-1"
        >
          <Label
            data-testid="rating-information-form-address-line-1-label"
            htmlFor="rating-information-form-address-line-1-input"
            id="rating-information-form-address-line-1-label"
          >
            {labelText.address.line1}
          </Label>
          <InputText
            data-testid="rating-information-form-address-line-1-input"
            id="rating-information-form-address-line-1-input"
            name="rating-information-form-address-line-1-input"
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setLine1(event.target.value)
            }}
            required={true}
            title="Address Line 1 e.g. 1313 Mockingbird Lane"
            value={line1}
          />
        </Field>

        <Field
          data-testid="rating-information-form-address-line-2"
          id="rating-information-form-address-line-2"
        >
          <Label
            data-testid="rating-information-form-address-line-2-label"
            htmlFor="rating-information-form-address-line-2-input"
            id="rating-information-form-address-line-2-label"
          >
            {labelText.address.line2}
          </Label>
          <InputText
            data-testid="rating-information-form-address-line-2-input"
            id="rating-information-form-address-line-2-input"
            name="rating-information-form-address-line-2-input"
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setLine2(event.target.value)
            }}
            title="Address Line 2 (Optional) e.g. Apt 23"
            value={line2}
          />
        </Field>

        <Field
          data-testid="rating-information-form-address-city"
          id="rating-information-form-address-city"
        >
          <Label
            data-testid="rating-information-form-address-city-label"
            htmlFor="rating-information-form-address-city-input"
            id="rating-information-form-address-city-label"
          >
            {labelText.address.city}
          </Label>
          <InputText
            data-testid="rating-information-form-address-city-input"
            id="rating-information-form-address-city-input"
            name="rating-information-form-address-city-input"
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setCity(event.target.value)
            }}
            required={true}
            title="U.S. City Name e.g. Los Angeles"
            value={city}
          />
        </Field>

        <Field
          data-testid="rating-information-form-address-region"
          id="rating-information-form-address-region"
        >
          <Label
            data-testid="rating-information-form-address-region-label"
            htmlFor="rating-information-form-address-region-input"
            id="rating-information-form-address-region-label"
          >
            {labelText.address.region}
          </Label>
          <InputText
            id="rating-information-form-address-region-input"
            maxLength={2} // tslint:disable-line:no-magic-numbers
            minLength={2} // tslint:disable-line:no-magic-numbers
            name="rating-information-form-address-region-input"
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setRegion(event.target.value)
            }}
            pattern="[a-zA-Z]{2}"
            required={true}
            title="2 Character U.S. State Abbreviation e.g. CA"
            value={region}
          />
        </Field>

        <Field
          data-testid="rating-information-form-address-postal"
          id="rating-information-form-address-postal"
        >
          <Label
            data-testid="rating-information-form-address-postal-label"
            htmlFor="rating-information-form-address-postal-input"
            id="rating-information-form-address-postal-label"
          >
            {labelText.address.postal}
          </Label>
          <InputText
            id="rating-information-form-address-postal-input"
            maxLength={5} // tslint:disable-line:no-magic-numbers
            minLength={5} // tslint:disable-line:no-magic-numbers
            name="rating-information-form-address-postal-input"
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setPostal(event.target.value)
            }}
            pattern="[0-9]{5}"
            required={true}
            title="5 Digit ZIP Code e.g. 90210"
            value={postal}
          />
        </Field>
      </Field>

      <Field
        css={`
          justify-content: center;
        `}
        data-testid="rating-information-form-submit"
        id="rating-information-form-submit"
      >
        <InputSubmit
          data-testid="rating-information-form-submit-input"
          id="rating-information-form-submit-input"
        />
      </Field>
    </Form>
  )
}

// #region /** Helpers */

type HeaderText = Record<keyof FormData, string>

export const headerText: HeaderText = {
  address: 'Address:',
  name: 'Name:',
}

type LabelText = {
  [K1 in keyof FormData]: Record<keyof FormData[K1], string>
}

export const labelText: LabelText = {
  address: {
    city: 'City: (required)',
    line1: 'Line 1: (required)',
    line2: 'Line 2:',
    postal: 'ZIP Code: (required)',
    region: 'State: (required)',
  },
  name: {
    firstName: 'First name: (required)',
    lastName: 'Last name: (required)',
  },
}

// #endregion /** Helpers */

// #region /** Styled Components */

const Field: StyledComponent<'div', Record<string, unknown>> = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 0;
`

const Form: StyledComponent<'form', Record<string, unknown>> = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const InputSubmit: StyledComponent<
  'input',
  Record<string, unknown>
> = styled.input.attrs({ type: 'submit' })``

const InputText: StyledComponent<
  'input',
  Record<string, unknown>
> = styled.input.attrs({ type: 'text' })`
  border: none;
  outline: 1px solid;
`

/* tslint:disable:strict-string-expressions */
const Label: StyledComponent<'label', Record<string, unknown>> = styled.label`
  /* stylelint-disable value-keyword-case */
  ${Polished.ellipsis()}
  /* stylelint-enable value-keyword-case */
  padding: 0 1rem;
`
/* tslint:enable:strict-string-expressions */

// #endregion /** Styled Components */
