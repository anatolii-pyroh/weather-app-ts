import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import {
  addCurrentWeather,
  deleteCity,
} from "../../redux/reducers/currentWeatherSlice";
import { addForecastWeather } from "../../redux/reducers/forecastWeatherSlice";
import { getCityWeatherCast } from "../../helpers";
import { ICurrentDay } from "../../interfaces";
import { useAppSelector } from "../../hooks/redux";

interface IProps {
  setAlignment: React.Dispatch<React.SetStateAction<string>>;
}

export const SavedCities = ({ setAlignment }: IProps) => {
  const savedCities = useAppSelector(
    (state) => state.currentWeather.savedCities
  );
  const dispatch = useDispatch();
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
  const showCityInfo = async (cityInfo: string) => {
    setAlignment("daily");
    const response = await getCityWeatherCast(cityInfo);
    dispatch(addCurrentWeather(response.current));
    dispatch(addForecastWeather(response.forecast));
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
