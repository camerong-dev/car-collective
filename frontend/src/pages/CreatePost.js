import React, { useState } from "react";
import axiosInstance from "../api/axiosDefaults";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../styles/UserForms.css";
import { isTokenExpired } from "../util/isTokenExpired";

function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    manufacturer: "",
    car_model: "",
    engine_layout: "",
    engine_capacity: "",
    colour: "",
    year_of_manufacture: "",
    fuel_type: "",
    gearbox: "",
    drivetrain: "",
    shape: "",
  });

  //Defining options for dropdown fields:
  const SHAPE_OPTIONS = ["Hatchback", "Saloon", "Estate", "SUV", "Convertible"];
  const GEARBOX_OPTIONS = ["Manual", "Automatic"];
  const DRIVETRAIN_OPTIONS = [
    "Front-Wheel Drive",
    "Rear-Wheel Drive",
    "Four-Wheel Drive",
  ];
  const FUEL_TYPE_OPTIONS = ["Petrol", "Diesel", "Hybrid", "Electric"];

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
      if (isTokenExpired(localStorage.getItem("access_token"))) {
        await axiosInstance.get("user/get_username/");
      }
      const response = await axiosInstance.post("create/", formData, {
        headers: {
          Authorization: localStorage.getItem("access_token")
            ? "Bearer " + localStorage.getItem("access_token")
            : null,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error posting:", error);
      setError(error.message || "An error occurred");
    }
  };

  return (
    <Container className="mt-5 registration-form">
      <Row>
        {error && (
          <Col md={12}>
            <p className="alert alert-danger">{error}</p>
          </Col>
        )}
        <Col md={6}>
          <Form.Group controlId="formTitle" className="item">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a Title"
              value={formData.title}
              onChange={handleChange}
              name="title"
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
              name="manufacturer"
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
              name="car_model"
              required
            />
          </Form.Group>

          <Form.Group controlId="formShape" className="item">
            <Form.Label>Shape</Form.Label>
            <Form.Control
              as="select"
              placeholder="Select a Shape"
              value={formData.shape}
              onChange={handleChange}
              name="shape"
              required
            >
              <option value="" disabled>
                Select a Shape
              </option>
              {SHAPE_OPTIONS.map((shape, index) => (
                <option key={index} value={shape}>
                  {shape}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formFuel_Type" className="item">
            <Form.Label>Fuel Type</Form.Label>
            <Form.Control
              as="select"
              placeholder="Select a Fuel Type"
              value={formData.fuel_type}
              onChange={handleChange}
              name="fuel_type"
              required
            >
              <option value="" disabled>
                Select a Fuel Type
              </option>
              {FUEL_TYPE_OPTIONS.map((fuel_type, index) => (
                <option key={index} value={fuel_type}>
                  {fuel_type}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formEngine_Layout" className="item">
            <Form.Label>Engine Layout</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the Engine Layout"
              value={formData.engine_layout}
              onChange={handleChange}
              name="engine_layout"
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
              name="engine_capacity"
              required
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="formGearbox" className="item">
            <Form.Label>Gearbox</Form.Label>
            <Form.Control
              as="select"
              placeholder="Select a Gearbox"
              value={formData.gearbox}
              onChange={handleChange}
              name="gearbox"
              required
            >
              <option value="" disabled>
                Select a Gearbox
              </option>
              {GEARBOX_OPTIONS.map((gearbox, index) => (
                <option key={index} value={gearbox}>
                  {gearbox}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formDrivetrain" className="item">
            <Form.Label>Drivetrain</Form.Label>
            <Form.Control
              as="select"
              placeholder="Select a Drivetrain"
              value={formData.drivetrain}
              onChange={handleChange}
              name="drivetrain"
              required
            >
              <option value="" disabled>
                Select a Drivetrain
              </option>
              {DRIVETRAIN_OPTIONS.map((drivetrain, index) => (
                <option key={index} value={drivetrain}>
                  {drivetrain}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formColour" className="item">
            <Form.Label>Colour</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the Colour"
              value={formData.colour}
              onChange={handleChange}
              name="colour"
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
              name="year_of_manufacture"
              required
            />
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group className="form-button-container">
            <Button variant="primary" type="submit" className="form-button">
              Create Post
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePost;
