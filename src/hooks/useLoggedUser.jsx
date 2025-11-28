import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const useLoggedUser = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.email) return; // wait until user is loaded

    const controller = new AbortController(); // for canceling request if unmounted

    axios
      .get(`${url}/logged-user?email=${user.email}`, {
        signal: controller.signal,
      })
      .then((response) => setLoggedUser(response.data))
      .catch((err) => {
        if (err.name !== "CanceledError") {
          console.error("Failed to fetch logged user:", err);
        }
      });

    return () => controller.abort(); // cleanup on unmount
  }, [user?.email]); // only run when user.email changes

  return { loggedUser };
};

export default useLoggedUser;
