import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
}

body {
    font-family: 'Open Sans Condensed';
    padding: 20px 40px;

    @media screen and (max-width: 800px) {
        padding: 10px 20px;
    }
}

a {
    text-decoration: none;
    color: black;
}

`;
