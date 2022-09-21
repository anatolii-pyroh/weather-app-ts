import axios from "axios";
import { ICitiesAutocomplete, ICurrentDay, IForecast } from "@/interfaces";

type CityWeather = {
  current: ICurrentDay;
  forecast: IForecast;
};

export const getCityWeatherCast = async (
  cityInfo: string
): Promise<CityWeather> => {
  // get city current day weather + longitude and latitude
  const response = await axios.get(
    `${
      import.meta.env.VITE_WEATHER_API_DAILY_URL
    }?q=${cityInfo}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
  );

  const latitude = response.data.coord.lat;
  const longitude = response.data.coord.lon;
  
  // get city weather forecast info for 5 days
  const response_ = await axios.get(
    `${
      import.meta.env.VITE_WEATHER_API_FORECAST_URL
    }?lat=${latitude}&lon=${longitude}&units=metric&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`
  );

  // return current and forecast weather for selected city
  const cityWeatherInfo: CityWeather = {
    current: response.data,
    forecast: response_.data,
  };
  return cityWeatherInfo;
};

export const updateCityWeatherCast = async (
  weather: ICurrentDay
): Promise<CityWeather> => {
  const cityInfo = `${weather?.name}, ${weather?.sys?.country}`;
  const response = await getCityWeatherCast(cityInfo);
  return response;
};

type DropdownOption = {
  options: string[];
  label: string;
  value: string;
};

type DropdownOptions = {
  options: DropdownOption[];
};

export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_GEO_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
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
