import { styled } from "@mui/system";
import { Box } from "@mui/material";
import React from "react";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  background: theme.palette.background.alt,
  borderRadius: "0.75rem",
}));

export default WidgetWrapper;
