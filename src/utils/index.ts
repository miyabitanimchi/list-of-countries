import { CountryInfo } from "../types";
import {
  SORT_BY,
  MOST_POPULATED,
  LEAST_POPULATED,
  ALPHABETICAL_ORDER,
  HIGH_LATITUDE_TO_LOW,
  LOW_LATITUDE_TO_HIGH,
} from "../constants";

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
      capitals: d.capital || ["-"],
      landArea: d.area,
      region: d.region,
      latitude: {
        lat: d.latlng[0],
        isNorth: d.latlng[0] > 0,
      },
    });
  }
  return normalizedData;
};

export const sortCountriesList = (
  sortOption: string,
  countries: CountryInfo[]
): CountryInfo[] => {
  const countriesCopies = [...countries];
  switch (sortOption) {
    case MOST_POPULATED:
      return countriesCopies.sort((a, b) => b.population - a.population);
    case LEAST_POPULATED:
      return countriesCopies.sort((a, b) => a.population - b.population);
    case ALPHABETICAL_ORDER:
      return countriesCopies.sort((a, b) => a.name.localeCompare(b.name));
    case SORT_BY: // default list
      return countriesCopies;
    case HIGH_LATITUDE_TO_LOW:
      return countriesCopies.sort(
        (a, b) =>
          b.latitude.lat * Math.sign(b.latitude.lat) -
          a.latitude.lat * Math.sign(a.latitude.lat)
      );
    case LOW_LATITUDE_TO_HIGH:
      return countriesCopies.sort(
        (a, b) =>
          a.latitude.lat * Math.sign(a.latitude.lat) -
          b.latitude.lat * Math.sign(b.latitude.lat)
      );
    default:
      return countriesCopies;
  }
};
