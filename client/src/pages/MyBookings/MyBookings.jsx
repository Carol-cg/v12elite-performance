import { useEffect, useState } from "react";
import RescheduleForm from "../../components/RescheduleForm/RescheduleForm";
import bookingService from "../../services/bookingService";
import "./MyBookings.css";


function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);


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


const visibleBookings = bookings.slice(0, visibleCount);


return (
  <section className="bookings-page">
    <div className="bookings-header">
      <p className="bookings-subtitle">MY BOOKINGS</p>

      <h1>Manage Your Appointments</h1>

      <p>
        Review, cancel, or reschedule your upcoming service appointments.
      </p>
    </div>

    {error && (
      <p className="bookings-error" role="alert">
        {error}
      </p>
    )}

    {bookings.length === 0 ? (
      <div className="bookings-empty">
        <p>You do not have any bookings yet.</p>
      </div>
    ) : (
      <>
        <div className="bookings-grid">
          {visibleBookings.map((booking) => (
            <article
              className="booking-card"
              key={booking._id}
            >
              <div className="booking-card-header">
                <h2>{booking.service}</h2>

                <span
                  className={`booking-status ${booking.status}`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="booking-card-body">
                <p>
                  <strong>Vehicle:</strong>{" "}
                  {booking.vehicle.make}{" "}
                  {booking.vehicle.model}{" "}
                  {booking.vehicle.year}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(
                    booking.appointmentDate
                  ).toLocaleDateString("en-US", {
                    timeZone: "UTC",
                  })}
                </p>

                <p>
                  <strong>Time:</strong>{" "}
                  {booking.appointmentTime}
                </p>

                {booking.notes && (
                  <p>
                    <strong>Notes:</strong>{" "}
                    {booking.notes}
                  </p>
                )}
              </div>

              <div className="booking-card-actions">
                <button
                  className="booking-cancel-button"
                  type="button"
                  onClick={() =>
                    handleCancel(booking._id)
                  }
                  disabled={
                    booking.status === "cancelled"
                  }
                >
                  {booking.status === "cancelled"
                    ? "Booking Cancelled"
                    : "Cancel Booking"}
                </button>

                <button
                  className="booking-reschedule-button"
                  type="button"
                  onClick={() =>
                    handleReschedule(booking)
                  }
                  disabled={
                    booking.status === "cancelled"
                  }
                >
                  {booking.status === "cancelled"
                    ? "Cannot Reschedule"
                    : "Reschedule"}
                </button>
              </div>

              {selectedBooking?._id === booking._id && (
                <RescheduleForm
                  booking={selectedBooking}
                  newDate={newDate}
                  newTime={newTime}
                  setNewDate={setNewDate}
                  setNewTime={setNewTime}
                  handleSaveReschedule={
                    handleSaveReschedule
                  }
                  handleCancelReschedule={
                    handleCancelReschedule
                  }
                />
              )}
            </article>
          ))}
        </div>

        {visibleCount < bookings.length && (
          <div className="show-more-container">
            <button
              className="show-more-button"
              type="button"
              onClick={() =>
                setVisibleCount(
                  (previousCount) =>
                    previousCount + 5
                )
              }
            >
              Show More
            </button>
          </div>
        )}
      </>
    )}
  </section>
);
}

export default MyBookings;