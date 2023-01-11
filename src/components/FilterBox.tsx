import React, { useContext, useState } from "react";
import styled from "styled-components";
import { defaultTheme } from "../styles/theme";
import CountriesCtx from "../contexts/countriesContext";
import { CountryInfo } from "../types";
import { normalizeCountry } from "../utils";
import { Cross } from "@styled-icons/entypo";
import { Search } from "@styled-icons/evaicons-solid";
import axios from "axios";

const SORT_BY = "Sort by";
const MOST_POPULATED = "Most Populated";
const LEAST_POPULATED = "Least Populated";
const ALPHABETICAL_ORDER = "Alphabetical Order";

const SORT_OPTIONS: readonly string[] = [
  SORT_BY,
  MOST_POPULATED,
  LEAST_POPULATED,
  ALPHABETICAL_ORDER,
];

const sortCountriesList = (
  sortOption: string,
  countries: CountryInfo[]
): CountryInfo[] => {
  const countriesCopies = [...countries];
  switch (sortOption) {
    case MOST_POPULATED:
      return countriesCopies.sort((a, b) => b.population - a.population);
    case LEAST_POPULATED:
      return countriesCopies.sort((a, b) => a.population - b.population);
    case ALPHABETICAL_ORDER:
      return countriesCopies.sort((a, b) => a.name.localeCompare(b.name));
    case SORT_BY:
      return countriesCopies;
    default:
      return countriesCopies;
  }
};

const FilterBox = () => {
  const { allCountries, displayedCountries, setDisplayedCountries } =
    useContext(CountriesCtx);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>(SORT_BY);

  const handleFilterOption = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (e.target.value === SORT_BY) {
      setDisplayedCountries(allCountries);
    } else {
      setDisplayedCountries(
        sortCountriesList(e.target.value, displayedCountries)
      );
    }
    setSelectedFilter(e.target.value);
  };

  const onResetSearchText = (): void => {
    setSearchText("");
  };

  const onResetFilter = (): void => {
    setSearchText("");
    setDisplayedCountries(allCountries);
    setSelectedFilter(SORT_BY);
  };

  const onSearchCountry = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    try {
      const response: any = await axios.get(
        `https://restcountries.com/v3.1/name/${searchText}`
      );
      const countriesData = normalizeCountry(response.data);
      setDisplayedCountries(countriesData);
      setSelectedFilter(SORT_BY);
    } catch (error) {}
  };

  return (
    <FilterContainer theme={defaultTheme}>
      <SearchWrap>
        <input
          type="text"
          placeholder="Search by country name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={onSearchCountry}
        />
        <Search className="searchIcon" />
        {searchText !== "" && (
          <Cross className="crossIcon" onClick={onResetSearchText} />
        )}
      </SearchWrap>
      <select name="" id="" onChange={handleFilterOption}>
        {SORT_OPTIONS.map((sortOption) => (
          <option
            key={sortOption}
            value={sortOption}
            selected={selectedFilter === sortOption}
          >
            {sortOption}
          </option>
        ))}
      </select>
      <ResetButton onClick={onResetFilter}>Reset Filter</ResetButton>
    </FilterContainer>
  );
};

export default FilterBox;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.secondary};
  height: fit-content;
  width: 300px;
  padding: 25px;
  position: sticky;
  top: 30px;
  border-radius: 10px;
`;

const SearchWrap = styled.div`
  position: relative;
  input {
    border-radius: 5px;
    padding: 5px 10px 5px 30px;
    border: 1px solid lightgray;
    width: 100%;
    font-size: 16px;
  }
  svg {
    position: absolute;
    top: 6px;
    color: gray;
  }

  .searchIcon {
    left: 5px;
    width: 20px;
  }

  .crossIcon {
    width: 23px;
    right: 2px;
    cursor: pointer;
  }

  + select {
    border-radius: 5px;
    padding: 5px 0;
    border: 1px solid lightgray;
  }
`;

const ResetButton = styled.button`
  margin-left: auto;
  border-radius: 5px;
  width: 100px;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid #04d1ae;
  background-color: #05fad0;
  margin-top: 5px;
`;
