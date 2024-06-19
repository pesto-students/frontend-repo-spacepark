// src/components/Login/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Container, FormGroup, Input, Button, Alert } from 'reactstrap';
import Logo from '../Logo/Logo';
import axios from 'axios';
import { useUser } from '../../context/userContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser, setToken } = useUser();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    console.log(formData, 'Form SDAagdbvujfb');
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/login`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response && response.status === 200) {
        console.log('##########################', response.data);
        const { token, user } = response.data;
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);localStorage.setItem('role', user.role);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/bookings');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.log(err, 'Error ');
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
              required
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
              required
            />
          </FormGroup>
          {error && <Alert color="danger">{error}</Alert>}
          <Button type="submit" className='back-color text-bold w-100 p-2 f-20'>Login</Button>
        </Form>
      </div>
      <p className='text-center mt-80 mb-80 f-20'>
        or <Link to="/signup" className='text-color'>Signup</Link>
      </p>
    </Container>
  );
};

export default Login;
