import React, { useEffect } from 'react'
import { useUser } from '../../context/userContext';
import axios from 'axios';

function ParkingOwnerScreen() {
    const {user} = useUser();
    useEffect(() => {
      const fetchTickets = async () => {
          try {
              const res = await axios.get(`${process.env.REACT_APP_API_URL}tickets/active/${user.id}`);
              if (res) {
                  await axios.get(`${process.env.REACT_APP_API_URL}tickets/active/${user.id}`);
              }
          } catch (error) {
              console.error("Error fetching tickets:", error);
          }
      };

      fetchTickets();
  }, [user.id]);
  return (
    <div>ParkingOwnerScreen</div>
  )
}

export default ParkingOwnerScreen