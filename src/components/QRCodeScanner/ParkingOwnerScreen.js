import React, { useEffect } from 'react'
import { useUser } from '../../context/userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ParkingOwnerScreen() {
    const {user} = useUser();
    const navigate = useNavigate();
    console.log(user, 'User');

    useEffect(() => {
      const fetchTickets = async () => {

          try {
              if(user){
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}users/${user.id}`);
                    console.log(response, 'Response');  
                    if(response.data.role === 'parkAdmin'){
                        const url = window.location.href;
                        const segments = url.split('/');
                        const lastId = segments[segments.length - 1];
                        console.log(lastId);

                        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/tickets/active/${user.id}`);
                        console.log(res, 'Response');
                        if (res) {
                            await axios.get(`${process.env.REACT_APP_API_URL}tickets/active/${user.id}`);
                        }
                    }else{
                        navigate('/login')
                    }
              }else {
                navigate('/login')
              }
          } catch (error) {
              console.error("Error fetching tickets:", error);
          }
      };

      fetchTickets();
      // eslint-disable-next-line
  }, [user.id]);
  return (
    <div style={{backgroundColor:"#ECD6D7"}}>
        <div className='data-ticket'>

            You are not authorised user 
        </div>

    </div>
  )
}

export default ParkingOwnerScreen