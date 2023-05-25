import { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { ComboBoxContainer } from './features/combo-box/container.component';
import { GlobalStyle, theme } from './theming';

const App: FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <ComboBoxContainer />
  </ThemeProvider>
);

export default App;
