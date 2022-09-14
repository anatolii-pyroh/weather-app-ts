import axios, { AxiosResponse } from "axios";
import { SingleValue } from "react-select";
import { ICurrentDay } from "../interfaces/ICurrentDay";
import { IForecast } from "../interfaces/IForecast";

type cityWeather = {
  current: ICurrentDay;
  forecast: IForecast;
};

export const getCityWeatherCast = async (cityInfo: SingleValue<string>) => {
  // get city longitude and latitude
  const response = await axios.get(
    `${
      import.meta.env.VITE_WEATHER_API_DAILY_URL
    }?q=${cityInfo}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
  );
  console.log(response);

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
  const cityWeatherInfo: cityWeather = {
    current: response.data,
    forecast: response_.data,
  };

  return cityWeatherInfo;
};
