import { ICurrentDay } from "../interfaces/ICurrentDay";
import { IForecast } from "../interfaces/IForecast";
import { getCityWeatherCast } from "./getCityWeatherCast";

type CityWeather = {
  current: ICurrentDay;
  forecast: IForecast;
};

export const updateCityWeatherCast = async (
  weather: ICurrentDay
): Promise<CityWeather> => {
  const cityInfo = `${weather?.name}, ${weather?.sys?.country}`;
  const response = await getCityWeatherCast(cityInfo);
  return response;
};
