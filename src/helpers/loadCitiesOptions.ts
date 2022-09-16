import { ICitiesAutocomplete } from "../interfaces/ICitiesAutocomplete";

// geo DB api to get cities select options under input
export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_GEO_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export type DropdownOption = {
  options: string[];
  label: string;
  value: string;
};

type DropdownOptions = {
  options: DropdownOption[];
};

export const loadOptions = (search: string) => {
  return new Promise<DropdownOptions>((resolve) => {
    fetch(
      `${
        import.meta.env.VITE_GEO_API_URL
      }/cities?minPopulation=200000&namePrefix=${search}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        const dropdownOptions: DropdownOptions = {
          options: response.data.map((city: ICitiesAutocomplete) => {
            return {
              value: `${city?.name}, ${city?.countryCode}`,
              label: `${city?.name}, ${city?.country}`,
            };
          }),
        };
        resolve(dropdownOptions);
      })
      .catch((err) => console.error(err));
  });
};
