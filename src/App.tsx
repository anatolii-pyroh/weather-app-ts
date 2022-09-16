import React, { Fragment, useState } from "react";
import "./App.css";

import { useAppSelector } from "./hooks/redux";
import CitiesAutocomplete from "./components/CitiesAutocompleteS/CitiesAutocomplete";

import { Container } from "@mui/material";
import ToggleSectionButton from "./components/ToggleButton/ToggleButton";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import ForecastWeatherList from "./components/ForecastWeather/ForecastWeather";
import { ICurrentDay } from "./interfaces/ICurrentDay";
import { IList } from "./interfaces/IList";
import SavedCitiesList from "./components/SavedCities/SavedCities";

function App() {
  const weather = useAppSelector((state) => state.currentWeather.info);
  const forecast = useAppSelector((state) => state.forecastWeather.info);
  const [alignment, setAlignment] = useState<string>("daily");

  const handleChangeAlignment = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <Container maxWidth='lg'>
      <div className='App'>
        <CitiesAutocomplete />
        {weather && (
          <Fragment>
            <ToggleSectionButton
              alignment={alignment}
              handleChangeAlignment={handleChangeAlignment}
            />
            {/* daily,forecast,saved cities buttons */}
            {alignment === "daily" && (
              <CurrentWeather
                weather={weather as ICurrentDay & IList}
                currentDay={true}
                forecast={forecast}
              />
            )}
            {alignment === "5 days forecast" && <ForecastWeatherList />}
            {alignment === "saved cities" && (
              <SavedCitiesList setAlignment={setAlignment} />
            )}
          </Fragment>
        )}
      </div>
    </Container>
  );
}

export default App;
