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
export const loadOptions = async (inputValue: string): Promise<any> => {
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

// type DropdownOptions = {
//   options: string[];
//   label: string;
//   value: string;
// };

// type apiResponse = {
//   options: DropdownOptions[];
// };

// export const loadOptions = (search: string) => {
//   return new Promise<apiResponse>((resolve) => {
//     setTimeout(() => {
//       resolve({ options: [] });
//       return fetch(
//         `${
//           import.meta.env.VITE_GEO_API_URL
//         }/cities?minPopulation=200000&namePrefix=${search}`,
//         geoApiOptions
//       )
//         .then((response) => response.json())
//         .then((response) => {
//           console.log(response);
//           return {
//             options: response.data.map((city: ICitiesAutocomplete) => {
//               return {
//                 value: `${city?.name}, ${city?.countryCode}`,
//                 label: `${city?.name}, ${city?.country}`,
//               };
//             }),
//           };
//         })
//         .catch((err) => console.error(err));
//     }, 1000);
//   });
// };
