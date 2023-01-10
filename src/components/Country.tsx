import React from "react";

const Country = ({ countryInfo }: any) => {
  return (
    <div key={countryInfo.name}>
      <img src={countryInfo.flag} alt="country flag" />
      <div>
        <h3>{countryInfo.name}</h3>
        <p>{countryInfo.population}</p>
      </div>
    </div>
  );
};

export default Country;
