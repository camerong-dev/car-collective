import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../../styles/UserForms.css";
import axios from "axios";
/// import { useHistory } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

function SignIn() {
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  /// const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("http://127.0.0.1:8000/api/signin/", {
        user_name: user_name,
        password: password,
      })
      .then((token) => {
        localStorage.setItem("access_token", token.data.access);
        localStorage.setItem("refresh_token", token.data.refresh);

        /// history.push("/");
      })
      // Handle form submission logic here
      .catch((error) => {
        console.error("Login error:", error);
      });
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
                value={user_name}
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
