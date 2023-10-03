import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

function SignUp() {
  const [email, setEmail] = useState("");
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = "http://127.0.0.1:8000/api/user/signup/";

      const response = await axios.post(endpoint, {
        email: email,
        user_name: user_name,
        password: password,
      });

      console.log("Registration is good", response.data);
    } catch (error) {
      console.error("Registration error", error.response.data);
    }
  };

  return (
    <Container className="mt-5 registration-form">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit} className="form">
            <Form.Group controlId="formEmail" className="item">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formUsername" className="item">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={user_name}
                onChange={(e) => setUser_name(e.target.value)}
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
                Register
              </Button>
            </Form.Group>
          </Form>

          <div className="mt-3 login-link">
            <span>Already have an account?</span>
            <a href="/signin">Sign in here</a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
