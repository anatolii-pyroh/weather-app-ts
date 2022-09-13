import { createSlice } from "@reduxjs/toolkit";
import { ICurrentDay } from "../../interfaces/ICurrentDay";

interface State {
  savedCities: ICurrentDay[];
  info: ICurrentDay;
}

const initialState: State = {
  savedCities: [],
  info: {} as ICurrentDay,
};

export const currentWeatherSlice = createSlice({
  name: "currentWeather",
  initialState: initialState,
  reducers: {
    addCurrentWeather(state, action) {
      state.info = JSON.parse(JSON.stringify(action.payload));
    },
    saveCity(state, action) {
      state.savedCities.unshift(JSON.parse(JSON.stringify(action.payload)));
    },
    deleteCity(state, action) {
      state.savedCities = state.savedCities.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addCurrentWeather, saveCity, deleteCity } =
  currentWeatherSlice.actions;

export default currentWeatherSlice.reducer;
