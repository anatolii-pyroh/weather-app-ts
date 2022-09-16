import { IMain } from "./IMain";
import { IWeather } from "./IWeather";

export interface IWeatherCast {
  base: string;
  cod: number;
  clouds: { all: number };
  coord?: { lat: number; lon: number };
  dt: number;
  id?: number;
  main: IMain;
  name?: string;
  sys: {
    country?: string;
    id?: number;
    sunrise?: number;
    sunset?: number;
    type?: number;
    pod?: number;
  };
  timezone?: number;
  dt_txt: string;
  visibility: number;
  weather: IWeather[];
  wind: {
    deg: number;
    speed: number;
  };
}
