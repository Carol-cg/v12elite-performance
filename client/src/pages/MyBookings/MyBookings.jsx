import { useEffect, useState } from "react";
import bookingService from "../../services/bookingService";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (isLoading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <main>
      <h1>My Bookings</h1>

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
              ).toLocaleDateString()}
            </p>

            <p>Time: {booking.appointmentTime}</p>

            <p>Status: {booking.status}</p>

            <button>
            Cancel Booking

          </button>

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