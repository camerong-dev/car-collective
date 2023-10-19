import { useEffect, useState } from "react";
import jwtDecode from "jsonwebtoken/decode";
import fetchUsername from "../util/fetchUsername";
import { logoutUser } from "../components/Logout";

function useUsername() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [user_id, setUserId] = useState(null);

  const handleLogin = (token) => {
    const decodedToken = jwtDecode(token);
    setIsUserLoggedIn(true);
    setUserId(decodedToken.user_id);
    fetchUsername(decodedToken.user_id)
      .then((username) => {
        setUserName(username);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      const decodedToken = jwtDecode(token);
      setIsUserLoggedIn(true);
      setUserId(decodedToken.user_id);
      fetchUsername(decodedToken.user_id)
        .then((username) => {
          setUserName(username);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUserId(null);
    setUserName("");
    setIsUserLoggedIn(false);
  };

  return { isUserLoggedIn, userName, handleLogout, handleLogin };
}

export default useUsername;
