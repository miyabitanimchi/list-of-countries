import styled from "styled-components";
import GlobalStyle from "./styles/global";
import { defaultTheme } from "./styles/theme";
import CountriesListContextProvider from "./contexts/countriesContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountriesPage from "./pages/CountriesPage";

function App() {
  return (
    <CountriesListContextProvider>
      <MainContainer theme={defaultTheme}>
        <GlobalStyle />
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
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 30px;
  min-height: 100vh;
`;
