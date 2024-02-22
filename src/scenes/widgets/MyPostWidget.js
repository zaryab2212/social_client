import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "../../states";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import Dropzone from "react-dropzone";
import {
  AttachEmailOutlined,
  DeleteOutlineOutlined,
  EditOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";

const MyPostWidget = ({ picturePath }) => {
  const [post, setpost] = useState("");
  const dispath = useDispatch();
  const [isImage, setisImage] = useState(false);
  const [image, setImage] = useState(null);
  const { palette } = useTheme();
  const userredux = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    let formData = new FormData();
    formData.append("userId", userredux._id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const res = await fetch(`/post/create/`, {
      method: "POST",
      headers: { Authorizaion: `Bearer ${token}` },
      body: formData,
    });

    const resData = await res.json();

    const posttt = resData.MyNewPost;
    dispath(setPosts({ posttt }));
    setImage(null);
    setpost("");
  };

  return (
    <>
      <WidgetWrapper>
        <FlexBetween gap="1.5rem">
          <UserImage image={picturePath} />
          <InputBase
            placeholder="What is in your mind..?"
            onChange={(e) => setpost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
        </FlexBetween>
        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&hover": { cursor: "pointer" } }}
                    width="100%"
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add image</p>
                    ) : (
                      <FlexBetween>
                        <Typography>
                          {image?.name}
                          <EditOutlined />
                        </Typography>
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onChange={(e) => setImage(null)}
                      sx={{
                        width: "16%",
                      }}
                    >
                      <DeleteOutlineOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}
        <Divider sx={{ margin: "1.25rem 0" }} />
        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setisImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{
                "&:hover": { cursor: "pointer", color: medium },
              }}
            >
              Image
            </Typography>
          </FlexBetween>
          {isNonMobileScreens ? (
            <>
              <FlexBetween gap={"0.25rem"}>
                <GifBoxOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Clip</Typography>
              </FlexBetween>
              <FlexBetween gap={"0.25rem"}>
                <AttachEmailOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Attetment</Typography>
              </FlexBetween>
              <FlexBetween gap={"0.25rem"}>
                <MicOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Audio</Typography>
              </FlexBetween>
            </>
          ) : (
            <>
              <FlexBetween gap="0.25rem">
                <MoreHorizOutlined sx={{ color: mediumMain }} />
              </FlexBetween>
            </>
          )}
          <Button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            Post
          </Button>
        </FlexBetween>
      </WidgetWrapper>
    </>
  );
};

export default MyPostWidget;
