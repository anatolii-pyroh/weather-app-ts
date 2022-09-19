import React, { useState, useMemo } from "react";
import { Box, Button, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { saveCity } from "../../redux/reducers/currentWeatherSlice";
import classes from "./CurrentWeather.module.css";
import CloudIcon from "@mui/icons-material/Cloud";
import CompressIcon from "@mui/icons-material/Compress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AirIcon from "@mui/icons-material/Air";
import moment from "moment-timezone";
import { ICurrentDay } from "../../interfaces/ICurrentDay";
import { IForecast } from "../../interfaces/IForecast";
import { useAppSelector } from "../../hooks/redux";
import { IList } from "../../interfaces/IList";

interface IProps {
  weather: ICurrentDay & IList;
  currentDay: boolean;
  forecast: IForecast;
}

// currentDay and forecast props to check if item selected for daily or forecast view
export const CurrentWeather = ({ weather, currentDay, forecast }: IProps) => {
  const dispatch = useDispatch();
  const weatherDescription = weather.weather[0].description;
  const savedCities = useAppSelector(
    (state) => state.currentWeather.savedCities
  );
  // states for alert message for success or fail save city
  type SnackbarPosition = {
    open: boolean;
    vertical: string;
    horizontal: string;
  };
  const [alertState, setAlertState] = useState<SnackbarPosition>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = alertState;
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const date: string = new Date(weather.dt * 1000).toLocaleDateString("en-GB");
  const dayNumber: number = new Date(weather.dt * 1000).getDay();
  const dayNames: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurdsay",
    "Friday",
    "Saturday",
  ];
  const weekDay: string = dayNames[dayNumber];

  const handleClick = (newAlertState: {
    vertical: string;
    horizontal: string;
  }) => {
    setAlertState({ open: true, ...newAlertState });
  };
  const handleClose = () => {
    setAlertState({ ...alertState, open: false });
  };

  // function to save city or decline if already saved
  const save = () => {
    const check = savedCities.findIndex((item) => item.id === weather?.id);
    if (check !== -1) {
      setIsSuccess(false);
      handleClick({
        vertical: "top",
        horizontal: "center",
      });
    } else {
      setIsSuccess(true);
      handleClick({
        vertical: "top",
        horizontal: "center",
      });
      dispatch(saveCity(weather));
    }
  };

  // give sunrise and sunset their own data
  // depends on if current day or forecast
  const sunTime = useMemo(() => {
    if (currentDay) {
      const currentSun: { sunrise: string; sunset: string } = {
        sunrise: "",
        sunset: "",
      };
      currentSun.sunrise = moment
        .utc(weather?.sys?.sunrise, "X")
        .add(weather?.timezone, "seconds")
        .format("HH:mm");
      currentSun.sunset = moment
        .utc(weather?.sys?.sunset, "X")
        .add(weather?.timezone, "seconds")
        .format("HH:mm");
      return currentSun;
    } else {
      const forecastSun: { sunrise: string; sunset: string } = {
        sunrise: "",
        sunset: "",
      };
      forecastSun.sunrise = moment
        .utc(forecast?.city?.sunrise, "X")
        .add(forecast?.city?.timezone, "seconds")
        .format("HH:mm");
      forecastSun.sunset = moment
        .utc(forecast?.city?.sunset, "X")
        .add(forecast?.city?.timezone, "seconds")
        .format("HH:mm");
      return forecastSun;
    }
  }, [weather, forecast]);

  return (
    // whole currentweather block
    <Box className={classes["current-weather"]}>
      <Box className={classes["current-weather-card"]}>
        {/* city name, save button and date */}
        <Box className={classes["current-weather-card-title"]}>
          <h3>
            {currentDay && (
              <>
                {weather?.name}, {weather?.sys?.country}
              </>
            )}
            {forecast && !currentDay && (
              <>
                {forecast?.city?.name}, {forecast?.city?.country}
              </>
            )}
          </h3>
          <span>
            {weekDay}, {date}
          </span>
        </Box>
        {/* weather icon and description */}
        <Box className={classes["current-weather-card-icon"]}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt='openweathermap weather icon'
              width={180}
              height={180}
            />
            <h1>{weather.main.temp.toFixed(1)}C°</h1>
          </Box>
          {currentDay && (
            <Button variant='contained' fullWidth onClick={save}>
              Save city
            </Button>
          )}
        </Box>
      </Box>

      <Box className={classes["current-weather-description"]}>
        {/* left side of description */}
        <Box>
          <Box className={classes["desctiption-icon-with-text"]} sx={{ mt: 0 }}>
            <CloudIcon sx={{ mr: 1 }} />
            <span>Weather: {weatherDescription}</span>
          </Box>
          <Box className={classes["desctiption-icon-with-text"]}>
            <CompressIcon sx={{ mr: 1 }} />
            <span>Pressure(sea level): {weather.main.pressure} hPa</span>
          </Box>
          <Box className={classes["desctiption-icon-with-text"]}>
            <WbSunnyIcon sx={{ mr: 1 }} />
            <span>Sunrise: {sunTime.sunrise}</span>
          </Box>
          <Box className={classes["desctiption-icon-with-text"]}>
            <MyLocationIcon sx={{ mr: 1 }} />
            <span>Wind direction: {weather.wind.deg}°</span>
          </Box>
        </Box>

        {/* right side of description */}
        <Box>
          <Box className={classes["desctiption-icon-with-text"]} sx={{ mt: 0 }}>
            <CloudIcon sx={{ mr: 1 }} />
            <span>Cloudiness: {weather.clouds.all}%</span>
          </Box>
          <Box className={classes["desctiption-icon-with-text"]}>
            <VisibilityIcon sx={{ mr: 1 }} />
            <span>Visibility: {(weather.visibility / 100).toFixed()}%</span>
          </Box>
          <Box className={classes["desctiption-icon-with-text"]}>
            <WbTwilightIcon sx={{ mr: 1 }} />
            <span>Sunset: {sunTime.sunset}</span>
          </Box>
          <Box className={classes["desctiption-icon-with-text"]}>
            <AirIcon sx={{ mr: 1 }} />
            <span>Wind speed: {weather.wind.speed} m/s</span>
          </Box>
        </Box>
      </Box>
      {currentDay && (
        <Snackbar
          anchorOrigin={
            { vertical, horizontal } as {
              vertical: "top" | "bottom";
              horizontal: "left" | "center" | "right";
            }
          }
          open={open}
          message={isSuccess ? "City saved" : "You already saved this city"}
          onClose={handleClose}
          key={vertical + horizontal}
          autoHideDuration={2000}
          ContentProps={{
            sx: {
              fontSize: "1rem",
              background: isSuccess ? "rgb(46,125,50)" : "rgb(211,47,47)",
              display: "block",
              textAlign: "center",
            },
          }}
        />
      )}
    </Box>
  );
};
