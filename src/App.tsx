import { useEffect, useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./styles/global";
import { defaultTheme } from "./styles/theme";
import CountriesList from "./components/CountriesList";
import FilterBox from "./components/FilterBox";
import CountriesCtx from "./contexts/countriesContext";
import axios from "axios";
import { CountryInfo } from "./types";
import { normalizeCountry } from "./utils/index";

function App() {
  const [allCountries, setAllCountries] = useState<CountryInfo[]>([]);
  const [displayedCountries, setDisplayedCountries] = useState<CountryInfo[]>(
    []
  );

  const getCountries = async () => {
    try {
      const response: any = await axios.get(
        "https://restcountries.com/v3.1/all"
      );
      const countriesData = normalizeCountry(response.data);
      setAllCountries(countriesData);
      setDisplayedCountries(countriesData);
    } catch (error) {}
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <CountriesCtx.Provider
      value={{
        allCountries,
        displayedCountries,
        setDisplayedCountries,
      }}
    >
      <MainContainer theme={defaultTheme}>
        <GlobalStyle />
        <CountriesList />
        <FilterBox />
      </MainContainer>
    </CountriesCtx.Provider>
  );
}

export default App;

const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.main};
  display: flex;
  justify-content: center;
  gap: 50px;
  padding-top: 30px;
`;
