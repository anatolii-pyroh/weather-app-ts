import React from "react";
import "./App.css";

import { useAppDispatch, useAppSelector } from "./hooks/redux";
import CitiesAutocomplete from "./components/CitiesAutocompleteS/CitiesAutocomplete";

import { Container } from "@mui/material";

function App() {
  const weatherInfo = useAppSelector((state) => state.currentWeather.info);
  const dispatch = useAppDispatch();

  console.log(weatherInfo);
  return (
    <Container maxWidth='lg'>
      <div className='App'>
        <CitiesAutocomplete />
      </div>
    </Container>
  );
}

export default App;
