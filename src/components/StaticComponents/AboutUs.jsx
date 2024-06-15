// AboutPage.js

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './AboutPage.css'; // Add your CSS file

const AboutPage = () => {
  return (
    <Container className="about-container">
      <Row>
        <Col md={12}>
          <h1 className='text-color'>About SpacePark</h1>
          <p>
            SpacePark is an innovative parking management solution that provides fully automated parking services.
            Our aim is to revolutionize the parking industry by offering convenient, efficient, and secure parking
            solutions for both individuals and businesses.
          </p>
          <p>
            With SpacePark, users can easily find available parking spaces, reserve spots in advance, and make
            payments seamlessly through our mobile app or website. Our smart parking system utilizes advanced
            technology such as sensors, AI, and mobile connectivity to optimize parking operations and enhance
            the overall parking experience.
          </p>
          <h2>Key Features:</h2>
          <ul>
            <li>Real-time parking availability updates</li>
            <li>Instant booking and payment processing</li>
            <li>Automated entry and exit management</li>
            <li>Customizable parking preferences</li>
            <li>Secure and reliable payment gateway integration</li>
            <li>24/7 customer support</li>
          </ul>
          <h2>Our Mission</h2>
          <p>
            At SpacePark, our mission is to make parking hassle-free and convenient for everyone. We strive to
            create a seamless parking experience that saves time, reduces stress, and enhances urban mobility.
            By leveraging technology and innovation, we aim to transform the way people park, drive, and commute
            in urban areas.
          </p>
          <h2>Get in Touch</h2>
          <p>
            Have questions or want to learn more about SpacePark? Feel free to contact us! Our team is available
            to assist you with any inquiries and provide personalized support to meet your parking needs.
          </p>
          <p>Contact us at <strong>info@spacepark.com</strong> or call <strong>(123) 456-7890</strong>.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
