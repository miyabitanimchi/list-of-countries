import styled from "styled-components";
import GlobalStyle from "./styles/global";
import { defaultTheme } from "./styles/theme";
import CountriesList from "./components/CountriesList";
import FilterBox from "./components/FilterBox";
import CountriesListContextProvider from "./contexts/countriesContext";

function App() {
  // const [displayedCountries, setDisplayedCountries] = useState<CountryInfo[]>(
  //   []
  // );

  // if (!displayedCountries.length) {
  //   return (
  //     <LoadingContainer>
  //       <img src="/loading.svg" alt="Loading..." />
  //     </LoadingContainer>
  //   );
  // }

  return (
    <CountriesListContextProvider>
      <MainContainer theme={defaultTheme}>
        <GlobalStyle />
        <CountriesList />
        <FilterBox />
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

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    padding-bottom: 30px;
  }
`;
