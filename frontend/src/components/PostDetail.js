import React from "react";
import { useParams } from "react-router-dom";

function PostDetail() {
  const { id } = useParams();

  return (
    <div>
      <h2>Post Details</h2>
      <p>Showing details for post ID: {id}</p>
    </div>
  );
}

export default PostDetail;
