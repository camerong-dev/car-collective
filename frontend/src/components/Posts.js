import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { usePostList } from "../hooks/usePostList";

function PostCards() {
  const { PostList } = usePostList();

  // Check if data is null
  if (!PostList || PostList.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <Row xs={1} md={2} className="g-4">
      {PostList.map((post, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>
                <ul>
                  <li>{post.car_model}</li>
                  <li>{post.manufacturer}</li>
                  <li>{post.colour}</li>
                  <li>{post.engine_capacity}</li>
                  <li>{post.engine_layout}</li>
                  <li>{post.year_of_manufacture}</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default PostCards;
