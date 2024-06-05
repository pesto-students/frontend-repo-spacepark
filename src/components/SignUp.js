import Logo from './Logo/Logo';
import React from 'react';
import { Link } from 'react-router-dom';
import {Form,Container, FormGroup, Input, Button } from 'reactstrap';


const SignUp = () => {
  return (
    <Container className="login-container" fluid>
      <div className="d-flex justify-content-center align-items-center">
        <Logo />
      </div>
      <h2 className='text-center mb-80 mt-80'>Welcome to Car Parking App</h2>
      <div className="formDiv">
            <Form>
              <FormGroup>
                <Input type="text" name="username" id="name" placeholder="Please enter your username" className='field-val mb-40'/>
              </FormGroup>
              <FormGroup>
                <Input type="email" name="email" id="email" placeholder="Please enter your email" className='field-val mb-40'/>
              </FormGroup>
              <FormGroup>
                <Input type="password" name="name" id="password" placeholder="Please enter your password" className='field-val mb-40'/>
              </FormGroup>
              <FormGroup>
                <Input type="tel" name="password" id="mobile" placeholder="Please enter your mobile no (optional)"  className='field-val mb-40'/>
              </FormGroup>
              <Button type="submit" className='back-color text-bold w-100 p-3 f-20'>Signup</Button>
            </Form>
      </div>
      <p className="text-center mb-80 mt-80 f-20">
        Do you already have an account ?{" "}
        <Link to="/login" className='text-color'>
          Login here
        </Link>
      </p>
    </Container>
  );
};

export default SignUp;

