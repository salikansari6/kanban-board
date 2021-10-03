import axios from "axios";
import React from "react";
import { Redirect, useLocation } from "react-router-dom";

const GetToken = () => {
  const location = useLocation();

  const token = new URLSearchParams(location.search).get("token");

  console.log(token);

  if (token) {
    localStorage.setItem("accessToken", token);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("accessToken")}`;

    return <Redirect to="/kanban" />;
  } else {
    return <Redirect to="/" />;
  }
};

export default GetToken;
