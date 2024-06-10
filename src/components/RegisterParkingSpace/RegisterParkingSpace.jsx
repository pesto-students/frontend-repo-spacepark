import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Alert, Container } from "reactstrap";
import * as yup from "yup";

const parkingSpaceSchema = yup.object().shape({
  parkOwnerName: yup
    .string()
    .required("Park owner name is required")
    .min(3, "Park owner name must be at least 3 characters"),
  numberOfSpaces: yup
    .number()
    .required("Number of spaces available is required")
    .positive("Number of spaces must be a positive integer")
    .integer("Number of spaces must be a whole number"),
  location: yup.string().required("Location is required"),
  services: yup.array().of(yup.string()).min(1, "Select at least one service"),
});

const RegisterParkingSpace = () => {
  const [parkingSpace, setParkingSpace] = useState({
    parkOwnerName: "",
    numberOfSpaces: "",
    location: "",
    services: [],
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParkingSpace({ ...parkingSpace, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    parkingSpaceSchema
      .validate(parkingSpace, { abortEarly: false })
      .then(() => {
        // Handle form submission here
      })
      .catch((validationError) => {
        setError(validationError.errors[0]);
      });
  };

  return (
    <Container className="login-container" fluid>
      <h2 className="text-center mb-4">Register Parking Space</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="parkOwnerName"
            id="parkOwnerName"
            placeholder="Enter owner name"
            className='field-val mb-40'
            value={parkingSpace.parkOwnerName}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            name="numberOfSpaces"
            id="numberOfSpaces"
            placeholder="Enter number of spaces"
            className='field-val mb-40'
            value={parkingSpace.numberOfSpaces}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="location"
            id="location"
            placeholder="Enter your location"
            className='field-val mb-40'
            value={parkingSpace.location}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label className="f-20">Services Offered (select at least one)</Label>
          <div>
            <FormGroup check  className="f-20">
              <Input
                type="checkbox"
                id="evCharging"
                name="services"
                value="evCharging"
                // className='field-val mb-40'
                onChange={handleInputChange}
              />
              <Label check for="evCharging" className="f-20">EV Charging</Label>
            </FormGroup>
            <FormGroup check  className="f-20">
              <Input
                type="checkbox"
                id="carWash"
                name="services"
                value="carWash"
                className="f-20 border-cl"
                onChange={handleInputChange}
              />
              <Label check for="carWash">Car Wash</Label>
            </FormGroup>
            <FormGroup check  className="f-20">
              <Input
                type="checkbox"
                id="carPark"
                name="services"
                value="carPark"
                onChange={handleInputChange}
              />
              <Label check for="carPark" className="f-20">Car Park</Label>
            </FormGroup>
          </div>
        </FormGroup>
        {error && <Alert color="danger">{error}</Alert>}
        <Button type="submit" color="primary" className="w-100 mt-3">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterParkingSpace;
