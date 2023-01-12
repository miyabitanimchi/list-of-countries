import { useContext } from "react";
import { CountriesListCtx } from "../contexts/countriesListContext";
import { Country } from "./";
import styled from "styled-components";
import { CountryInfo } from "../types";

const CountriesList = () => {
  const { displayedCountries, error } = useContext(CountriesListCtx);

  if (error)
    return (
      <ListContainer>
        <ErrorText>{error}</ErrorText>
      </ListContainer>
    );

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

const ErrorText = styled.p`
  text-align: center;
  color: red;
  margin-top: 20px;
`;
