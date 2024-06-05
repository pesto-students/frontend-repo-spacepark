import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

function CardView() {
  return (
    <Card className="w-50 mx-auto p-4 mt-3 shadow">
      <CardBody>
        <CardTitle tag="h5" className='text-center pri-color mb-3 pb-2 bold'>Welcome to spacepark app</CardTitle>
        <CardText>
          <p>With our app, you can easily find parking spots near your location.</p>
          <p className='bold'>Features include:</p>
          <ul>
            <li>Real-time parking availability</li>
            <li>Search for parking spots based on location</li>
            <li>Save favorite parking spots</li>
            <li>Receive notifications for available parking spots</li>
          </ul>
          <p>Use our webapp today and enjoy hassle-free parking!</p>
        </CardText>
      </CardBody>
    </Card>
  )
}

export default CardView