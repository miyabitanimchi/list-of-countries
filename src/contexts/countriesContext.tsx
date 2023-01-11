import { createContext } from "react";
import { CountryInfo } from "../types";
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
