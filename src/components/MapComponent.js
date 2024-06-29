import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Container, Row, Col } from "react-bootstrap";
import "leaflet/dist/leaflet.css";
import { useAtom } from "jotai";
import { locationStateAtom } from "./SearchComponent";
import SearchComponent from "./SearchComponent";
import L from "leaflet";
import ParkingForm from "./ParkingForm/ParkingForm";

const customIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  shadowSize: [41, 41],
});

const AddMarkerToClick = ({ setMarkers }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const popupText = prompt("Enter a description for this location:");
      setMarkers((prev) => [...prev, { lat, lng, popupText }]);
    },
  });
  return null;
};

const MapComponent = () => {
  const [markers, setMarkers] = useState([]);
  const [locationState] = useAtom(locationStateAtom);
  const API_ACCESS_TOKEN = process.env.REACT_APP_MAP_API_KEY;

  return (
    <Container fluid className="">
      <Row>
        <Col
          md={6}
          className="d-flex flex-column align-items-center justify-content-center mb-40 mt-60"
        >
          <Row className="flex-column">
            <Col className="w-100">
          <SearchComponent />
            
            </Col>
            <Col className="">
            <ParkingForm/>
          {/* <Card /> */}
            </Col>
          </Row>
        </Col>
        <Col md={6} className="px-0 mx-0">
          <MapContainer
            center={[28.6139, 77.209]}
            zoom={5}
            style={{ height: "100vh" }}
          >
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${API_ACCESS_TOKEN}`}
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
              tileSize={512}
              zoomOffset={-1}
            />
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={[marker.lat, marker.lng]}
                icon={customIcon}
              >
                <Popup>{marker.popupText}</Popup>
              </Marker>
            ))}
            <AddMarkerToClick setMarkers={setMarkers} />
            {locationState && (
              <Marker
                position={[locationState.lat, locationState.lng]}
                icon={customIcon}
              >
                <Popup>{locationState.placeName}</Popup>
              </Marker>
            )}
          </MapContainer>
        </Col>
      </Row>
      {/* <div className="linear-color position-absolute bottom-0 w-100"></div> */}
    </Container>
  );
};

export default MapComponent;
