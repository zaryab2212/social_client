import { useTheme } from "@emotion/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../states";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { Box, IconButton, Typography } from "@mui/material";
import { PersonAddAlt1Rounded, PersonRemoveRounded } from "@mui/icons-material";

const Friends = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friend = useSelector((state) => state.friend);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friend?.find((frnd) => frnd._id === friendId);

  const patchFriend = async () => {
    const res = await fetch(`http://localhost:8080/user/${_id}/${friendId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch(setFriends({ friends: data.userfriends }));
  };
  return (
    <>
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserImage image={userPicturePath} size="55px" />
          <Box
            onClick={() => {
              navigate(`/profile/${friendId}`);
              navigate(0);
            }}
          >
            <Typography
              color={main}
              variant="h5"
              fontWeight="bold"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              {subtitle}
            </Typography>
          </Box>
        </FlexBetween>
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveRounded sx={{ color: primaryDark }} />
          ) : (
            <PersonAddAlt1Rounded sx={{ color: primaryDark }} />
          )}
        </IconButton>
      </FlexBetween>
    </>
  );
};

export default Friends;
