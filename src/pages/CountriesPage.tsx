import { useContext } from "react";
import { CountriesListCtx } from "../contexts/countriesContext";
import CountriesList from "../components/CountriesList";
import FilterBox from "../components/FilterBox";
import styled from "styled-components";

const CountriesPage = () => {
  const { displayedCountries } = useContext(CountriesListCtx);

  if (!displayedCountries.length) {
    return (
      <LoadingContainer>
        <img src="/loading.svg" alt="Loading..." />
      </LoadingContainer>
    );
  }

  return (
    <>
      <CountriesList />
      <FilterBox />
    </>
  );
};

export default CountriesPage;

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    padding-bottom: 30px;
  }
`;
