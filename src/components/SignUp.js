// src/components/SignUp.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Container, FormGroup, Input, Button, Alert } from 'reactstrap';
import axios from 'axios';
import Logo from './Logo/Logo';
import { useUser } from '../context/userContext';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    mobile: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.username || !formData.email || !formData.password) {
      setError('Username, email, and password are required.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}users`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        const { token, user } = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', user.role);
        localStorage.setItem('token', token);

        setUser(user); // Set the user atom

        navigate('/bookings');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Something went wrong. Please try again later.');
    }
  };

  return (
    <Container className="login-container" fluid>
      <div className="d-flex justify-content-center align-items-center">
        <Logo />
      </div>
      <h2 className='text-center mb-80 mt-80'>Welcome to Car Parking App</h2>
      <div className="formDiv">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Please enter your username"
              className='field-val mb-40'
              value={formData.username}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Please enter your email"
              className='field-val mb-40'
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Please enter your password"
              className='field-val mb-40'
              value={formData.password}
              onChange={handleChange}
            />
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
          <Button type="submit" className='back-color text-bold w-100 p-2 f-20'>Signup</Button>
        </Form>
      </div>
      <p className="text-center mb-80 mt-80 f-20">
        Do you already have an account?{" "}
        <Link to="/login" className='text-color'>
          Login here
        </Link>
      </p>
    </Container>
  );
};

export default SignUp;
