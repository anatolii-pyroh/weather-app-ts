import React from "react";

import { Box } from "@mui/material";

import { AsyncPaginate } from "react-select-async-paginate";
import { loadOptions } from "@/helpers";

import { useAppDispatch } from "@/hooks/redux";
import { getCurrentData } from "@/redux/reducers/currentWeatherSlice";
import { getForecastData } from "@/redux/reducers/forecastWeatherSlice";

export const CitiesAutocomplete = () => {
  const dispatch = useAppDispatch();

  const handleOnChange = (cityInfo: any) => {
    dispatch(getCurrentData(cityInfo.value))
    dispatch(getForecastData(cityInfo.value))
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
