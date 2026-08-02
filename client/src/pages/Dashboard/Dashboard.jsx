import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bookingService from "../../services/bookingService";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [nextBooking, setNextBooking] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);

    const loadBookings = async () => {
      try {
        const data = await bookingService.getMyBookings();

        const upcomingBooking = data.bookings
          ?.filter((booking) => booking.status === "scheduled")
          .sort(
            (a, b) =>
              new Date(a.appointmentDate) -
              new Date(b.appointmentDate)
          )[0];

        setNextBooking(upcomingBooking || null);
      } catch (error) {
        console.error(error);
      }
    };

    loadBookings();
  }, []);

  return (
    <main>
      <h1>Welcome{user ? `, ${user.name}` : ""}!</h1>

      <h2>Your Dashboard</h2>

      {nextBooking ? (
        <section>
          <h3>Upcoming Appointment</h3>

          <p>
            <strong>Service:</strong> {nextBooking.service}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(
              nextBooking.appointmentDate
            ).toLocaleDateString()}
          </p>

          <p>
            <strong>Time:</strong> {nextBooking.appointmentTime}
          </p>
        </section>
      ) : (
        <p>You don't have any upcoming appointments.</p>
      )}

      <br />

      <Link to="/book">
        <button>Schedule Service</button>
      </Link>

      {" "}

      <Link to="/bookings">
        <button>My Bookings</button>
      </Link>
    </main>
  );
}

export default Dashboard;