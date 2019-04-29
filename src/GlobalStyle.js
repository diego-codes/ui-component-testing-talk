import { createGlobalStyle } from 'styled-components';

const baseFontSize = 14;
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'IBM Plex Sans', Helvertica, Arial, sans-serif;
    font-size: ${baseFontSize / 16}em;
  }
`;

export default GlobalStyle;
