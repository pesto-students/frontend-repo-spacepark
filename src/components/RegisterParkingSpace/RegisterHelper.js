import axios from "axios";

export const CreatingParkingSpaceOwner = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}users?action=creatingParkUser`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating parking space owner:", error);
    return error;
  }
};

export const CreateService = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}api/services/`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating service:", error);
    return error;
  }
};

export const ParkingSapceCreation = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}api/parkingSpaces`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating parking space:", error);
    return error;
  }
};

export const ParkingSpaceUpdate = async (data, parkingSpaceId) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}api/parkingSpaces/${parkingSpaceId}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating parking space ${parkingSpaceId}:`, error);
    return error;
  }
};

// Add more helper functions as needed for your application
