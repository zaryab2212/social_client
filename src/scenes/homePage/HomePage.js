import React from "react";
import NavbarPage from "../navbarPage/NavbarPage";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdvertImage from "../widgets/AdvertImage";
import FriendsListWidget from "../widgets/FriendsListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { picturePath, _id } = useSelector((state) => state.user);
  return (
    <>
      <Box>
        {" "}
        <NavbarPage />
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="0.5rem"
          justifyContent="space=between"
          position="relative"
        >
          <Box
            // position="fixed"
            // top="9rem"
            // right="82rem"
            flexBasis={isNonMobileScreens ? "26%" : undefined}
          >
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
            // marginLeft="20rem"
          >
            <MyPostWidget picturePath={picturePath} />
            <PostsWidget />
          </Box>
          {isNonMobileScreens && (
            <Box
              // position="fixed"
              // top="7rem"
              // left="70rem"
              marginRight="6rem"
              flexBasis="27%"
            >
              <AdvertImage />
              <FriendsListWidget userId={_id} />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
