import { useContext } from "react";
import { CountriesListCtx } from "../contexts/countriesContext";
import styled from "styled-components";
import { defaultTheme } from "../styles/theme";
import { CountryInfo } from "../types";
import { CircleHalfFill } from "@styled-icons/fluentui-system-regular";
import {
  TemperatureEmpty,
  TemperatureHalf,
  TemperatureFull,
} from "@styled-icons/fa-solid";
import { MOST_POPULATED, LEAST_POPULATED } from "../constants";

interface ImageProps {
  imgUrl: string;
}

interface TextProps {
  textColor: string;
}

interface TitleWrapProps {
  earthRotate: string;
}

interface LatitudeProps {
  lat: number;
}

const TemperatureIcon = ({ lat }: LatitudeProps) => {
  if (lat <= 23.26 && lat >= -23.26) {
    return <TemperatureFull className={["tempIcon", "red"].join(" ")} />;
  } else if (lat <= 55 && lat >= -55) {
    return <TemperatureHalf className={["tempIcon", "orange"].join(" ")} />;
  } else {
    return <TemperatureEmpty className={["tempIcon", "blue"].join(" ")} />;
  }
};

const Country = ({
  name,
  flag,
  capitals,
  population,
  landArea,
  populationDentisity,
  languages,
  region,
  latitude,
}: CountryInfo) => {
  const { selectedFilter } = useContext(CountriesListCtx);

  return (
    <Card key={name} theme={defaultTheme}>
      <ImageWrap>
        <Image imgUrl={flag} />
      </ImageWrap>
      <InfoWrap>
        <TitleWrap earthRotate={latitude.isNorth ? "180" : "0"}>
          <Title>{name}</Title>
          <div>
            <TemperatureIcon lat={latitude.lat} />
            <CircleHalfFill className="earthIcon" />
          </div>
        </TitleWrap>
        <DetailWrap>
          <LeftDetail>
            <InfoText textColor={"gray"}>
              Capital:{" "}
              {capitals.map((capital: string, index: number) => (
                <span key={capital}>
                  {capital}
                  {capitals.length > 1 && index !== capitals.length - 1 && ", "}
                </span>
              ))}
            </InfoText>
            <InfoText textColor={"gray"}>
              Language:{" "}
              {languages.names.map((language: string, index: number) => (
                <span key={index}>
                  {language}
                  {languages.names.length > 1 &&
                    index !== languages.names.length - 1 &&
                    ", "}
                </span>
              ))}
              {languages.names.length < languages.totalNum && " and more"}
            </InfoText>
            <InfoText
              textColor={
                selectedFilter === MOST_POPULATED
                  ? "red"
                  : selectedFilter === LEAST_POPULATED
                  ? "blue"
                  : "gray"
              }
            >
              Population: {population.toLocaleString("en-US")}
            </InfoText>
          </LeftDetail>
          <div>
            <InfoText textColor={"gray"}>Region: {region}</InfoText>
            <InfoText textColor={"gray"}>
              land Area: {landArea.toLocaleString("en-US")} km²
            </InfoText>
            <InfoText textColor={"gray"}>
              Population Density:{" "}
              {Math.round(populationDentisity).toLocaleString("en-US")} / km²
            </InfoText>
          </div>
        </DetailWrap>
      </InfoWrap>
    </Card>
  );
};

export default Country;

const Card = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  height: 230px;
  padding: 10px;
`;

const ImageWrap = styled.div`
  height: 100%;
  width: 220px;
  margin-right: 20px;
  background-color: #e5e5e5;
  border-radius: 10px;
  position: relative;
`;

const Image = styled.img.attrs<ImageProps>(({ imgUrl }) => ({
  src: `${imgUrl}`,
  alt: "Country Flag",
}))<ImageProps>`
  width: 200px;
  height: auto;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const InfoWrap = styled.div`
  flex: 1;
`;

const TitleWrap = styled.div<TitleWrapProps>`
  margin: 3px 0 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tempIcon {
    height: 25px;
    margin-right: 15px;
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

  .earthIcon {
    width: 25px;
    color: #04d1ae;
    transform: rotate(${({ earthRotate }) => earthRotate}deg);
  }
`;

const Title = styled.h2``;

const DetailWrap = styled.div`
  display: flex;
  gap: 50px;
`;

const LeftDetail = styled.div`
  width: 250px;
`;

const InfoText = styled.p<TextProps>`
  margin-bottom: 10px;
  color: ${({ textColor }) => textColor};
`;
