// import React, { useState } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import axios from "axios";

// const libraries = ["places"];
// const mapContainerStyle = {
//   width: "100vw",
//   height: "100vh",
// };
// const center = {
//   lat: 37.7749,
//   lng: -122.4194,
// };

// const Dashboard = () => {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
//     libraries,
//   });

//   const [markers, setMarkers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [services, setServices] = useState([]);
//   const [bookingDetails, setBookingDetails] = useState({});

//   const handleSearch = () => {
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ address: search }, (results, status) => {
//       if (status === "OK") {
//         const location = results[0].geometry.location;
//         setMarkers([{ lat: location.lat(), lng: location.lng() }]);
//       } else {
//         alert("Geocode was not successful for the following reason: " + status);
//       }
//     });
//   };

//   const handleBook = async () => {
//     try {
//       const response = await axios.post("/api/parking/book", bookingDetails, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       alert("Booking successful");
//     } catch (error) {
//       console.error(error);
//       alert("Booking failed: " + error.response.data.message);
//     }
//   };

//   if (loadError) return "Error loading maps";
//   if (!isLoaded) return "Loading Maps";

//   return (
//     <div>
//       <div>
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Enter a location"
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center}>
//         {markers.map((marker, index) => (
//           <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
//         ))}
//       </GoogleMap>
//       <div>
//         <h2>Booking Details</h2>
//         <label>Services:</label>
//         <select
//           multiple
//           onChange={(e) =>
//             setServices(
//               [...e.target.selectedOptions].map((option) => option.value)
//             )
//           }
//         >
//           <option value="EV Charging">EV Charging</option>
//           <option value="Car Wash">Car Wash</option>
//           <option value="Parking">Parking</option>
//         </select>
//         <label>Entry Time:</label>
//         <input
//           type="datetime-local"
//           onChange={(e) =>
//             setBookingDetails({ ...bookingDetails, entryTime: e.target.value })
//           }
//         />
//         <label>Exit Time:</label>
//         <input
//           type="datetime-local"
//           onChange={(e) =>
//             setBookingDetails({ ...bookingDetails, exitTime: e.target.value })
//           }
//         />
//         <button onClick={handleBook}>Book Parking</button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
