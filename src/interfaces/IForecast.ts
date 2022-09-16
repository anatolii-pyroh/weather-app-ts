import { IList } from "./IList";

export interface IForecast {
  city: {
    coord: { lat: number; lon: number };
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  cnt: number;
  cod: string;
  list: IList[];
}
