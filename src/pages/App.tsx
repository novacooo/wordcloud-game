import { Helmet } from 'react-helmet';
import MainTemplate from 'templates/MainTemplate';

const App = () => (
  <>
    <Helmet>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
        rel="stylesheet"
      />
    </Helmet>
    <MainTemplate>
      <div>
        <p>Wordcloud Game</p>
      </div>
    </MainTemplate>
  </>
);

export default App;
