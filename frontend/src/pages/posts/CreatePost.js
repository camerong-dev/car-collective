import React, { useState, prevState } from "react";
import axiosInstance from "../../api/axiosDefaults";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../../styles/UserForms.css";
import { isTokenExpired } from "../../util/isTokenExpired";
import { useNavigate } from "react-router-dom";

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
    description: "",
    mod_title_1: "",
    mod_description_1: "",
    mod_title_2: "",
    mod_description_2: "",
    mod_title_3: "",
    mod_description_3: "",
    mod_title_4: "",
    mod_description_4: "",
    mod_title_5: "",
    mod_description_5: "",
    image_1: null,
    image_2: null,
    image_3: null,
    image_4: null,
    image_5: null,
  });

  const navigate = useNavigate();

  //Defining options for dropdown fields:
  const SHAPE_OPTIONS = ["Hatchback", "Saloon", "Estate", "SUV", "Convertible"];
  const GEARBOX_OPTIONS = ["Manual", "Automatic"];
  const DRIVETRAIN_OPTIONS = [
    "Front-Wheel Drive",
    "Rear-Wheel Drive",
    "Four-Wheel Drive",
  ];
  const FUEL_TYPE_OPTIONS = ["Petrol", "Diesel", "Hybrid", "Electric"];

  const [activeMods, setActiveMods] = useState(0);

  const addModField = () => {
    if (activeMods < 5) {
      setActiveMods((prevCount) => prevCount + 1);
    }
  };

  const [activePics, setActivePics] = useState(1);

  const addPicField = () => {
    if (activePics < 5) {
      setActivePics((prevCount) => prevCount + 1);
    }
  };

  const [error, setError] = useState(null);

  const handleChange = (error) => {
    setFormData({
      ...formData,
      [error.target.name]: error.target.value,
    });
  };

  const handleImageChange = (a) => {
    const file = a.target.files[0];
    const name = a.target.name;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB.");
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: file,
    }));
  };

  const handleSubmit = async (error) => {
    error.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      if (key.includes("image_") && formData[key]) {
        data.append(key, formData[key]);
      } else if (!key.includes("image_")) {
        data.append(key, formData[key]);
      }
    }

    try {
      if (isTokenExpired(localStorage.getItem("access_token"))) {
        await axiosInstance.get("user/get_username/");
      }
      const response = await axiosInstance.post("create/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("access_token")
            ? "Bearer " + localStorage.getItem("access_token")
            : null,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error posting:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while creating the post.");
      }
    }
  };

  return (
    <Container className="mt-5 registration-form">
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row>
          {error && (
            <Col md={12}>
              <p className="alert alert-danger">{error}</p>
            </Col>
          )}

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

          <Col md={6}>
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
          </Col>

          <Col md={6}>
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
          </Col>

          {/* Mod fields */}
          {Array.from({ length: activeMods }).map((_, index) => (
            <React.Fragment key={index}>
              <Col md={6}>
                <Form.Group
                  controlId={`formModTitle_${index + 1}`}
                  className="item"
                >
                  <Form.Label>Mod Title {index + 1}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a title"
                    value={formData[`mod_title_${index + 1}`]}
                    onChange={handleChange}
                    name={`mod_title_${index + 1}`}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  controlId={`formModDescription_${index + 1}`}
                  className="item"
                >
                  <Form.Label>Mod Description {index + 1}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a description"
                    value={formData[`mod_description_${index + 1}`]}
                    onChange={handleChange}
                    name={`mod_description_${index + 1}`}
                  />
                </Form.Group>
              </Col>
            </React.Fragment>
          ))}

          <Col md={12} className="text-center">
            {activeMods < 5 && (
              <Button variant="secondary" onClick={addModField}>
                Add Mod
              </Button>
            )}
          </Col>

          {/* Image fields */}
          {Array.from({ length: activePics }).map((_, index) => (
            <Form.Group controlId={`formImage_${index + 1}`} className="item">
              <Form.Label>Image {index + 1}</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageChange}
                name={`image_${index + 1}`}
              />
            </Form.Group>
          ))}

          <Col md={12} className="text-center">
            {activePics < 5 && (
              <Button variant="secondary" onClick={addPicField}>
                Add Image
              </Button>
            )}
          </Col>

          <Form.Group controlId="formDescription" className="item">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Give a brief descrption of your car..."
              value={formData.description}
              onChange={handleChange}
              name="description"
              required
            />
          </Form.Group>

          <Col md={12}>
            <Form.Group className="form-button-container">
              <Button variant="primary" type="submit" className="form-button">
                Create Post
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default CreatePost;
