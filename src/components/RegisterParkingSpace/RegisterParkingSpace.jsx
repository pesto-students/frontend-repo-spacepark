import React, { useState, useRef } from "react";
import { Form, FormGroup, Input, Button, Alert, Container, Label, Spinner, FormFeedback } from "reactstrap";
import { useAtom } from 'jotai';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { selectedServicesAtom, servicePricesAtom } from '../../atom';
import ServicePriceSelector from "./ServiceFormSelector";
import Logo from "../Logo/Logo";
import { useUser } from "../../context/userContext";
import { CreatingParkingSpaceOwner, CreateService, ParkingSapceCreation } from "./RegisterHelper";
import Nominatim from 'nominatim-geocoder';

const parkingSpaceSchema = yup.object().shape({
  username: yup
    .string()
    .required("Park owner name is required")
    .min(3, "Park owner name must be at least 3 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  numberOfSpaces: yup
    .number()
    .required("Number of spaces available is required")
    .positive("Number of spaces must be a positive integer")
    .integer("Number of spaces must be a whole number"),
  location: yup.string().required("Location is required"),
  services: yup.array()
    .of(yup.object().shape({
      service: yup.string().required('Service is required'),
      price: yup.number().typeError('Price must be a number').required('Price is required').positive('Price must be positive')
    }))
    .min(1, 'Select at least one service')
});

const initialParkingSpaceState = {
  username: "",
  password: "",
  email: "",
  numberOfSpaces: "",
  location: "",
  services: [],
};

const RegisterParkingSpace = () => {
  const navigate = useNavigate(); 
  const { setUser, setToken, setRole } = useUser();
  const [parkingSpace, setParkingSpace] = useState(initialParkingSpaceState);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 
  const [selectedServices] = useAtom(selectedServicesAtom);
  const [servicePrices] = useAtom(servicePricesAtom);
  const [location, setLocation] = useState({
    placeName: '',
    lat: 0,
    lng: 0
  });

  const servicePriceSelectorRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParkingSpace({ ...parkingSpace, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    const nominatim = new Nominatim({ secure: true });

    const servicesData = selectedServices.map(service => ({
      service: service.value,
      price: servicePrices[service.value] || ''
    }));

    const parkingSpaceData = {
      ...parkingSpace,
      services: servicesData
    };

    try {
      await parkingSpaceSchema.validate(parkingSpaceData, { abortEarly: false });
      setError(null);
      setErrors({});
      
      if (parkingSpace.location) {
        const results = await nominatim.search({ q: parkingSpace.location, addressdetails: true });
        if (results && results.length > 0) {
          const { lat, lon, display_name } = results[0];
          setLocation({ placeName: display_name, lat: parseFloat(lat), lng: parseFloat(lon) });
        }
      }
      
      const userData = await CreatingParkingSpaceOwner(parkingSpaceData);

      if (userData.error) {
        setError(userData.error);
        setLoading(false);
        return;
      }

      if (userData.status === 201) {
        setUser(userData.user); 
        setToken(userData.token);
        setRole(userData.user.role);
        localStorage.setItem('user', JSON.stringify(userData.user));
        localStorage.setItem('role', userData.user.role);
        localStorage.setItem('token', userData.token);

        const createService =  await CreateService({userId: userData.user.id, services: parkingSpaceData.services});
        if (createService) {
          const parkingSpaceCreation = await ParkingSapceCreation({
            userId: userData.user.id,
            serviceId: createService.id,
            location: parkingSpace.location,
            noOfSpaces: parkingSpace.numberOfSpaces,
            latitude: location.lat,
            longitude: location.lng
          });

          if (parkingSpaceCreation) {
            navigate('/parkingOwner');
          }
        }
        
        setParkingSpace(prevState => ({
          ...prevState,
          numberOfSpaces: "",
          location: "",
          services: [],
        }));

        if (servicePriceSelectorRef.current) {
          servicePriceSelectorRef.current.clearInputs();
        }
      }
      console.log("Form submitted successfully with data:", parkingSpaceData);
    } catch (validationError) {
      const formattedErrors = {};
      validationError.inner.forEach(err => {
        formattedErrors[err.path] = err.message;
      });
      setErrors(formattedErrors);
      setError(validationError.errors[0]);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Container className="login-container" fluid>
      <div className="d-flex justify-content-center mb-80">
        <Logo />
      </div>
      <h2 className="text-center mb-40">Register Parking Space</h2>
      <Form onSubmit={handleSubmit} className="mt-40">
        <FormGroup>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Enter owner name"
            className='field-val mb-40 mt-40'
            value={parkingSpace.username}
            onChange={handleInputChange}
            invalid={!!errors.username}
            disabled={loading} 
          />
          <FormFeedback>{errors.username}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            id="password-field"
            placeholder="Enter your password"
            className='field-val mb-40 mt-40'
            value={parkingSpace.password}
            onChange={handleInputChange}
            invalid={!!errors.password}
            disabled={loading} 
          />
          <FormFeedback>{errors.password}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className='field-val mb-40 mt-40'
            value={parkingSpace.email}
            onChange={handleInputChange}
            invalid={!!errors.email}
            disabled={loading} 
          />
          <FormFeedback>{errors.email}</FormFeedback>
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
            invalid={!!errors.numberOfSpaces}
            disabled={loading} 
          />
          <FormFeedback>{errors.numberOfSpaces}</FormFeedback>
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
            invalid={!!errors.location}
            disabled={loading} 
          />
          <FormFeedback>{errors.location}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className="f-20 bold p-2">Services Offered (select at least one) and Add perday charges for carpark service</Label>
          <div>
            <FormGroup check className="f-20 px-0 mx-0 my-1">
              <ServicePriceSelector ref={servicePriceSelectorRef} disabled={loading} /> 
            </FormGroup>
          </div>
        </FormGroup>
        {error && <Alert color="danger mt-60">{error}</Alert>}
        <Button type="submit" className="w-100 mt-3 back-color text-bold p-2 f-20" disabled={loading}>
          {loading ? <Spinner size="sm" /> : 'Register for new parking space'} 
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterParkingSpace;
