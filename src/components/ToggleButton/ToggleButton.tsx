import React from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";

interface IProps {
  alignment: string;
  handleChangeAlignment: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: string
  ) => void;
}

export const ToggleSectionButton = ({ alignment, handleChangeAlignment }: IProps) => {
  // show "saved cities" button if any is saved
  const isAnyCitySaved = useAppSelector(
    (state) => state.currentWeather.savedCities
  );
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
      <ToggleButtonGroup
        color='primary'
        value={alignment}
        exclusive
        onChange={handleChangeAlignment}
        aria-label='Platform'
      >
        <ToggleButton value='daily'>Daily</ToggleButton>
        <ToggleButton value='5 days forecast'>5 Days forecast</ToggleButton>
        {isAnyCitySaved.length > 0 && (
          <ToggleButton value='saved cities'>Saved cities</ToggleButton>
        )}
      </ToggleButtonGroup>
    </Box>
  );
};
