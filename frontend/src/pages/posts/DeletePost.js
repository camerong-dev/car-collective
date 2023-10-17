import React from "react";
import axiosInstance from "../../api/axiosDefaults";

function DeleteButton({ postId, onSuccess, onError }) {
  const deletePost = async () => {
    try {
      const response = await axiosInstance.delete(`/delete/${postId}/`);

      if (response.status === 200) {
        onSuccess && onSuccess(response.data);
      } else {
        onError && onError(new Error("Failed to delete post"));
      }
    } catch (error) {
      onError && onError(error);
    }
  };

  return <button onClick={deletePost}>Delete Post</button>;
}

export default DeleteButton;
