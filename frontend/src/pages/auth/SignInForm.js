import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../../styles/UserForms.css";
import axiosInstance from "../../api/axiosDefaults";
//import { useHistory } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /// const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("token/", {
        email: email,
        password: password,
      })
      .then((token) => {
        localStorage.setItem("access_token", token.data.access);
        localStorage.setItem("refresh_token", token.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT" + localStorage.getItem("access_token");

        //history.push("/");
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <Container className="mt-5 registration-form">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit} className="form">
            <Form.Group controlId="formEmail" className="item">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <br />
            <a href="/signup">Register here</a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
