import React, { useContext, useState } from "react";
import styled from "styled-components";
import { defaultTheme } from "../styles/theme";
import { CountriesListCtx } from "../contexts/countriesListContext";
import {
  SORT_BY,
  MOST_POPULATED,
  LEAST_POPULATED,
  ALPHABETICAL_ORDER,
  HIGH_LATITUDE_TO_LOW,
  LOW_LATITUDE_TO_HIGH,
} from "../constants";
import { CountryInfo } from "../types";
import { normalizeCountry } from "../utils";
import { Cross } from "@styled-icons/entypo";
import { Search } from "@styled-icons/evaicons-solid";
import axios from "axios";

const SORT_OPTIONS: readonly string[] = [
  SORT_BY,
  MOST_POPULATED,
  LEAST_POPULATED,
  ALPHABETICAL_ORDER,
  HIGH_LATITUDE_TO_LOW,
  LOW_LATITUDE_TO_HIGH,
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
    case HIGH_LATITUDE_TO_LOW:
      return countriesCopies.sort(
        (a, b) =>
          b.latitude.lat * Math.sign(b.latitude.lat) -
          a.latitude.lat * Math.sign(a.latitude.lat)
      );
    case LOW_LATITUDE_TO_HIGH:
      return countriesCopies.sort(
        (a, b) =>
          a.latitude.lat * Math.sign(a.latitude.lat) -
          b.latitude.lat * Math.sign(b.latitude.lat)
      );
    default:
      return countriesCopies;
  }
};

const FilterBox = () => {
  const {
    allCountries,
    displayedCountries,
    selectedFilter,
    error,
    setDisplayedCountries,
    setSelectedFilter,
    setError,
  } = useContext(CountriesListCtx);
  const [searchText, setSearchText] = useState<string>("");

  const handleFilterOption = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (e.target.value === SORT_BY) {
      setDisplayedCountries(allCountries);
    } else {
      const listToFilter = !searchText ? allCountries : displayedCountries;
      setDisplayedCountries(sortCountriesList(e.target.value, listToFilter));
    }
    setSelectedFilter(e.target.value);
    if (error && !searchText) setError("");
  };

  const onResetSearchText = (): void => {
    setSearchText("");
  };

  const onResetFilter = (): void => {
    setError("");
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
    } catch (error) {
      setError("No Result");
    }
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
      <select
        name=""
        id=""
        onChange={handleFilterOption}
        value={selectedFilter}
      >
        {SORT_OPTIONS.map((sortOption) => (
          <option key={sortOption} value={sortOption}>
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
  margin-right: 5px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  margin-top: 5px;
  text-decoration: underline;
  border: none;
  background: rgba(255, 255, 255, 0);
`;
