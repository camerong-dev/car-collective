import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosDefaults";

const useLike = (id, currentUser) => {
  const [liked, setLiked] = useState(false);
  const token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const initialLiked = localStorage.getItem(`liked-${id}`) === "true";
    setLiked(initialLiked);

    if (currentUser?.liked_posts) {
      const hasLiked = currentUser.liked_posts.some(
        (like) => like.post_id === Number(id)
      );
      setLiked(hasLiked);
      console.log(hasLiked);
      localStorage.setItem(`liked-${id}`, hasLiked ? "true" : "false");
    }
  }, [currentUser, id]);

  const handleLike = async () => {
    try {
      await axiosInstance.post(`like/${id}/`, config);
      setLiked(true);
      localStorage.setItem(`liked-${id}`, "true");
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosInstance.post(`like/${id}/`, config);
      setLiked(false);
      localStorage.setItem(`liked-${id}`, "false");
    } catch (error) {
      console.error("Error unliking the post:", error);
    }
  };

  return { liked, handleLike, handleUnlike };
};

export default useLike;
