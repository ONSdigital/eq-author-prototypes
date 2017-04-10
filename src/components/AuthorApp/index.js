import React from 'react'
import {injectGlobal, ThemeProvider} from 'styled-components'
import theme from 'constants/theme'

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    -webkit-font-smoothing: antialiased;
  }
  body {
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    color: ${theme.colorText};
  }
`

export default ({children}) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)