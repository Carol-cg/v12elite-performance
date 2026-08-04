import { useEffect, useState } from "react";
import RescheduleForm from "../../components/RescheduleForm/RescheduleForm";
import bookingService from "../../services/bookingService";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await bookingService.getMyBookings();
        setBookings(data.bookings || []);
      } catch (error) {
        console.error("Load bookings error:", error);

        setError(
          error.response?.data?.message ||
            error.message ||
            "Unable to load your bookings."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      setError("");

      await bookingService.cancelBooking(bookingId);

 if (selectedBooking?._id === bookingId) {
  setSelectedBooking(null);
  setNewDate("");
  setNewTime("");
 }

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );
    } catch (error) {
      console.error("Cancel booking error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to cancel the booking."
      );
    }
  };

  const handleReschedule = (booking) => {
    setError("");
    setSelectedBooking(booking);
    setNewDate(booking.appointmentDate.slice(0, 10));
    setNewTime(booking.appointmentTime);
  };

  const handleCancelReschedule = () => {
    setSelectedBooking(null);
    setNewDate("");
    setNewTime("");
    setError("");
  };

  const handleSaveReschedule = async (event) => {
    event.preventDefault();

    if (!selectedBooking || !newDate || !newTime) {
      setError("Please select a new date and time.");
      return;
    }

    try {
      setError("");

      const data = await bookingService.updateBooking(
        selectedBooking._id,
        {
          appointmentDate: newDate,
          appointmentTime: newTime,
        }
      );

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === selectedBooking._id
            ? data.booking
            : booking
        )
      );

      handleCancelReschedule();
    } catch (error) {
      console.error("Reschedule booking error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to reschedule the booking."
      );
    }
  };

  if (isLoading) {
    return <p>Loading bookings...</p>;
  }

  return (
    <main>
      <h1>My Bookings</h1>

      {error && <p role="alert">{error}</p>}

      {bookings.length === 0 ? (
        <p>You do not have any bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <article key={booking._id}>
            <h2>{booking.service}</h2>

            <p>
              Vehicle: {booking.vehicle.make}{" "}
              {booking.vehicle.model}{" "}
              {booking.vehicle.year}
            </p>

            <p>
              Date:{" "}
              {new Date(
                booking.appointmentDate
              ).toLocaleDateString("en-US", {
                timeZone: "UTC",
              })}
            </p>

            <p>Time: {booking.appointmentTime}</p>

            <p>Status: {booking.status}</p>

            <button
              type="button"
              onClick={() => handleCancel(booking._id)}
              disabled={booking.status === "cancelled"}
            >
              {booking.status === "cancelled"
                ? "Booking Cancelled"
                : "Cancel Booking"}
            </button>

            <button
              type="button"
              onClick={() => handleReschedule(booking)}
              disabled={booking.status === "cancelled"}
            >
              {booking.status === "cancelled"
             ? "Cannot Reschedule"
             : "Reschedule"}
            </button>

            {selectedBooking?._id === booking._id && (
              <RescheduleForm
                booking={selectedBooking}
                newDate={newDate}
                newTime={newTime}
                setNewDate={setNewDate}
                setNewTime={setNewTime}
                handleSaveReschedule={handleSaveReschedule}
                handleCancelReschedule={handleCancelReschedule}
              />
            )}

            {booking.notes && (
              <p>Notes: {booking.notes}</p>
            )}
          </article>
        ))
      )}
    </main>
  );
}

export default MyBookings;