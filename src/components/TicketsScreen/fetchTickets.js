import axios from "axios";

// Sample ticket data
const sampleTickets = [
  // {
  //   id: 1,
  //   userId: 101,
  //   parkingSpaceId: 201,
  //   serviceId: "evCharging",
  //   carNumber: "ABC123",
  //   startDate: "2024-06-10",
  //   endDate: "2024-06-12",
  //   price: 50.0,
  //   status: "pending",
  // },
  // {
  //   id: 2,
  //   userId: 102,
  //   parkingSpaceId: 202,
  //   serviceId: "carWash",
  //   carNumber: "XYZ789",
  //   startDate: "2024-06-12",
  //   endDate: "2024-06-14",
  //   price: 40.0,
  //   status: "expired",
  // },
  // {
  //   id: 3,
  //   userId: 103,
  //   parkingSpaceId: 203,
  //   serviceId: "carPark",
  //   carNumber: "PQR456",
  //   startDate: "2024-06-14",
  //   endDate: "2024-06-16",
  //   price: 60.0,
  //   status: "completed",
  // },
];

const fetchTicketsByType = async (type, userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}api/tickets?type=${type}&userId=${userId}`
    );

    console.log("fetch res", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return sampleTickets;
  }
};

export { fetchTicketsByType };
