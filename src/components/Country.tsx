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
      <div>
        <h3>{countryInfo.name}</h3>
        <p>Population: {countryInfo.population}</p>
      </div>
    </Card>
  );
};

export default Country;

const Card = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  height: 150px;
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
