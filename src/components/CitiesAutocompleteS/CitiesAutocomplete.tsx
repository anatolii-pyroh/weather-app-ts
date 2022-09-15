import React from "react";

import { Box } from "@mui/material";

import { AsyncPaginate } from "react-select-async-paginate";
import { DropdownOption, loadOptions } from "../../helpers/loadCitiesOptions";
import { getCityWeatherCast } from "../../helpers/getCityWeatherCast";
import { useAppDispatch } from "../../hooks/redux";
import { addCurrentWeather } from "../../redux/reducers/currentWeatherSlice";
import { addForecastWeather } from "../../redux/reducers/forecastWeatherSlice";
import { SingleValue } from "react-select";
// import { SingleValue } from "react-select";

const CitiesAutocomplete = () => {
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

export default CitiesAutocomplete;
