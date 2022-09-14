import { GroupBase } from "react-select";
import { LoadOptions } from "react-select-async-paginate";
import { ICitiesAutocomplete } from "../interfaces/ICitiesAutocomplete";

// geo DB api to get cities select options under input
export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_GEO_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

// receiving cities option list under input by sending request to geoDB API
export const loadOptions = async (
  inputValue: string
): Promise<LoadOptions<string, GroupBase<string>, unknown> | any> => {
  return await fetch(
    `${
      import.meta.env.VITE_GEO_API_URL
    }/cities?minPopulation=200000&namePrefix=${inputValue}`,
    geoApiOptions
  )
    .then((response) => response.json())
    .then((response) => {
      return {
        options: response.data.map((city: ICitiesAutocomplete) => {
          return {
            value: `${city?.name}, ${city?.countryCode}`,
            label: `${city?.name}, ${city?.country}`,
          };
        }),
      };
    })
    .catch((err) => console.error(err));
};
