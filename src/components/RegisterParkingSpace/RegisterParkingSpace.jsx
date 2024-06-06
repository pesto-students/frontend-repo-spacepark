import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./register.scss";
//import { submitParkingSpace } from "./registerformsubmission";

const parkingSpaceSchema = yup.object({
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
  const services = [
    { value: "evCharging", label: "EV Charging" },
    { value: "carWash", label: "Car Wash" },
    { value: "carPark", label: "Car Park" },
  ];

  return (
    <div className="registration-container">
      <Formik
        initialValues={{
          parkOwnerName: "",
          numberOfSpaces: "",
          location: "",
          services: [],
        }}
        validationSchema={parkingSpaceSchema}
        onSubmit={() => {}} // Use custom submitParkingSpace function here
      >
        {({ handleSubmit, isSubmitting, isValid }) => (
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
              <label htmlFor="parkOwnerName">Park Owner Name</label>
              <Field
                type="text"
                name="parkOwnerName"
                placeholder="Enter owner name"
                className="form-control"
              />
              <ErrorMessage
                name="parkOwnerName"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="numberOfSpaces">Number of Spaces Available</label>
              <Field
                type="number"
                name="numberOfSpaces"
                placeholder="Enter number of spaces"
                className="form-control"
              />
              <ErrorMessage
                name="numberOfSpaces"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <Field
                type="text"
                name="location"
                placeholder="Enter location"
                className="form-control"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label>Services Offered (select at least one)</label>
              {services.map((service) => (
                // add them in one line each service
                <div key={service.value} className="form-check">
                  <Field
                    type="checkbox"
                    id={service.value}
                    name="services"
                    value={service.value}
                  />
                  <label className="form-check-label" htmlFor={service.value}>
                    {service.label}
                  </label>
                </div>
              ))}
              <ErrorMessage
                name="services"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="btn btn-primary"
            >
              {isSubmitting ? "Submitting..." : "Register Parking Space"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterParkingSpace;
