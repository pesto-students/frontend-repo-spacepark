import React from 'react';
import { Link } from 'react-router-dom';
import {Form,Container, FormGroup, Input, Button } from 'reactstrap';
import Logo from '../Logo/Logo';


const Login = () => {
  return (
    <Container className="login-container" fluid>
      <div className="d-flex justify-content-center align-items-center">
        <Logo />
      </div>
      <h2 className='text-center mb-80 mt-80'>Welcome to Car Parking App</h2>
      <div className="formDiv">
            <Form>
              <FormGroup>
                <Input type="text" name="name" id="name" placeholder="Please enter your username" className='field-val mb-40'/>
              </FormGroup>
              <FormGroup>
                <Input type="password" name="password" id="password" placeholder="Please enter your password"  className='field-val mb-40'/>
              </FormGroup>
              <Button type="submit" className='back-color text-bold w-100 p-3 f-20'>Login</Button>
            </Form>
      </div>
      <p className='text-center mt-80 mb-80 f-20'>
        or <Link to="/signup" className='text-color'>Signup</Link>
      </p>
    </Container>
  );
};

export default Login;
