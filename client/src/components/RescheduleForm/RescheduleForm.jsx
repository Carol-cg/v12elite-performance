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

      <p>
        <strong>Service:</strong> {booking.service}
      </p>

      <form onSubmit={handleSaveReschedule}>
        <div>
          <label htmlFor="newDate">New Date</label>

          <input
            id="newDate"
            type="date"
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="newTime">New Time</label>

          <input
            id="newTime"
            type="time"
            value={newTime}
            onChange={(event) => setNewTime(event.target.value)}
          />
        </div>

        <button type="submit">
          Save Changes
        </button>

        <button
          type="button"
          onClick={handleCancelReschedule}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default RescheduleForm;