import CountriesList from "./components/CountriesList";
import styled from "styled-components";
import { defaultTheme } from "./styles/theme";

function App() {
  return (
    <GlobalStyle theme={defaultTheme}>
      <CountriesList />
    </GlobalStyle>
  );
}

export default App;

const GlobalStyle = styled.div`
  background-color: ${({ theme }) => theme.colors.main};
  display: flex;
  justify-content: center;
  align-items: center;
`;
