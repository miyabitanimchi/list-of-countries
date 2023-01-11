import { useEffect, useState } from "react";
import styled from "styled-components";
import { defaultTheme } from "./styles/theme";
import CountriesList from "./components/CountriesList";
import FilterBox from "./components/FilterBox";
import CountriesCtx from "./contexts/countriesContext";
import axios from "axios";

interface CountryInfo {
  name: string;
  population: number;
  flag: string;
}

const normalizeCountry = (data: any): CountryInfo[] => {
  const normalizedData = [];

  for (let eachData of data) {
    normalizedData.push({
      name: eachData.name.common,
      population: eachData.population,
      flag: eachData.flags.png,
    });
  }
  return normalizedData;
};

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
      <GlobalStyle theme={defaultTheme}>
        <CountriesList />
        <FilterBox />
      </GlobalStyle>
    </CountriesCtx.Provider>
  );
}

export default App;

const GlobalStyle = styled.div`
  background-color: ${({ theme }) => theme.colors.main};
  display: flex;
  justify-content: center;
  gap: 50px;
`;
