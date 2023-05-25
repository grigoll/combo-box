import { DefaultTheme, createGlobalStyle } from 'styled-components';

const themeUtils = {
  spacing: (value: number) => 8 * value,
};

export const theme: DefaultTheme & typeof themeUtils = {
  sizing: {
    radius: 8,
  },
  ...themeUtils,
};

export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: 'border-box';
        margin: 0;
        padding: 0;
    }

    :root {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    }

    html, body, #root {
        height: 100%;
        width: 100%;
    }
`;
