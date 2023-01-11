import styled from "styled-components";
import { defaultTheme } from "../styles/theme";

interface ImageProps {
  imgUrl: string;
}

const Country = ({ countryInfo }: any) => {
  return (
    <Card key={countryInfo.name} theme={defaultTheme}>
      <ImageWrap>
        <Image imgUrl={countryInfo.flag} />
      </ImageWrap>
      <InfoWrap>
        <Title>{countryInfo.name}</Title>
        <DetailWrap>
          <LeftDetail>
            <InfoText>Capital: </InfoText>
            <InfoText>Language: </InfoText>
            <InfoText>Population: {countryInfo.population}</InfoText>
          </LeftDetail>
          <div>
            <InfoText>land Area: </InfoText>
            <InfoText>Population Density: </InfoText>
            <InfoText>Region: </InfoText>
            <InfoText>Currency: </InfoText>
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
  margin: 3px 0 10px 0;
`;

const DetailWrap = styled.div`
  display: flex;
  gap: 50px;
`;

const LeftDetail = styled.div`
  min-width: 230px;
`;

const InfoText = styled.p`
  margin-bottom: 10px;
`;
