import { Box } from "@mui/material";
import React from "react";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box height={size} width={size}>
      <img
        height={size}
        width={size}
        src={`http://localhost:8080/assets/${image}`}
        style={{ objectFit: "cover", borderRadius: "50%" }}
        alt="User"
      />
    </Box>
  );
};

export default UserImage;
