import React from "react";
import HomeIcon from "../assets/home.svg";
import CarIcon from "../assets/car.svg";
import LocationIcon from "../assets/location.svg";
import PaymentIcon from "../assets/payment.svg";
import ArrowIcon from "../assets/arrowUp.svg";
import ParkingSpaceIcon from "../assets/parking.svg";
import Logo from "./Logo/Logo";
import { Container, Row, Col, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container fluid className="custom-container">
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={6} className="text-center mb-80">
          <div className="d-flex justify-content-center">
            <Logo />
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center my-4">
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center mb-4"
        >
          <div style={{ width: "70%" }}>
            <h3 className="text-center my-4 pb-4">
              Welcome to SpacePark, your one-stop solution for hassle-free
              parking!
            </h3>
            <p className="text-center">
              With our app, finding parking spaces has never been easier. Say
              goodbye to circling the block endlessly – simply search for
              available parking spots near your destination, reserve your spot
              in advance, and navigate directly to your reserved space.
            </p>
            <div className="d-flex  align-items-center justify-content-center">
              {" "}
              {/* Apply text-center class here */}
              <Link className="text-color bold" to="/signup">
                Go to our app from here <img src={ArrowIcon} alt="Arrow Icon" />
              </Link>
            </div>
          </div>
        </Col>

        <Col
          xs={6}
          md={6}
          className="d-flex align-items-center justify-content-center col-md-6 mb-4"
        >
          <img src={HomeIcon} alt="Home Icon" className="img-fluid" />
        </Col>
      </Row>
      <Row className="justify-content-center my-4">
        <Col
          xs={6}
          md={6}
          className="d-flex align-items-center justify-content-center col-md-6 mb-4"
        >
          {/* <ScrollAnimation
            duration={5}
            animateIn="wobble"
            initiallyVisible={true}
          > */}
          <img src={CarIcon} alt="Car Icon" className="img-fluid" />
          {/* </ScrollAnimation> */}
        </Col>
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center mb-4"
        >
          <div style={{ width: "70%" }}>
            <h3 className="text-center my-4 pb-4">
              Finding a parking spot can be frustrating.
            </h3>
            <ul className="m-auto pb-3">
              <li>
                <strong>Finding:</strong> Searching for available parking
                spaces.
              </li>
              <li>
                <strong>a parking spot:</strong> Locating a suitable place to
                park your vehicle.
              </li>
              <li>
                <strong>can be frustrating:</strong> It often involves circling
                the block endlessly or facing crowded lots.
              </li>
            </ul>

            <div className="d-flex  align-items-center justify-content-center">
              {" "}
              {/* Apply text-center class here */}
              <Link className="text-color bold" to="/signup">
                Check our app now
                <img src={ArrowIcon} alt="Arrow Icon" />
              </Link>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center my-4">
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center mb-4"
        >
          <div style={{ width: "70%" }}>
            <h3 className="text-center my-4 pb-4">
              Seamless Parking: Find Spaces with Ease
            </h3>
            <p className="text-center">
              Discover nearby parking spaces effortlessly with our app's
              intuitive location-based access. Say goodbye to the stress of
              searching for parking spots – simply open the app, and find
              available spaces conveniently located near your destination. With
              easy location access, parking has never been smoother.
            </p>
            <div className="d-flex  align-items-center justify-content-center">
              {" "}
              {/* Apply text-center class here */}
              <Link className="text-color bold" to="/signup">
                Check our app now
                <img src={ArrowIcon} alt="Arrow Icon" />
              </Link>
            </div>
          </div>
        </Col>
        <Col
          xs={6}
          md={6}
          className="d-flex align-items-center justify-content-center col-md-6 mb-4"
        >
          <img src={LocationIcon} alt="Location Icon" className="img-fluid" />
        </Col>
      </Row>
      <Row className="justify-content-center my-4">
        <Col
          xs={6}
          md={6}
          className="d-flex align-items-center justify-content-center col-md-6 mb-4"
        >
          <img src={PaymentIcon} alt="Payment Icon" className="img-fluid" />
        </Col>
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center mb-4"
        >
          <div style={{ width: "70%" }}>
            <h3 className="text-center my-4 pb-4">
              Effortless Payments: Simplifying Your Transactions
            </h3>

            <p className="text-center">
              Streamline your parking experience with our app's seamless payment
              system. Enjoy hassle-free transactions as you securely pay for
              parking within seconds. Say goodbye to fumbling for change or
              dealing with complicated payment methods – our app makes parking
              payments easy and convenient.
            </p>
            <div className="d-flex  align-items-center justify-content-center">
              {" "}
              {/* Apply text-center class here */}
              <Link className="text-color bold" to="/signup">
                Go to our app <img src={ArrowIcon} alt="Arrow Icon" />
              </Link>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center my-4 pb-4">
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <div style={{ width: "70%" }}>
            <h3 className="text-center my-4 pb-4">
              Want to register for a new parking space ?{" "}
            </h3>

            <p className="text-center">
              Ready to secure your parking space hassle-free? Sign up now to
              reserve your spot with ease.
            </p>
            <p className="text-center">
              Join our community today and gain access to convenient parking
              solutions tailored to your needs. Experience seamless registration
              and start parking smarter.
            </p>
            <div className="d-flex  align-items-center justify-content-center">
              {" "}
              {/* Apply text-center class here */}
              <Button
                className="back-color text-bold"
                onClick={() => {
                  navigate("/registerspace");
                }}
              >
                You can register here
              </Button>
            </div>
          </div>
        </Col>

        <Col
          xs={6}
          md={6}
          className="d-flex align-items-center justify-content-center col-md-6"
        >
          <img
            src={ParkingSpaceIcon}
            alt="ParkingSapce Icon"
            className="img-fluid rounded-circle"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
