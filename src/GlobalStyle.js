import { createGlobalStyle } from 'styled-components';

const baseFontSize = 14;
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Avenir Next', Helvetica, sans-serif;
    font-size: ${baseFontSize / 16}em;
    line-height: 1.2;
    height: auto;
    width: auto;
  }
`;

export default GlobalStyle;
