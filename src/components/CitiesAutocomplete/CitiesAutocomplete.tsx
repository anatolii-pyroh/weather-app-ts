import React from "react";

import { Box } from "@mui/material";

import { AsyncPaginate } from "react-select-async-paginate";
import { loadOptions, getCityWeatherCast } from "@/helpers";

import { useAppDispatch } from "@/hooks/redux";
import { addCurrentWeather } from "@/redux/reducers/currentWeatherSlice";
import { addForecastWeather } from "@/redux/reducers/forecastWeatherSlice";

export const CitiesAutocomplete = () => {
  const dispatch = useAppDispatch();

  const handleOnChange = async (searchData: any) => {
    const response = await getCityWeatherCast(searchData.value);
    console.log(response);
    dispatch(addCurrentWeather(response.current));
    dispatch(addForecastWeather(response.forecast));
  };

  return (
    <Box>
      <AsyncPaginate
        placeholder='Search for city...'
        debounceTimeout={500}
        value={""}
        loadOptions={loadOptions}
        onChange={handleOnChange}
      />
    </Box>
  );
};
