export interface ICitiesAutocomplete {
  city: string;
  country: string;
  countryCode: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  region: string;
  regionCode: string;
  type: string;
  wikiDataId: string;
}

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
    country?: string;
    id?: number;
    sunrise?: number;
    sunset?: number;
    type?: number;
  };
  timezone: number;
  visibility: number;
  weather: IWeather[];
  wind: { deg: number; speed: number };
}

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

export interface IGeolocationCoordinates {
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null | unknown;
  latitude: number;
  longitude: number;
  speed: number | null;
}

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

export interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
