import { CountryInfo } from "../types";

export const normalizeCountry = (data: any): CountryInfo[] => {
  const normalizedData = [];
  for (let d of data) {
    const languages = Object.values(d.languages || []);
    normalizedData.push({
      name: d.name.common,
      flag: d.flags.png,
      population: d.population,
      populationDentisity: d.population / d.area,
      languages: {
        names: languages.slice(0, 3),
        totalNum: languages.length,
      },
      capital: d.capital || ["-"],
      landArea: d.area,
      region: d.region,
    });
  }

  return normalizedData;
};
