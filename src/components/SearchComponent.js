import React, {useState} from 'react';
import { Form, FormGroup, Input, Alert, Col } from 'reactstrap';
import { atom, useAtom } from 'jotai';
import Nominatim from 'nominatim-geocoder';
import { throttle } from 'lodash';
import axios from 'axios';
import arrowDown from '../assets/arrowDownIcon.svg'
// import Modal from './Modal/Modal';

// Define atom to store the location state
export const locationStateAtom = atom({
  placeName: '',
  lat: 0,
  lng: 0
});

const parkingSpacesAtom = atom([]);

// Define the SearchComponent
const SearchComponent = () => {

  const [parkingSpaces, setParkingSpaces] = useAtom(parkingSpacesAtom);
  const [, setLocation] = useAtom(locationStateAtom); // Use the locationStateAtom
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = useState(false);

  const handleSpaceBooking = (parkingspace) => {
    console.log(parkingspace, 'Parking spaces');
  }

  // Define throttled function to avoid making too many requests
  const handleSearchThrottled = React.useRef(
    throttle(async (searchText) => {
      try {
        setLoading(true);
        const nominatim = new Nominatim();
        
        const results = await nominatim.search({ q: searchText, addressdetails: true });
        if (results && results.length > 0) {
          const { lat, lon, display_name } = results[0];
          console.log(lat, lon, display_name , "lat, lon, display_name ");
          setLocation({ placeName: display_name, lat: parseFloat(lat), lng: parseFloat(lon) });

          const apiResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/parkingSpaces?location=${searchText}`, { lat, lon });
          console.log(apiResponse.data);
          setParkingSpaces(apiResponse.data);
          } else {
            setError('Location not found.');
            setTimeout(() => {
              setError('');
              }, 3000);
              }
            setLoading(false);
      } catch (error) {
        console.error('Error fetching location:', error);
        setError('Error fetching location. Please try again later.');
      }
    }, 1000) // Throttle time set to 1000ms (1 second)
  ).current;

  const handleInputChange = (e) => {
    const searchText = e.target.value;
    if (searchText.trim() === '') {
      setLocation({
        placeName: '',
        lat: 0,
        lng: 0
      });
      setParkingSpaces([]);
    } else {
      handleSearchThrottled(searchText);
    }
  };

  return (
    <>
      <Form className="">
        <FormGroup className="w-100">
          <Input type="text" className="w-100 mb-2 search-com" onInput={handleInputChange} placeholder="Search your location here"/>
        </FormGroup>
      </Form>
      {error && <Col className="w-100"><Alert color="danger">{error}</Alert></Col>}
      {loading && <Col className="w-100"><Alert color="info">Loading</Alert></Col>}
      <div className="parking-spaces-list">
        {parkingSpaces.map((parkingSpace) => (
          <div className='d-flex justify-content-between'>
          <div key={parkingSpace.id} className="parking-space-item"
          onClick={()=> handleSpaceBooking(parkingSpace)}
          >
            {parkingSpace.location}
          </div>
        {/* <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg>


        </div> */}
{/*  */}
          <img src={arrowDown} alt="arrowDown" />
      
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchComponent;
