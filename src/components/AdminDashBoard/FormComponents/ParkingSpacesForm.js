import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Alert,
  Container,
  Spinner,
} from "reactstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useAtom } from "jotai";
import {
  selectedServicesAtom,
  servicePricesAtom,
  menuIndexState,
} from "../../../atom";
import ServicePriceSelector from "../../RegisterParkingSpace/ServiceFormSelector";
import {
  CreateService,
  ParkingSapceCreation,
} from "../../RegisterParkingSpace/RegisterHelper";
import Logo from "../../Logo/Logo";
import { useUser } from "../../../context/userContext";
import Nominatim from "nominatim-geocoder";

const parkingSpaceSchema = yup.object().shape({
  location: yup.string().required("Location is required"),
  numberOfSpaces: yup
    .number()
    .required("Number of spaces available is required")
    .positive("Number of spaces must be a positive integer")
    .integer("Number of spaces must be a whole number"),
  services: yup
    .array()
    .of(
      yup.object().shape({
        service: yup.string().required("Service is required"),
        price: yup
          .number()
          .typeError("Price must be a number")
          .required("Price is required")
          .positive("Price must be positive"),
      })
    )
    .min(1, "Select at least one service"),
});

const initialFormData = {
  numberOfSpaces: "",
  location: "",
  services: [],
};

const ParkingSpacesForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors] = useState({});
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ placeName: "", lat: 0, lng: 0 });
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedServices] = useAtom(selectedServicesAtom);
  const [servicePrices] = useAtom(servicePricesAtom);
  const { user } = useUser();
  const servicePriceSelectorRef = useRef();
  const [activeIndex, setActiveIndex] = useAtom(menuIndexState);

  useEffect(() => {
    if (id) {
      const fetchParkingSpaceData = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}api/parkingSpaces/${id}`
          );
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching parking space data:", error);
        }
      };
      fetchParkingSpaceData();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setLoading(true); // Set loading to true
    const nominatim = new Nominatim();
    const userId = user?.id;

    const servicesData = selectedServices.map((service) => ({
      service: service.value,
      price: servicePrices[service.value] || "",
    }));

    const parkingSpaceData = {
      ...formData,
      services: servicesData,
    };

    try {
      await parkingSpaceSchema.validate(parkingSpaceData, {
        abortEarly: false,
      });

      setError(null);
      if (formData.location) {
        const results = await nominatim.search({
          q: formData.location,
          addressdetails: true,
        });
        if (results && results.length > 0) {
          const { lat, lon, display_name } = results[0];
          setLocation({
            placeName: display_name,
            lat: parseFloat(lat),
            lng: parseFloat(lon),
          });
        }
      }

      const createService = await CreateService({
        userId: userId,
        services: parkingSpaceData.services,
      });
      if (createService) {
        const parkingSpaceCreation = await ParkingSapceCreation({
          userId: userId,
          serviceId: createService.id,
          location: formData.location,
          noOfSpaces: formData.numberOfSpaces,
          latitude: location.lat,
          longitude: location.lng,
        });
        if (parkingSpaceCreation) {
          navigate("/parkingOwner");
        }
      }

      // Reset form fields after successful submission
      setFormData(initialFormData);

      // Clear ServicePriceSelector inputs if available
      if (servicePriceSelectorRef.current) {
        servicePriceSelectorRef.current.clearInputs();
      }

      console.log("Form submitted successfully with data:", parkingSpaceData);
      //anj-added this line to navigate to list after submission
      setActiveIndex(1);
    } catch (validationError) {
      setError(validationError.errors[0]);
    } finally {
      setIsDisabled(false);
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Container className="login-container" fluid>
      <div className="d-flex justify-content-center mb-80">
        <Logo />
      </div>
      <h2 className="text-center mb-40">
        {id ? "Edit Parking Space" : "Register Parking Space"}
      </h2>
      <Form onSubmit={handleSubmit} className="mt-40">
        <FormGroup>
          <Input
            type="text"
            name="location"
            id="location"
            placeholder="Enter your location"
            className="field-val mb-40"
            value={formData.location}
            onChange={handleInputChange}
            disabled={isDisabled || loading} // Disable input when loading
          />
          {errors.location && <FormFeedback>{errors.location}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            name="numberOfSpaces"
            id="numberOfSpaces"
            placeholder="Enter number of spaces"
            className="field-val mb-40"
            value={formData.numberOfSpaces}
            onChange={handleInputChange}
            disabled={isDisabled || loading} // Disable input when loading
          />
          {errors.numberOfSpaces && (
            <FormFeedback>{errors.numberOfSpaces}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Label className="f-20 bold p-2">
            Services Offered (select at least one) and Add perday charges for
            carpark service
          </Label>
          <div>
            <FormGroup check className="f-20 px-0 mx-0 my-1">
              <ServicePriceSelector
                ref={servicePriceSelectorRef}
                disabled={isDisabled || loading}
              />{" "}
              {/* Disable ServicePriceSelector when loading */}
            </FormGroup>
          </div>
        </FormGroup>
        {error && <Alert color="danger mt-60">{error}</Alert>}
        <Button
          type="submit"
          className="w-100 mt-3 back-color text-bold p-2 f-20"
          disabled={isDisabled || loading}
        >
          {loading ? (
            <Spinner size="sm" />
          ) : id ? (
            "Update Parking Space"
          ) : (
            "Register for new parking space"
          )}{" "}
          {/* Display loader when loading */}
        </Button>
      </Form>
    </Container>
  );
};

export default ParkingSpacesForm;
