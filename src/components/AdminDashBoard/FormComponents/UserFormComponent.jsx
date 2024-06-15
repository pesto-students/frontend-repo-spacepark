import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import Logo from '../../Logo/Logo';

const initialFormData = {
  username: '',
  password: '',
  email: '',
  mobile: '',
  role: '',
  status: '',
  DateOfBirth: '',
};

const UserFormComponent = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`);
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

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.trim() === '') {
      newErrors.username = 'Username cannot be empty';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.trim() === '') {
      newErrors.password = 'Password cannot be empty';
    } else if (formData.password.length < 6 || formData.password.length > 50) {
      newErrors.password = 'Password should be between 6 and 50 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (formData.mobile && (formData.mobile.length < 10 || formData.mobile.length > 15)) {
      newErrors.mobile = 'Mobile number should be between 10 and 15 characters';
    } else if (formData.mobile && !/^\d+$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number should contain only numbers';
    }

    if (formData.role && formData.role.trim() === '') {
      newErrors.role = 'Role cannot be empty';
    }

    if (formData.status && formData.status.trim() === '') {
      newErrors.status = 'Status cannot be empty';
    }

    if (formData.DateOfBirth && !moment(formData.DateOfBirth, 'YYYY-MM-DD', true).isValid()) {
      newErrors.DateOfBirth = 'Invalid date format';
    } else if (formData.DateOfBirth && moment(formData.DateOfBirth).isAfter(moment())) {
      newErrors.DateOfBirth = 'Date of Birth must be before today';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/users/${id}`, formData);
      navigate('/admindashboard');
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

    <Logo/>
    </div>
   
    <Form onSubmit={handleSubmit} className='w-50 mx-auto mt-80'>
      <FormGroup>
        <Label for="username" className='fs-20 p-1'>Username</Label>
        <Input
          type="text"
          name="username"
          id="username"
          className='p-2'
          value={formData.username}
          onChange={handleChange}
          invalid={!!errors.username}
        />
        {errors.username && <FormFeedback>{errors.username}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="password"  className='fs-20 p-1'>Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          className='p-2'
          value={formData.password}
          onChange={handleChange}
          invalid={!!errors.password}
        />
        {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="email"  className='fs-20 p-1'>Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          className='p-2'
          value={formData.email}
          onChange={handleChange}
          invalid={!!errors.email}
        />
        {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="mobile"  className='fs-20 p-1'>Mobile</Label>
        <Input
          type="text"
          name="mobile"
          id="mobile"
          className='p-2'
          value={formData.mobile}
          onChange={handleChange}
          invalid={!!errors.mobile}
        />
        {errors.mobile && <FormFeedback>{errors.mobile}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="role"  className='fs-20 p-1'>Role</Label>
        <Input
          type="text"
          name="role"
          id="role"
          className='p-2'
          value={formData.role}
          onChange={handleChange}
          invalid={!!errors.role}
        />
        {errors.role && <FormFeedback>{errors.role}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="status" className='fs-20 p-1'>Status</Label>
        <Input
          type="text"
          name="status"
          className='p-2'
          id="status"
          value={formData.status}
          onChange={handleChange}
          invalid={!!errors.status}
        />
        {errors.status && <FormFeedback>{errors.status}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="DateOfBirth"  className='fs-20 p-1'>Date of Birth</Label>
        <Input
          type="date"
          name="DateOfBirth"
          className='p-2'
          id="DateOfBirth"
          value={formData.DateOfBirth}
          onChange={handleChange}
          invalid={!!errors.DateOfBirth}
        />
        {errors.DateOfBirth && <FormFeedback>{errors.DateOfBirth}</FormFeedback>}
      </FormGroup>
      <Button type="submit" className='w-100 mb-4 fs-20'>Update</Button>
    </Form>
    </>
  );
}

export default UserFormComponent;
