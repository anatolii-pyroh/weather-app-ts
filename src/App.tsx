import React, { Fragment, useState, useEffect } from "react";
import "./App.css";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addCurrentWeather } from "@/redux/reducers/currentWeatherSlice";
import { addForecastWeather } from "@/redux/reducers/forecastWeatherSlice";

import { CitiesAutocomplete } from "@/components/CitiesAutocomplete";
import { ToggleSectionButton } from "@/components/ToggleButton";
import { CurrentWeather } from "@/components/CurrentWeather";
import { ForecastWeatherList } from "@/components/ForecastWeather";
import { SavedCities } from "@/components/SavedCities";

import {
  ICurrentDay,
  IList,
  IGeolocationCoordinates,
  IForecast,
} from "./interfaces";

import { updateCityWeatherCast } from "./helpers";

import axios from "axios";

import { Container } from "@mui/material";

function App() {
  const weather: ICurrentDay = useAppSelector(
    (state) => state.currentWeather.info
  );
  const forecast: IForecast = useAppSelector(
    (state) => state.forecastWeather.info
  );

  const [nativeCity, setNativeCity] = useState<ICurrentDay>();
  const [alignment, setAlignment] = useState<string>("daily");

  const dispatch = useAppDispatch();

  const handleChangeAlignment = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const updateWeatherInfo = async () => {
    const response = await updateCityWeatherCast(weather);
    dispatch(addCurrentWeather(response.current));
    dispatch(addForecastWeather(response.forecast));
  };

  // functions to get current location
  const success = async ({ coords }: { coords: IGeolocationCoordinates }) => {
    const { latitude, longitude } = coords;
    const response = await axios.get(
      `${
        import.meta.env.VITE_WEATHER_API_DAILY_URL
      }?lat=${latitude}&lon=${longitude}&units=metric&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`
    );
    setNativeCity(response.data);
  };
  const error = ({ message }: { message: string }) => {
    console.log(message);
  };

  const getNativeCityWeatherCast = async () => {
    if (nativeCity) {
      const response = await updateCityWeatherCast(nativeCity);
      // console.log(response);
      dispatch(addCurrentWeather(response.current));
      dispatch(addForecastWeather(response.forecast));
    }
  };

  // get user current city weather cast
  useEffect(() => {
    if (nativeCity) {
      getNativeCityWeatherCast();
    }
  }, [nativeCity]);

  // update while page first time load
  useEffect(() => {
    if (weather?.name) {
      updateWeatherInfo();
    }
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
    });
  }, []);

  return (
    <Container maxWidth='lg'>
      <div className='App'>
        <CitiesAutocomplete />
        {weather?.name && (
          <Fragment>
            <ToggleSectionButton
              alignment={alignment}
              handleChangeAlignment={handleChangeAlignment}
            />
            {alignment === "daily" && (
              <CurrentWeather
                weather={weather as ICurrentDay & IList}
                currentDay={true}
                forecast={forecast}
              />
            )}
            {alignment === "5 days forecast" && <ForecastWeatherList />}
            {alignment === "saved cities" && (
              <SavedCities setAlignment={setAlignment} />
            )}
          </Fragment>
        )}
      </div>
    </Container>
  );
}

export default App;
