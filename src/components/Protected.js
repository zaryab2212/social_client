import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(user);
  if (!user) {
    return <Navigate to="/login" />;
  } else return children;
};

export default Protected;
