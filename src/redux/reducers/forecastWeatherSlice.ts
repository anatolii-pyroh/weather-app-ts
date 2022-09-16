import { createSlice } from "@reduxjs/toolkit";
import { IForecast } from "../../interfaces/IForecast";

interface State {
  info: IForecast;
}

const initialState: State = {
  info: {} as IForecast,
};

export const forecastWeatherSlice = createSlice({
  name: "forecastWeather",
  initialState: initialState,
  reducers: {
    addForecastWeather(state, action) {
      state.info = JSON.parse(JSON.stringify(action.payload));
    },
  },
});

export const { addForecastWeather } = forecastWeatherSlice.actions;

export default forecastWeatherSlice.reducer;
