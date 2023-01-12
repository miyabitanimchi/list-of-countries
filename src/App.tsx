import styled from "styled-components";
import GlobalStyle from "./styles/global";
import { defaultTheme } from "./styles/theme";
import CountriesListContextProvider from "./contexts/countriesContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountriesPage from "./pages/CountriesPage";
import { Header } from "./components";

function App() {
  return (
    <CountriesListContextProvider>
      <GlobalStyle />
      <Header />
      <MainContainer theme={defaultTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CountriesPage />} />
          </Routes>
        </BrowserRouter>
      </MainContainer>
    </CountriesListContextProvider>
  );
}

export default App;

const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.main};
  padding: 80px 30px 30px 30px;
  min-height: 100vh;
`;
