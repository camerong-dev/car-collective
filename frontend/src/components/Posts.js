import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { usePostList } from "../hooks/usePostList";
import "../styles/PostCards.css";
import PaginationComponent from "./PaginationComponent";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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
    return <div>Loading...</div>;
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
        {currentPosts.map((post, idx) => (
          <Col
            xl={4}
            lg={6}
            md={6}
            sm={12}
            className="d-flex justify-content-center"
            key={idx}
          >
            <Card className="post-card" style={{ marginBottom: "20px" }}>
              <Link to={`/post/${post.id}`} className="card-link-body">
                <Card.Img variant="top" src={post.image_1} />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>Owner: {post.author_name}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>{post.car_model}</ListGroup.Item>
                  <ListGroup.Item>{post.manufacturer}</ListGroup.Item>
                  <ListGroup.Item>{post.year_of_manufacture}</ListGroup.Item>
                </ListGroup>
              </Link>
              <Card.Body>
                <ListGroup className="likes">
                  <ListGroup.Item className="like-item">
                    <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                    <span className="like-count">{post.num_likes} Likes</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
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
