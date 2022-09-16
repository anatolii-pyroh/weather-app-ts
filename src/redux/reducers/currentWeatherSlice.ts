import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentDay } from "../../interfaces/ICurrentDay";
import { IList } from "../../interfaces/IList";

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
    addCurrentWeather(state, action: PayloadAction<ICurrentDay>) {
      state.info = JSON.parse(JSON.stringify(action.payload));
    },
    saveCity(state, action: PayloadAction<ICurrentDay | IList>) {
      state.savedCities.unshift(JSON.parse(JSON.stringify(action.payload)));
    },
    deleteCity(state, action: PayloadAction<ICurrentDay>) {
      state.savedCities = state.savedCities.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addCurrentWeather, saveCity, deleteCity } =
  currentWeatherSlice.actions;

export default currentWeatherSlice.reducer;
