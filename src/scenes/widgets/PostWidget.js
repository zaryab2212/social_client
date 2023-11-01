import { useTheme } from "@emotion/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../states";
import WidgetWrapper from "../../components/WidgetWrapper";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  LinkOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import Friends from "../../components/Friends.js";
import { useNavigate } from "react-router-dom";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComment, setisComment] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const LoggedInUser = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[LoggedInUser]);
  const likesCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const pachLike = async () => {
    const res = await fetch(`http://localhost:8080/post/${postId}/like`, {
      method: "PATCH",
      headers: {
        Autorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ userId: LoggedInUser }),
    });
    const updatedPost = await res.json();
    dispatch(setPost({ post: updatedPost }));
    window.location.reload();
  };

  return (
    <>
      <WidgetWrapper m="2rem 0 ">
        <Friends
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:8080/assets/${picturePath}`}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={pachLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined sx={{ color: primary }} />
                )}
              </IconButton>
              <Typography>{likesCount}</Typography>
            </FlexBetween>
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setisComment(!isComment)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        {isComment && (
          <Box mt="0.5rem">
            {comments?.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </WidgetWrapper>
    </>
  );
};

export default PostWidget;
