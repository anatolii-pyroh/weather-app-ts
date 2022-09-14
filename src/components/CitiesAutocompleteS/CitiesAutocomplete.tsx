import React from "react";

import { Box } from "@mui/material";

import { AsyncPaginate } from "react-select-async-paginate";
import { loadOptions } from "../../helpers/loadCitiesOptions";
import { SingleValue } from "react-select";

const CitiesAutocomplete = () => {

  const handleOnChange = (searchData: SingleValue<string>) => {
    console.log(searchData)
  }
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
