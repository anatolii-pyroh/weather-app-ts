import { IMain } from "./IMain";
import { IWeather } from "./IWeather";

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
  list: {
    clouds: { all: number };
    dt: number;
    dt_txt: string;
    main: IMain;
    pop: number;
    sys: { pod: string };
    visibility: number;
    weather: IWeather[];
    wind: {
      deg: number;
      gust: number;
      speed: number;
    };
  }[];
}
