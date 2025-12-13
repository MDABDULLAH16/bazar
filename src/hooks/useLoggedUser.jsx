import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useLoggedUser = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axiosSecure
      .get(`/logged-user?email=${user.email}`)
      .then((res) => {
        setLoggedUser(res.data);
      })
      .finally(() => setLoading(false));
  }, [user?.email, axiosSecure]);

  return { loggedUser, loading };
};

export default useLoggedUser;
