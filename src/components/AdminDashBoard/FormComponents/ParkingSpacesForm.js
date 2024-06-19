import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Logo from '../../Logo/Logo';

const initialFormData = {
  userId: '',
  serviceId: '',
  location: '',
  latitude: '',
  longitude: '',
  noOfSpaces: '',
};

const ParkingSpacesForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/parkingSpaces/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userId) {
      newErrors.userId = 'User ID is required';
    } else if (isNaN(formData.userId)) {
      newErrors.userId = 'User ID must be a number';
    }

    if (!formData.serviceId) {
      newErrors.serviceId = 'Service ID is required';
    } else if (isNaN(formData.serviceId)) {
      newErrors.serviceId = 'Service ID must be a number';
    }

    if (!formData.location) {
      newErrors.location = 'Location is required';
    } else if (formData.location.trim() === '') {
      newErrors.location = 'Location cannot be empty';
    }

    if (!formData.latitude) {
      newErrors.latitude = 'Latitude is required';
    } else if (isNaN(formData.latitude)) {
      newErrors.latitude = 'Latitude must be a number';
    }

    if (!formData.longitude) {
      newErrors.longitude = 'Longitude is required';
    } else if (isNaN(formData.longitude)) {
      newErrors.longitude = 'Longitude must be a number';
    }

    if (!formData.noOfSpaces) {
      newErrors.noOfSpaces = 'Number of spaces is required';
    } else if (isNaN(formData.noOfSpaces)) {
      newErrors.noOfSpaces = 'Number of spaces must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      id ? await axios.put(`${process.env.REACT_APP_API_URL}api/parkingSpaces/${id}`, formData) : await axios.post(`${process.env.REACT_APP_API_URL}/api/parkingSpaces/`, formData) ;
      id ? navigate('/admindashboard') : navigate('parkadmin');
      setFormData(initialFormData);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error:', error);
      }
    }
  };

  return (
    <>
      <div className='w-50 mx-auto'>
        <Logo />
      </div>
      <Form onSubmit={handleSubmit} className='w-50 mx-auto mt-80'>
        <FormGroup>
          <Label for="userId" className='fs-20 p-1'>User Id</Label>
          <Input
            type="text"
            name="userId"
            id="userId"
            className='p-2'
            value={formData.userId}
            onChange={handleChange}
            invalid={!!errors.userId}
          />
          {errors.userId && <FormFeedback>{errors.userId}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="serviceId" className='fs-20 p-1'>Service Id</Label>
          <Input
            type="text"
            name="serviceId"
            id="serviceId"
            className='p-2'
            value={formData.serviceId}
            onChange={handleChange}
            invalid={!!errors.serviceId}
          />
          {errors.serviceId && <FormFeedback>{errors.serviceId}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="location" className='fs-20 p-1'>Location</Label>
          <Input
            type="text"
            name="location"
            id="location"
            className='p-2'
            value={formData.location}
            onChange={handleChange}
            invalid={!!errors.location}
          />
          {errors.location && <FormFeedback>{errors.location}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="latitude" className='fs-20 p-1'>Latitude</Label>
          <Input
            type="text"
            name="latitude"
            id="latitude"
            className='p-2'
            value={formData.latitude}
            onChange={handleChange}
            invalid={!!errors.latitude}
          />
          {errors.latitude && <FormFeedback>{errors.latitude}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="longitude" className='fs-20 p-1'>Longitude</Label>
          <Input
            type="text"
            name="longitude"
            id="longitude"
            className='p-2'
            value={formData.longitude}
            onChange={handleChange}
            invalid={!!errors.longitude}
          />
          {errors.longitude && <FormFeedback>{errors.longitude}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="noOfSpaces" className='fs-20 p-1'>No of spaces</Label>
          <Input
            type="number"
            name="noOfSpaces"
            id="noOfSpaces"
            className='p-2'
            value={formData.noOfSpaces}
            onChange={handleChange}
            invalid={!!errors.noOfSpaces}
          />
          {errors.noOfSpaces && <FormFeedback>{errors.noOfSpaces}</FormFeedback>}
        </FormGroup>
        <Button type="submit" className='w-100 mb-4 fs-20'>Update</Button>
      </Form>
    </>
  );
}

export default ParkingSpacesForm;
