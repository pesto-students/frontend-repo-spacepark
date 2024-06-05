import React from 'react';
import { Form, FormGroup, Input, Button, Alert, Col } from 'reactstrap'; // Import components from reactstrap
import { atom, useAtom } from 'jotai'; // Import atom and useAtom from Jotai
import Nominatim from 'nominatim-geocoder';

// Define atom to store the location state
export const locationStateAtom = atom(null);

// Define the SearchComponent
const SearchComponent = () => {
  const [searchText, setSearchText] = React.useState('');
  const [, setLocation] = useAtom(locationStateAtom); // Use the locationStateAtom
  const [error, setError] = React.useState(null);

  const handleSearch = async () => {
    try {
      const nominatim = new Nominatim();
      const results = await nominatim.search({ q: searchText, addressdetails: true });
      if (results && results.length > 0) {
        const { lat, lon, display_name } = results[0];
        setLocation({ placeName: display_name, lat: parseFloat(lat), lng: parseFloat(lon) });
        
        // Make Axios API call
        // const response = await axios.get(`YOUR_API_ENDPOINT?lat=${lat}&lon=${lon}`);
        // // Handle the response
        // console.log('API response:', response.data);
      } else {
        setError('Location not found.');
        setTimeout(() => {
          setError('');

        }, 3000)
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      setError('Error fetching location. Please try again later.');
    }
  };

  return (
    <div className='w-50 mx-auto'>
      <Form className="">
        <FormGroup className="d-flex">
          <Input type="text" className=" p-2"value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search location"/>
          <Button className="custom-button col-2" onClick={handleSearch}>Search</Button>
        </FormGroup>
      </Form>
      {error && <Col className="w-100"><Alert color="danger">{error}</Alert></Col>}
    </div>
  );
};

export default SearchComponent;
