import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosDefaults";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("current-user/")
      .then((response) => {
        setCurrentUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching current user data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return { currentUser, loading, error };
};

export default useCurrentUser;
