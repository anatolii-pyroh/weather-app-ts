import React, { Fragment, useState } from "react";
import "./App.css";

import { useAppDispatch, useAppSelector } from "./hooks/redux";
import CitiesAutocomplete from "./components/CitiesAutocompleteS/CitiesAutocomplete";

import { Container } from "@mui/material";
import ToggleSectionButton from "./components/ToggleButton/ToggleButton";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";

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

  console.log(weather);
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
                weather={weather}
                currentDay={true}
                forecast={forecast}
              />
            )}
          </Fragment>
        )}
      </div>
    </Container>
  );
}

export default App;
