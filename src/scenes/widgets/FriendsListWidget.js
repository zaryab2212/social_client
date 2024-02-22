import { useTheme } from "@emotion/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../states";
import WidgetWrapper from "../../components/WidgetWrapper";
import { Box, Typography } from "@mui/material";
import Friends from "../../components/Friends";

const FriendsListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const res = await fetch(`/user/${userId}/friends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    console.log(data);
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, [dispatch]);

  return (
    <>
      <WidgetWrapper>
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.5rem" }}
        >
          Freinds List
        </Typography>
        {friends && (
          <Box display="flex" flexDirection="column" gap="1.5rem">
            {friends?.friends?.userfriends?.map((friend) => (
              <Friends
                key={friend?._id}
                friendId={friend?._id}
                name={`${friend?.firstName} ${friend?.lastName}`}
                subtitle={friend?.occupation}
                userPicturePath={friend?.picturePath}
              ></Friends>
            ))}
          </Box>
        )}
      </WidgetWrapper>
    </>
  );
};

export default FriendsListWidget;
