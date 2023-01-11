import styled from "styled-components";
import { defaultTheme } from "../styles/theme";

const MOST_POPULATED = "Most Populated";
const LEAST_POPULATED = "Least Populated";
const ALPHABETICAL_ORDER = "Alphabetical Order";

const SORT_OPTIONS: readonly string[] = [
  "Sort by",
  MOST_POPULATED,
  LEAST_POPULATED,
  ALPHABETICAL_ORDER,
];

const FilterBox = () => {
  return (
    <FilterContainer theme={defaultTheme}>
      <input type="text" placeholder="Search by country name" />
      <select name="" id="">
        {SORT_OPTIONS.map((sortOption) => (
          <option key={sortOption} value={sortOption}>
            {sortOption}
          </option>
        ))}
      </select>
    </FilterContainer>
  );
};

export default FilterBox;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.secondary};
  height: fit-content;
  width: 200px;
  padding: 20px;
  position: sticky;
  top: 0;
  border-radius: 10px;
`;
