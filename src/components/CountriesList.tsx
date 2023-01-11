import { useContext } from "react";
import Country from "./Country";
import styled from "styled-components";
import CountriesCtx from "../contexts/countriesContext";
import { CountryInfo } from "../types";

const CountriesList = () => {
  const { displayedCountries } = useContext(CountriesCtx);

  if (!displayedCountries.length) {
    return <div>Loading...</div>;
  }

  return (
    <ListContainer>
      {displayedCountries.map((countryInfo: CountryInfo) => (
        <Country countryInfo={countryInfo} key={countryInfo.name} />
      ))}
    </ListContainer>
  );
};

export default CountriesList;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
