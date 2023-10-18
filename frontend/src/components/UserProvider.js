import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import jwtDecode from "jsonwebtoken/decode";
import fetchUsername from "../util/fetchUsername";

const UserProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [user_id, setUserId] = useState(null);

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

  return (
    <UserContext.Provider
      value={{
        currentUser: {
          isUserLoggedIn,
          userName,
          user_id,
        },
        setIsUserLoggedIn,
        setUserName,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
