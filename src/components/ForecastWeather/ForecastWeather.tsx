import React from "react";

import { List, Box } from "@mui/material";

import { CurrentWeather } from "../CurrentWeather";

import { useAppSelector } from "@/hooks/redux";

import { IList, ICurrentDay } from "@/interfaces";

export const ForecastWeatherList = () => {
  const forecastWeather = useAppSelector((state) => state.forecastWeather.info);
  // console.log(forecastWeather);
  return (
    <Box
      sx={{
        overflowY: "auto",
        height: "35rem",
        mt: "1rem",
        borderRadius: "20px",
        padding: "0.5rem",
      }}
    >
      <List>
        {/* filter by every 8 element(24 hours from previous element) */}
        {/* plus element 39(last day of forecast) */}
        {forecastWeather.list
          .filter(
            (item: IList, index: number) => index !== 0 && (index === 39 || index % 8 === 0)
          )
          .map((item: IList) => (
            <li key={item.dt}>
              <CurrentWeather
                weather={item as ICurrentDay & IList}
                currentDay={false}
                forecast={forecastWeather}
              />
            </li>
          ))}
      </List>
    </Box>
  );
};