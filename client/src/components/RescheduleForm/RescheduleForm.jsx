import "./RescheduleForm.css";

function RescheduleForm({
  booking,
  newDate,
  newTime,
  setNewDate,
  setNewTime,
  handleSaveReschedule,
  handleCancelReschedule,
}) {
  return (
    <div className="reschedule-form">
      <h3>Reschedule Appointment</h3>

      <p className="reschedule-service">
        <strong>Service:</strong> {booking.service}
      </p>

      <form onSubmit={handleSaveReschedule}>
        <div className="reschedule-group">
          <label htmlFor="newDate">New Date</label>

          <input
            id="newDate"
            type="date"
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
            required
          />
        </div>

        <div className="reschedule-group">
          <label htmlFor="newTime">New Time</label>

          <input
            id="newTime"
            type="time"
            value={newTime}
            onChange={(event) => setNewTime(event.target.value)}
            required
          />
        </div>

        <div className="reschedule-actions">
          <button
            className="reschedule-save"
            type="submit"
          >
            Save Changes
          </button>

          <button
            className="reschedule-cancel"
            type="button"
            onClick={handleCancelReschedule}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default RescheduleForm;