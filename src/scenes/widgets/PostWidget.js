import { useTheme } from "@emotion/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "../../states";
import WidgetWrapper from "../../components/WidgetWrapper";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
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
import { red } from "@mui/material/colors";
import UserWidget from "./UserWidget.js";
import UserImage from "../../components/UserImage.js";
import axios from "axios";

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
  const [isComment, setisComment] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const LoggedInUser = useSelector((state) => state.user._id);
  const [commentText, setCommentText] = useState("");

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const liked = likes.includes(LoggedInUser);

  const pachLike = async () => {
    const res = await fetch(`/post/${postId}/like`, {
      method: "PATCH",
      headers: {
        Autorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ userId: LoggedInUser }),
    });
    const updatedPost = await res.json();
    dispatch(setPosts(updatedPost));
  };

  const handleComment = async () => {
    try {
      const pay = { comment: commentText, user: postUserId };
      const { data } = await axios.patch(
        `/post/${postId}/comments`,
        { pay },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(data);
      if (data) {
        dispatch(setPosts(data));
        setCommentText("");
      }
    } catch (error) {
      console.log(error);
    }
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
            src={`/assets/${picturePath}`}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={pachLike}>
                {liked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined sx={{ color: red }} />
                )}
              </IconButton>
              <Typography>{likes?.length ? likes?.length : 0}</Typography>
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
            {comments?.map((cmt) => (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="start"
                key={cmt.id}
              >
                <Divider />
                <Box margin=".5rem" maxHeight="3rem">
                  <UserImage image={cmt?.user?.picturePath} size="48px" />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: palette.neutral.light,
                    borderRadius: "2rem",
                    padding: ".3rem 1.5rem",
                    margin: ".1rem",
                  }}
                >
                  <Typography
                    color={main}
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      "&:hover": {
                        color: palette.primary.light,
                        cursor: "pointer",
                      },
                    }}
                  >
                    {`${cmt?.user?.firstName} ${cmt?.user?.lastName}`}
                  </Typography>
                  <Typography
                    color={main}
                    // variant="h6"
                    // fontWeight="bold"
                    sx={{
                      "&:hover": {
                        color: palette.primary.light,
                      },
                    }}
                  >
                    {cmt?.comment}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
        <FlexBetween>
          <InputBase
            placeholder="Write your commment"
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: ".2rem 2rem",
              margin: ".2rem",
            }}
          />
          <Button
            // disabled={!post}
            onClick={handleComment}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            Done
          </Button>
        </FlexBetween>
      </WidgetWrapper>
    </>
  );
};

export default PostWidget;
