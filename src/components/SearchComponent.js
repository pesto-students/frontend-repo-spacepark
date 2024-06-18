import React, { useState } from 'react';
import { Form, FormGroup, Input, Alert, Col } from 'reactstrap';
import { atom, useAtom } from 'jotai';
import Nominatim from 'nominatim-geocoder';
import { throttle } from 'lodash';
import axios from 'axios';
import arrowDown from '../assets/arrowDownIcon.svg';
import { activeSpace, serviceAtom , activeParkingSpace} from '../atom';
// import './SearchComponent.css'; // Add your CSS file

// Define atom to store the location state
export const locationStateAtom = atom({
  placeName: '',
  lat: 0,
  lng: 0
});

export const parkingSpacesAtom = atom([]);
const selectedParkingSpaceAtom = atom(null); // New atom to store selected parking space

// Define the SearchComponent
const SearchComponent = () => {
  const [parkingSpaces, setParkingSpaces] = useAtom(parkingSpacesAtom);
  const [, setLocation] = useAtom(locationStateAtom); // Use the locationStateAtom
  const [, setSelectedParkingSpace] = useAtom(selectedParkingSpaceAtom); // Use the selectedParkingSpaceAtom
  const [services, setServices] = useAtom(serviceAtom); // Use the servicesAtom
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeDropdown, setActiveDropdown] = useAtom(activeSpace); // Track the active dropdown
  const [, setActiveParkingSpace] = useAtom(activeParkingSpace)

  const handleSpaceBooking = async (parkingSpace) => {
    console.log(parkingSpace, 'Parking Space');
    setSelectedParkingSpace(parkingSpace);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/services/${parkingSpace.serviceId}`);
      console.log('Mapping table response:', response.data);
      setServices(response.data.services);
    } catch (error) {
      console.error('Error mapping parking space:', error);
      setError('Error mapping parking space. Please try again later.');
    }
  };

  const handleDropdownClick = (parkingSpace) => {
    if (activeDropdown === parkingSpace.id) {
      setActiveDropdown(null);
      setActiveParkingSpace({}) // Close the dropdown if it's already active
    } else {
      setActiveDropdown(parkingSpace.id); // Open the selected dropdown
      handleSpaceBooking(parkingSpace);
      setActiveParkingSpace(parkingSpace)
    }
  };

  // Define throttled function to avoid making too many requests
  const handleSearchThrottled = React.useRef(
    throttle(async (searchText) => {
      try {
        setLoading(true);
        const nominatim = new Nominatim();
        const results = await nominatim.search({ q: searchText, addressdetails: true });
        if (results && results.length > 0) {
          const { lat, lon, display_name } = results[0];
          setLocation({ placeName: display_name, lat: parseFloat(lat), lng: parseFloat(lon) });

          const apiResponse = await axios.get(`${process.env.REACT_APP_API_URL}api/parkingSpaces?location=${searchText}`, { lat, lon });
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
        setLoading(false);
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
          <Input type="text" className="w-100 mb-2 search-com" onInput={handleInputChange} placeholder="Search your location here" />
        </FormGroup>
      </Form>
      {error && <Col className="w-100"><Alert color="danger">{error}</Alert></Col>}
      {loading && <Col className="w-100"><Alert color="info">Loading</Alert></Col>}
      <div className="parking-spaces-list">
        {parkingSpaces.map((parkingSpace) => (
          <div key={parkingSpace.id} className={`d-flex flex-column mb-2 ${activeDropdown === parkingSpace.id ? 'selected' : ''}`}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="parking-space-item" onClick={() => handleDropdownClick(parkingSpace)}>
                {parkingSpace.location}
              </div>
              <img src={arrowDown} alt="arrowDown" onClick={() => handleDropdownClick(parkingSpace)} />
            </div>
            {activeDropdown === parkingSpace.id && (
              <div className="mt-2">
                <p>Number of spaces: {parkingSpace.noOfSpaces}</p>
                <ul>
                  {services.map((service) => (
                    <li key={service.service}>
                      {service.service} - ${service.price}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchComponent;
