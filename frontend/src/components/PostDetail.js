import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosDefaults";
import {
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
  Modal,
} from "react-bootstrap";
import "../styles/PostDetail.css";
import useCurrentUser from "../hooks/useCurrentUser";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImg, setCurrentImg] = useState("");
  const { currentUser } = useCurrentUser();

  console.log(currentUser);

  useEffect(() => {
    axiosInstance
      .get(`posts/${id}/`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post data:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading</div>;
  if (error) return <div>{error.message}</div>;
  if (!post) return <div>No post found</div>;

  const validImages = [
    post.image_1,
    post.image_2,
    post.image_3,
    post.image_4,
    post.image_5,
  ].filter((img) => img);

  return (
    <Container>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Body>
          <img
            src={currentImg}
            alt="Full Size Image"
            style={{ width: "100%", height: "auto" }}
          />
        </Modal.Body>
      </Modal>
      <Row className="mb-4">
        <Col md={8}>
          <Carousel>
            {validImages.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  style={{ borderRadius: "10px" }} // Adding rounded corners
                  src={img}
                  alt={`Post Image ${index + 1}`}
                  onClick={() => {
                    setCurrentImg(img);
                    setShowModal(true);
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>

        <Col md={4} className="data-col">
          <Row className="mb-2">
            <Col>
              <strong>{post.title}</strong>
            </Col>
            {currentUser &&
              (currentUser.is_staff ||
                currentUser.user_name === post.author_name) && (
                <Col>
                  <button>Edit Post</button>
                </Col>
              )}
          </Row>
          <Row className="mb-2">
            <Col>
              <p>Owner: {post.author_name}</p>
            </Col>
            {currentUser &&
              (currentUser.is_staff ||
                currentUser.user_name === post.author_name) && (
                <Col>
                  <button>
                    Delete Post
                    <a href={`/editpost/${post.id}`}></a>{" "}
                  </button>
                </Col>
              )}
          </Row>
          <hr />
          <Row className="mb-2">
            <Col>{post.manufacturer}</Col>
            <Col>{post.car_model}</Col>
          </Row>
          <Row className="mb-2">
            <Col>{post.year_of_manufacture}</Col>
            <Col>{post.shape}</Col>
          </Row>
          <Row className="mb-2">
            <Col>{post.colour}</Col>
          </Row>

          <hr />
          <Row className="mb-2">
            <Col>{post.engine_layout}</Col>
            <Col>{post.engine_capacity}L</Col>
          </Row>
          <Row className="mb-2">
            <Col>{post.gearbox}</Col>
            <Col>{post.drivetrain}</Col>
          </Row>
          <Row className="mb-2">
            <Col>{post.fuel_type}</Col>
          </Row>
          <hr />
          <Row className="mb-2">
            <Col>Mods:</Col>
          </Row>
          <Row className="mb-2">
            <Col>{post.mod_title_1}</Col>
            <Col>{post.mod_description_1}</Col>
          </Row>
          <Row className="mb-2">
            <Col>{post.mod_title_2}</Col>
            <Col>{post.mod_description_2}</Col>
          </Row>
          <Row className="mb-2">
            <Col>{post.mod_title_3}</Col>
            <Col>{post.mod_description_3}</Col>
          </Row>
          <Row className="mb-2">
            <Col>{post.mod_title_4}</Col>
            <Col>{post.mod_description_4}</Col>
          </Row>
          <Row className="mb-2">
            <Col>{post.mod_title_5}</Col>
            <Col>{post.mod_description_5}</Col>
          </Row>
        </Col>
      </Row>

      <Row className="mb-4 description-section">
        <Col md={8}>
          <h4>Description:</h4>
          <p>{post.description}</p>
        </Col>

        <Col md={4} className="comments-section">
          <h4>Comments:</h4>
          <div className="mb-3">
            <strong>placeholder author:</strong> fake comment!
          </div>
          <div className="mb-3">
            <strong>placeholder author:</strong> another comment!
          </div>
          <div className="mb-3">
            <strong>placeholder author:</strong> oooo comment!
          </div>
        </Col>
      </Row>

      <Row></Row>
    </Container>
  );
}

export default PostDetail;
