import { defaultTheme } from "../styles/theme";
import styled from "styled-components";
import { Earth } from "@styled-icons/ionicons-solid";

const Header = () => {
  return (
    <HeaderContainer theme={defaultTheme}>
      <Earth className="earthIcon" />
      <a
        href="https://github.com/miyabitanimchi/list-of-countries"
        rel="rel=”  noopener” noreferrer"
        target="_blank"
      >
        GitHub
      </a>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 50px;
  background: rgba(245, 245, 245, 0.7);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.main};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;

  .earthIcon {
    width: 30px;
    color: ${({ theme }) => theme.colors.tertiary};
  }
  a {
  }
`;
