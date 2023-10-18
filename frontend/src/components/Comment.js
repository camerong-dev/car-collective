import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axiosDefaults";
import { Col } from "react-bootstrap";
import UserContext from "./UserContext";
import "../styles/Comment.css";

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${postId}/comments/`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    try {
      const response = await axiosInstance.post(`/posts/${postId}/comments/`, {
        content: commentContent,
        post: postId,
      });
      setComments([...comments, response.data]);
      setCommentContent("");
    } catch (error) {
      console.error("Error submitting comment", error);
    }
  };

  return (
    <Col md={8} className="comments-section">
      <h4>Comments:</h4>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-3">
          <strong>{comment.author_name}:</strong> {comment.content}
        </div>
      ))}
      {currentUser && (
        <div className="comment-input-section">
          <textarea
            className="comment-input"
            placeholder="Add a comment..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button
            className="submit-comment-button"
            onClick={handleCommentSubmit}
          >
            Post Comment
          </button>
        </div>
      )}
    </Col>
  );
};

export default Comment;
