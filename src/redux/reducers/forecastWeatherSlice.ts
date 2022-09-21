import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IForecast } from "@/interfaces";
import { getCityWeatherCast } from "@/helpers";

interface State {
  info: IForecast;
  status: string | null;
}

const initialState: State = {
  info: {} as IForecast,
  status: null,
};

export const getForecastData = createAsyncThunk(
  "forecastWeather/getForecastData",
  async (cityInfo: string) => {
    const response = await getCityWeatherCast(cityInfo);
    return response.forecast;
  }
);

export const forecastWeatherSlice = createSlice({
  name: "forecastWeather",
  initialState,
  reducers: {
    addForecastWeather(state, action: PayloadAction<IForecast>) {
      state.info = JSON.parse(JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getForecastData.pending, (state) => {
      state.status = "loading forecast";
      console.log(state.status);
    });

    builder.addCase(getForecastData.fulfilled, (state, action) => {
      state.status = "resolved forecast";
      console.log(state.status);
      console.log(action.payload);
      state.info = JSON.parse(JSON.stringify(action.payload));
    });

    builder.addCase(getForecastData.rejected, (state) => {
      state.status = "rejected forecast";
      console.log(state.status);
    });
  },
});

export const { addForecastWeather } = forecastWeatherSlice.actions;

export default forecastWeatherSlice.reducer;
