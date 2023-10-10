import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ListGroup } from "react-bootstrap";
import { usePostList } from "../hooks/usePostList";
import LoadingSpinner from "./LoadingSpinner.js";
import "../styles/PostCards.css";
import PaginationComponent from "./PaginationComponent";

function PostCards() {
  const { PostList, isLoading } = usePostList();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // Check if data is null
  if (!PostList || PostList.length === 0) {
    return <p>No posts available.</p>;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = PostList.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="postcards-container">
      <Row>
        {[...Array(2)].map((_, rowIndex) => (
          <Row key={rowIndex}>
            {currentPosts
              .slice(rowIndex * 3, rowIndex * 3 + 3)
              .map((post, idx) => (
                <Col
                  lg={4}
                  md={6}
                  sm={12}
                  className="d-flex justify-content-center"
                  key={idx}
                >
                  <Card className="post-card" style={{ marginBottom: "20px" }}>
                    <Card.Img
                      variant="top"
                      src={"holder.js/100px180?text=Image cap"}
                    />
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>Filler text</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>{post.car_model}</ListGroup.Item>
                      <ListGroup.Item>{post.manufacturer}</ListGroup.Item>
                      <ListGroup.Item>{post.colour}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                      <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        ))}
      </Row>
      <div className="pagiantion-container d-flex justify-content-center">
        <PaginationComponent
          currentPage={currentPage}
          totalPosts={PostList.length}
          postsPerPage={postsPerPage}
          paginate={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default PostCards;
