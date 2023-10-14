import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosDefaults";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import "../styles/PostDetail.css";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <Container>
      <Row className="mb-4">
        <Col md={8}>
          <div className="carousel-placeholder"></div>
        </Col>

        <Col md={4} className="data-col">
          <Row className="mb-2">
            <Col>
              <strong>{post.title}</strong>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>{post.author}</Col>
          </Row>
          <Row className="mb-2">
            <Col>{post.manufacturer}</Col>
            <Col>{post.car_model}</Col>
          </Row>
          <Row className="mb-2">
            <Col>{post.engine_layout}</Col>
            <Col>{post.engine_capacity}</Col>
          </Row>
          <Row className="mb-2">
            <Col>gearbox</Col>
            <Col>wheel drive</Col>
          </Row>
          <br />
          <Row className="mb-2">
            <Col>Mods:</Col>
          </Row>
          <Row className="mb-2">
            <Col>Mod title 1:</Col>
          </Row>
          <Row className="mb-2">
            <Col>Mod title 2:</Col>
          </Row>
          <Row className="mb-2">
            <Col>Mod title 3:</Col>
          </Row>
          <Row className="mb-2">
            <Col>Mod title 4:</Col>
          </Row>
          <Row className="mb-2">
            <Col>Mod title 5:</Col>
          </Row>
        </Col>
      </Row>

      <Row className="mb-4 description-section">
        <Col md={8}>
          <h4>Description:</h4>
          <p>
            placeholder text...placeholder text...placeholder text...placeholder
            text...placeholder text...placeholder text...placeholder
            text...placeholder text...placeholder text...placeholder
            text...placeholder text...placeholder text...placeholder
            text...placeholder text...placeholder text...placeholder
            text...placeholder text...placeholder text...placeholder
            text...placeholder text...placeholder text...placeholder
            text...placeholder text...placeholder text...placeholder
            text...placeholder text...placeholder text...placeholder
            text...placeholder text...placeholder text...placeholder
            text...placeholder text...placeholder text...placeholder
            text...placeholder text...placeholder text...placeholder
            text...placeholder text...placeholder text...
          </p>
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
