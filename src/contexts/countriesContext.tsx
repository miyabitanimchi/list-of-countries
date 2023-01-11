import { createContext, useState, useEffect } from "react";

interface CountryInfo {
  name: string;
  population: number;
  flag: string;
}

interface CountriesContext {
  allCountries: CountryInfo[];
  displayedCountries: CountryInfo[];
  setDisplayedCountries: (filteredCountries: CountryInfo[]) => void;
}

const CountriesCtx = createContext<CountriesContext>({
  allCountries: [],
  displayedCountries: [],
  setDisplayedCountries: () => {},
});

export default CountriesCtx;
