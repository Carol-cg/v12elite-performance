import api from "./api";

const createBooking = async (bookingData) => {
  const response = await api.post("/bookings", bookingData);

  return response.data;
};

const getMyBookings = async () => {
  const response = await api.get("/bookings");

  return response.data;
};

const cancelBooking = async (bookingId) => {
  const response = await api.patch(
    `/bookings/${bookingId}/cancel`
  );

  return response.data;
};

const updateBooking = async (bookingId, bookingData) => {
  const response = await api.patch(
    `/bookings/${bookingId}`,
    bookingData
  );

  return response.data;
};

const bookingService = {
  createBooking,
  getMyBookings,
  updateBooking,
  cancelBooking,
};

export default bookingService;
