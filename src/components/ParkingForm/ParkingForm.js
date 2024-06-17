import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Form, Container, FormGroup, Input, Alert } from 'reactstrap';
import Select from 'react-select';
import DateTimePicker from './DatePicker';
import Payment from '../Payment';
import { atom, useAtom } from 'jotai';
import { serviceAtom } from '../../atom';

export const formDataAtom = atom({
  carNumber: '',
  mobile: '',
  services: [],
});

const ParkingForm = () => {
  const [error] = useState(null);
  const [services] = useAtom(serviceAtom); // Use serviceAtom
  const [formData, setFormData] = useAtom(formDataAtom); // Use formDataAtom
  const [dateRange, setDateRange] = useState(null); // Separate state for date range
  const [isFormValid, setIsFormValid] = useState(false); // State to check form validity

  useEffect(() => {
    console.log(formData, 'form Data');
  }, [formData]);

  // Validation logic
  useEffect(() => {
    const isValid = formData.services.length > 0 && dateRange;
    setIsFormValid(isValid);
  }, [formData, dateRange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleServiceChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      services: selectedOptions.map(option => option.value),
    }));
  };

  const handleDateRangeChange = (dateRange) => {
    setDateRange(dateRange); // Update the date range state
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(null);

  //   try {
  //     const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, formData, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.status === 201) {
  //       const { token, user } = response.data;
  //       store.set('role', user.role);
  //       store.set("token", token);

  //       navigate('/settings');
  //     } else {
  //       setError(response.data.message);
  //     }
  //   } catch (err) {
  //     setError(err.response ? err.response.data.message : 'Something went wrong. Please try again later.');
  //   }
  // };

  const serviceOptions = services.map(service => ({
    value: service.service,
    label: `${service.service} - $${service.price}`,
  }));

  return (
    <Container className="login-container px-0" fluid>
      <div className="formDiv">
        <Form>
          <FormGroup>
            <Select
              options={serviceOptions}
              isMulti
              placeholder="Select services"
              onChange={handleServiceChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="carNumber"
              id="carNumber"
              placeholder="Please enter car number (optional)"
              className='field-val mb-40'
              value={formData.carNumber}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <DateTimePicker onChange={handleDateRangeChange} />
          </FormGroup>
          <FormGroup>
            <Input
              type="tel"
              name="mobile"
              id="mobile"
              placeholder="Please enter your mobile no (optional)"
              className='field-val mb-40'
              value={formData.mobile}
              onChange={handleChange}
            />
          </FormGroup>
          {error && <Alert color="danger">{error}</Alert>}
          <Payment formData={formData} dateTimeRange={dateRange} isFormValid={isFormValid} />
        </Form>
      </div>
    </Container>
  );
};

export default ParkingForm;
