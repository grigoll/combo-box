import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './theming';

function App() {
  return <>APP</>;
}

export default function Shell() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  );
}
