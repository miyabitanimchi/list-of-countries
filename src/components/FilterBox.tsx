import React, { useContext, useState } from "react";
import styled from "styled-components";
import { defaultTheme } from "../styles/theme";
import { CountriesListCtx } from "../contexts/countriesListContext";
import { SORT_BY, SORT_OPTIONS } from "../constants";
import { normalizeCountry, sortCountriesList } from "../utils";
import { Cross } from "@styled-icons/entypo";
import { Search } from "@styled-icons/evaicons-solid";
import axios from "axios";

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
      setSearchText(""); // reset search input as well
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
      setError("");
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
        name="filterOption"
        id="filterOption"
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
