import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../../styles/SignInStyles.css";
import GoogleButton from "react-google-button";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Username: ", username, "Password: ", password);
  };

  return (
    <Container className="mt-5 registration-form">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit} className="form">
            <Form.Group controlId="formUsername" className="item">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="item">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="form-button-container">
              <Button variant="primary" type="submit" className="form-button">
                Sign In
              </Button>
            </Form.Group>
          </Form>

          <div className="mt-3 register-link">
            <span>Don't have an account?</span>
            <a href="/signup">Register here</a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
