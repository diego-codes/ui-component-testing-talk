import { createGlobalStyle } from 'styled-components';

const baseFontSize = 14;
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,600');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'IBM Plex Sans', Helvetica, sans-serif;
    font-size: ${baseFontSize / 16}em;
    line-height: 1.2;
  }
`;

export default GlobalStyle;
