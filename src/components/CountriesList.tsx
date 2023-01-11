import { useContext } from "react";
import axios from "axios";
import Country from "./Country";
import styled from "styled-components";
import CountriesCtx from "../contexts/countriesContext";

interface CountryInfo {
  name: string;
  population: number;
  flag: string;
}

const CountriesList = () => {
  const { displayedCountries } = useContext(CountriesCtx);

  if (!displayedCountries.length) {
    return <div>Loading...</div>;
  }

  return (
    <ListContainer>
      {displayedCountries.map((countryInfo: CountryInfo) => (
        <Country countryInfo={countryInfo} />
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
