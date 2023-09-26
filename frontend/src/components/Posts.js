import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function PostCards({ data }) {
    // Check if data is null 
    if (!data || data.length === 0) {
        return <p>No posts available.</p>;
    }

    return (
        <Row xs={1} md={2} className="g-4">
            {data.map((post, idx) => (
                <Col key={idx}>
                    <Card>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Text>
                                This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit
                                longer.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default PostCards;