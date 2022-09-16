// interface for "weather" info in ICurrentDay, IForecast
export interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
