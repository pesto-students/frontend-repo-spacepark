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
import { useNavigate, useParams, useLocation } from "react-router-dom";
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
  ParkingSpaceUpdate,
  ParkingSapceCreation,
  CreatingParkingSpaceOwner // Import the function
} from "../../RegisterParkingSpace/RegisterHelper";
import { useUser } from "../../../context/userContext";
import Nominatim from "nominatim-geocoder";
import { getServicesData } from '../../../helpers/getUserData';

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
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ placeName: "", lat: 0, lng: 0 });
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const [selectedServices] = useAtom(selectedServicesAtom);
  const [servicePrices] = useAtom(servicePricesAtom);
  const { user } = useUser();
  const servicePriceSelectorRef = useRef();
  const [, setActiveIndex] = useAtom(menuIndexState);

  useEffect(() => {
    if (state && state.row) {
      const { location, noOfSpaces, serviceId } = state.row;

      const fetchData = async () => {
        try {
          const data = await getServicesData(serviceId);
          const services = data.services.map(service => ({
            service: service.service,
            price: service.price
          }));
          console.log(services);
          setFormData({ location, numberOfSpaces: noOfSpaces, services });

          if (servicePriceSelectorRef.current) {
            servicePriceSelectorRef.current.setServices(services);
          }
        } catch (error) {
          console.error("Error fetching service data:", error);
        }
      };

      fetchData();
    }
  }, [state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (formType, e) => {
    console.log(formType, 'formType');
    e.preventDefault();
    setIsDisabled(true);
    setLoading(true);
    const nominatim = new Nominatim({ secure: true });
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
      setErrors({});

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

      if (createService && formType === "Register Parking Space") {
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

      if (createService && formType === "Edit Parking Space") {
        console.log(state, 'state');
        const parkingSpaceId = state?.row?.id;
        const parkingSpaceUpdate = await ParkingSpaceUpdate({
          userId: userId,
          serviceId: createService.id,
          location: formData.location,
          noOfSpaces: formData.numberOfSpaces,
          latitude: location.lat,
          longitude: location.lng,
        }, parkingSpaceId);

        if (parkingSpaceUpdate) {
          navigate("/parkingOwner");
        }
      }

      setFormData(initialFormData);

      if (servicePriceSelectorRef.current) {
        servicePriceSelectorRef.current.clearInputs();
      }

      console.log("Form submitted successfully with data:", parkingSpaceData);
      setActiveIndex(1);
    } catch (validationError) {
      const validationErrors = {};
      validationError.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      setError(validationError.errors[0]);
    } finally {
      setIsDisabled(false);
      setLoading(false);
    }
  };

  return (
    <Container className="login-container" fluid>
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
            disabled={isDisabled || loading}
            invalid={!!errors.location}
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
            disabled={isDisabled || loading}
            invalid={!!errors.numberOfSpaces}
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
                initialServices={formData.services}
              />
            </FormGroup>
          </div>
        </FormGroup>
        {error && <Alert color="danger mt-60">{error}</Alert>}
        {error && error.includes('Username') && <Alert color="danger mt-60">{error}</Alert>}
        <Button
          type="submit"
          className="w-100 mt-3 back-color text-bold p-2 f-20"
          disabled={isDisabled || loading}
          onClick={(e) => handleSubmit(id ? "Edit Parking Space" : "Register Parking Space", e)}
        >
          {loading ? (
            <Spinner size="sm" />
          ) : id ? (
            "Update Parking Space"
          ) : (
            "Register for new parking space"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default ParkingSpacesForm;
