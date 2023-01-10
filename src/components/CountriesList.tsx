import { useEffect, useState } from "react";
import axios from "axios";
import Country from "./Country";
import styled from "styled-components";

interface CountryInfo {
  name: string;
  population: number;
  flag: string;
}

const normalizeCountry = (data: any) => {
  const normalizedData = [];

  for (let eachData of data) {
    normalizedData.push({
      name: eachData.name.common,
      population: eachData.population,
      flag: eachData.flags.png,
    });
  }
  return normalizedData;
};

const CountriesList = () => {
  const [countries, setCountries] = useState<CountryInfo[]>([]);

  const getCountries = async () => {
    try {
      const response: any = await axios.get(
        "https://restcountries.com/v3.1/all"
      );
      console.log(response.data);
      setCountries(normalizeCountry(response.data));
    } catch (error) {}
  };

  useEffect(() => {
    getCountries();
  }, []);

  if (!countries.length) {
    return <div>Loading...</div>;
  }

  return (
    <ListContainer>
      {countries.map((countryInfo: CountryInfo) => (
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
