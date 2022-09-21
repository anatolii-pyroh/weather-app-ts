import React, { useState } from "react";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { deleteCity, getCurrentData } from "@/redux/reducers/currentWeatherSlice";
import { getForecastData } from "@/redux/reducers/forecastWeatherSlice";

import { ICurrentDay } from "@/interfaces";

interface IProps {
  setAlignment: React.Dispatch<React.SetStateAction<string>>;
}

export const SavedCities = ({ setAlignment }: IProps) => {
  const savedCities = useAppSelector(
    (state) => state.currentWeather.savedCities
  );
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    left: true,
  });

  // close menu when user click on backdrop or select city
  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: { type: string; key: string }) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setAlignment("daily");
      setState({ ...state, [anchor]: open });
    };

  // show city when click on it in list
  const showCityInfo = (cityInfo: string) => {
    setAlignment("daily");
    dispatch(getCurrentData(cityInfo));
    dispatch(getForecastData(cityInfo));
  };

  return (
    <div>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        <Box sx={{ width: 250 }} role='presentation'>
          <List sx={{ overflowY: "auto" }}>
            {savedCities.map((city: ICurrentDay) => (
              <ListItem key={city.dt} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DeleteForeverIcon
                      onClick={() => dispatch(deleteCity(city))}
                    />
                  </ListItemIcon>
                  <ListItemText
                    onClick={() =>
                      showCityInfo(`${city.name}, ${city.sys.country}`)
                    }
                    onKeyDown={toggleDrawer("left", false)}
                    primary={`${city.name}, ${city.sys.country}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};
