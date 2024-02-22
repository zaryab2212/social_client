import { useTheme } from "@emotion/react";
import React from "react";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import { Box, Typography } from "@mui/material";

const AdvertImage = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  return (
    <>
      <WidgetWrapper>
        <FlexBetween>
          <Typography color={dark} variant="h5" fontWeight="500">
            Soponsered
          </Typography>
          <Typography color={medium}>Create Add</Typography>
        </FlexBetween>
        <img
          width="100%"
          height="auto"
          alt="advert"
          src={`/assets/_DSC0003.JPG`}
          style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        />
      </WidgetWrapper>
      <FlexBetween>
        {" "}
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>MikaCosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        when ever you wil tried to use our product you will be the best product
        user in the world and no body can be able to beat you
      </Typography>
      <Box margin="2rem 0"></Box>
    </>
  );
};

export default AdvertImage;
