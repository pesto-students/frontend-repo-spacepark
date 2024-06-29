import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';

const Revenue = () => {
  const totalRevenue = 5000000;
  const revenueFromTickets = 2000000;
  const revenueFromBusiness = 3000000;
  const lastMonthTicketRevenue = 100000;
  const lastMonthBusinessRevenue = 20000;
  const thisMonthTicketRevenue = 1000000;
  const thisMonthBusinessRevenue = 200000;

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Card className="text-center">
            <CardBody>
              <CardTitle tag="h5">Total Revenue</CardTitle>
              <CardText>{totalRevenue.toLocaleString('en-US')} Rs</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Breakdown By Source</CardTitle>
              <Row className="mt-3">
                <Col md="6" className="mb-3">
                  <Card>
                    <CardBody>
                      <CardTitle tag="h6">Revenue from tickets</CardTitle>
                      <CardText>{revenueFromTickets.toLocaleString('en-US')} Rs</CardText>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="6" className="mb-3">
                  <Card>
                    <CardBody>
                      <CardTitle tag="h6">Revenue from business</CardTitle>
                      <CardText>{revenueFromBusiness.toLocaleString('en-US')} Rs</CardText>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Comparison By Source</CardTitle>
              <Row className="mt-3">
                <Col md="6" className="mb-3">
                  <Card>
                    <CardBody>
                      <CardTitle tag="h6">Revenue from tickets last month</CardTitle>
                      <CardText>{lastMonthTicketRevenue.toLocaleString('en-US')} Rs</CardText>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="6" className="mb-3">
                  <Card>
                    <CardBody>
                      <CardTitle tag="h6">Revenue from business last month</CardTitle>
                      <CardText>{lastMonthBusinessRevenue.toLocaleString('en-US')} Rs</CardText>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md="6" className="mb-3">
                  <Card>
                    <CardBody>
                      <CardTitle tag="h6">Revenue from tickets this month</CardTitle>
                      <CardText>{thisMonthTicketRevenue.toLocaleString('en-US')} Rs</CardText>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="6" className="mb-3">
                  <Card>
                    <CardBody>
                      <CardTitle tag="h6">Revenue from business this month</CardTitle>
                      <CardText>{thisMonthBusinessRevenue.toLocaleString('en-US')} Rs</CardText>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Revenue;
