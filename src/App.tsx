import React from "react";
import "./App.css";

import { Container } from "@mui/material";

import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { ICurrentDay } from "./interfaces/ICurrentDay";

function App() {

  const weatherInfo = useAppSelector(state => state.currentWeather.info)
  const dispatch = useAppDispatch()

  console.log(weatherInfo)
  return (
    <Container maxWidth='lg'>
      <div className='App'>213</div>
    </Container>
  );
}

export default App;
