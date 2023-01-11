import styled from "styled-components";
import { defaultTheme } from "../styles/theme";
import { CountryInfo } from "../types";

interface ImageProps {
  imgUrl: string;
}

const Country = ({
  name,
  flag,
  capital,
  population,
  landArea,
  populationDentisity,
  languages,
  region,
}: CountryInfo) => {
  return (
    <Card key={name} theme={defaultTheme}>
      <ImageWrap>
        <Image imgUrl={flag} />
      </ImageWrap>
      <InfoWrap>
        <Title>{name}</Title>
        <DetailWrap>
          <LeftDetail>
            <InfoText>
              Capital:{" "}
              {capital.map((capital: string, index: number) => (
                <span key={capital}>
                  {capital}
                  {capital.length > 1 && index !== capital.length - 1 && ", "}
                </span>
              ))}
            </InfoText>
            <InfoText>
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
            <InfoText>
              Population: {population.toLocaleString("en-US")}
            </InfoText>
          </LeftDetail>
          <div>
            <InfoText>Region: {region}</InfoText>
            <InfoText>
              land Area: {landArea.toLocaleString("en-US")} km²
            </InfoText>
            <InfoText>
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

const Title = styled.h2`
  margin: 3px 0 15px 0;
`;

const DetailWrap = styled.div`
  display: flex;
  gap: 50px;
`;

const LeftDetail = styled.div`
  width: 250px;
`;

const InfoText = styled.p`
  margin-bottom: 10px;
`;
