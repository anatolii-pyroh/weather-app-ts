import { IMain } from "./IMain";
import { IWeather } from "./IWeather";

export interface ICurrentDay {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lat: number; lon: number };
  dt: number;
  id: number;
  main: IMain;
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: IWeather[];
  wind: { deg: number; speed: number };
}
