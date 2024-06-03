// src/components/SignUp.js
import React from 'react';
import './Signup.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  mobile: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
});

const SignUp = () => {
  return (
    <div>
      <div className='logo-design'>
        <div className='first-div'>Space</div>
        <div className='second-div'>Park</div>
      </div>

      <p>Welcome to the Car Parking App</p>

      <div className='form-div'>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            mobile: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            console.log('Form data submitted:', values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <Field type="text" name="name" placeholder="Please enter your username"/>
                <ErrorMessage name="name" component="div" className="error"/>
              </div>
              <div>
                <Field type="email" name="email" placeholder="Please enter your email"/>
                <ErrorMessage name="email" component="div" className="error"/>
              </div>
              <div>
                <Field type="password" name="password" placeholder="Please enter your password"/>
                <ErrorMessage name="password" component="div" className="error"/>
              </div>
              <div>
                <Field type="tel" name="mobile" placeholder="Please enter your mobile no (optional)"/>
                <ErrorMessage name="mobile" component="div" className="error"/>
              </div>
              <button type="submit">Sign Up</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
