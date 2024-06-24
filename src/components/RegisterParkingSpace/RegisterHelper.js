import axios from "axios";

export const CreatingParkingSpaceOwner = async (data) => {
    try {
    //   const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users?action=creatingParkUser`);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}users?action=creatingParkUser`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching tickets:", error);
      return error;
    }
  };

  export const CreateService = async (data) => {
    try {
    //   const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users?action=creatingParkUser`);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/services/`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching tickets:", error);
      return error;
    }
  };


  export const ParkingSapceCreation = async (data) => {
    try {
      console.log('aaaaaaaaaaaa');
    //   const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users?action=creatingParkUser`);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/parkingSpaces/`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching tickets:", error);
      return error;
    }
  };