import React, { useContext, useState } from "react";
import styled from "styled-components";
import { defaultTheme } from "../styles/theme";
import CountriesCtx from "../contexts/countriesContext";
import { CountryInfo } from "../types";
import { normalizeCountry } from "../utils";
import { Cross } from "@styled-icons/entypo";
import { Search } from "@styled-icons/evaicons-solid";
import axios from "axios";

const MOST_POPULATED = "Most Populated";
const LEAST_POPULATED = "Least Populated";
const ALPHABETICAL_ORDER = "Alphabetical Order";

const SORT_OPTIONS: readonly string[] = [
  "Sort by",
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
    default:
      return countriesCopies;
  }
};

const FilterBox = () => {
  const { displayedCountries, setDisplayedCountries } =
    useContext(CountriesCtx);
  const [searchText, setSearchText] = useState<string>("");

  const handleFilterOption = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    console.log(sortCountriesList(e.target.value, displayedCountries));
    setDisplayedCountries(
      sortCountriesList(e.target.value, displayedCountries)
    );
  };

  const onResetSearchText = (): void => {
    setSearchText("");
  };

  const onSearchCountry = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    try {
      const response: any = await axios.get(
        `https://restcountries.com/v3.1/name/${searchText}`
      );
      const countriesData = normalizeCountry(response.data);
      setDisplayedCountries(countriesData);
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
          <option key={sortOption} value={sortOption}>
            {sortOption}
          </option>
        ))}
      </select>
      <button>Reset</button>
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
