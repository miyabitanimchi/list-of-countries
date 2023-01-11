import { createContext } from "react";
import { CountryInfo } from "../types";
import { SORT_BY } from "../constants";
interface CountriesContext {
  allCountries: CountryInfo[];
  displayedCountries: CountryInfo[];
  selectedFilter: string;
  setDisplayedCountries: (filteredCountries: CountryInfo[]) => void;
  setSelectedFilter: (selectedFilter: string) => void;
}

const CountriesCtx = createContext<CountriesContext>({
  allCountries: [],
  displayedCountries: [],
  selectedFilter: SORT_BY,
  setSelectedFilter: () => {},
  setDisplayedCountries: () => {},
});

export default CountriesCtx;
