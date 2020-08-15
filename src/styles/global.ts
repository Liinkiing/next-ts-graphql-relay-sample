import { createGlobalStyle } from 'styled-components'
import bootstrap from '~/styles/bootstrap'
import { BREAKPOINTS, MAIN_BACKGROUND } from '~/styles/modules/variables'
import { theme } from '~/styles/themes'

export default createGlobalStyle`
  ${bootstrap};

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
  }

  body {
    ${MAIN_BACKGROUND};
    height: 100vh;
    width: 100vw;
    color: ${props => theme(props).colors.text};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${props => theme(props).fonts.heading};
  }

  code, pre {
    font-family: ${props => theme(props).fonts.mono};
  }

  p {
    font-family: ${props => theme(props).fonts.body};
  }

  #__next {
    display: flex;
    flex-direction: column;
    @media screen and (min-width: ${BREAKPOINTS.tablet}) {
      height: 100vh;
      flex-direction: row;
    }
    & .router__wrapper {
      padding-bottom: 80px;
      @media screen and (min-width: ${BREAKPOINTS.tablet}) {
        overflow-y: scroll;
        padding-bottom: 0;
      }
      flex: 1;
    }
  }
`
