import { useTheme } from "@emotion/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../states";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { Box, IconButton, Typography } from "@mui/material";
import { PersonAddAlt1Rounded, PersonRemoveRounded } from "@mui/icons-material";

const Friends = ({
  friendId,
  name,
  subtitle,
  userPicturePath,
  type,
  userDetail,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const user = userDetail ? userDetail : userData;

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const ownId = friendId === user._id;
  const token = useSelector((state) => state.token);

  const isFriend = user?.friends?.friends?.userfriends?.find(
    (friend) => friendId === friend._id
  );

  const patchFriend = async () => {
    const res = await fetch(`/user/${user._id}/${friendId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    dispatch(
      setFriends({
        friends: { userfriends: data.friends },
      })
    );
  };

  const handleNavigate = () => {
    if (!type) {
      navigate(`/profile/${friendId}`);
      navigate(0);
    }
  };

  return (
    <>
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserImage image={userPicturePath} size="45px" />
          <Box onClick={handleNavigate}>
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
        {!ownId && !isFriend && !type && (
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
        )}
      </FlexBetween>
    </>
  );
};

export default Friends;
