import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyle';
import theme from 'theme/theme';
import Header from 'components/Header';

interface MainTemplateProps {
  children: React.ReactNode;
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 4rem;
  padding: 12rem 3rem 3rem 3rem;
`;

const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledWrapper>
        <Header>Wordcloud game</Header>
        {children}
      </StyledWrapper>
    </ThemeProvider>
  );
};

export default MainTemplate;
