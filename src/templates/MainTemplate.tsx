import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyle';
import theme from 'theme/theme';

interface MainTemplateProps {
  children: React.ReactNode;
}

const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default MainTemplate;
