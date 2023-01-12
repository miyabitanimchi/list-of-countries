import { useContext } from "react";
import { CountriesListCtx } from "../contexts/countriesContext";
import Country from "./Country";
import styled from "styled-components";
import { CountryInfo } from "../types";

const CountriesList = () => {
  const { displayedCountries } = useContext(CountriesListCtx);

  return (
    <ListContainer>
      {displayedCountries.map((countryInfo: CountryInfo) => (
        <Country {...countryInfo} key={countryInfo.name} />
      ))}
    </ListContainer>
  );
};

export default CountriesList;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 900px;
  width: 100%;
`;
