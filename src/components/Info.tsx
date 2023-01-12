import { CircleHalfFill } from "@styled-icons/fluentui-system-regular";
import {
  TemperatureEmpty,
  TemperatureHalf,
  TemperatureFull,
} from "@styled-icons/fa-solid";
import styled from "styled-components";
import { defaultTheme } from "../styles/theme";

const Info = () => {
  return (
    <Infocontainer>
      <InfoWrap theme={defaultTheme}>
        <CircleHalfFill className={["icon", "earthNorth"].join(" ")} /> Located
        in the Northern Hemisphere
      </InfoWrap>
      <InfoWrap theme={defaultTheme}>
        <CircleHalfFill className={["icon"].join(" ")} /> Located in the
        Southern Hemisphere
      </InfoWrap>
      <InfoWrap theme={defaultTheme}>
        <TemperatureFull className={["icon", "red"].join(" ")} /> Hot
        Temperature
      </InfoWrap>
      <InfoWrap theme={defaultTheme}>
        <TemperatureHalf className={["icon", "orange"].join(" ")} /> Mild
        Temperature
      </InfoWrap>
      <InfoWrap theme={defaultTheme}>
        <TemperatureEmpty className={["icon", "blue"].join(" ")} /> Cold
        Temperature
      </InfoWrap>
    </Infocontainer>
  );
};

export default Info;

const Infocontainer = styled.div`
  padding: 0 20px;
  color: gray;
`;

const InfoWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 10px;
  .icon {
    width: 20px;
    margin-right: 3px;
    color: ${({ theme }) => theme.colors.tertiary};
  }
  .earthNorth {
    transform: rotate(180deg);
  }

  .red,
  .orange,
  .blue {
    width: 17px;
    margin: 0 5px 0 1px;
  }

  .red {
    color: red;
  }

  .orange {
    color: orange;
  }

  .blue {
    color: blue;
  }
`;
