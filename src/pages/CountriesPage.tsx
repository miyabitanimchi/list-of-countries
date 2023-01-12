import { useContext } from "react";
import { CountriesListCtx } from "../contexts/countriesListContext";
import { CountriesList, FilterBox } from "../components";
import { Info } from "../components";
import styled from "styled-components";

const CountriesPage = () => {
  const { displayedCountries, error } = useContext(CountriesListCtx);

  if (!displayedCountries.length && !error) {
    return (
      <LoadingContainer>
        <img src="/loading.svg" alt="Loading..." />
      </LoadingContainer>
    );
  }

  return (
    <PageContainer>
      <CountriesList />
      <RightContainer>
        <FilterBox />
        <Info />
      </RightContainer>
    </PageContainer>
  );
};

export default CountriesPage;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: start;
  gap: 30px;
  position: sticky;
  top: 80px;
`;

const LoadingContainer = styled.div`
  height: calc(100vh - 110px);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    padding-bottom: 80px;
  }
`;
