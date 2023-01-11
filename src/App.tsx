import styled from "styled-components";
import { defaultTheme } from "./styles/theme";
import CountriesList from "./components/CountriesList";
import FilterBox from "./components/FilterBox";

function App() {
  return (
    <GlobalStyle theme={defaultTheme}>
      <CountriesList />
      <FilterBox />
    </GlobalStyle>
  );
}

export default App;

const GlobalStyle = styled.div`
  background-color: ${({ theme }) => theme.colors.main};
  display: flex;
  justify-content: center;
  gap: 50px;
`;
