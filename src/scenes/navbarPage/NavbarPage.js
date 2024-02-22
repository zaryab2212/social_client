import { useTheme } from "@emotion/react";
import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import {
  Close,
  DarkMode,
  Help,
  LightMode,
  LightModeOutlined,
  Message,
  Notifications,
  Search,
} from "@mui/icons-material";
import { setLogOut, setMode } from "../../states";
const NavbarPage = () => {
  const [isMobileMenuToggle, setisMobileMenuToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const neturalLight = theme.palette.neutral?.light;
  const dark = theme.palette.neutral?.dark;
  const background = theme.palette.neutral.background?.default;
  const primaryLight = theme.palette.primary?.light;
  const alt = theme.palette.background?.alt;

  const fullname = `${user?.firstName} ${user?.lastName}`;

  const handleLogOut = () => {
    dispatch(setLogOut());
    navigate("/login");
  };
  return (
    <>
      <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate("/")}
            sx={{
              "&hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            Social-App
          </Typography>
          {isNonMobileScreen && (
            <FlexBetween
              backgroundColor={neturalLight}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            >
              <InputBase placeholder="Seach here..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>
        {/* Desktop Nav */}
        {isNonMobileScreen ? (
          <FlexBetween gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightModeOutlined sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullname}>
              <Select
                value={fullname}
                sx={{
                  backgroundColor: neturalLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "20px  1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neturalLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullname}>
                  <Typography>{fullname}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setisMobileMenuToggle(!isMobileMenuToggle)}
          >
            <Menu />
          </IconButton>
        )}
        {!isNonMobileScreen && isMobileMenuToggle && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
          >
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setisMobileMenuToggle(!isMobileMenuToggle)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MenuIrem */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              // justifyContent="center"

              gap="3rem"
            >
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightModeOutlined sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <Message sx={{ fontSize: "25px" }} />
              <Notifications sx={{ fontSize: "25px" }} />
              <Help sx={{ fontSize: "25px" }} />
              <FormControl variant="standard" value={fullname}>
                <Select
                  value={fullname}
                  sx={{
                    backgroundColor: neturalLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "25rem  1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neturalLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullname}>
                    <Typography>{fullname}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogOut)}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </>
  );
};

export default NavbarPage;
