import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import {
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const palette = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral?.dark;
  const main = palette.neutral?.main;
  const medium = palette.neutral?.medium;

  const getUser = async () => {
    const res = await fetch(`http://localhost:8080/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {console.log(userId)}
      {user && (
        <WidgetWrapper>
          <FlexBetween
            gap="0.5rem"
            pb="1.1rem"
            onClick={() => navigate(`/profile/${userId}`)}
          >
            <FlexBetween gap="1rem">
              <UserImage image={picturePath} />
              <Box>
                <Typography
                  variant="h4"
                  color={dark}
                  fontWeight="bold"
                  sx={{
                    "&hover": {
                      cursor: "pointer",
                      color: palette.primary?.light,
                    },
                  }}
                >
                  {user?.user.firstName} {user?.user.lastName}
                </Typography>
                <Typography color={medium}>
                  {user?.user.friends?.length} friends
                </Typography>
              </Box>
            </FlexBetween>
            <ManageAccountsOutlined />
          </FlexBetween>

          <Divider />
          <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <LocationOnOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>{user?.user.location}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem">
              <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>{user?.user.accupation}</Typography>
            </Box>
          </Box>

          {/* 3rd row */}
          <Box p="1rem 0">
            <FlexBetween mb="0.5rem">
              <Typography color={medium}>Who's viewd your profile</Typography>
              <Typography color={main} fontWeight="500">
                {" "}
                {user?.user.veiwedProfile}
              </Typography>
            </FlexBetween>
            <FlexBetween mb="0.5rem">
              <Typography color={medium}>Impressions of your posts</Typography>
              <Typography color={main} fontWeight="500">
                {" "}
                {user?.user.impressions}
              </Typography>
            </FlexBetween>
          </Box>
        </WidgetWrapper>
      )}
    </>
  );
};

export default UserWidget;
