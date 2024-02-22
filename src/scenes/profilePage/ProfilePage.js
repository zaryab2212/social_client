import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FriendsListWidget from "../widgets/FriendsListWidget";
import PostsWidget from "../widgets/PostsWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import UserWidget from "../widgets/UserWidget";
import NavbarPage from "../navbarPage/NavbarPage";

const ProfilePage = () => {
  const [user, setuser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const res = await fetch(`/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setuser(data);
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {/* {console.log(user)} */}
      {user && (
        <Box>
          {" "}
          <NavbarPage />
          <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="2rem"
            justifyContent="center"
          >
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
              <UserWidget userId={userId} picturePath={user.user.picturePath} />
              <Box m="2rem 0"></Box>
              <FriendsListWidget userId={userId} />
            </Box>
            <Box
              flexBasis={isNonMobileScreens ? "42%" : undefined}
              mt={isNonMobileScreens ? undefined : "2rem"}
            >
              <MyPostWidget picturePath={user.user.picturePath} />
              <Box m="2rem 0"></Box>
              <PostsWidget userId={userId} isProfile />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProfilePage;
