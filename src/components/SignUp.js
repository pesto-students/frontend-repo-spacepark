import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Container, FormGroup, Input, Button, Alert, Spinner } from 'reactstrap'; // Import Spinner
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
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const { setUser, setToken, setRole } = useUser();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Set loading to true

    if (!formData.username || !formData.email || !formData.password) {
      setError('Username, email, and password are required.');
      setLoading(false); // Reset loading state if there's an error
      return;
    }

    try {
      // First API call to sign up the user
      const signupResponse = await axios.post(`${process.env.REACT_APP_API_URL}users`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (signupResponse.status === 201) {
        const { token } = signupResponse.data;
        console.log(token , 'Token');
        // Second API call to fetch user details
        const userResponse = await axios.get(`${process.env.REACT_APP_API_URL}users/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const user = userResponse.data;

        if(user){
          
                  localStorage.setItem('user', JSON.stringify(user));
                  localStorage.setItem('role', user.role);
                  localStorage.setItem('token', token);
                  setUser(user); 
                  setToken(token);
                  setRole(user.role);
                  navigate('/bookings');

        }
      } else {
        setError(signupResponse.data.message);
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
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
              disabled={loading} // Disable input when loading
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
              required
              disabled={loading} // Disable input when loading
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
              disabled={loading} // Disable input when loading
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
              disabled={loading} // Disable input when loading
            />
          </FormGroup>
          {error && <Alert color="danger">{error}</Alert>}
          <Button type="submit" className='back-color text-bold w-100 p-2 f-20' disabled={loading}>
            {loading ? <Spinner size="sm" /> : 'Signup'} {/* Display loader when loading */}
          </Button>
        </Form>
      </div>
      <p className="text-center mb-80 mt-80 f-20">
        Do you already have an account?{" "}
        <Link to="/login" className='text-color' onClick={(e) => loading && e.preventDefault()}>Login here</Link> {/* Disable link when loading */}
      </p>
    </Container>
  );
};

export default SignUp;
