import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bookingService from "../../services/bookingService";
import "./Dashboard.css";

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
  <main className="dashboard-page">
    <section className="dashboard-container">
      <div className="dashboard-header">
        <span className="dashboard-label">MEMBER DASHBOARD</span>

        <h1>
          Welcome{user ? `, ${user.name}` : ""}!
        </h1>

        <p>
          Manage your appointments and quickly access your V12 services.
        </p>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-card">
          <h2>Upcoming Appointment</h2>

          {nextBooking ? (
            <div className="appointment-details">
              <p>
                <strong>Service:</strong> {nextBooking.service}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  nextBooking.appointmentDate
                ).toLocaleDateString("en-US", {
                  timeZone: "UTC",
                })}
              </p>

              <p>
                <strong>Time:</strong> {nextBooking.appointmentTime}
              </p>
            </div>
          ) : (
            <div className="dashboard-empty">
              <h3>No Upcoming Appointments</h3>

              <p>
                You're all caught up. Schedule your next service whenever
                you're ready.
              </p>
            </div>
          )}
        </section>

        <section className="dashboard-card">
          <h2>Quick Actions</h2>

          <p className="quick-actions-text">
            Schedule a new service or manage your existing appointments.
          </p>

          <div className="dashboard-actions">
            <Link
              className="dashboard-primary-button"
              to="/book"
            >
              Schedule Service
            </Link>

            <Link
              className="dashboard-secondary-button"
              to="/bookings"
            >
              My Bookings
            </Link>
          </div>
        </section>
      </div>
    </section>
  </main>
);
}
export default Dashboard;