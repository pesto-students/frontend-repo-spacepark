import axios from 'axios';

export const getUsersData = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
        return response.data;
      } catch (error) {
        console.error("Error fin fetching users :", error);
        return error;
      }


    }

    export const getParkingSpacesData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}api/parkingSpaces`);
            return response.data;
          } catch (error) {
            console.error("Error fin fetching users :", error);
            return error;
          }
    
    
        }