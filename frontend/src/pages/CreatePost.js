import React, { useState } from "react";
import axiosInstance from "../api/axiosDefaults";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../styles/UserForms.css";

function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    manufacturer: "",
    car_model: "",
    engine_layout: "",
    engine_capacity: "",
    color: "",
    year_of_manufacture: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (error) => {
    setFormData({
      ...formData,
      [error.target.name]: error.target.value,
    });
  };

  const handleSubmit = async (error) => {
    error.preventDefault();

    try {
      const response = await axiosInstance.post("posts/", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error posting:", error);
      setError(error.message || "An error occurred");
    }
  };

  return (
    <Container className="mt-5 registration-form">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {error && <p className="alert alert-danger">{error}</p>}
          <Form onSubmit={handleSubmit} className="form">
            <Form.Group controlId="formTitle" className="item">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formManufacturer" className="item">
              <Form.Label>Manufacturer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a Manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCar_Model" className="item">
              <Form.Label>Car Model</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Model"
                value={formData.car_model}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEngine_Layout" className="item">
              <Form.Label>Engine Layout</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Engine Layout"
                value={formData.engine_layout}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEngine_Capacity" className="item">
              <Form.Label>Engine Capacity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the Engine Capacity"
                value={formData.engine_capacity}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formColor" className="item">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Color"
                value={formData.color}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formYear_Of_Manufacture" className="item">
              <Form.Label>Year Of Manufacture</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the year it was made"
                value={formData.year_of_manufacture}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="form-button-container">
              <Button variant="primary" type="submit" className="form-button">
                Create Post
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePost;
