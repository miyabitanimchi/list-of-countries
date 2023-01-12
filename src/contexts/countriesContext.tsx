import React, { createContext, useState, useEffect } from "react";
import { CountryInfo } from "../types";
import { SORT_BY } from "../constants";
import { normalizeCountry } from "../utils/index";
import axios from "axios";
interface CountriesListContext {
  allCountries: CountryInfo[];
  displayedCountries: CountryInfo[];
  selectedFilter: string;
  setDisplayedCountries: (filteredCountries: CountryInfo[]) => void;
  setSelectedFilter: (selectedFilter: string) => void;
}

export const CountriesListCtx = createContext<CountriesListContext>({
  allCountries: [],
  displayedCountries: [],
  selectedFilter: SORT_BY,
  setSelectedFilter: () => {},
  setDisplayedCountries: () => {},
});

const CountriesListContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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

  return (
    <CountriesListCtx.Provider
      value={{
        allCountries,
        displayedCountries,
        selectedFilter,
        setSelectedFilter,
        setDisplayedCountries,
      }}
    >
      {children}
    </CountriesListCtx.Provider>
  );
};

export default CountriesListContextProvider;
