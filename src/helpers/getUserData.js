import axios from "axios";

export const getUsersData = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}users`);
    return response.data;
  } catch (error) {
    console.error("Error in fetching users:", error);
    return error;
  }
};

export const getParkingSpacesData = async (userId) => {
  try {
    console.log(userId, "userIdddddddddddddddd");
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}api/parkingSpaces`
    );
    return response.data;
  } catch (error) {
    console.error("Error in fetching parking spaces:", error);
    return error;
  }
};

export const getServicesData = async (serviceId) => {
  try {
    console.log(serviceId, "serviceId");
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}api/services/${serviceId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in fetching services:", error);
    return error;
  }
};
