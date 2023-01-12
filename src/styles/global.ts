import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      outline:0;
      box-sizing:border-box;
      font-family: 'Nunito', sans-serif;
  }

  #root {
      margin:0 auto;
  }
  a {
    text-decoration: none;
    color: #3c3c3c;
  }
`;

export default GlobalStyle;
