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
    <PageWrapper>
      <CountriesList />
      <FilterBox />
    </PageWrapper>
  );
};

export default CountriesPage;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    padding-bottom: 150px;
  }
`;
