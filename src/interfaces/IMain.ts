// interface for "main" info in ICurrentDay, IForecast
export interface IMain {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_kf?: number;
  temp_max: number;
  temp_min: number;
  grnd_level?: number;
  sea_level?: number;
}
