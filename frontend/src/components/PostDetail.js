import React, { useState, useEffect, useContext } from "react";
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
import { useNavigate } from "react-router-dom";
import DeleteButton from "../pages/posts/DeletePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { fetchPostDetail } from "../util/fetchPostDetail";
import Comment from "./Comment";
import UserContext from "./UserContext";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImg, setCurrentImg] = useState("");
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    const heartIcon = document.querySelector(".heart-icon");
    heartIcon.classList.add("shaking");

    setTimeout(() => {
      heartIcon.classList.remove("shaking");
    }, 500);
    setLiked(true);
    axiosInstance
      .post(`like/${id}/`)
      .then(() => {
        return fetchPostDetail(id);
      })
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.error("Error liking the post:", error);
      });
  };

  useEffect(() => {
    fetchPostDetail(id)
      .then((data) => {
        setPost(data);
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
                currentUser.username === post.author_name) && (
                <Col>
                  <button onClick={() => navigate(`/editpost/${id}`)}>
                    Edit Post
                  </button>
                </Col>
              )}
          </Row>
          <Row className="mb-2">
            <Col>
              <p>Owner: {post.author_name}</p>
            </Col>
            {currentUser &&
              (currentUser.is_staff ||
                currentUser.username === post.author_name) && (
                <Col>
                  <DeleteButton
                    postId={id}
                    onPostDeleted={() => {
                      navigate("/");
                    }}
                  />
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
          <hr />
          <Row className="likes-row mb-2">
            <Col>
              <FontAwesomeIcon icon={faHeart} className="heart-icon" />
              <span className="likes-count">{post.num_likes} Likes</span>
              {currentUser ? (
                <div>
                  <button
                    className="like-button"
                    title="Like Post"
                    onClick={handleLike}
                  >
                    Like / Unlike Post
                  </button>
                </div>
              ) : null}
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mb-4 description-section">
        <Col md={8}>
          <h4>Description:</h4>
          <p>{post.description}</p>
        </Col>

        <Comment postId={id} />
      </Row>
    </Container>
  );
}

export default PostDetail;
