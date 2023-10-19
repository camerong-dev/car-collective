import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosDefaults";

const useComments = (postid) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${postid}/comments/`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };

    fetchComments();
  }, [postid]);

  const addComment = async (content) => {
    try {
      const response = await axiosInstance.post(`/posts/${postid}/comments/`, {
        content,
        post: postid,
      });
      setComments([...comments, response.data]);
    } catch (error) {
      console.error("Error submitting comment", error);
    }
  };

  return { comments, addComment };
};

export default useComments;
