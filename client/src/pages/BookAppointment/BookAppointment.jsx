import { useState } from "react";
import bookingService from "../../services/bookingService";

function BookAppointment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    service: "",
    appointmentDate: "",
    appointmentTime: "",
    notes: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookingData = {
      service: formData.service,

      vehicle: {
        make: formData.vehicleMake,
        model: formData.vehicleModel,
        year: Number(formData.vehicleYear),
      },

      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      notes: formData.notes,
    };

    try {
      const response = await bookingService.createBooking(bookingData);

      console.log("Booking created:", response);

      alert("Appointment scheduled successfully!");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to schedule appointment.";

      console.error(
        "Booking failed:",
        error.response?.data || error
      );

      alert(message);
    }
  };

  return (
    <div>
      <h1>Schedule Service</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>

          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone</label>

          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
        </div>

        <div>
          <label htmlFor="vehicleMake">Vehicle Make</label>

          <input
            id="vehicleMake"
            type="text"
            name="vehicleMake"
            value={formData.vehicleMake}
            onChange={handleChange}
            placeholder="Example: Ford"
            required
          />
        </div>

        <div>
          <label htmlFor="vehicleModel">Vehicle Model</label>

          <input
            id="vehicleModel"
            type="text"
            name="vehicleModel"
            value={formData.vehicleModel}
            onChange={handleChange}
            placeholder="Example: Mustang"
            required
          />
        </div>

        <div>
          <label htmlFor="vehicleYear">Vehicle Year</label>

          <input
            id="vehicleYear"
            type="number"
            name="vehicleYear"
            value={formData.vehicleYear}
            onChange={handleChange}
            placeholder="2022"
            min="1900"
            max="2030"
            required
          />
        </div>

        <div>
          <label htmlFor="service">Service</label>

          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Select a Service</option>
            <option value="Oil Change">Oil Change</option>
            <option value="Brake Service">Brake Service</option>
            <option value="Engine Diagnostics">
              Engine Diagnostics
            </option>
            <option value="AC Repair">AC Repair</option>
            <option value="Performance Tune">
              Performance Tune
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="appointmentDate">
            Appointment Date
          </label>

          <input
            id="appointmentDate"
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="appointmentTime">
            Appointment Time
          </label>

          <input
            id="appointmentTime"
            type="time"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="notes">Additional Notes</label>

          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Describe your vehicle issue..."
            rows="4"
          />
        </div>

        <button type="submit">
          Schedule Appointment
        </button>
      </form>
    </div>
  );
}

export default BookAppointment;