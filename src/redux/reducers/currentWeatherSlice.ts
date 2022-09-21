import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICurrentDay } from "@/interfaces";

import { getCityWeatherCast } from "@/helpers";

interface State {
  savedCities: ICurrentDay[];
  info: ICurrentDay;
  status: string | null;
}

const initialState: State = {
  savedCities: [],
  info: {} as ICurrentDay,
  status: null,
};

export const getCurrentData = createAsyncThunk(
  "currentWeather/getCurrentData",
  async (cityInfo: string) => {
    const response = await getCityWeatherCast(cityInfo);
    return response.current;
  }
);

export const currentWeatherSlice = createSlice({
  name: "currentWeather",
  initialState,
  reducers: {
    addCurrentWeather(state, action: PayloadAction<ICurrentDay>) {
      state.info = JSON.parse(JSON.stringify(action.payload));
    },
    saveCity(state, action: PayloadAction<ICurrentDay>) {
      state.savedCities.unshift(JSON.parse(JSON.stringify(action.payload)));
    },
    deleteCity(state, action: PayloadAction<ICurrentDay>) {
      state.savedCities = state.savedCities.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentData.pending, (state) => {
      state.status = "loading current day";
      console.log(state.status);
    });

    builder.addCase(getCurrentData.fulfilled, (state, action) => {
      state.status = "resolved current day";
      console.log(state.status);
      console.log(action.payload);
      state.info = JSON.parse(JSON.stringify(action.payload));
    });

    builder.addCase(getCurrentData.rejected, (state) => {
      state.status = "rejected current day";
      console.log(state.status);
    });
  },
});

export const { addCurrentWeather, saveCity, deleteCity } =
  currentWeatherSlice.actions;

export default currentWeatherSlice.reducer;
