import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body {
    margin: 0;
    height: 100%;
    background: #f1f1f1;
  }

  #root {
    height: 100%;
    max-height: 100vh;
  }
`;

export default GlobalStyle;