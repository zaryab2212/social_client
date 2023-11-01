import { EditOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Input,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { setLogin } from "../../states";
import FlexBetween from "../../components/FlexBetween";

const loginSchema = yup.object().shape({
  email: yup.string().email("invailid email").required("required"),
  password: yup.string().required("required"),
});
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invailid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};
const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let val in values) {
      formData.append(val, values[val]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:8080/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };
  const Login = async (values, onSubmitProps) => {
    const loggedInUserResponse = await fetch(
      "http://localhost:8080/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const loggedInUser = await loggedInUserResponse.json();
    onSubmitProps.resetForm();

    if (loggedInUser) {
      dispatch(
        setLogin({ user: loggedInUser.user, token: loggedInUser.token })
      );
      navigate("/");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isRegister) {
      await register(values, onSubmitProps);
    } else {
      await Login(values, onSubmitProps);
    }
  };
  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,

          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4,minmax(0,1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    errors={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                  ></TextField>
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    errors={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  ></TextField>
                  <TextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    errors={Boolean(touched.location && errors.location)}
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 4" }}
                  ></TextField>
                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name="occupation"
                    errors={Boolean(touched.occupation && errors.occupation)}
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: "span 4" }}
                  ></TextField>
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ "&hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {values.picture ? (
                            <p>Add picture</p>
                          ) : (
                            <FlexBetween>
                              <Typography>
                                {values.picture?.name}
                                <EditOutlined />
                              </Typography>
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                errors={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              ></TextField>
              <TextField
                label="password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                errors={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              ></TextField>
            </Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account ? Sign Up here"
                : "Already have an account ? Login here6"}
            </Typography>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Form;
