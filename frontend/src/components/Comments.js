import React, { useState, useCallback } from "react";
import { Col } from "react-bootstrap";

const Comment = React.memo(
  ({
    currentUser,
    comments,
    setCommentContent,
    handleCommentSubmit,
    loading,
    commentContent,
  }) => {
    function formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      const formattedDate = date.toLocaleString();
      return formattedDate;
    }

    return (
      <Col md={8} className="comments-section">
        <h4>Comments:</h4>
        {comments.map((comment) => (
          <div key={comment.id} className="mb-3">
            <strong>{comment.author_name}:</strong> {comment.content}{" "}
            {formatTimestamp(comment.timestamp)}
          </div>
        ))}
        {currentUser && (
          <div className="comment-input-section">
            <textarea
              id="comment-input"
              name="comment"
              className="comment-input"
              placeholder="Add a comment..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <button
              className="submit-comment-button"
              onClick={handleCommentSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Post Comment"}
            </button>
          </div>
        )}
      </Col>
    );
  }
);

export default Comment;
