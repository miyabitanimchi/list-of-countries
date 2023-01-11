import React, { useContext } from "react";
import styled from "styled-components";
import { defaultTheme } from "../styles/theme";
import CountriesCtx from "../contexts/countriesContext";

const MOST_POPULATED = "Most Populated";
const LEAST_POPULATED = "Least Populated";
const ALPHABETICAL_ORDER = "Alphabetical Order";

const SORT_OPTIONS: readonly string[] = [
  "Sort by",
  MOST_POPULATED,
  LEAST_POPULATED,
  ALPHABETICAL_ORDER,
];

interface CountryInfo {
  name: string;
  population: number;
  flag: string;
}

const sortCountriesList = (sortOption: string, countries: CountryInfo[]) => {
  const countriesCopies = [...countries];
  switch (sortOption) {
    case MOST_POPULATED:
      return countriesCopies.sort((a, b) => b.population - a.population);
    case LEAST_POPULATED:
      return countriesCopies.sort((a, b) => a.population - b.population);
    // case ALPHABETICAL_ORDER:
    //   return countriesCopies.sort((a, b) => a.name - b.name);
    default:
      return countriesCopies;
  }
};

const FilterBox = () => {
  const { displayedCountries, setDisplayedCountries } =
    useContext(CountriesCtx);

  const handleFilterOption = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    console.log(sortCountriesList(e.target.value, displayedCountries));
    setDisplayedCountries(
      sortCountriesList(e.target.value, displayedCountries)
    );
  };

  return (
    <FilterContainer theme={defaultTheme}>
      <input type="text" placeholder="Search by country name" />
      <select name="" id="" onChange={handleFilterOption}>
        {SORT_OPTIONS.map((sortOption) => (
          <option key={sortOption} value={sortOption}>
            {sortOption}
          </option>
        ))}
      </select>
    </FilterContainer>
  );
};

export default FilterBox;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.secondary};
  height: fit-content;
  width: 200px;
  padding: 20px;
  position: sticky;
  top: 0;
  border-radius: 10px;
`;
