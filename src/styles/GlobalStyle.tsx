import * as Polished from 'polished'
import * as StyledComponents from 'styled-components'

/* tslint:disable:strict-string-expressions */
export const GlobalStyle: StyledComponents.GlobalStyleComponent<
  unknown,
  StyledComponents.DefaultTheme
> = StyledComponents.createGlobalStyle`
  ${Polished.normalize()}

  * {
    box-sizing: border-box;
  }

  html, body, #container {
    height: 100vh;
    margin: 0;
    padding: 0;
    width: 100vw;
  }

  #container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`
/* tslint:enable:strict-string-expressions */
