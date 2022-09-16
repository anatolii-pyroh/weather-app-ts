import { IMain } from "./IMain";
import { IWeather } from "./IWeather";

// interface for "list" info in IForecast
export interface IList {
  clouds: { all: number };
  dt: number;
  dt_txt: string;
  main: IMain;
  pop: number;
  sys: { pod?: string };
  visibility: number;
  weather: IWeather[];
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
}
