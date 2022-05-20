import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    height: 100%;
    font-size: 62.5%;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-size: 1.6rem;
    font-family: ${({ theme }) => theme.font.family}, sans-serif;
    background-color: ${({ theme }) => theme.bgPrimary};

    * {
      margin: 0;
      padding: 0;
      font-family: ${({ theme }) => theme.font.family}, sans-serif;
    }
  }

  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }

  #root {
    height: 100%;
  }
`;

export default GlobalStyle;
