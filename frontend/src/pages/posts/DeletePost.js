import React, { useState } from "react";
import axiosInstance from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";

import { Modal, Button } from "react-bootstrap";

function DeletePost({ postId }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    axiosInstance
      .delete(`delete/${postId}/`)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting the post:", error);
      });
  };

  return (
    <div>
      <Button variant="danger" onClick={() => setShowModal(true)}>
        Delete Post
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeletePost;
