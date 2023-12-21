import { createGlobalStyle, css } from 'styled-components';

const globalStyle = css`
  body {
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 700;
  }
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  html,
  body,
  div,
  span,
  h1,
  h2,
  h3,
  p,
  img,
  i,
  ul,
  li,
  form,
  label,
  article,
  footer,
  header,
  main,
  menu,
  nav,
  section {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  article,
  footer,
  header,
  main,
  nav,
  section {
    display: block;
  }

  *[hidden] {
    display: none;
  }

  ul {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${globalStyle};
`;

export default GlobalStyle;
