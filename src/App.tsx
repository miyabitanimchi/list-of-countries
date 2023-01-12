import { useEffect, useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./styles/global";
import { defaultTheme } from "./styles/theme";
import CountriesList from "./components/CountriesList";
import FilterBox from "./components/FilterBox";
import CountriesCtx from "./contexts/countriesContext";
import axios from "axios";
import { SORT_BY } from "./constants";
import { CountryInfo } from "./types";
import { normalizeCountry } from "./utils/index";

function App() {
  const [allCountries, setAllCountries] = useState<CountryInfo[]>([]);
  const [displayedCountries, setDisplayedCountries] = useState<CountryInfo[]>(
    []
  );
  const [selectedFilter, setSelectedFilter] = useState<string>(SORT_BY);

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

  if (!displayedCountries.length) {
    return (
      <LoadingContainer>
        <img src="/loading.svg" alt="Loading..." />
      </LoadingContainer>
    );
  }

  return (
    <CountriesCtx.Provider
      value={{
        allCountries,
        displayedCountries,
        selectedFilter,
        setSelectedFilter,
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
