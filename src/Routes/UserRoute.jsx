import React from "react";
import useLoggedUser from "../hooks/useLoggedUser";
import { useNavigate } from "react-router";

const UserRoute = ({ children }) => {
  const { loggedUser } = useLoggedUser();
  console.log({ loggedUser });
  const navigate = useNavigate();

  if (loggedUser?.role === "user") {
    return children;
  } else {
    navigate("/myProfile");
  }
};

export default UserRoute;
