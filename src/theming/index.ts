import { DefaultTheme, createGlobalStyle } from 'styled-components';

export const theme: DefaultTheme = {};

export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: 'border-box';
        margin: 0
    }

    :root {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    }
`;
